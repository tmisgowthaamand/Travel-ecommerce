import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Menu, X, ChevronDown, ShoppingBag, User, LogOut, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { destinations, experiences, privateRentals } from '../../data/mockData';

const TravelHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

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

  // Search Logic
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();

      const destinationResults = destinations
        .filter(d => d.name.toLowerCase().includes(query) || d.description.toLowerCase().includes(query))
        .map(d => ({
          ...d,
          type: 'destination',
          link: `/travel/destinations/${d.name.toLowerCase()}`,
          subtitle: d.subtitle
        }));

      const experienceResults = experiences
        .filter(e => e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query))
        .map(e => ({
          ...e,
          type: 'experience',
          link: `/travel/experience/${e.id}`, // Fixed link to specific experience detail
          subtitle: e.category
        }));

      const rentalResults = privateRentals
        .filter(r => r.name.toLowerCase().includes(query) || r.location.toLowerCase().includes(query))
        .map(r => ({
          ...r,
          type: 'rental',
          link: `/travel/rentals/${r.id}`,
          subtitle: r.location
        }));

      const blogResults = import('../../data/mockData').then(module => {
        // Dynamic import workaround if mockData wasn't fully loaded or just using the imported instance
        // But since we import at top, we can use the top level import.
        // Let's use the one imported at the top:
        return (module.blogPosts || []).filter(p => p.title.toLowerCase().includes(query) || p.excerpt.toLowerCase().includes(query))
          .map(p => ({
            ...p,
            type: 'journal',
            link: `/travel/blog/${p.id}`,
            subtitle: p.date,
            name: p.title // Normalize title key
          }));
      });

      // Since blogPosts might be async if we strictly followed that pattern, but here it's sync. 
      // We need to import blogPosts at the top first.
      // Let's assume blogPosts is imported. We need to add it to the import statement first.

      // Merging:
      const blogMatches = (require('../../data/mockData').blogPosts || [])
        .filter(p => p.title.toLowerCase().includes(query))
        .map(p => ({
          ...p,
          type: 'journal',
          link: `/travel/blog/${p.id}`,
          subtitle: p.date,
          name: p.title
        }));

      const results = [
        ...destinationResults,
        ...experienceResults,
        ...rentalResults,
        ...blogMatches
      ].slice(0, 6); // Increased limit slightly

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
        isScrolled || searchOpen
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.05)] py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/travel" className="flex-shrink-0 group">
            <h1 className={cn(
              'font-serif text-2xl md:text-3xl tracking-tighter transition-all duration-500 flex items-baseline gap-1',
              isScrolled || searchOpen ? 'text-[#1A1A1A]' : 'text-white'
            )}>
              <span className="font-light italic group-hover:text-[#C9A87C] transition-colors">Wanderlust</span>
              <span className="text-[#C9A87C]">&</span>
              <span className="font-light group-hover:text-[#C9A87C] transition-colors">Co.</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          {!searchOpen && (
            <nav className="hidden lg:flex items-center gap-12">
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
                      'text-[10px] tracking-[0.4em] font-black transition-all duration-300 flex items-center gap-2 py-2',
                      isScrolled
                        ? 'text-[#1A1A1A] hover:text-[#C9A87C]'
                        : 'text-white/80 hover:text-white',
                      location.pathname === item.href && 'text-[#C9A87C]'
                    )}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", activeDropdown === item.label && "rotate-180")} />}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-4 animate-fade-in">
                      <div className="bg-[#1A1A1A] shadow-2xl py-6 min-w-[280px] border-t-2 border-[#C9A87C]">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem}
                            to={subItem === 'Culinary Journeys' ? '/travel/experiences' : `${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-8 py-3 text-[10px] tracking-[0.2em] font-bold text-white/70 hover:text-[#C9A87C] hover:pl-10 transition-all duration-300 uppercase"
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
          )}

          {/* Search Input Expanded */}
          {searchOpen && (
            <div className="flex-1 max-w-2xl mx-12 animate-fade-in">
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH FOR DESTINATIONS, EXPERIENCES, OR ESTATES..."
                  className="w-full bg-transparent border-b border-[#1A1A1A]/10 py-2 text-[10px] tracking-[0.2em] font-black focus:outline-none focus:border-[#C9A87C]"
                />

                {/* Search Results Dropdown */}
                {searchResults.length > 0 ? (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-2xl mt-4 p-6 border border-gray-100 z-50">
                    <p className="text-[9px] tracking-[0.3em] text-gray-400 font-black uppercase mb-4">Results</p>
                    <div className="space-y-4">
                      {searchResults.map((result, i) => (
                        <Link
                          key={i}
                          to={result.link}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-6 group"
                        >
                          <div className="w-12 h-12 overflow-hidden grayscale group-hover:grayscale-0 transition-all flex-shrink-0">
                            <img src={result.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-[9px] tracking-[0.1em] text-[#C9A87C] font-black uppercase italic">{result.type}</p>
                              <span className="w-1 h-1 rounded-full bg-gray-200" />
                              <p className="text-[9px] text-gray-400 font-medium truncate max-w-[150px]">{result.subtitle}</p>
                            </div>
                            <h4 className="font-serif text-lg text-[#1A1A1A] italic group-hover:text-[#C9A87C] transition-colors truncate">
                              {(() => {
                                const text = result.name || result.title;
                                if (!searchQuery) return text;
                                const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
                                return (
                                  <span>
                                    {parts.map((part, i) =>
                                      part.toLowerCase() === searchQuery.toLowerCase() ? (
                                        <span key={i} className="text-[#C9A87C] bg-[#C9A87C]/10">{part}</span>
                                      ) : (
                                        part
                                      )
                                    )}
                                  </span>
                                );
                              })()}
                            </h4>
                          </div>
                          <ArrowRight className="w-4 h-4 ml-auto text-gray-200 group-hover:text-[#C9A87C] group-hover:translate-x-2 transition-all flex-shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : searchQuery.length > 1 ? (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-2xl mt-4 p-8 border border-gray-100 z-50 text-center">
                    <p className="text-[#1A1A1A]/40 font-serif italic text-lg">No journeys found resembling "{searchQuery}"</p>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (!searchOpen) setSearchQuery('');
              }}
              className={cn(
                'p-2 transition-colors duration-300',
                isScrolled || searchOpen ? 'text-[#1A1A1A] hover:text-[#C9A87C]' : 'text-white/80 hover:text-white'
              )}
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {!searchOpen && (
              <Link
                to="/shop"
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative group',
                  isScrolled
                    ? 'bg-[#1A1A1A]/5 hover:bg-[#1A1A1A]/10 text-[#1A1A1A]'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                )}
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cart.item_count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A87C] text-[#1A1A1A] text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                    {cart.item_count}
                  </span>
                )}
              </Link>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={cn(
                    'p-2 transition-colors duration-300',
                    isScrolled ? 'text-[#1A1A1A] hover:text-[#C9A87C]' : 'text-white/80 hover:text-white'
                  )}
                >
                  <User className="w-5 h-5" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-4 bg-white shadow-2xl py-4 min-w-[220px] z-50 animate-fade-in border border-gray-100">
                    <div className="px-6 py-3 border-b border-gray-50">
                      <p className="text-xs font-black tracking-widest text-[#1A1A1A] uppercase">{user?.name}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{user?.email}</p>
                    </div>
                    <Link
                      to="/my-bookings"
                      className="block px-6 py-3 text-[10px] tracking-widest font-bold text-gray-600 hover:text-[#C9A87C] transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      MY JOURNEYS
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-6 py-3 text-[10px] tracking-widest font-bold text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3 h-3" />
                      SIGN OUT
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={cn(
                  'hidden md:flex items-center gap-2 px-8 py-3 border transition-all duration-300 text-[10px] tracking-[0.3em] font-black uppercase text-center justify-center',
                  isScrolled || searchOpen
                    ? 'border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                    : 'border-white/40 text-white hover:bg-white hover:text-[#1A1A1A]'
                )}
              >
                SIGN IN
              </Link>
            )}

            {!searchOpen && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  'lg:hidden p-2 transition-colors duration-300',
                  isScrolled ? 'text-[#1A1A1A]' : 'text-white'
                )}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-0 bg-[#1A1A1A] z-40 transition-all duration-700 flex flex-col justify-center items-center',
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-white/50 hover:text-white"
        >
          <X className="w-8 h-8" />
        </button>

        <nav className="text-center space-y-10">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-2xl tracking-[0.4em] text-white/90 hover:text-[#C9A87C] transition-all duration-300 font-serif"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-10 border-t border-white/10">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs tracking-[0.5em] text-[#C9A87C] font-black hover:text-white transition-colors"
            >
              SHOP TRAVEL GEAR
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default TravelHeader;
