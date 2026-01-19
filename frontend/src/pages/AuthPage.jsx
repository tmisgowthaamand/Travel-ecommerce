import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2, ArrowLeft, Mail, Lock, User, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

const AuthPage = ({ mode: initialMode = 'login' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, forgotPassword, resetPassword } = useAuth();

  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    token: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update mode when prop changes
  useEffect(() => {
    setMode(initialMode);
    setError('');
    setSuccess('');
  }, [initialMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        toast.success('Access granted. Welcome to the collection.');
        const from = location.state?.from || '/travel';
        navigate(from);
      } else if (mode === 'register') {
        if (formData.password.length < 6) {
          throw new Error('Credential must be at least 6 characters');
        }
        await register(formData.name, formData.email, formData.password);
        toast.success('Identity registered. Welcome to the collection.');
        navigate('/travel');
      } else if (mode === 'forgot') {
        const res = await forgotPassword(formData.email);
        setSuccess(res.message);
        toast.success('Recovery instruction issued.');
        // Switch to reset mode after a short delay or stay to show message
        setTimeout(() => setMode('reset'), 3000);
      } else if (mode === 'reset') {
        await resetPassword(formData.token, formData.password);
        toast.success('Security credentials updated.');
        setMode('login');
      }
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Verification failed';
      setError(message.toUpperCase());
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const isLogin = mode === 'login';
  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';
  const isReset = mode === 'reset';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans p-6">
      {/* Brand Header */}
      <div className="mb-12 text-center animate-fade-in">
        <Link to="/" className="font-serif text-4xl text-[#1A1A1A] font-light italic">
          W<span className="text-[#C9A87C] font-normal">&</span>C
        </Link>
      </div>

      <div className="max-w-[420px] w-full mx-auto">
        <div className="mb-10 text-center animate-reveal-up">
          <h2 className="font-serif text-[48px] text-[#1A1A1A] italic mb-3 tracking-tight leading-tight">
            {isLogin && 'Welcome Back'}
            {isRegister && 'Create Identity'}
            {isForgot && 'Recover Identity'}
            {isReset && 'Update Secret'}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[#1A1A1A]/10" />
            <p className="text-[#1A1A1A]/40 text-[10px] tracking-[0.4em] uppercase font-bold">
              Secure Member Portal
            </p>
            <div className="h-[1px] w-12 bg-[#1A1A1A]/10" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
          {error && (
            <div className="p-5 bg-[#FFF5F5] border border-[#FFE0E0] text-[#FF4D4D] text-[11px] tracking-[0.15em] font-bold uppercase text-center animate-shake">
              {error}
            </div>
          )}

          {success && (
            <div className="p-5 bg-[#F5FFF5] border border-[#E0FFE0] text-[#2D8A2D] text-[11px] tracking-[0.1em] font-medium text-center">
              {success}
            </div>
          )}

          {isRegister && (
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.3em] text-[#1A1A1A] font-bold uppercase italic block ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <User className="w-[18px] h-[18px] text-[#1A1A1A]/30 group-focus-within:text-[#C9A87C] transition-colors" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-[#F0F4FF]/30 border-b border-transparent focus:bg-[#F0F4FF]/60 focus:border-[#C9A87C] outline-none text-[15px] transition-all font-light placeholder:text-[#1A1A1A]/20"
                  placeholder="GOKUL KRISHNA"
                  required
                />
              </div>
            </div>
          )}

          {(isLogin || isRegister || isForgot) && (
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.3em] text-[#1A1A1A] font-bold uppercase italic block ml-1">
                Credential
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <Mail className="w-[18px] h-[18px] text-[#1A1A1A]/30 group-focus-within:text-[#C9A87C] transition-colors" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-[#F0F4FF]/30 border-b border-transparent focus:bg-[#F0F4FF]/60 focus:border-[#C9A87C] outline-none text-[15px] transition-all font-light placeholder:text-[#1A1A1A]/20"
                  placeholder="IDENTITY@DOMAIN.COM"
                  required
                />
              </div>
            </div>
          )}

          {isReset && (
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.3em] text-[#1A1A1A] font-bold uppercase italic block ml-1">
                Recovery Token
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <KeyRound className="w-[18px] h-[18px] text-[#1A1A1A]/30 group-focus-within:text-[#C9A87C] transition-colors" />
                </div>
                <input
                  type="text"
                  value={formData.token}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-[#F0F4FF]/30 border-b border-transparent focus:bg-[#F0F4FF]/60 focus:border-[#C9A87C] outline-none text-[15px] transition-all font-light placeholder:text-[#1A1A1A]/20"
                  placeholder="ENTER 6-DIGIT TOKEN"
                  required
                />
              </div>
            </div>
          )}

          {(isLogin || isRegister || isReset) && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] tracking-[0.3em] text-[#1A1A1A] font-bold uppercase italic block ml-1">
                  Secret
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[10px] tracking-[0.2em] text-[#C9A87C] font-bold uppercase hover:text-[#1A1A1A] transition-colors italic"
                  >
                    Recovery?
                  </button>
                )}
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <Lock className="w-[18px] h-[18px] text-[#1A1A1A]/30 group-focus-within:text-[#C9A87C] transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-4 bg-[#F0F4FF]/30 border-b border-transparent focus:bg-[#F0F4FF]/60 focus:border-[#C9A87C] outline-none text-[15px] transition-all font-light placeholder:text-[#1A1A1A]/20"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/20 hover:text-[#C9A87C] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#1A1A1A] text-white text-[11px] tracking-[0.4em] font-bold uppercase hover:bg-[#C9A87C] transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-4 relative overflow-hidden group shadow-xl active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
              {loading && <Loader2 className="w-5 h-5 animate-spin text-[#C9A87C]" />}
              <span className="relative z-10">
                {isLogin && 'Verify Identity'}
                {isRegister && 'Establish Credential'}
                {isForgot && 'Initiate Recovery'}
                {isReset && 'Apply Security Update'}
              </span>
            </button>
          </div>
        </form>

        <div className="mt-10 text-center animate-fade-in delay-200">
          <p className="text-[#1A1A1A]/40 text-[11px] tracking-[0.1em] uppercase font-bold">
            {isLogin ? "New to the collection?" : isForgot ? "Remembered?" : "Already established?"}{' '}
            <button
              onClick={() => setMode(isLogin ? 'register' : 'login')}
              className="text-[#C9A87C] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all italic ml-1 border-b border-[#C9A87C]/30 pb-0.5"
            >
              {isLogin ? 'Request Invitation' : 'Verify Credentials'}
            </button>
          </p>
        </div>

        <div className="mt-16 pt-10 border-t border-[#1A1A1A]/5 flex justify-center items-center gap-10 animate-fade-in delay-300">
          <button className="text-[10px] tracking-[0.3em] font-bold text-[#1A1A1A]/30 uppercase hover:text-[#1A1A1A] transition-all">
            Apple ID
          </button>
          <button className="text-[10px] tracking-[0.3em] font-bold text-[#1A1A1A]/30 uppercase hover:text-[#1A1A1A] transition-all">
            Google
          </button>
        </div>
      </div>

      <div className="mt-auto py-8 text-center opacity-30">
        <p className="text-[#1A1A1A] text-[9px] tracking-[0.618em] uppercase font-bold">
          Privacy • Terms • Elegance
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
