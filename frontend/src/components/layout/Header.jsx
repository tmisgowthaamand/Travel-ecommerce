import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import MegaMenu from './MegaMenu';
import { navigationConfig } from '../../data/mockData';

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
      menuId: 'experiences'
    },
    {
      label: 'DESTINATIONS',
      href: '/destinations',
      menuId: 'destinations'
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
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 z-50 relative">
            <h1 className={cn(
              'font-serif text-2xl md:text-3xl tracking-wide transition-colors duration-300',
              (isScrolled || activeDropdown) ? 'text-[#6B4E4E]' : 'text-white'
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
                className="relative"
                onMouseEnter={() => item.menuId && setActiveDropdown(item.menuId)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    'text-xs tracking-[0.2em] font-medium transition-all duration-300 flex items-center gap-1 py-4',
                    (isScrolled || activeDropdown)
                      ? 'text-[#6B4E4E] hover:text-[#8B6B6B]'
                      : 'text-white/90 hover:text-white',
                    location.pathname === item.href && 'border-b border-current'
                  )}
                >
                  {item.label}
                  {item.menuId && <ChevronDown className="w-3 h-3" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4 z-50 relative">
            <button
              className={cn(
                'p-2 transition-colors duration-300',
                (isScrolled || activeDropdown) ? 'text-[#6B4E4E] hover:text-[#8B6B6B]' : 'text-white/90 hover:text-white'
              )}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className={cn(
                'p-2 transition-colors duration-300 relative',
                (isScrolled || activeDropdown) ? 'text-[#6B4E4E] hover:text-[#8B6B6B]' : 'text-white/90 hover:text-white'
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
                (isScrolled || activeDropdown) ? 'text-[#6B4E4E]' : 'text-white'
              )}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menus */}
      <MegaMenu
        isOpen={activeDropdown === 'experiences'}
        items={navigationConfig.experiences}
        onClose={() => setActiveDropdown(null)}
      />
      <MegaMenu
        isOpen={activeDropdown === 'destinations'}
        items={navigationConfig.destinations}
        onClose={() => setActiveDropdown(null)}
      />

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
