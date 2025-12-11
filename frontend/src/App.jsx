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
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       const response = await axios.get('/api/auth/user');
//       if (response.data.success) {
//         setUser(response.data.user);
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//     } finally {
//       setLoading(false);
//     }
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

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <Router>
//       <div className="App">
//         <Navbar user={user} onLogout={handleLogout} />
//         <div className="container">
//           <Routes>
//             <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
//             <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
//             <Route 
//               path="/profile" 
//               element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
//             />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';

// Configure axios to send credentials (cookies)
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/user');
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
              <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
              <Route 
                path="/profile" 
                element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
              />
            </Routes>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 border-t border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Your App Name. All rights reserved.
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
  );
}

export default App;