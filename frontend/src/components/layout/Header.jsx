import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      label: 'TAILORED EXPERIENCES', 
      href: '/experiences',
      dropdown: ['Culinary Journeys', 'Golf Escapes', 'Wellness Retreats', 'Heritage Tours', 'Castle Stays', 'Adventure Expeditions']
    },
    { 
      label: 'DESTINATIONS', 
      href: '/destinations',
      dropdown: ['Ireland', 'Scotland', 'England', 'Africa']
    },
    { label: 'PRIVATE RENTALS', href: '/rentals' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'BLOG & PRESS', href: '/blog' },
    { label: 'CONTACT US', href: '/contact' },
  ];

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
              isScrolled ? 'text-[#6B4E4E]' : 'text-white'
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
                      ? 'text-[#6B4E4E] hover:text-[#8B6B6B]'
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
                    <div className="bg-white shadow-xl rounded-sm py-3 min-w-[200px]">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem}
                          to={`${item.href}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-5 py-2 text-xs tracking-wider text-[#6B4E4E] hover:bg-[#F8F5F2] hover:text-[#8B6B6B] transition-colors"
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
          <div className="flex items-center gap-4">
            <button
              className={cn(
                'p-2 transition-colors duration-300',
                isScrolled ? 'text-[#6B4E4E] hover:text-[#8B6B6B]' : 'text-white/90 hover:text-white'
              )}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className={cn(
                'p-2 transition-colors duration-300 relative',
                isScrolled ? 'text-[#6B4E4E] hover:text-[#8B6B6B]' : 'text-white/90 hover:text-white'
              )}
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A87C] text-white text-[10px] rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors duration-300',
                isScrolled ? 'text-[#6B4E4E]' : 'text-white'
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
        <nav className="p-6 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm tracking-[0.2em] text-[#6B4E4E] hover:text-[#8B6B6B] transition-colors py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
