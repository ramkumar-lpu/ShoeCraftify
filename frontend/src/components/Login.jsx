import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ForgotPasswordModal from './ForgotPasswordModal';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleGoogleLogin = () => {
    console.log('Initiating Google login...');
    window.location.href = '/api/auth/google';
  };

  // Manual login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    console.log('Attempting login...');

    if (!formData.email || !formData.password) {
      setErrors({ form: 'Please fill in all fields' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      }, {
        withCredentials: true
      });

      console.log('Login response:', response.data);
      
      if (response.data.success) {
        console.log('Login successful, calling onLoginSuccess with:', response.data.user);
        
        // Call the parent's login success handler FIRST
        if (onLoginSuccess) {
          onLoginSuccess(response.data.user);
        }
        
        // Then navigate without page reload
        console.log('Navigating to /profile');
        navigate('/profile');
      } else {
        setErrors({ form: response.data.message || 'Login failed' });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status === 423) {
        errorMessage = 'Account is temporarily locked. Try again later or reset your password.';
      }
      
      setErrors({ form: errorMessage });
      setIsLoading(false);
    }
  };

  // Manual registration
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    console.log('Attempting signup...');

    // Validation
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      }, {
        withCredentials: true
      });

      console.log('Signup response:', response.data);
      
      if (response.data.success) {
        console.log('Signup successful, calling onLoginSuccess with:', response.data.user);
        
        // Call the parent's login success handler FIRST
        if (onLoginSuccess) {
          onLoginSuccess(response.data.user);
        }
        
        // Then navigate without page reload
        console.log('Navigating to /profile');
        navigate('/profile');
      } else {
        setErrors({ form: response.data.message || 'Registration failed' });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = 'Registration failed';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        if (error.response.data.message?.includes('already exists')) {
          errorMessage = 'Email already registered. Try logging in instead.';
        } else {
          errorMessage = error.response.data.message;
        }
      }
      
      setErrors({ form: errorMessage });
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (activeTab === 'login') {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    if (errors.form) {
      setErrors({
        ...errors,
        form: ''
      });
    }
  };

  const handleTabChange = (tab) => {
    console.log('Switching tab to:', tab);
    setActiveTab(tab);
    setErrors({});
    // Reset form data when switching tabs
    if (tab === 'login') {
      setFormData({
        firstName: '',
        lastName: '',
        email: formData.email, // Keep email
        password: '',
        confirmPassword: ''
      });
    } else {
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8">
          
          {/* Left side - Hero/Features */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                SHOECREATIFY
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Design custom shoes with our intuitive 3D editor
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl mr-4">
                  👟
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">3D Design Studio</h3>
                  <p className="text-gray-600 text-sm">Create shoes from scratch with our advanced editor</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-xl mr-4">
                  🎨
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Unlimited Customization</h3>
                  <p className="text-gray-600 text-sm">Colors, patterns, materials and textures</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl mr-4">
                  ⚡
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-Time Preview</h3>
                  <p className="text-gray-600 text-sm">See your designs come to life instantly</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mt-8">
                <div className="flex items-center text-blue-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">No credit card required • Start designing now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                <span className="text-2xl text-white">👟</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {activeTab === 'login' 
                  ? 'Sign in to continue designing' 
                  : 'Join our community of shoe designers'
                }
              </p>
            </div>

            {/* Tabs */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1 cursor-pointer">
              <button
                onClick={() => handleTabChange('login')}
                className={`flex-1 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-white text-gray-900 shadow-sm cursor-pointer'
                    : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => handleTabChange('signup')}
                className={`flex-1 py-2 rounded-md font-medium transition-colors  cursor-pointer${
                  activeTab === 'signup'
                    ? 'bg-white text-gray-900 shadow-sm cursor-pointer'
                    : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'signup' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {activeTab === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {activeTab === 'login' && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {errors.form && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">{errors.form}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  activeTab === 'login' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center cursor-pointer">
              <div className="flex-grow border-t border-gray-300 " />
              <span className="mx-4 text-gray-500 text-sm ">Or continue with</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-sm hover:shadow cursor-pointer"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* Terms */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-xs text-center">
                By continuing, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}
    </>
  );
};

export default Login;