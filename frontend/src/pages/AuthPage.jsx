import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2, ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

const AuthPage = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('Access granted. Welcome to the collection.');
      } else {
        if (formData.password.length < 6) {
          throw new Error('Credential must be at least 6 characters');
        }
        await register(formData.name, formData.email, formData.password);
        toast.success('Identity registered. Welcome to W&C.');
      }

      const from = location.state?.from || '/travel';
      navigate(from);
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Verification failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] group-hover:scale-110"
          style={{
            backgroundImage: isLogin
              ? 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80)'
              : 'url(https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1920&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />

        <div className="relative z-10 flex flex-col justify-end p-24 w-full h-full">
          <div className="animate-reveal-up">
            <p className="text-[#C9A87C] text-[10px] tracking-[0.5em] mb-6 font-black uppercase italic">Identity Verification</p>
            <h1 className="font-serif text-7xl text-white font-light mb-8 leading-tight">
              Curating exclusively <br /> for the <span className="italic">extraordinary.</span>
            </h1>
            <div className="w-24 h-[1px] bg-[#C9A87C] mb-8" />
            <p className="text-white/40 text-[10px] tracking-[0.3em] font-black uppercase italic">Establishing Global Resonance Since 1999</p>
          </div>
        </div>

        {/* Floating Brand Mark */}
        <div className="absolute top-12 left-12 z-10 animate-fade-in">
          <Link to="/" className="font-serif text-3xl text-white font-light italic">W<span className="text-[#C9A87C] font-normal">&</span>C</Link>
        </div>
      </div>

      {/* Interface Side */}
      <div className="flex-1 flex flex-col justify-between py-12 px-8 lg:px-20 animate-fade-in overflow-y-auto">
        <div className="flex justify-end items-center">
          <Link
            to="/travel"
            className="text-[10px] tracking-[0.3em] font-black text-gray-400 hover:text-[#1A1A1A] transition-colors uppercase flex items-center gap-3 group"
          >
            Explore the Collection
            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto py-12">
          <div className="mb-14 text-center">
            <h2 className="font-serif text-5xl text-[#1A1A1A] italic mb-4 leading-tight">
              {isLogin ? 'Welcome Back' : 'Create Identity'}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-[#C9A87C]/30" />
              <p className="text-gray-400 text-[9px] tracking-[0.3em] uppercase font-black">Secure Member Portal</p>
              <div className="h-px w-8 bg-[#C9A87C]/30" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {error && (
              <div className="p-4 border border-red-100 bg-red-50 text-red-500 text-[10px] tracking-[0.1em] font-black uppercase text-center animate-shake">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-3">
                <label className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/40 font-black uppercase italic ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#C9A87C] transition-colors" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-8 pr-0 py-4 bg-transparent border-b border-gray-100 focus:border-[#1A1A1A] outline-none text-sm transition-all font-light"
                    placeholder="E.G. JULIAN VANE"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/40 font-black uppercase italic ml-1">Credential</label>
              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#C9A87C] transition-colors" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-8 pr-0 py-4 bg-transparent border-b border-gray-100 focus:border-[#1A1A1A] outline-none text-sm transition-all font-light"
                  placeholder="IDENTITY@DOMAIN.COM"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/40 font-black uppercase italic ml-1">Secret</label>
                {isLogin && <button type="button" className="text-[9px] tracking-[0.2em] text-[#C9A87C] font-black uppercase hover:text-[#1A1A1A] transition-colors italic">Recovery?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#C9A87C] transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-8 pr-12 py-4 bg-transparent border-b border-gray-100 focus:border-[#1A1A1A] outline-none text-sm transition-all font-light"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#C9A87C] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-[#1A1A1A] text-white text-[10px] tracking-[0.4em] font-black uppercase hover:bg-[#C9A87C] transition-all disabled:opacity-50 flex items-center justify-center gap-4 relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                {loading && <Loader2 className="w-4 h-4 animate-spin text-[#C9A87C]" />}
                <span className="relative z-10">{isLogin ? 'Verify Identity' : 'Establish Credential'}</span>
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase font-black">
              {isLogin ? "New to the collection?" : "Already established?"}{' '}
              <Link
                to={isLogin ? '/register' : '/login'}
                className="text-[#C9A87C] hover:text-[#1A1A1A] transition-colors italic ml-2 border-b border-[#C9A87C]/20"
              >
                {isLogin ? 'Request Invitation' : 'Verify Credentials'}
              </Link>
            </p>
          </div>

          <div className="mt-16 pt-12 border-t border-gray-50 flex justify-center gap-8 opacity-20 hover:opacity-100 transition-opacity">
            <button className="text-[10px] tracking-[0.3em] font-black text-[#1A1A1A] uppercase hover:text-[#C9A87C]">Apple ID</button>
            <button className="text-[10px] tracking-[0.3em] font-black text-[#1A1A1A] uppercase hover:text-[#C9A87C]">Google</button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-200 text-[9px] tracking-[0.6em] uppercase font-black">Privacy • Terms • Elegance</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
