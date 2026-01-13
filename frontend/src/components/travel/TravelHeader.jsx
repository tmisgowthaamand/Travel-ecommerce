import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Menu, X, ChevronDown, ShoppingBag, User, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const TravelHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      label: 'EXPERIENCES', 
      href: '/travel/experiences',
      dropdown: ['Culinary Journeys', 'Golf Escapes', 'Wellness Retreats', 'Heritage Tours', 'Castle Stays', 'Adventure Expeditions']
    },
    { 
      label: 'DESTINATIONS', 
      href: '/travel/destinations',
      dropdown: ['Ireland', 'Scotland', 'England', 'Africa']
    },
    { label: 'RENTALS', href: '/travel/rentals' },
    { label: 'ABOUT', href: '/travel/about' },
    { label: 'BLOG', href: '/travel/blog' },
    { label: 'CONTACT', href: '/travel/contact' },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className={cn(
              'font-serif text-2xl md:text-3xl tracking-wide transition-colors duration-300',
              isScrolled ? 'text-emerald-800' : 'text-white'
            )}>
              <span className="font-light">W</span>
              <span className="text-xl md:text-2xl">&</span>
              <span className="font-light">C</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    'text-xs tracking-[0.2em] font-medium transition-all duration-300 flex items-center gap-1 py-2',
                    isScrolled
                      ? 'text-emerald-800 hover:text-emerald-600'
                      : 'text-white/90 hover:text-white',
                    location.pathname === item.href && 'border-b border-current'
                  )}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-3 h-3" />}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 opacity-100 transition-all duration-300">
                    <div className="bg-white shadow-xl rounded-lg py-3 min-w-[200px]">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem}
                          to={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-5 py-2 text-xs tracking-wider text-emerald-800 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Shop Link */}
            <Link
              to="/shop"
              className={cn(
                'hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider font-medium transition-all duration-300',
                isScrolled
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  : 'bg-white/20 text-white hover:bg-white/30'
              )}
            >
              <ShoppingBag className="w-4 h-4" />
              SHOP
            </Link>

            <button
              className={cn(
                'p-2 transition-colors duration-300',
                isScrolled ? 'text-emerald-800 hover:text-emerald-600' : 'text-white/90 hover:text-white'
              )}
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Link
              to="/shop/cart"
              className={cn(
                'p-2 transition-colors duration-300 relative',
                isScrolled ? 'text-emerald-800 hover:text-emerald-600' : 'text-white/90 hover:text-white'
              )}
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.item_count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] rounded-full flex items-center justify-center">
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
                    'p-2 transition-colors duration-300 flex items-center gap-2',
                    isScrolled ? 'text-emerald-800 hover:text-emerald-600' : 'text-white/90 hover:text-white'
                  )}
                >
                  <User className="w-5 h-5" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-lg py-2 min-w-[180px] z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/my-bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Bookings & Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
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
                  'hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider font-medium transition-all duration-300',
                  isScrolled
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-white/20 text-white hover:bg-white/30'
                )}
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors duration-300',
                isScrolled ? 'text-emerald-800' : 'text-white'
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
          'lg:hidden fixed inset-0 top-16 bg-white z-40 transition-transform duration-500',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="p-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm tracking-[0.2em] text-emerald-800 hover:text-emerald-600 transition-colors py-2"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm tracking-[0.2em] text-amber-800 hover:text-amber-600 transition-colors py-2"
            >
              SHOP TRAVEL GEAR
            </Link>
          </div>
          {!isAuthenticated && (
            <div className="pt-4 border-t border-gray-200 flex gap-4">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-3 bg-emerald-600 text-white rounded-lg text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-3 border border-emerald-600 text-emerald-600 rounded-lg text-sm font-medium"
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

export default TravelHeader;
