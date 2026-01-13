import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/travel" className="inline-block">
              <h2 className="font-serif text-3xl tracking-tighter flex items-baseline gap-1">
                <span className="font-light italic">Wanderlust</span>
                <span className="text-[#C9A87C]">&</span>
                <span className="font-light">Co.</span>
              </h2>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm font-light italic">
              "To travel is to live, to return is to be reborn." We craft sanctuaries for the soul through meticulously curated bespoke journeys.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/30 hover:text-[#C9A87C] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/30 hover:text-[#C9A87C] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/30 hover:text-[#C9A87C] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[10px] tracking-[0.4em] font-black text-[#C9A87C] uppercase">Explore</h3>
            <ul className="space-y-4">
              <li><Link to="/travel/experiences" className="text-white/40 text-[10px] tracking-widest hover:text-white transition-colors font-bold">EXPERIENCES</Link></li>
              <li><Link to="/travel/destinations" className="text-white/40 text-[10px] tracking-widest hover:text-white transition-colors font-bold">DESTINATIONS</Link></li>
              <li><Link to="/travel/rentals" className="text-white/40 text-[10px] tracking-widest hover:text-white transition-colors font-bold">RENTALS</Link></li>
              <li><Link to="/shop" className="text-white/40 text-[10px] tracking-widest hover:text-white transition-colors font-bold">COLLECTIONS</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[10px] tracking-[0.4em] font-black text-[#C9A87C] uppercase">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/travel/about" className="text-white/40 text-[10px] tracking-widest hover:text-white transition-colors font-bold">OUR STORY</Link></li>
              <li><Link to="/travel/blog" className="text-white/40 text-[10px] tracking-widest hover:text-white transition-colors font-bold">JOURNAL</Link></li>
              <li><Link to="/travel/contact" className="text-white/40 text-[10px] tracking-widest hover:text-white transition-colors font-bold">CONTACT</Link></li>
              <li><Link to="/travel/about" className="text-white/40 text-[10px] tracking-widest hover:text-white transition-colors font-bold">CAREERS</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-[10px] tracking-[0.4em] font-black text-[#C9A87C] uppercase">Contact</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C9A87C] flex-shrink-0" />
                <p className="text-white/40 text-xs leading-relaxed font-light">
                  42 Fitzwilliam Square South,<br />
                  Dublin 2, D02 Y620, Ireland
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#C9A87C] flex-shrink-0" />
                <p className="text-white/40 text-xs font-light">+353 1 288 6355</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#C9A87C] flex-shrink-0" />
                <p className="text-white/40 text-xs font-light">concierge@wanderlustco.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[9px] tracking-[0.3em] text-white/20 font-bold uppercase">
            © 2025 WANDERLUST & CO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10">
            <Link to="/privacy" className="text-[9px] tracking-[0.3em] text-white/20 hover:text-white transition-colors font-bold uppercase">Privacy</Link>
            <Link to="/terms" className="text-[9px] tracking-[0.3em] text-white/20 hover:text-white transition-colors font-bold uppercase">Terms</Link>
            <Link to="/cookies" className="text-[9px] tracking-[0.3em] text-white/20 hover:text-white transition-colors font-bold uppercase">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
