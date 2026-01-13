from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'travel_ecommerce')]

# JWT Configuration
SECRET_KEY = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# Create the main app
app = FastAPI(title="Travel & E-commerce Combined Platform")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

security = HTTPBearer(auto_error=False)

# ================== MODELS ==================

# User Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Product Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    original_price: Optional[float] = None
    category: str
    image: str
    images: List[str] = []
    rating: float = 4.5
    reviews_count: int = 0
    in_stock: bool = True
    featured: bool = False
    tags: List[str] = []

# Cart Models
class CartItem(BaseModel):
    product_id: str
    quantity: int = 1

class CartItemResponse(BaseModel):
    product_id: str
    product_name: str
    product_image: str
    price: float
    quantity: int
    subtotal: float

class CartResponse(BaseModel):
    items: List[CartItemResponse]
    total: float
    item_count: int

# Travel Booking Models
class TravelBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    booking_type: str  # 'destination', 'experience', 'rental'
    item_id: str
    item_name: str
    item_image: str
    start_date: str
    end_date: Optional[str] = None
    guests: int = 1
    total_price: float
    status: str = "confirmed"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TravelBookingCreate(BaseModel):
    booking_type: str
    item_id: str
    item_name: str
    item_image: str
    start_date: str
    end_date: Optional[str] = None
    guests: int = 1
    total_price: float

# Order Models
class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    items: List[dict]
    subtotal: float
    shipping: float = 0.0
    tax: float = 0.0
    total: float
    shipping_address: dict
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OrderCreate(BaseModel):
    shipping_address: dict

# ================== AUTH HELPERS ==================

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = await db.users.find_one({"id": user_id})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_optional_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        return None
    try:
        return await get_current_user(credentials)
    except:
        return None

# ================== AUTH ROUTES ==================

@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    # Check if user exists
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_id = str(uuid.uuid4())
    user_doc = {
        "id": user_id,
        "email": user_data.email,
        "password": hash_password(user_data.password),
        "name": user_data.name,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(user_doc)
    
    # Create cart for user
    await db.carts.insert_one({"user_id": user_id, "items": []})
    
    # Generate token
    token = create_access_token({"sub": user_id})
    
    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=user_id,
            email=user_data.email,
            name=user_data.name,
            created_at=datetime.fromisoformat(user_doc["created_at"])
        )
    )

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"sub": user["id"]})
    
    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=user["id"],
            email=user["email"],
            name=user["name"],
            created_at=datetime.fromisoformat(user["created_at"]) if isinstance(user["created_at"], str) else user["created_at"]
        )
    )

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(user = Depends(get_current_user)):
    return UserResponse(
        id=user["id"],
        email=user["email"],
        name=user["name"],
        created_at=datetime.fromisoformat(user["created_at"]) if isinstance(user["created_at"], str) else user["created_at"]
    )

# ================== PRODUCT ROUTES ==================

@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    search: Optional[str] = None
):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    products = await db.products.find(query, {"_id": 0}).to_list(100)
    return products

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# ================== CART ROUTES ==================

