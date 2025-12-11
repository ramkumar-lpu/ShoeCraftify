
// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from './components/Navbar';
// import Login from './components/Login';
// import Profile from './components/Profile';
// import './App.css';

// // Configure axios to send credentials (cookies)
// axios.defaults.withCredentials = true;

// function App() {
//   const [user, setUser] = useState(null);
//   const [authChecked, setAuthChecked] = useState(false);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       console.log('Checking auth status...');
//       const response = await axios.get('/api/auth/user');
//       console.log('Auth check response:', response.data);
      
//       if (response.data.success) {
//         console.log('Setting user to:', response.data.user);
//         setUser(response.data.user);
//       } else {
//         console.log('No user found, setting to null');
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       console.log('Error response:', error.response?.data);
//       setUser(null);
//     } finally {
//       setAuthChecked(true);
//       console.log('Auth check completed');
//     }
//   };

//   const handleLoginSuccess = (userData) => {
//     console.log('Login success, setting user:', userData);
//     setUser(userData);
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('/api/auth/logout');
//       console.log('Logout successful');
//       setUser(null);
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   // Update user state when profile is updated
//   const updateUser = (updatedUser) => {
//     console.log('Updating user:', updatedUser);
//     setUser(updatedUser);
//   };

//   // Wait for auth check to complete before rendering routes
//   if (!authChecked) {
//     return <div className="min-h-screen bg-gray-50"></div>;
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <Navbar user={user} onLogout={handleLogout} />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <Routes>
//               <Route 
//                 path="/" 
//                 element={user ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />} 
//               />
//               <Route 
//                 path="/login" 
//                 element={
//                   user ? 
//                   <Navigate to="/profile" replace /> : 
//                   <Login onLoginSuccess={handleLoginSuccess} />
//                 } 
//               />
//               <Route 
//                 path="/profile" 
//                 element={
//                   user ? 
//                   <Profile user={user} updateUser={updateUser} /> : 
//                   <Navigate to="/login" replace />
//                 } 
//               />
//               <Route path="*" element={<Navigate to={user ? "/profile" : "/login"} replace />} />
//             </Routes>
//           </div>
//         </div>
        
//         {/* Footer */}
//         <footer className="mt-12 border-t border-gray-200 py-6">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <p className="text-gray-500 text-sm">
//                 © {new Date().getFullYear()} SHOECREATIFY. All rights reserved.
//               </p>
//               <div className="flex space-x-4 mt-4 md:mt-0">
//                 <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
//                   Privacy Policy
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
//                   Terms of Service
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
//                   Contact
//                 </a>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from './components/Navbar';
// import Login from './components/Login';
// import Profile from './components/Profile';
// import LandingPage from './components/LandingPage';
// import Designer from './components/Designer';
// import Cart from './components/Cart';

// // Configure axios to send credentials (cookies)
// axios.defaults.withCredentials = true;

// function App() {
//   const [user, setUser] = useState(null);
//   const [authChecked, setAuthChecked] = useState(false);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       const response = await axios.get('/api/auth/user');
      
//       if (response.data.success) {
//         setUser(response.data.user);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       setUser(null);
//     } finally {
//       setAuthChecked(true);
//     }
//   };

//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('/api/auth/logout');
//       setUser(null);
//       window.location.href = '/';
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const updateUser = (updatedUser) => {
//     setUser(updatedUser);
//   };

//   if (!authChecked) {
//     return <div className="min-h-screen bg-gray-50"></div>;
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <Navbar user={user} onLogout={handleLogout} />
//         <div className="pt-16"> {/* Offset for fixed navbar */}
//           <Routes>
//             <Route path="/" element={<LandingPage user={user} />} />
//             <Route 
//               path="/login" 
//               element={
//                 user ? 
//                 <Navigate to="/profile" replace /> : 
//                 <Login onLoginSuccess={handleLoginSuccess} />
//               } 
//             />
//             <Route 
//               path="/profile" 
//               element={
//                 user ? 
//                 <Profile user={user} updateUser={updateUser} /> : 
//                 <Navigate to="/login" replace />
//               } 
//             />
//             <Route 
//               path="/designer" 
//               element={
//                 user ? 
//                 <Designer user={user} /> : 
//                 <Navigate to="/login" replace />
//               } 
//             />
//             <Route 
//               path="/cart" 
//               element={
//                 user ? 
//                 <Cart user={user} /> : 
//                 <Navigate to="/login" replace />
//               } 
//             />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </div>
        
//         {/* Footer */}
//         <footer className="mt-12 border-t border-gray-200 py-6">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <p className="text-gray-500 text-sm">
//                 © {new Date().getFullYear()} SHOECREATIFY. All rights reserved.
//               </p>
//               <div className="flex space-x-4 mt-4 md:mt-0">
//                 <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
//                   Privacy Policy
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
//                   Terms of Service
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
//                   Contact
//                 </a>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { CartProvider } from './contexts/CartContext'; // Add this
import Navbar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import Designer from './components/Designer';
import Cart from './components/Cart';
import './App.css';

// Configure axios to send credentials (cookies)
axios.defaults.withCredentials = true;

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
    return <div className="min-h-screen bg-gray-50"></div>;
  }

  return (
    <CartProvider> {/* Wrap with CartProvider */}
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Navbar user={user} onLogout={handleLogout} />
          <div className="pt-16">
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          
          {/* Footer */}
          <footer className="mt-12 border-t border-gray-200 py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} SHOECREATIFY. All rights reserved.
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-500 text-sm transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;