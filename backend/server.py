from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request
from fastapi.responses import JSONResponse
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
import certifi
# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Trigger reload
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')


from urllib.parse import quote_plus

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
is_production = os.environ.get('RENDER') == 'true'

if mongo_url and "@" in mongo_url and ":" in mongo_url:
    try:
        # Handle passwords with special characters like '@'
        # Format: mongodb+srv://user:password@host
        proto = mongo_url.split("://")[0]
        rest = mongo_url.split("://")[1]
        
        # Find the LAST '@' which separates credentials from host
        auth_part, host_part = rest.rsplit("@", 1)
        
        if ":" in auth_part:
            user, pwd = auth_part.split(":", 1)
            # Reconstruct with encoded password
            mongo_url = f"{proto}://{user}:{quote_plus(pwd)}@{host_part}"
    except Exception as e:
        print(f"WARNING: Could not auto-encode MongoDB password: {e}")

if not mongo_url:
    if is_production:
        print("CRITICAL ERROR: MONGO_URL environment variable is MISSING on Render!")
    else:
        print("WARNING: MONGO_URL not found. Falling back to localhost.")
    mongo_url = "mongodb://localhost:27017/Travel-ecommerce"

# Sanitize URL for logging
safe_url = mongo_url
if "@" in mongo_url:
    parts = mongo_url.split("@")
    safe_url = parts[0].split("//")[0] + "//****:****@" + parts[(len(parts)-1)]

print(f"DEBUG: Connecting to MongoDB at -> {safe_url}")

# Use certifi for SSL/TLS verification to avoid handshake errors on Render
ca = certifi.where()
client = AsyncIOMotorClient(
    mongo_url, 
    serverSelectionTimeoutMS=5000,
    tlsCAFile=ca,
    tls=True if "mongodb+srv" in mongo_url else None
)
db_name = os.environ.get('DB_NAME', 'Travel-ecommerce')
db = client[db_name]
print(f"DEBUG: Using database -> {db_name}")

# JWT Configuration
SECRET_KEY = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# Create the main app
app = FastAPI(title="Travel & E-commerce Combined Platform")

# Standard origins
base_origins = [
    "https://travel-ecommerce-swart.vercel.app",
    "https://travel-ecommerce-swart.vercel.app/",
    "http://localhost:3000",
    "http://localhost:3001",
]

# Add more Vercel variations and Render URLs
allow_origins = base_origins.copy()
env_origins_str = os.environ.get('CORS_ORIGINS', '')
if env_origins_str:
    if env_origins_str == '*':
        # We will handle '*' manually in middleware to support allow_credentials=True
        pass
    else:
        extra = [o.strip() for o in env_origins_str.split(',') if o.strip()]
        for o in extra:
            if o not in allow_origins:
                allow_origins.append(o)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins if env_origins_str != '*' else allow_origins,
    allow_origin_regex=r"https://travel-ecommerce-.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.middleware("http")
async def cors_debug_middleware(request: Request, call_next):
    origin = request.headers.get("origin")
    method = request.method
    path = request.url.path
    
    # Dynamic origin reflection for '*' or matching logic
    is_allowed = False
    if env_origins_str == '*':
        is_allowed = True
    elif origin in allow_origins:
        is_allowed = True
    elif origin and any(origin.startswith(o.rstrip('/')) for o in allow_origins):
        is_allowed = True
    elif origin and (".vercel.app" in origin):
        is_allowed = True
        
    logger.info(f"CORS Request: {method} {path} | Origin: {origin} | Allowed: {is_allowed}")
    
    try:
        response = await call_next(request)
    except Exception as e:
        logger.error(f"Execution Error in {path}: {str(e)}", exc_info=True)
        response = JSONResponse(
            status_code=500,
            content={"message": "Internal Server Error", "detail": str(e)}
        )
    
    if origin and is_allowed:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
        
    return response

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
    details: List[str] = []

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
    payment_method: str = "cod" # 'card', 'cod'
    payment_status: str = "pending"
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OrderCreate(BaseModel):
    shipping_address: dict
    payment_method: str
    payment_details: Optional[dict] = None

