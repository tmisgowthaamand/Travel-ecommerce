import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Pages
import SplitLandingPage from "./pages/SplitLandingPage";
import AuthPage from "./pages/AuthPage";
import TravelHomePage from "./pages/TravelHomePage";
import DestinationsPage from "./pages/DestinationsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import RentalsPage from "./pages/RentalsPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";

// Shop Pages
import ShopHomePage from "./pages/ShopHomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";

// Combined Views
import MyBookingsPage from "./pages/MyBookingsPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Toaster position="top-right" richColors />
          <BrowserRouter>
            <Routes>
              {/* Split Landing */}
              <Route path="/" element={<SplitLandingPage />} />
              
              {/* Auth */}
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/register" element={<AuthPage mode="register" />} />
              
              {/* Travel Section */}
              <Route path="/travel" element={<TravelHomePage />} />
              <Route path="/travel/destinations" element={<DestinationsPage />} />
              <Route path="/travel/destinations/:destination" element={<DestinationsPage />} />
              <Route path="/travel/experiences" element={<ExperiencesPage />} />
              <Route path="/travel/experiences/:category" element={<ExperiencesPage />} />
              <Route path="/travel/rentals" element={<RentalsPage />} />
              <Route path="/travel/rentals/:id" element={<RentalsPage />} />
              <Route path="/travel/about" element={<AboutPage />} />
              <Route path="/travel/blog" element={<BlogPage />} />
              <Route path="/travel/blog/:id" element={<BlogPage />} />
              <Route path="/travel/contact" element={<ContactPage />} />
              <Route path="/travel/book" element={<BookingPage />} />
              
              {/* Legacy Travel Routes (redirect compatibility) */}
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/rentals" element={<RentalsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Shop Section */}
              <Route path="/shop" element={<ShopHomePage />} />
              <Route path="/shop/category/:category" element={<CategoryPage />} />
              <Route path="/shop/product/:productId" element={<ProductDetailPage />} />
              <Route path="/shop/cart" element={<CartPage />} />
              
              {/* Combined Views */}
              <Route path="/my-bookings" element={<MyBookingsPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
