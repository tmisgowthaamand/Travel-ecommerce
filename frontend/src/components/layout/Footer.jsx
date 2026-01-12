import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#3D2E2E] text-white">
      {/* Partners Section */}
      <div className="border-b border-white/10 py-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            <span className="text-sm tracking-[0.3em] font-light">VIRTUOSO</span>
            <span className="text-sm tracking-[0.3em] font-light">TRAVEL + LEISURE</span>
            <span className="text-sm tracking-[0.3em] font-light">CONDÉ NAST</span>
            <span className="text-sm tracking-[0.3em] font-light">RELAIS & CHÂTEAUX</span>
            <span className="text-sm tracking-[0.3em] font-light">SELECT HOTELS</span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Column */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl tracking-wide">
                <span className="font-light">W</span>
                <span className="text-2xl">&</span>
                <span className="font-light">C</span>
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Creating magical memories through bespoke luxury travel experiences across Ireland, Scotland, England, and Africa.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-[0.3em] font-medium">EXPLORE</h3>
              <ul className="space-y-3">
                <li><Link to="/experiences" className="text-white/70 text-sm hover:text-white transition-colors">Tailored Experiences</Link></li>
                <li><Link to="/destinations" className="text-white/70 text-sm hover:text-white transition-colors">Destinations</Link></li>
                <li><Link to="/rentals" className="text-white/70 text-sm hover:text-white transition-colors">Private Rentals</Link></li>
                <li><Link to="/about" className="text-white/70 text-sm hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="text-white/70 text-sm hover:text-white transition-colors">Blog & Press</Link></li>
              </ul>
            </div>

            {/* Destinations */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-[0.3em] font-medium">DESTINATIONS</h3>
              <ul className="space-y-3">
                <li><Link to="/destinations/ireland" className="text-white/70 text-sm hover:text-white transition-colors">Ireland</Link></li>
                <li><Link to="/destinations/scotland" className="text-white/70 text-sm hover:text-white transition-colors">Scotland</Link></li>
                <li><Link to="/destinations/england" className="text-white/70 text-sm hover:text-white transition-colors">England</Link></li>
                <li><Link to="/destinations/africa" className="text-white/70 text-sm hover:text-white transition-colors">Africa</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h3 className="text-xs tracking-[0.3em] font-medium">GET IN TOUCH</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#C9A87C]" />
                  <span className="text-white/70 text-sm">42 Fitzwilliam Square,<br />Dublin 2, Ireland</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0 text-[#C9A87C]" />
                  <span className="text-white/70 text-sm">+353 1 288 6355</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 flex-shrink-0 text-[#C9A87C]" />
                  <span className="text-white/70 text-sm">info@wanderlustco.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-xs">
            <p>© 2025 Wanderlust & Co. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
