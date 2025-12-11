

// import { Link } from 'react-router-dom';
// import { useState } from 'react';

// const Navbar = ({ user, onLogout }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white text-lg">👟</span>
//             </div>
//             <span className="text-xl font-bold text-gray-900">SHOECREATIFY</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link to="/designer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//               Designer
//             </Link>
//             <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative">
//               Cart
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 0
//               </span>
//             </Link>
            
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <Link to="/profile" className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm">
//                       {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
//                     </span>
//                   </div>
//                   <span className="text-gray-700 font-medium">{user.firstName || 'User'}</span>
//                 </Link>
//                 <button
//                   onClick={onLogout}
//                   className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link 
//                   to="/login" 
//                   className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   to="/login" 
//                   className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-medium rounded-lg transition-colors"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <button 
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden text-gray-700 focus:outline-none"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 py-4">
//             <div className="flex flex-col space-y-4">
//               <Link 
//                 to="/designer" 
//                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Designer
//               </Link>
//               <Link 
//                 to="/cart" 
//                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Cart
//               </Link>
              
//               {user ? (
//                 <>
//                   <Link 
//                     to="/profile" 
//                     className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                   <button
//                     onClick={() => {
//                       onLogout();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="text-left px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <div className="flex flex-col space-y-3">
//                   <Link 
//                     to="/login" 
//                     className="text-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link 
//                     to="/login" 
//                     className="text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-medium rounded-lg transition-colors"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext'; // Add this

const Navbar = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemCount } = useCart(); // Add this

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">👟</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SHOECREATIFY</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/designer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Designer
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative">
              Cart
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">
                      {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">{user.firstName || 'User'}</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/login" 
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-medium rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/designer" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Designer
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link 
                    to="/login" 
                    className="text-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/login" 
                    className="text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-medium rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;