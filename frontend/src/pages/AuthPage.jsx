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
        toast.success('Welcome back!');
      } else {
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        await register(formData.name, formData.email, formData.password);
        toast.success('Account created successfully!');
      }
      
      // Redirect to previous page or home
      const from = location.state?.from || '/';
      navigate(from);
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'An error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: isLogin
              ? 'url(https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1920&q=80)'
              : 'url(https://images.unsplash.com/photo-1639598003276-8a70fcaaad6c?w=1920&q=80)'
          }}
        />
        <div className={`absolute inset-0 ${
          isLogin 
            ? 'bg-gradient-to-br from-emerald-900/80 to-teal-900/80' 
            : 'bg-gradient-to-br from-amber-900/80 to-orange-900/80'
        }`} />
        
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12">
          <h1 className="text-5xl font-serif text-white mb-6">
            <span className="font-light">Wanderlust</span>
            <span className="block text-2xl mt-2 text-white/80">&</span>
            <span className="font-light">Company</span>
          </h1>
          <p className="text-white/80 text-lg max-w-md leading-relaxed">
            {isLogin 
              ? 'Your gateway to extraordinary journeys and premium travel essentials.'
              : 'Join our community of travelers and discover a world of possibilities.'
            }
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-md w-full mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-serif text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Sign in to access your bookings and orders' 
                : 'Start your journey with us today'
              }
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                isLogin
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <Link
                to={isLogin ? '/register' : '/login'}
                className={`font-medium ${
                  isLogin ? 'text-emerald-600 hover:text-emerald-700' : 'text-amber-600 hover:text-amber-700'
                }`}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
