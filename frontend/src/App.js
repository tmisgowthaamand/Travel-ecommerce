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
import ExperienceDetailPage from "./pages/ExperienceDetailPage";
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
import SearchPage from "./pages/SearchPage";

// Combined Views
import MyBookingsPage from "./pages/MyBookingsPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";

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
              <Route path="/forgot-password" element={<AuthPage mode="forgot" />} />
              <Route path="/reset-password" element={<AuthPage mode="reset" />} />



              {/* Travel Section - Protected */}
              <Route path="/travel" element={
                <ProtectedRoute>
                  <TravelHomePage />
                </ProtectedRoute>
              } />
              <Route path="/travel/destinations" element={
                <ProtectedRoute>
                  <DestinationsPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/destinations/:destination" element={
                <ProtectedRoute>
                  <DestinationsPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/experiences" element={
                <ProtectedRoute>
                  <ExperiencesPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/experiences/:category" element={
                <ProtectedRoute>
                  <ExperiencesPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/experience/:id" element={
                <ProtectedRoute>
                  <ExperienceDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/rentals" element={
                <ProtectedRoute>
                  <RentalsPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/rentals/:id" element={
                <ProtectedRoute>
                  <RentalsPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/about" element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/blog" element={
                <ProtectedRoute>
                  <BlogPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/blog/:id" element={
                <ProtectedRoute>
                  <BlogPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/contact" element={
                <ProtectedRoute>
                  <ContactPage />
                </ProtectedRoute>
              } />
              <Route path="/travel/book" element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } />

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
              <Route path="/shop/search" element={<SearchPage />} />

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
