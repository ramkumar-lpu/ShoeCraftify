
import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
// Lazy load components
const Login = lazy(() => import('./components/Login'));
const Profile = lazy(() => import('./components/Profile'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const Designer = lazy(() => import('./components/Designer'));
const Cart = lazy(() => import('./components/Cart'));
const Contact = lazy(() => import('./components/Contact'));
const OTPVerification = lazy(() => import('./components/OTPVerification'));
const Privacy = lazy(() => import('./components/PrivacyPolicy'));
const Terms = lazy(() => import('./components/TermsOfService'));

// Loading spinner
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

// Configure axios to send credentials (cookies)
axios.defaults.withCredentials = true;

// Define Link Component properly
const Link = ({ to, children, ...props }) => {
  const isInternalLink = to && !to.startsWith('http');

  if (isInternalLink) {
    return (
      <RouterLink to={to} {...props}>
        {children}
      </RouterLink>
    );
  }

  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/user');

      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  if (!authChecked) {
    return <PageLoader />;
  }

  return (
    <ErrorBoundary>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar user={user} onLogout={handleLogout} />
            <div className="pt-16">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<LandingPage user={user} />} />
                  <Route
                    path="/login"
                    element={
                      user ?
                        <Navigate to="/profile" replace /> :
                        <Login onLoginSuccess={handleLoginSuccess} />
                    }
                  />
                  {/* FIXED: Changed from /verify-otp to /otp-verification */}
                  <Route
                    path="/otp-verification"
                    element={
                      user ?
                        <Navigate to="/profile" replace /> :
                        <OTPVerification />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      user ?
                        <Profile user={user} updateUser={updateUser} /> :
                        <Navigate to="/login" replace />
                    }
                  />
                  <Route
                    path="/designer"
                    element={
                      user ?
                        <Designer user={user} /> :
                        <Navigate to="/login" replace />
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      user ?
                        <Cart user={user} /> :
                        <Navigate to="/login" replace />
                    }
                  />
                  <Route path="/contact" element={<Contact />} />
                  <Route
                    path="/privacy"
                    element={
                      <Privacy />
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <Terms />
                    }
                  />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </div>

            {/* Footer */}
            <footer className="mt-12 border-t border-gray-200 py-6">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} SHOECREATIFY. All rights reserved.
                  </p>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="/Privacy" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                      Privacy Policy
                    </a>
                    <a href="/Terms" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                      Terms of Service
                    </a>
                    <Link to="/contact" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;