# Contact Models
class ContactSubmission(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: Optional[str] = None
    destination: Optional[str] = None
    budget: Optional[str] = None
    message: str
    newsletter: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Recovery Models
class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

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

@api_router.post("/auth/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    user = await db.users.find_one({"email": request.email})
    if not user:
        # For security, don't reveal if user exists, but for this demo we'll just say it's sent
        return {"message": "If your email is registered, you will receive a recovery token."}
    
    # Generate a simple 6-digit token for this demo
    import random
    reset_token = "".join([str(random.randint(0, 9)) for _ in range(6)])
    expiry = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    await db.users.update_one(
        {"email": request.email},
        {"$set": {
            "reset_token": reset_token,
            "reset_token_expiry": expiry.isoformat()
        }}
    )
    
    # In a real app, send email. Here we return it for the user to "see" it in the demo
    # or just log it. I'll return it in the message for easy testing by the user.
    return {"message": f"Recovery token sent to your email. (DEMO TOKEN: {reset_token})"}

@api_router.post("/auth/reset-password")
async def reset_password(request: ResetPasswordRequest):
    user = await db.users.find_one({
        "reset_token": request.token,
        "reset_token_expiry": {"$gt": datetime.now(timezone.utc).isoformat()}
    })
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired recovery token")
    
    # Update password and clear token
    new_hashed_password = hash_password(request.new_password)
    await db.users.update_one(
        {"id": user["id"]},
        {"$set": {"password": new_hashed_password}, "$unset": {"reset_token": "", "reset_token_expiry": ""}}
    )
    
    return {"message": "Password updated successfully"}

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
        payment_method=order_data.payment_method,
        payment_status="paid" if order_data.payment_method == "card" else "pending",
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

@api_router.post("/contact")
async def submit_contact(submission: ContactSubmission):
    submission_doc = submission.model_dump()
    submission_doc["created_at"] = submission_doc["created_at"].isoformat()
    await db.contact_submissions.insert_one(submission_doc)
    return {"message": "Contact submission received"}

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
    
    # Clear existing products to ensure fresh data
    await db.products.delete_many({})
    existing = 0
    
    products = [
        {
            "id": str(uuid.uuid4()),
            "name": "HRX Force Urban Trolley with Laptop",
            "description": "Meet the HRX Force Cabin Pro. Made for travellers who like their journeys smooth and their tech within reach. With a front easy access compartment for your laptop, you\u2019ll glide through airport security checks easy and breezy. Fits laptops up to 15.6\u201d, with the durability and style HRX is built on. Easy Access Front Compartment: A quick-open front panel for laptop and essentials, plus a secure flush lock and premium twin-puller finish. Easy-Access Secure Lock: Flush-mounted lock system lets you open and pack in seconds while keeping your belongings protected at all times.",
            "price": 49.99,
            "original_price": 69.99,
            "category": "luggage",
            "image": "/images/products/hrx-force-cabin.png",
            "images": ["/images/products/hrx-force-cabin.png"],
            "rating": 4.5,
            "reviews_count": 160,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Premium quality material", "Built for durability", "Stylish design", "Convenient storage"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX Helium Small Cabin Suitcase (56 cm) 8 Wheels - by Hrithik Roshan",
            "description": "Thoughtfully designed for Going Places. The HRX Helium Luggage is lightweight, compact, and engineered for life on the move \u2014 whether it\u2019s flights, train rides, or road trips.",
            "price": 55.0,
            "original_price": 70.0,
            "category": "luggage",
            "image": "/images/products/hrx-helium-cabin.png",
            "images": ["/images/products/hrx-helium-cabin.png"],
            "rating": 4.6,
            "reviews_count": 101,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Effortless 8-Wheel Motion", "Glides smooth in every direction \u2014 from tight terminals to cobbled streets.", "360\u00b0 Spinner Wheels", "Ultra-responsive and whisper-quiet, built for fast moves and sharp turns."],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Small Cabin Suitcase (56 cm) 8 Wheels - Kyoto",
            "description": "Thoughtfully designed for Going Places. The HRX Kyoto Value Pack Luggage is lightweight, compact, and engineered for life on the move \u2014 whether it\u2019s flights, train rides, or road trips.",
            "price": 55.0,
            "original_price": 70.0,
            "category": "luggage",
            "image": "https://i.ytimg.com/vi/tbgU2IIq1Mw/sddefault.jpg",
            "images": ["https://i.ytimg.com/vi/tbgU2IIq1Mw/sddefault.jpg", "https://i.ytimg.com/vi/uMyOTZcTI6Y/hqdefault.jpg", "https://i.ytimg.com/vi/SNZbBi6f0aQ/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGF4gXiheMA8=&rs=AOn4CLBlxPV9hYa0M6dgkgHGltBf4tPeVQ"],
            "rating": 4.6,
            "reviews_count": 141,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Effortless 8-Wheel Motion", "Glides smooth in every direction \u2014 from tight terminals to cobbled streets.", "360\u00b0 Spinner Wheels", "Ultra-responsive and whisper-quiet, built for fast moves and sharp turns."],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Rare rabbit' Axiel (Leather) Backpack-One Size-Black",
            "description": "This Rare Rabbit Men Axiel Black Leather Bag is the perfect accessory for any man on the go. Its sleek and stylish design is made from high-quality leather, ensuring durability and sophistication. With plenty of room for all your essentials, this bag is the perfect blend of fashion and function.",
            "price": 45.0,
            "original_price": 60.0,
            "category": "backpacks",
            "image": "/images/products/rare-rabbit-axiel-backpack.png",
            "images": ["/images/products/rare-rabbit-axiel-backpack.png"],
            "rating": 4.6,
            "reviews_count": 116,
            "in_stock": True,
            "featured": False,
            "tags": ["backpacks", "travel", "premium"],
            "details": ["Material: High-quality genuine leather for durability and premium feel", "Design: Sleek, stylish, and sophisticated", "Functionality: Spacious compartments for organizing essentials", "Style: Combines fashion and practicality for the modern man"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Small Cabin Suitcase (56 cm) 8 Wheels - Force",
            "description": "HRX Force Lightest Trolley Ever Whether you\u2019re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.",
            "price": 55.0,
            "original_price": 70.0,
            "category": "luggage",
            "image": "/images/products/hrx-force-cabin.png",
            "images": ["/images/products/hrx-force-cabin.png"],
            "rating": 4.9,
            "reviews_count": 54,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["360\u00b0 Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns", "Waterproof Inside & Out Spills, splashes, or sudden rain \u2014 you\u2019re covered", "Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space", "Feather-Light. Built Tough High-strength shell that resists scratches, pressure, and drama"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Rare Rabbit Genther (Leather) Backpack-One Size-Blue",
            "description": "Be the envy of all with this exclusive Rare Rabbit Genther Blue Monogram print Bag for men. Keep your belongings organized and secure with this stylish BAG. Rock the monogram print trend in a playful and unique way",
            "price": 45.0,
            "original_price": 60.0,
            "category": "backpacks",
            "image": "https://i.ytimg.com/vi/9nCJlFmuEU8/mqdefault.jpg",
            "images": ["https://i.ytimg.com/vi/9nCJlFmuEU8/mqdefault.jpg", "https://i.ytimg.com/vi/2GHLCZj6ymI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCqR-xCAev-al68XkbcPOueeLzuIQ", "https://img.youtube.com/vi/Zthlp7ZLncY/0.jpg?q=90"],
            "rating": 4.7,
            "reviews_count": 77,
            "in_stock": True,
            "featured": False,
            "tags": ["backpacks", "travel", "premium"],
            "details": ["Description", "Design: Monogram print for a trendy and stylish look", "Material: Premium quality (assumed leather or durable fabric based on brand standards)", "Functionality: Keeps belongings organized and secure"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Small Cabin Suitcase (56 cm) 8 Wheels - Glide",
            "description": "HRX Glide Lightest Trolley Ever Whether you\u2019re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.",
            "price": 55.0,
            "original_price": 70.0,
            "category": "luggage",
            "image": "/images/products/hrx-glide-cabin.png",
            "images": ["/images/products/hrx-glide-cabin.png"],
            "rating": 4.5,
            "reviews_count": 100,
            "in_stock": True,
            "featured": True,
            "tags": ["luggage", "travel", "premium"],
            "details": ["360\u00b0 Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns.", "Waterproof Inside & Out Spills, splashes, or sudden rain \u2014 you\u2019re covered.", "Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space.", "Feather-Light. Built Tough. High-strength shell that resists scratches, pressure, and drama."],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Medium Check-in Suitcase (65 cm) 8 Wheels - Helium",
            "description": "\u2022 Effortless 8-Wheel Motion Glides smooth in every direction \u2014 from tight terminals to cobbled streets. \u2022 360\u00b0 Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns. \u2022 Waterproof Inside & Out Spills, splashes, or sudden rain \u2014 you\u2019re covered. \u2022 Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space. \u2022 Feather-Light. Built Tough. High-strength shell that resists scratches, pressure, and drama. \u2022 Smart Internal Storage Tie-down straps and compartments that make chaos look organised. \u2022 Telescopic Handle With Ergonomic grip with Soft Handle. Effortless 360\u00b0 Motion With 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you\u2019re sprinting through terminals or cruising over uneven ground, the 360\u00b0 wheel system ensures zero effort, total control. Scratch-Resistant Shell with Metallic Sheen The sleek, scratch-resistant hard shell keeps your luggage looking new, trip after trip. Finished in a sheen metallic texture, it brings both strength and style \u2014 a bold HRX statement wherever you travel.",
            "price": 75.0,
            "original_price": 95.0,
            "category": "luggage",
            "image": "/images/products/hrx-helium-medium-silver.png",
            "images": ["/images/products/hrx-helium-medium-silver.png"],
            "rating": 4.8,
            "reviews_count": 158,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Premium quality material", "Built for durability", "Stylish design", "Convenient storage"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Medium Check-in Suitcase (65 cm) 8 Wheels - Kyoto",
            "description": "Thoughtfully designed for Going Places. The HRX Helium Luggage is lightweight, compact, and engineered for life on the move \u2014 whether it\u2019s flights, train rides, or road trips.",
            "price": 75.0,
            "original_price": 95.0,
            "category": "luggage",
            "image": "https://i.ytimg.com/vi/wm3zOFJyNJ8/mqdefault.jpg",
            "images": ["https://i.ytimg.com/vi/wm3zOFJyNJ8/mqdefault.jpg", "https://i.ytimg.com/vi/TOUd786eTkk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCAI_hsbMTvPVKg3jjUseQma1UOAw", "https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3797445475465857475"],
            "rating": 4.5,
            "reviews_count": 110,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Effortless 8-Wheel Motion", "Glides smooth in every direction \u2014 from tight terminals to cobbled streets.", "360\u00b0 Spinner Wheels", "Ultra-responsive and whisper-quiet, built for fast moves and sharp turns."],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Medium Check-in Suitcase (65 cm) 8 Wheels - Force",
            "description": "Effortless 8-Wheel Motion Glides smooth in every direction \u2014 from tight terminals to cobbled streets 360\u00b0 Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns Waterproof Inside & Out Spills, splashes, or sudden rain \u2014 you\u2019re covered Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space Feather-Light. Built Tough High-strength shell that resists scratches, pressure, and drama Smart Internal Storage Tie-down straps and compartments that make chaos look organised Telescopic Handle With Ergonomic grip with Soft Handle Built-In Combo Lock Travel with confidence thanks to the secure, integrated number lock. Your essentials stay protected, giving you complete peace of mind from check-in to check-out. Effortless 360\u00b0 Motion With 8 hub-cap spinner wheels, enjoy whisper-smooth movement in every direction. Whether you\u2019re sprinting through terminals or cruising over uneven ground, the 360\u00b0 wheel system ensures zero effort, total control.",
            "price": 75.0,
            "original_price": 95.0,
            "category": "luggage",
            "image": "/images/products/hrx-glide-cabin.png",
            "images": ["/images/products/hrx-glide-cabin.png"],
            "rating": 4.6,
            "reviews_count": 146,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Premium quality material", "Built for durability", "Stylish design", "Convenient storage"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Medium Check-in Suitcase (65 cm) 8 Wheels - Glide",
            "description": "HRX Glide Lightest Trolley Ever Whether you\u2019re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.",
            "price": 75.0,
            "original_price": 95.0,
            "category": "luggage",
            "image": "/images/products/hrx-helium-medium.png",
            "images": ["/images/products/hrx-helium-medium.png"],
            "rating": 4.9,
            "reviews_count": 89,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Effortless 8-Wheel Motion", "Glides smooth in every direction \u2014 from tight terminals to cobbled streets.", "360\u00b0 Spinner Wheels", "Ultra-responsive and whisper-quiet, built for fast moves and sharp turns."],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan  Large Check-in Suitcase (75 cm) 8 Wheels - Helium",
            "description": "Thoughtfully designed for Going Places. The HRX Helium Luggage is lightweight, compact, and engineered for life on the move \u2014 whether it\u2019s flights, train rides, or road trips.",
            "price": 95.0,
            "original_price": 120.0,
            "category": "luggage",
            "image": "/images/products/hrx-helium-large.png",
            "images": ["/images/products/hrx-helium-large.png"],
            "rating": 4.8,
            "reviews_count": 83,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Effortless 8-Wheel Motion", "Glides smooth in every direction \u2014 from tight terminals to cobbled streets.", "360\u00b0 Spinner Wheels", "Ultra-responsive and whisper-quiet, built for fast moves and sharp turns."],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan  Large Check-in Suitcase (75 cm) 8 Wheels - Kyoto",
            "description": "Thoughtfully designed for Going Places. The HRX Kyoto Luggage is lightweight, compact, and engineered for life on the move \u2014 whether it\u2019s flights, train rides, or road trips.",
            "price": 95.0,
            "original_price": 120.0,
            "category": "luggage",
            "image": "/images/products/hrx-kyoto-large.png",
            "images": ["/images/products/hrx-kyoto-large.png"],
            "rating": 4.7,
            "reviews_count": 132,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Effortless 8-Wheel Motion", "Glides smooth in every direction \u2014 from tight terminals to cobbled streets.", "360\u00b0 Spinner Wheels", "Ultra-responsive and whisper-quiet, built for fast moves and sharp turns."],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Large Check-in Suitcase (75 cm) 8 Wheels - Force",
            "description": "HRX Force Lightest Trolley Ever Whether you\u2019re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.",
            "price": 95.0,
            "original_price": 120.0,
            "category": "luggage",
            "image": "/images/products/hrx-force-large-black.png",
            "images": ["/images/products/hrx-force-large-black.png"],
            "rating": 4.5,
            "reviews_count": 160,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["360\u00b0 Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns", "Feather-Light. Built Tough High-strength shell that resists scratches, pressure, and drama", "Smart Internal Storage Tie-down straps and compartments that make chaos look organised", "Telescopic Handle With Ergonomic grip with Soft Handle"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Large Check-in Suitcase (75 cm) 8 Wheels - Glide",
            "description": "HRX Glide Lightest Trolley Ever Whether you\u2019re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.",
            "price": 95.0,
            "original_price": 120.0,
            "category": "luggage",
            "image": "https://i.ytimg.com/vi/1ur_EuANrGc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmuumJHgMeEE42kod3kws519iIOw",
            "images": ["https://i.ytimg.com/vi/1ur_EuANrGc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmuumJHgMeEE42kod3kws519iIOw", "https://img.youtube.com/vi/hvSBUF-Yt_E/0.jpg?q=90", "https://img.youtube.com/vi/Zthlp7ZLncY/0.jpg?q=90"],
            "rating": 4.5,
            "reviews_count": 170,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["360\u00b0 Spinner Wheels** Ultra-responsive and whisper-quiet, built for fast moves and sharp turns.", "Waterproof Inside & Out** Spills, splashes, or sudden rain \u2014 you\u2019re covered.", "Feather-Light. Built Tough.** High-strength shell that resists scratches, pressure, and drama.", "Smart Internal Storage** Tie-down straps and compartments that make chaos look organised."],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Hard Body Set of 2 Luggage 8 Wheels - Helium",
            "description": "Effortless 8-Wheel Motion Glides smooth in every direction \u2014 from tight terminals to cobbled streets. 360\u00b0 Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns. Waterproof Inside & Out Spills, splashes, or sudden rain \u2014 you\u2019re covered. Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space. Feather-Light. Built Tough. High-strength shell that resists scratches, pressure, and drama. Smart Internal Storage Tie-down straps and compartments that make chaos look organised. Telescopic Handle With Ergonomic grip with Soft Handle",
            "price": 130.0,
            "original_price": 160.0,
            "category": "luggage",
            "image": "/images/products/luxury-luggage-set.png",
            "images": ["/images/products/luxury-luggage-set.png"],
            "rating": 4.9,
            "reviews_count": 179,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Premium quality material", "Built for durability", "Stylish design", "Convenient storage"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Hard Body Set of 2 Luggage 8 Wheels - Kyoto",
            "description": "Thoughtfully designed for Going Places. The HRX Kyoto Value Pack Luggage is lightweight, compact, and engineered for life on the move \u2014 whether it\u2019s flights, train rides, or road trips.",
            "price": 130.0,
            "original_price": 160.0,
            "category": "luggage",
            "image": "https://i.ytimg.com/vi/1ur_EuANrGc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmuumJHgMeEE42kod3kws519iIOw",
            "images": ["https://i.ytimg.com/vi/1ur_EuANrGc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmuumJHgMeEE42kod3kws519iIOw", "https://img.youtube.com/vi/hvSBUF-Yt_E/0.jpg?q=90", "https://img.youtube.com/vi/Zthlp7ZLncY/0.jpg?q=90"],
            "rating": 4.9,
            "reviews_count": 84,
            "in_stock": True,
            "featured": True,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Effortless 8-Wheel Motion", "Glides smooth in every direction \u2014 from tight terminals to cobbled streets.", "360\u00b0 Spinner Wheels", "Ultra-responsive and whisper-quiet, built for fast moves and sharp turns."],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Hard Body Set of 2 Luggage 8 Wheels - Force",
            "description": "HRX Force Lightest Trolley Ever Whether you\u2019re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.",
            "price": 130.0,
            "original_price": 160.0,
            "category": "luggage",
            "image": "https://m.media-amazon.com/images/I/71zczLm8EsL.AC_SL1500.jpg",
            "images": ["https://m.media-amazon.com/images/I/71zczLm8EsL.AC_SL1500.jpg", "https://i.ebayimg.com/images/g/Z-wAAOSwNUJm8gex/s-l1200.jpg", "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=24408587242164388"],
            "rating": 4.6,
            "reviews_count": 111,
            "in_stock": True,
            "featured": True,
            "tags": ["luggage", "travel", "premium"],
            "details": ["360\u00b0 Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns", "Feather-Light. Built Tough High-strength shell that resists scratches, pressure, and drama", "Smart Internal Storage Tie-down straps and compartments that make chaos look organised", "Telescopic Handle With Ergonomic grip with Soft Handle"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Hard Body Set of 2 Luggage 8 Wheels - Glide",
            "description": "\u2022 Effortless 8-Wheel Motion Glides smooth in every direction \u2014 from tight terminals to cobbled streets. \u2022 360\u00b0 Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns. \u2022 Waterproof Inside & Out Spills, splashes, or sudden rain \u2014 you\u2019re covered. \u2022 Includes Wet & Dry Pouch Your sweaty gym gear or last-minute swims now have a clean, sealed space. \u2022 Feather-Light. Built Tough. High-strength shell that resists scratches, pressure, and drama. \u2022 Smart Internal Storage Tie-down straps and compartments that make chaos look organised. \u2022 Telescopic Handle With Ergonomic grip with Soft Handle",
            "price": 130.0,
            "original_price": 160.0,
            "category": "luggage",
            "image": "https://myescplan.com/cdn/shop/files/Walletguideline_0003_Layer3_1_53be75ee-d4ae-4c04-bffb-822833985164.png?v=1762767932&width=400",
            "images": ["https://myescplan.com/cdn/shop/files/Walletguideline_0003_Layer3_1_53be75ee-d4ae-4c04-bffb-822833985164.png?v=1762767932&width=400", "https://manofmany.com/wp-content/uploads/2025/11/Nomad.jpg", "https://a.1stdibscdn.com/chanel-classic-n-black-leather-cc-french-kisslock-long-wallet-for-sale-picture-9/v_18142/1679926609200/mobilejpegupload_C87A61B3915449F89E4DFA36BA2ED415_master.jpg?width=768"],
            "rating": 4.7,
            "reviews_count": 112,
            "in_stock": True,
            "featured": True,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Premium quality material", "Built for durability", "Stylish design", "Convenient storage"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Hard Body Set of 3 Luggage 8 Wheels - Kyoto",
            "description": "Thoughtfully designed for Going Places. The HRX Kyoto Value Pack Luggage is lightweight, compact, and engineered for life on the move \u2014 whether it\u2019s flights, train rides, or road trips.",
            "price": 180.0,
            "original_price": 220.0,
            "category": "luggage",
            "image": "/images/products/luxury-luggage-set.png",
            "images": ["/images/products/luxury-luggage-set.png"],
            "rating": 4.8,
            "reviews_count": 213,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["Effortless 8-Wheel Motion", "Glides smooth in every direction \u2014 from tight terminals to cobbled streets.", "360\u00b0 Spinner Wheels", "Ultra-responsive and whisper-quiet, built for fast moves and sharp turns."],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HRX by Hrithik Roshan Hard Body Set of 3 Luggage 8 Wheels - Force",
            "description": "HRX Force Lightest Trolley Ever Whether you\u2019re sprinting to catch a flight or hopping city to city, a Travel range made for movement, just like you.",
            "price": 180.0,
            "original_price": 220.0,
            "category": "luggage",
            "image": "/images/products/luxury-luggage-set.png",
            "images": ["/images/products/luxury-luggage-set.png"],
            "rating": 4.8,
            "reviews_count": 93,
            "in_stock": True,
            "featured": False,
            "tags": ["luggage", "travel", "premium"],
            "details": ["360\u00b0 Spinner Wheels Ultra-responsive and whisper-quiet, built for fast moves and sharp turns", "Feather-Light. Built Tough High-strength shell that resists scratches, pressure, and drama", "Smart Internal Storage Tie-down straps and compartments that make chaos look organised", "Telescopic Handle With Ergonomic grip with Soft Handle"],
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Urban Commuter Pro",
            "description": "The ultimate daily companion for city life. Featuring a sleek, minimalist design with a water-resistant shell and dedicated laptop protection.",
            "price": 49.99,
            "original_price": 65.00,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"],
            "rating": 4.7,
            "reviews_count": 128,
            "in_stock": True,
            "featured": False,
            "tags": ["backpack", "urban", "commuter"],
            "details": ["Water-resistant fabric", "15.6-inch laptop compartment", "Ergonomic shoulder straps", "Anti-theft pockets"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Explorer Camera Pack",
            "description": "A rugged backpack designed specifically for photographers. Padded, customizable dividers protect your gear while you explore the great outdoors.",
            "price": 89.99,
            "original_price": 120.00,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"],
            "rating": 4.9,
            "reviews_count": 45,
            "in_stock": True,
            "featured": True,
            "tags": ["backpack", "camera", "outdoor"],
            "details": ["Padded gear dividers", "Tripod attachment system", "Rain cover included", "Quick-access side panels"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Canvas Travel Rucksack",
            "description": "Classic aesthetics meet modern durability. This heavy-duty canvas rucksack is built to last through every adventure.",
            "price": 39.99,
            "original_price": 55.00,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80"],
            "rating": 4.5,
            "reviews_count": 210,
            "in_stock": True,
            "featured": False,
            "tags": ["backpack", "canvas", "vintage"],
            "details": ["Heavy-duty cotton canvas", "Genuine leather straps", "Spacious main compartment", "Reinforced stitching"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Digital Nomad Backpack",
            "description": "Focused on organization and protection. Safely carry your tech essentials with dedicated compartments for tablets, phones, and accessories.",
            "price": 59.99,
            "original_price": 79.00,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1592388748465-8c4dca8dd703?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1592388748465-8c4dca8dd703?w=800&q=80"],
            "rating": 4.8,
            "reviews_count": 89,
            "in_stock": True,
            "featured": False,
            "tags": ["backpack", "tech", "laptop"],
            "details": ["External USB port", "Card RFID protection", "Padded tech sleeves", "Breathable back padding"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Summit Hiking Bag",
            "description": "Engineered for excellence on the trail. Lightweight and breathable with multiple attachment points for your hiking gear.",
            "price": 79.99,
            "original_price": 110.00,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&q=80"],
            "rating": 4.7,
            "reviews_count": 64,
            "in_stock": True,
            "featured": True,
            "tags": ["backpack", "hiking", "adventure"],
            "details": ["Hydration bladder ready", "Adjustable waist belt", "Shock-absorbent straps", "Durable ripstop fabric"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Premium Leather Rucksack",
            "description": "The pinnacle of luxury travel. Handcrafted from premium Top-grain leather, this rucksack only gets better with age.",
            "price": 129.99,
            "original_price": 165.00,
            "category": "backpacks",
            "image": "https://plus.unsplash.com/premium_photo-1723649902804-bcc38f589f03?w=800&q=80",
            "images": ["https://plus.unsplash.com/premium_photo-1723649902804-bcc38f589f03?w=800&q=80"],
            "rating": 5.0,
            "reviews_count": 12,
            "in_stock": True,
            "featured": True,
            "tags": ["backpack", "leather", "premium"],
            "details": ["Full-grain leather construction", "Solid brass buckles", "Hand-stitched accents", "Large interior volume"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Peak Performance Pack",
            "description": "Designed for those who push boundaries. A lightweight travel pack that won't hold you back on your next mountain expedition.",
            "price": 69.99,
            "original_price": 89.00,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&q=80"],
            "rating": 4.6,
            "reviews_count": 55,
            "in_stock": True,
            "featured": False,
            "tags": ["backpack", "lightweight", "登山"],
            "details": ["Aerodynamic shape", "Integrated rain cover", "Breathable mesh supports", "Dual bottle holders"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Vagabond Roller Bag",
            "description": "Switch from backpack to trolley mode seamlessly. Ideal for travelers navigating airports and busy city streets.",
            "price": 99.99,
            "original_price": 135.00,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1555337159-d399aaa99955?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1555337159-d399aaa99955?w=800&q=80"],
            "rating": 4.5,
            "reviews_count": 38,
            "in_stock": True,
            "featured": False,
            "tags": ["backpack", "roller", "carry-on"],
            "details": ["All-terrain wheels", "Hideaway shoulder straps", "Lockable zippers", "Sturdy telescopic handle"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Adventure Combo Offer (2-in-1)",
            "description": "The perfect duo for the frequent flyer. Includes a high-capacity adventure backpack and a compact essentials duffle bag.",
            "price": 149.99,
            "original_price": 210.00,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1673505705676-1cdb1db2273f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1673505705676-1cdb1db2273f?w=800&q=80"],
            "rating": 4.9,
            "reviews_count": 27,
            "in_stock": True,
            "featured": True,
            "tags": ["backpack", "combo", "travel-set"],
            "details": ["Backpack + Duffle set", "Premium cordura fabric", "Multiple carry options", "Limited edition bundle"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Metropolis Backpack",
            "description": "Sleek and professional. The Metropolis is designed to fit your office gear and after-work essentials in one organized place.",
            "price": 45.99,
            "original_price": 60.00,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1628381882111-9b5030d16ea6?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1628381882111-9b5030d16ea6?w=800&q=80"],
            "rating": 4.4,
            "reviews_count": 76,
            "in_stock": True,
            "featured": False,
            "tags": ["backpack", "office", "urban"],
            "details": ["Slim profile design", "Hidden back pocket", "Key holder attachment", "Smooth luxury zippers"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Nomad Lite Daypack",
            "description": "The ultimate lightweight pack for short travel ventures. Foldable design makes it easy to pack inside your larger luggage.",
            "price": 34.99,
            "original_price": 45.00,
            "category": "backpacks",
            "image": "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=800&q=80"],
            "rating": 4.3,
            "reviews_count": 145,
            "in_stock": True,
            "featured": False,
            "tags": ["backpack", "lightweight", "travel"],
            "details": ["Ultra-lightweight fabric", "Packs into its own pouch", "Versatile storage", "Breathable straps"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Royal Sapphire Gold Earrings",
            "description": "Exquisite 18K gold earrings featuring deep blue sapphire gemstones. A perfect touch of luxury for elite travel gala nights.",
            "price": 299.00,
            "original_price": 450.00,
            "category": "accessories",
            "image": "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80"],
            "rating": 5.0,
            "reviews_count": 42,
            "in_stock": True,
            "featured": True,
            "tags": ["jewelry", "luxury", "gold"],
            "details": ["18K Yellow Gold", "Natural Blue Sapphires", "Elegant gift box included", "Certified authenticity"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Chronos Classic Wristwatch",
            "description": "A timeless analog piece for the modern traveler. Features a genuine leather strap and scratch-resistant sapphire glass.",
            "price": 149.00,
            "original_price": 195.00,
            "category": "accessories",
            "image": "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg",
            "images": ["https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg"],
            "rating": 4.8,
            "reviews_count": 156,
            "in_stock": True,
            "featured": False,
            "tags": ["watch", "leather", "classic"],
            "details": ["Japanese quartz movement", "5ATM water resistance", "Genuine Italian leather", "Stainless steel casing"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Urban Edge Leather Handbag",
            "description": "Stay stylish on the city streets. This compact leather handbag offers enough space for your essentials without the bulk.",
            "price": 89.00,
            "original_price": 120.00,
            "category": "accessories",
            "image": "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
            "images": ["https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"],
            "rating": 4.7,
            "reviews_count": 94,
            "in_stock": True,
            "featured": False,
            "tags": ["fashion", "leather", "streetwear"],
            "details": ["Premium pebbled leather", "Adjustable shoulder strap", "Hidden interior pocket", "Magnetic clasp closure"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Aura Retro Mirrorless Camera",
            "description": "Capture the world in stunning detail. A modern digital camera with a classic vintage aesthetic.",
            "price": 850.00,
            "original_price": 999.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2017/08/06/16/01/camera-2593685_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2017/08/06/16/01/camera-2593685_1280.jpg"],
            "rating": 4.9,
            "reviews_count": 210,
            "in_stock": True,
            "featured": True,
            "tags": ["camera", "photography", "retro"],
            "details": ["24.2MP APS-C sensor", "4K video recording", "Retro tactile dials", "Interchangeable lens mount"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Stargazer Travel Binoculars",
            "description": "Get closer to nature with crystal clear optics. Lightweight and compact for the adventurous spirit.",
            "price": 120.00,
            "original_price": 160.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2014/03/10/11/27/periscope-284421_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2014/03/10/11/27/periscope-284421_1280.jpg"],
            "rating": 4.6,
            "reviews_count": 68,
            "in_stock": True,
            "featured": False,
            "tags": ["hiking", "outdoor", "optics"],
            "details": ["10x42 magnification", "Fully multi-coated lenses", "Nitrogen purged waterproof", "Roof prism design"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Heritage Leather Duffle Bag",
            "description": "The ultimate weekender. Handcrafted from top-grain leather to withstand your most rigorous adventures.",
            "price": 195.00,
            "original_price": 275.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2015/06/18/17/17/bag-813915_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2015/06/18/17/17/bag-813915_1280.jpg"],
            "rating": 4.9,
            "reviews_count": 128,
            "in_stock": True,
            "featured": True,
            "tags": ["travel", "leather", "luggage"],
            "details": ["Top-grain bovine leather", "Spacious 45L capacity", "Reinforced brass hardware", "Includes padded luggage tag"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Nomad Aviator Sunglasses",
            "description": "Timeless design for the high-flyer. Polarized lenses protect your eyes while maintaining 100% style.",
            "price": 135.00,
            "original_price": 180.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2017/08/06/19/33/eyewear-2595549_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2017/08/06/19/33/eyewear-2595549_1280.jpg"],
            "rating": 4.7,
            "reviews_count": 215,
            "in_stock": True,
            "featured": False,
            "tags": ["fashion", "eyewear", "summer"],
            "details": ["TAC Polarized lenses", "Lightweight titanium frame", "100% UVA/UVB protection", "Anti-reflective coating"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Pro-Focus 50mm Prime Lens",
            "description": "The perfect companion for portraits. Sharp, fast, and lightweight for travel photography enthusiasts.",
            "price": 350.00,
            "original_price": 425.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2018/04/06/20/39/lens-3296845_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2018/04/06/20/39/lens-3296845_1280.jpg"],
            "rating": 4.9,
            "reviews_count": 142,
            "in_stock": True,
            "featured": False,
            "tags": ["photography", "camera", "lens"],
            "details": ["f/1.8 maximum aperture", "Silent autofocus motor", "Nano-crystal coating", "Weather-sealed mount"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Ultra-Wide Horizon Lens",
            "description": "Capture the epic scale of landscapes. Engineered for distortion-free wide-angle travel shots.",
            "price": 550.00,
            "original_price": 650.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2018/04/06/20/44/lens-3296866_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2018/04/06/20/44/lens-3296866_1280.jpg"],
            "rating": 4.8,
            "reviews_count": 86,
            "in_stock": True,
            "featured": False,
            "tags": ["photography", "camera", "lens"],
            "details": ["14mm focal length", "Aspherical glass elements", "Professional flare control", "Durable alloy barrel"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Island Breeze Beach Set",
            "description": "Everything you need for a day under the sun. High-quality straw hat and matching summer essentials.",
            "price": 45.00,
            "original_price": 65.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2021/11/15/06/53/summer-background-6796857_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2021/11/15/06/53/summer-background-6796857_1280.jpg"],
            "rating": 4.5,
            "reviews_count": 73,
            "in_stock": True,
            "featured": False,
            "tags": ["beach", "summer", "fashion"],
            "details": ["Hand-woven natural straw", "UV resistant wide brim", "Includes beach mat", "Floral accent band"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "SwiftShot Compact Camera",
            "description": "Never miss a moment. A powerful compact camera that fits in your pocket and delivers pro results.",
            "price": 320.00,
            "original_price": 399.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2016/05/28/19/20/camera-1421999_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo-2016/05/28/19/20/camera-1421999_1280.jpg"],
            "rating": 4.6,
            "reviews_count": 104,
            "in_stock": True,
            "featured": False,
            "tags": ["camera", "electronics", "vlogging"],
            "details": ["20.1MP 1-inch sensor", "Fast f/1.8-2.8 lens", "Flipping touchscreen", "High-speed burst mode"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Elegance Silk Travel Scarf",
            "description": "Soft, versatile, and beautiful. Add a layer of sophistication to your travel outfit with this hand-finished silk scarf.",
            "price": 55.00,
            "original_price": 75.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2017/05/05/19/09/model-2288068_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2017/05/05/19/09/model-2288068_1280.jpg"],
            "rating": 4.9,
            "reviews_count": 52,
            "in_stock": True,
            "featured": False,
            "tags": ["fashion", "silk", "luxury"],
            "details": ["100% Mulberry silk", "Hand-rolled edges", "Breathable for all climates", "Unique artisanal print"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Gilded Minimalist Bracelet",
            "description": "Luxury in simplicity. A 24K gold-plated bracelet designed to be worn on every journey.",
            "price": 75.00,
            "original_price": 110.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2017/12/06/20/23/accessory-3002608_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2017/12/06/20/23/accessory-3002608_1280.jpg"],
            "rating": 4.8,
            "reviews_count": 81,
            "in_stock": True,
            "featured": False,
            "tags": ["jewelry", "gold", "minimalist"],
            "details": ["24K Gold plating", "Surgical grade steel base", "Adjustable secure clasp", "Tarnish-resistant coating"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Sonic Hub Wireless Headset",
            "description": "Your private concert hall on the go. Crystal clear audio with advanced range and battery life.",
            "price": 125.00,
            "original_price": 175.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2017/01/11/10/25/headsets-1971383_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2017/01/11/10/25/headsets-1971383_1280.jpg"],
            "rating": 4.7,
            "reviews_count": 168,
            "in_stock": True,
            "featured": False,
            "tags": ["electronics", "audio", "wireless"],
            "details": ["Bluetooth 5.2 technology", "20-hour battery life", "Built-in dual microphones", "Ergonomic ear loops"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "AudioPure Hi-Fi Headphones",
            "description": "For the audiophile traveler. Over-ear design with powerful drivers for deep bass and crisp highs.",
            "price": 199.00,
            "original_price": 250.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_1280.jpg"],
            "rating": 4.9,
            "reviews_count": 242,
            "in_stock": True,
            "featured": True,
            "tags": ["audio", "music", "luxury"],
            "details": ["40mm neodymium drivers", "Foldable travel design", "Premium protein leather pads", "Detachable braided cable"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Elite Midnight Wristwatch",
            "description": "Bold, black, and beautiful. A high-precision timepiece that commands attention in any time zone.",
            "price": 185.00,
            "original_price": 240.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2018/01/18/19/06/time-3091031_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2018/01/18/19/06/time-3091031_1280.jpg"],
            "rating": 4.8,
            "reviews_count": 115,
            "in_stock": True,
            "featured": False,
            "tags": ["watch", "executive", "style"],
            "details": ["Matte black finish", "Swiss movement precision", "Luminous hands", "Stainless steel mesh band"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Diamond Solitaire Pendant",
            "description": "The peak of luxury adornment. A stunning diamond pendant that captures light and hearts alike.",
            "price": 499.00,
            "original_price": 750.00,
            "category": "accessories",
            "image": "https://cdn.pixabay.com/photo/2022/08/16/04/52/jewel-7389356_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2022/08/16/04/52/jewel-7389356_1280.jpg"],
            "rating": 5.0,
            "reviews_count": 29,
            "in_stock": True,
            "featured": True,
            "tags": ["jewelry", "diamond", "luxury"],
            "details": ["0.5 Carat VVS1 Diamond", "14K White Gold Chain", "Laser-engraved serial number", "Insured international shipping"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "GlowKit Travel Makeup Set",
            "description": "Professional-grade travel makeup kit for the modern explorer. Includes all essentials in a compact, travel-friendly case designed for durability.",
            "price": 45.00,
            "original_price": 60.00,
            "category": "comfort",
            "image": "https://cdn.pixabay.com/photo/2021/10/10/21/52/makeup-6698881_1280.jpg",
            "images": ["https://cdn.pixabay.com/photo/2021/10/10/21/52/makeup-6698881_1280.jpg"],
            "rating": 4.7,
            "reviews_count": 88,
            "in_stock": True,
            "featured": False,
            "tags": ["comfort", "beauty", "travel-essentials"],
            "details": ["Compact travel case", "Professional brushes included", "Shatter-proof mirror", "Approved for carry-on"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Serene Cotton Travel Tee",
            "description": "Ultra-soft cotton t-shirt designed for long hours of travel comfort. Breathable fabric that keeps you fresh from departure to arrival.",
            "price": 35.00,
            "original_price": 45.00,
            "category": "comfort",
            "image": "https://cdn.shopify.com/s/files/1/0287/7787/3467/files/HN_S24_0727optimised_9a798ec7-fe61-4ae5-9277-415439c95104_540x.jpg?v=1738050777",
            "images": ["https://cdn.shopify.com/s/files/1/0287/7787/3467/files/HN_S24_0727optimised_9a798ec7-fe61-4ae5-9277-415439c95104_540x.jpg?v=1738050777"],
            "rating": 4.8,
            "reviews_count": 124,
            "in_stock": True,
            "featured": False,
            "tags": ["comfort", "apparel", "unisex"],
            "details": ["100% Organic Cotton", "Tagless design", "Moisture-wicking", "Wrinkle-resistant fabric"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Luxe Knit Cardigan",
            "description": "Stay warm and stylish during cold flights with this breathable knit cardigan. Perfect for layering in transitioning climates.",
            "price": 65.00,
            "original_price": 85.00,
            "category": "comfort",
            "image": "https://cdn.shopify.com/s/files/1/0287/7787/3467/files/HN_S24_1047optimised_540x.jpg?v=1741718235",
            "images": ["https://cdn.shopify.com/s/files/1/0287/7787/3467/files/HN_S24_1047optimised_540x.jpg?v=1741718235"],
            "rating": 4.9,
            "reviews_count": 56,
            "in_stock": True,
            "featured": True,
            "tags": ["comfort", "winter", "luxury"],
            "details": ["Soft wool blend", "Easy-access pockets", "Relaxed fit", "Hypoallergenic material"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "CloudWalk Cushioned Socks",
            "description": "Engineered for long-haul flights with extra cushioning for maximum comfort. Prevents fatigue and keeps feet happy.",
            "price": 15.00,
            "original_price": 20.00,
            "category": "comfort",
            "image": "https://cdn.shopify.com/s/files/1/0287/7787/3467/files/HN_S24_4244optimised_540x.jpg?v=1736852865",
            "images": ["https://cdn.shopify.com/s/files/1/0287/7787/3467/files/HN_S24_4244optimised_540x.jpg?v=1736852865"],
            "rating": 4.6,
            "reviews_count": 210,
            "in_stock": True,
            "featured": False,
            "tags": ["comfort", "essentials", "socks"],
            "details": ["Reinforced heel & toe", "Arch support", "Breathable mesh", "Anti-odor technology"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Velvet Comfort Travel Wrap",
            "description": "A versatile velvet wrap that doubles as a blanket for ultimate on-the-go cozy vibes. Lightweight enough to carry in your handbag.",
            "price": 40.00,
            "original_price": 55.00,
            "category": "comfort",
            "image": "https://cdn.shopify.com/s/files/1/0287/7787/3467/files/Artboard30_540x.jpg?v=1764409726",
            "images": ["https://cdn.shopify.com/s/files/1/0287/7787/3467/files/Artboard30_540x.jpg?v=1764409726"],
            "rating": 4.8,
            "reviews_count": 92,
            "in_stock": True,
            "featured": False,
            "tags": ["comfort", "travel-wrap", "lounge"],
            "details": ["Ultra-soft velvet touch", "Multi-wear design", "Machine washable", "Includes travel pouch"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "ZenBalance Yoga Pants",
            "description": "Stretchable and breathable pants, perfect for staying comfortable during long airport layovers or active sightseeing.",
            "price": 55.00,
            "original_price": 75.00,
            "category": "comfort",
            "image": "https://cdn.shopify.com/s/files/1/0287/7787/3467/files/Artboard21_540x.jpg?v=1764409888",
            "images": ["https://cdn.shopify.com/s/files/1/0287/7787/3467/files/Artboard21_540x.jpg?v=1764409888"],
            "rating": 4.7,
            "reviews_count": 145,
            "in_stock": True,
            "featured": False,
            "tags": ["comfort", "fitness", "activewear"],
            "details": ["4-way stretch fabric", "High waistband", "Hidden phone pocket", "Squat-proof"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "SoftTouch Eye Mask & Earplug Set",
            "description": "Ensure deep sleep anywhere with our premium silk-feel eye mask and noise-canceling earplugs. Total blackout guaranteed.",
            "price": 25.00,
            "original_price": 35.00,
            "category": "comfort",
            "image": "https://cdn.shopify.com/s/files/1/0287/7787/3467/files/3.1_540x.jpg?v=1741428436",
            "images": ["https://cdn.shopify.com/s/files/1/0287/7787/3467/files/3.1_540x.jpg?v=1741428436"],
            "rating": 4.9,
            "reviews_count": 182,
            "in_stock": True,
            "featured": True,
            "tags": ["comfort", "sleep", "wellness"],
            "details": ["100% Silk lining", "Adjustable strap", "High-fidelity earplugs", "Sanitary carry case"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Voyager Fleece Hoodie",
            "description": "Heavyweight fleece hoodie with multiple hidden pockets for your travel essentials. Cozy comfort meets ultimate utility.",
            "price": 75.00,
            "original_price": 100.00,
            "category": "comfort",
            "image": "https://cdn.shopify.com/s/files/1/0287/7787/3467/files/Artboard11_c8349e94-92c4-4fbe-8164-0d9eca459bce_540x.jpg?v=1748080063",
            "images": ["https://cdn.shopify.com/s/files/1/0287/7787/3467/files/Artboard11_c8349e94-92c4-4fbe-8164-0d9eca459bce_540x.jpg?v=1748080063"],
            "rating": 4.8,
            "reviews_count": 67,
            "in_stock": True,
            "featured": False,
            "tags": ["comfort", "winter", "utility"],
            "details": ["Heat-retention fleece", "Hidden passport pocket", "Thumbhole sleeves", "Oversized hood"]
        },
        {
            "id": str(uuid.uuid4()),
            "name": "PureRelax Inflatable Neck Pillow",
            "description": "Next-generation ergonomic design providing 360-degree support for peaceful rest. Inflatate/deflate in seconds.",
            "price": 30.00,
            "original_price": 40.00,
            "category": "comfort",
            "image": "https://cdn.shopify.com/s/files/1/0287/7787/3467/files/4_7e4e135a-6841-4ed5-b342-88a6ec7baf76_540x.jpg?v=1742634906",
            "images": ["https://cdn.shopify.com/s/files/1/0287/7787/3467/files/4_7e4e135a-6841-4ed5-b342-88a6ec7baf76_540x.jpg?v=1742634906"],
            "rating": 4.6,
            "reviews_count": 312,
            "in_stock": True,
            "featured": False,
            "tags": ["comfort", "flight", "pillow"],
            "details": ["Adjustable firmness", "Washable cover", "Compact storage", "H-shape design"]
        },
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

@app.get("/")
async def health():
    return {"status": "online", "message": "Wanderlust & Co. API is operational"}

# Basic Routes

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled Error: {str(exc)}", exc_info=True)
    origin = request.headers.get("origin")
    response = JSONResponse(
        status_code=500,
        content={
            "message": "Internal Server Error", 
            "detail": str(exc),
            "type": type(exc).__name__,
            "path": request.url.path
        },
    )
    if origin:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    origin = request.headers.get("origin")
    response = JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )
    if origin:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
    return response


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
