import { useState, useEffect } from 'react';
import { Eye, EyeOff, Heart, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userData: { username: string }) => void;
  onSkipLogin: () => void;
}

export function LoginPage({ onLogin, onSkipLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [currentQuote, setCurrentQuote] = useState(0);

  const motivationalQuotes = [
    "You're doing better than you think",
    "Every small step counts",
    "Progress, not perfection",
    "Your mental health matters",
    "One day at a time",
    "Healing is not linear",
    "You are stronger than you know"
  ];

  // Rotate quotes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      onLogin({ username: username.trim() });
      setIsLoading(false);
    }, 1500);
  };



  return (
    <div className="w-full">
      {/* Animated background elements for the modal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-8 h-8 bg-white/5 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Main Login Card */}
        <div className="bg-gradient-to-br from-blue-400/90 via-purple-500/90 to-teal-400/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30 animate-fadeIn relative overflow-hidden">
          {/* Logo/Brand Section */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Wellness Companion</h1>
            <div className="h-6 flex items-center justify-center">
              <p 
                key={currentQuote}
                className="text-white/90 text-sm animate-fadeIn"
              >
                {motivationalQuotes[currentQuote]}
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors(prev => ({ ...prev, username: undefined }));
                  }}
                  placeholder="Enter Username"
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 ${
                    errors.username ? 'border-red-400 ring-2 ring-red-400/50' : 'border-white/30'
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-200 text-xs mt-1 ml-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Enter Password"
                  className={`w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300 ${
                    errors.password ? 'border-red-400 ring-2 ring-red-400/50' : 'border-white/30'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-200 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
            </button>
          </form>

          {/* Skip Login Option */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <button
              onClick={onSkipLogin}
              className="w-full py-2.5 text-white/80 hover:text-white text-sm font-medium hover:bg-white/10 rounded-lg transition-all duration-300 text-center"
            >
              Browse as Guest
            </button>
          </div>

          {/* Footer Message */}
          <div className="mt-4 text-center">
            <p className="text-white/70 text-xs">
              Your journey to wellness starts here 🌱
            </p>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-4 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
          <div className="flex items-start space-x-3">
            <div className="bg-white/20 p-2 rounded-full shrink-0">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/90 text-sm font-medium mb-1">Welcome to Your Safe Space</p>
              <p className="text-white/70 text-xs leading-relaxed">
                A comprehensive mental wellness platform designed to support your journey with ADHD, anxiety, depression, and PTSD through evidence-based practices.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}