@api_router.get("/cart", response_model=CartResponse)
async def get_cart(user = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": user["id"]})
    if not cart:
        cart = {"user_id": user["id"], "items": []}
        await db.carts.insert_one(cart)
    
    items = []
    total = 0
    
    for item in cart.get("items", []):
        product = await db.products.find_one({"id": item["product_id"]}, {"_id": 0})
        if product:
            subtotal = product["price"] * item["quantity"]
            items.append(CartItemResponse(
                product_id=product["id"],
                product_name=product["name"],
                product_image=product["image"],
                price=product["price"],
                quantity=item["quantity"],
                subtotal=subtotal
            ))
            total += subtotal
    
    return CartResponse(items=items, total=total, item_count=len(items))

@api_router.post("/cart/add")
async def add_to_cart(item: CartItem, user = Depends(get_current_user)):
    # Verify product exists
    product = await db.products.find_one({"id": item.product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    cart = await db.carts.find_one({"user_id": user["id"]})
    if not cart:
        cart = {"user_id": user["id"], "items": []}
        await db.carts.insert_one(cart)
    
    # Check if item already in cart
    existing_item = None
    for i, cart_item in enumerate(cart.get("items", [])):
        if cart_item["product_id"] == item.product_id:
            existing_item = i
            break
    
    if existing_item is not None:
        # Update quantity
        await db.carts.update_one(
            {"user_id": user["id"], "items.product_id": item.product_id},
            {"$inc": {"items.$.quantity": item.quantity}}
        )
    else:
        # Add new item
        await db.carts.update_one(
            {"user_id": user["id"]},
            {"$push": {"items": {"product_id": item.product_id, "quantity": item.quantity}}}
        )
    
    return {"message": "Item added to cart"}

@api_router.put("/cart/update")
async def update_cart_item(item: CartItem, user = Depends(get_current_user)):
    if item.quantity <= 0:
        # Remove item
        await db.carts.update_one(
            {"user_id": user["id"]},
            {"$pull": {"items": {"product_id": item.product_id}}}
        )
    else:
        # Update quantity
        await db.carts.update_one(
            {"user_id": user["id"], "items.product_id": item.product_id},
            {"$set": {"items.$.quantity": item.quantity}}
        )
    
    return {"message": "Cart updated"}

@api_router.delete("/cart/remove/{product_id}")
async def remove_from_cart(product_id: str, user = Depends(get_current_user)):
    await db.carts.update_one(
        {"user_id": user["id"]},
        {"$pull": {"items": {"product_id": product_id}}}
    )
    return {"message": "Item removed from cart"}

@api_router.delete("/cart/clear")
async def clear_cart(user = Depends(get_current_user)):
    await db.carts.update_one(
        {"user_id": user["id"]},
        {"$set": {"items": []}}
    )
    return {"message": "Cart cleared"}

# ================== ORDER ROUTES ==================

@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate, user = Depends(get_current_user)):
    # Get cart
    cart = await db.carts.find_one({"user_id": user["id"]})
    if not cart or not cart.get("items"):
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Build order items
    order_items = []
    subtotal = 0
    
    for item in cart["items"]:
        product = await db.products.find_one({"id": item["product_id"]}, {"_id": 0})
        if product:
            item_total = product["price"] * item["quantity"]
            order_items.append({
                "product_id": product["id"],
                "product_name": product["name"],
                "product_image": product["image"],
                "price": product["price"],
                "quantity": item["quantity"],
                "subtotal": item_total
            })
            subtotal += item_total
    
    # Calculate totals
    shipping = 0 if subtotal >= 100 else 9.99
    tax = round(subtotal * 0.08, 2)  # 8% tax
    total = round(subtotal + shipping + tax, 2)
    
    # Create order
    order = Order(
        user_id=user["id"],
        items=order_items,
        subtotal=subtotal,
        shipping=shipping,
        tax=tax,
        total=total,
        shipping_address=order_data.shipping_address,
        status="confirmed"
    )
    
    order_doc = order.model_dump()
    order_doc["created_at"] = order_doc["created_at"].isoformat()
    await db.orders.insert_one(order_doc)
    
    # Clear cart
    await db.carts.update_one({"user_id": user["id"]}, {"$set": {"items": []}})
    
    return order

@api_router.get("/orders", response_model=List[Order])
async def get_orders(user = Depends(get_current_user)):
    orders = await db.orders.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for order in orders:
        if isinstance(order.get("created_at"), str):
            order["created_at"] = datetime.fromisoformat(order["created_at"])
    return orders

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, user = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": user["id"]}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if isinstance(order.get("created_at"), str):
        order["created_at"] = datetime.fromisoformat(order["created_at"])
    return order

# ================== TRAVEL BOOKING ROUTES ==================

@api_router.post("/bookings", response_model=TravelBooking)
async def create_booking(booking_data: TravelBookingCreate, user = Depends(get_current_user)):
    booking = TravelBooking(
        user_id=user["id"],
        **booking_data.model_dump()
    )
    
    booking_doc = booking.model_dump()
    booking_doc["created_at"] = booking_doc["created_at"].isoformat()
    await db.bookings.insert_one(booking_doc)
    
    return booking

@api_router.get("/bookings", response_model=List[TravelBooking])
async def get_bookings(user = Depends(get_current_user)):
    bookings = await db.bookings.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for booking in bookings:
        if isinstance(booking.get("created_at"), str):
            booking["created_at"] = datetime.fromisoformat(booking["created_at"])
    return bookings

@api_router.get("/bookings/{booking_id}", response_model=TravelBooking)
async def get_booking(booking_id: str, user = Depends(get_current_user)):
    booking = await db.bookings.find_one({"id": booking_id, "user_id": user["id"]}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if isinstance(booking.get("created_at"), str):
        booking["created_at"] = datetime.fromisoformat(booking["created_at"])
    return booking

@api_router.delete("/bookings/{booking_id}")
async def cancel_booking(booking_id: str, user = Depends(get_current_user)):
    result = await db.bookings.delete_one({"id": booking_id, "user_id": user["id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking cancelled"}

# ================== COMBINED VIEW ROUTES ==================

@api_router.get("/my-activity")
async def get_my_activity(user = Depends(get_current_user)):
    """Get combined bookings and orders for the user"""
    bookings = await db.bookings.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(50)
    orders = await db.orders.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(50)
    
    # Process dates
    for booking in bookings:
        if isinstance(booking.get("created_at"), str):
            booking["created_at"] = datetime.fromisoformat(booking["created_at"])
    for order in orders:
        if isinstance(order.get("created_at"), str):
            order["created_at"] = datetime.fromisoformat(order["created_at"])
    
    return {
        "bookings": bookings,
        "orders": orders,
        "total_bookings": len(bookings),
        "total_orders": len(orders)
    }

# ================== SEED DATA ==================

@api_router.post("/seed")
async def seed_data():
    """Seed initial product data"""
    
    # Check if products exist
    existing = await db.products.count_documents({})
    if existing > 0:
        return {"message": "Data already seeded", "products_count": existing}
    
    products = [
        # Luggage
        {
            "id": str(uuid.uuid4()),
            "name": "Premium Carry-On Spinner",
            "description": "Lightweight aluminum frame carry-on with 360° spinner wheels. Perfect for short trips and business travel.",
            "price": 349.99,
            "original_price": 449.99,
            "category": "luggage",
            "image": "https://images.unsplash.com/photo-1639598003276-8a70fcaaad6c?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1639598003276-8a70fcaaad6c?w=800&q=80"],
            "rating": 4.8,
            "reviews_count": 156,
            "in_stock": True,
            "featured": True,
            "tags": ["carry-on", "spinner", "business"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "RIMOWA Classic Check-In L",
            "description": "Iconic aluminum suitcase with TSA-approved locks and multi-wheel system. The ultimate in luxury travel.",
            "price": 1250.00,
            "original_price": None,
            "category": "luggage",
            "image": "https://images.unsplash.com/photo-1718702662411-11d9672eb179?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1718702662411-11d9672eb179?w=800&q=80"],
            "rating": 4.9,
            "reviews_count": 89,
            "in_stock": True,
            "featured": True,
            "tags": ["premium", "check-in", "aluminum"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Soft Shell Expandable Set",
            "description": "3-piece luggage set with expandable compartments. Includes carry-on, medium, and large cases.",
            "price": 599.99,
            "original_price": 799.99,
            "category": "luggage",
            "image": "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1581553680321-4fffae59fccd?w=800&q=80"],
            "rating": 4.6,
            "reviews_count": 234,
            "in_stock": True,
            "featured": False,
            "tags": ["set", "expandable", "family"]
        },
        # Backpacks
        {
            "id": str(uuid.uuid4()),
            "name": "Vintage Canvas Travel Backpack",
            "description": "Classic waxed canvas backpack with leather trim. Features laptop compartment and multiple organizer pockets.",
            "price": 189.99,
            "original_price": 229.99,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&q=80"],
            "rating": 4.7,
            "reviews_count": 312,
            "in_stock": True,
            "featured": True,
            "tags": ["canvas", "vintage", "laptop"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Adventure Pro Hiking Pack",
            "description": "65L hiking backpack with ergonomic support system. Perfect for multi-day adventures.",
            "price": 279.99,
            "original_price": None,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1575844264771-892081089af5?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1575844264771-892081089af5?w=800&q=80"],
            "rating": 4.8,
            "reviews_count": 178,
            "in_stock": True,
            "featured": True,
            "tags": ["hiking", "camping", "adventure"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Urban Explorer Daypack",
            "description": "Sleek urban backpack with anti-theft features. Water-resistant and perfect for city travel.",
            "price": 129.99,
            "original_price": 159.99,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1603920347917-d16487c88db4?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1603920347917-d16487c88db4?w=800&q=80"],
            "rating": 4.5,
            "reviews_count": 421,
            "in_stock": True,
            "featured": False,
            "tags": ["urban", "anti-theft", "water-resistant"]
        },
        # Accessories
        {
            "id": str(uuid.uuid4()),
            "name": "Travel Organizer Kit",
            "description": "6-piece packing cube set with compression technology. Keep your luggage organized on every trip.",
            "price": 49.99,
            "original_price": 69.99,
            "category": "accessories",
            "image": "https://images.unsplash.com/photo-1555337159-d399aaa99955?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1555337159-d399aaa99955?w=800&q=80"],
            "rating": 4.6,
            "reviews_count": 892,
            "in_stock": True,
            "featured": True,
            "tags": ["organizer", "packing", "cubes"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Premium Leather Passport Holder",
            "description": "Full-grain leather passport holder with RFID blocking. Includes card slots and boarding pass pocket.",
            "price": 79.99,
            "original_price": None,
            "category": "accessories",
            "image": "https://images.unsplash.com/photo-1502301197179-65228ab57f78?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1502301197179-65228ab57f78?w=800&q=80"],
            "rating": 4.9,
            "reviews_count": 567,
            "in_stock": True,
            "featured": False,
            "tags": ["leather", "passport", "RFID"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Noise-Canceling Travel Headphones",
            "description": "Premium wireless headphones with 30-hour battery life. Active noise cancellation for peaceful travel.",
            "price": 299.99,
            "original_price": 349.99,
            "category": "accessories",
            "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"],
            "rating": 4.8,
            "reviews_count": 1023,
            "in_stock": True,
            "featured": True,
            "tags": ["headphones", "wireless", "noise-canceling"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Universal Travel Adapter",
            "description": "All-in-one adapter for 150+ countries. Features 4 USB ports and fast charging technology.",
            "price": 39.99,
            "original_price": 49.99,
            "category": "accessories",
            "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"],
            "rating": 4.7,
            "reviews_count": 2341,
            "in_stock": True,
            "featured": False,
            "tags": ["adapter", "universal", "charging"]
        },
        # Travel Comfort
        {
            "id": str(uuid.uuid4()),
            "name": "Memory Foam Neck Pillow",
            "description": "Ergonomic neck pillow with cooling gel memory foam. Includes carrying case and eye mask.",
            "price": 59.99,
            "original_price": 79.99,
            "category": "comfort",
            "image": "https://images.unsplash.com/photo-1520255870062-89e1d7e5eb77?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1520255870062-89e1d7e5eb77?w=800&q=80"],
            "rating": 4.5,
            "reviews_count": 678,
            "in_stock": True,
            "featured": False,
            "tags": ["pillow", "comfort", "sleep"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Compact Travel Blanket",
            "description": "Ultra-soft fleece blanket that packs into a travel pillow. Perfect for planes, trains, and camping.",
            "price": 44.99,
            "original_price": None,
            "category": "comfort",
            "image": "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1523496922380-91d5afba98a3?w=800&q=80"],
            "rating": 4.6,
            "reviews_count": 445,
            "in_stock": True,
            "featured": False,
            "tags": ["blanket", "comfort", "compact"]
        }
    ]
    
    await db.products.insert_many(products)
    
    return {"message": "Data seeded successfully", "products_count": len(products)}

# ================== BASIC ROUTES ==================

@api_router.get("/")
async def root():
    return {"message": "Travel & E-commerce Combined Platform API", "version": "1.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
