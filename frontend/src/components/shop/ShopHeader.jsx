import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, LogOut, Plane, Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ShopHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'All Products', href: '/shop' },
    { label: 'Luggage', href: '/shop/category/luggage' },
    { label: 'Backpacks', href: '/shop/category/backpacks' },
    { label: 'Accessories', href: '/shop/category/accessories' },
    { label: 'Comfort', href: '/shop/category/comfort' },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-gradient-to-b from-black/50 to-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
              isScrolled ? 'bg-amber-100' : 'bg-white/20'
            )}>
              <span className={cn(
                'font-serif text-lg font-medium',
                isScrolled ? 'text-amber-800' : 'text-white'
              )}>W&C</span>
            </div>
            <span className={cn(
              'hidden sm:block text-lg font-medium tracking-wide transition-colors',
              isScrolled ? 'text-gray-900' : 'text-white'
            )}>Travel Gear</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-all duration-300 relative py-1',
                  isScrolled
                    ? 'text-gray-700 hover:text-amber-600'
                    : 'text-white/90 hover:text-white',
                  location.pathname === item.href && 'text-amber-600'
                )}
              >
                {item.label}
                {location.pathname === item.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Travel Link */}
            <Link
              to="/travel"
              className={cn(
                'hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                isScrolled
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : 'bg-white/20 text-white hover:bg-white/30'
              )}
            >
              <Plane className="w-4 h-4" />
              Travel
            </Link>

            {/* Search */}
            <button
              className={cn(
                'p-2 rounded-full transition-colors',
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              )}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              className={cn(
                'p-2 rounded-full transition-colors hidden sm:flex',
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              )}
            >
              <Heart className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link
              to="/shop/cart"
              className={cn(
                'p-2 rounded-full transition-colors relative',
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.item_count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {cart.item_count}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                  )}
                >
                  <User className="w-5 h-5" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-xl py-2 min-w-[200px] z-50 border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/my-bookings"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Bookings & Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={cn(
                  'hidden sm:flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  isScrolled
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                )}
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-full transition-colors',
                isScrolled ? 'text-gray-700' : 'text-white'
              )}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-[60px] bg-white shadow-lg transition-all duration-300 overflow-hidden',
          mobileMenuOpen ? 'max-h-[calc(100vh-60px)] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block py-3 px-4 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors',
                location.pathname === item.href && 'bg-amber-50 text-amber-700 font-medium'
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-gray-100">
            <Link
              to="/travel"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-3 px-4 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <Plane className="w-5 h-5" />
              Explore Travel
            </Link>
          </div>
          {!isAuthenticated && (
            <div className="pt-2 mt-2 border-t border-gray-100 flex gap-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-3 bg-amber-600 text-white rounded-lg font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-3 border-2 border-amber-600 text-amber-600 rounded-lg font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default ShopHeader;
