

// // // import { Link } from 'react-router-dom';
// // // import { useState } from 'react';

// // // const Navbar = ({ user, onLogout }) => {
// // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// // //   return (
// // //     <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
// // //       <div className="container mx-auto px-4">
// // //         <div className="flex justify-between items-center h-16">
// // //           {/* Logo */}
// // //           <Link to="/" className="flex items-center space-x-2">
// // //             <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
// // //               <span className="text-white text-lg">👟</span>
// // //             </div>
// // //             <span className="text-xl font-bold text-gray-900">SHOECREATIFY</span>
// // //           </Link>

// // //           {/* Desktop Navigation */}
// // //           <div className="hidden md:flex items-center space-x-6">
// // //             <Link to="/designer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
// // //               Designer
// // //             </Link>
// // //             <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative">
// // //               Cart
// // //               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
// // //                 0
// // //               </span>
// // //             </Link>
            
// // //             {user ? (
// // //               <div className="flex items-center space-x-4">
// // //                 <Link to="/profile" className="flex items-center space-x-2">
// // //                   <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
// // //                     <span className="text-white text-sm">
// // //                       {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
// // //                     </span>
// // //                   </div>
// // //                   <span className="text-gray-700 font-medium">{user.firstName || 'User'}</span>
// // //                 </Link>
// // //                 <button
// // //                   onClick={onLogout}
// // //                   className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
// // //                 >
// // //                   Logout
// // //                 </button>
// // //               </div>
// // //             ) : (
// // //               <div className="flex items-center space-x-4">
// // //                 <Link 
// // //                   to="/login" 
// // //                   className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
// // //                 >
// // //                   Login
// // //                 </Link>
// // //                 <Link 
// // //                   to="/login" 
// // //                   className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-medium rounded-lg transition-colors"
// // //                 >
// // //                   Sign Up
// // //                 </Link>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Mobile menu button */}
// // //           <button 
// // //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// // //             className="md:hidden text-gray-700 focus:outline-none"
// // //           >
// // //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// // //             </svg>
// // //           </button>
// // //         </div>

// // //         {/* Mobile Navigation */}
// // //         {isMobileMenuOpen && (
// // //           <div className="md:hidden border-t border-gray-200 py-4">
// // //             <div className="flex flex-col space-y-4">
// // //               <Link 
// // //                 to="/designer" 
// // //                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
// // //                 onClick={() => setIsMobileMenuOpen(false)}
// // //               >
// // //                 Designer
// // //               </Link>
// // //               <Link 
// // //                 to="/cart" 
// // //                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
// // //                 onClick={() => setIsMobileMenuOpen(false)}
// // //               >
// // //                 Cart
// // //               </Link>
              
// // //               {user ? (
// // //                 <>
// // //                   <Link 
// // //                     to="/profile" 
// // //                     className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
// // //                     onClick={() => setIsMobileMenuOpen(false)}
// // //                   >
// // //                     Profile
// // //                   </Link>
// // //                   <button
// // //                     onClick={() => {
// // //                       onLogout();
// // //                       setIsMobileMenuOpen(false);
// // //                     }}
// // //                     className="text-left px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
// // //                   >
// // //                     Logout
// // //                   </button>
// // //                 </>
// // //               ) : (
// // //                 <div className="flex flex-col space-y-3">
// // //                   <Link 
// // //                     to="/login" 
// // //                     className="text-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
// // //                     onClick={() => setIsMobileMenuOpen(false)}
// // //                   >
// // //                     Login
// // //                   </Link>
// // //                   <Link 
// // //                     to="/login" 
// // //                     className="text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-medium rounded-lg transition-colors"
// // //                     onClick={() => setIsMobileMenuOpen(false)}
// // //                   >
// // //                     Sign Up
// // //                   </Link>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;





// // import { Link } from 'react-router-dom';
// // import { useState } from 'react';
// // import { useCart } from '../contexts/CartContext'; // Add this

// // const Navbar = ({ user, onLogout }) => {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const { getCartItemCount } = useCart(); // Add this

// //   return (
// //     <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
// //       <div className="container mx-auto px-4">
// //         <div className="flex justify-between items-center h-16">
// //           {/* Logo */}
// //           <Link to="/" className="flex items-center space-x-2">
// //             <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
// //               <span className="text-white text-lg">👟</span>
// //             </div>
// //             <span className="text-xl font-bold text-gray-900">SHOECREATIFY</span>
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <div className="hidden md:flex items-center space-x-6">
// //             <Link to="/designer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
// //               Designer
// //             </Link>
// //             <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative">
// //               Cart
// //               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
// //                 {getCartItemCount()}
// //               </span>
// //             </Link>
            
// //             {user ? (
// //               <div className="flex items-center space-x-4">
// //                 <Link to="/profile" className="flex items-center space-x-2">
// //                   <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
// //                     <span className="text-white text-sm">
// //                       {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
// //                     </span>
// //                   </div>
// //                   <span className="text-gray-700 font-medium">{user.firstName || 'User'}</span>
// //                 </Link>
// //                 <button
// //                   onClick={onLogout}
// //                   className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
// //                 >
// //                   Logout
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="flex items-center space-x-4">
// //                 <Link 
// //                   to="/login" 
// //                   className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
// //                 >
// //                   Login
// //                 </Link>
// //                 <Link 
// //                   to="/login" 
// //                   className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-medium rounded-lg transition-colors"
// //                 >
// //                   Sign Up
// //                 </Link>
// //               </div>
// //             )}
// //           </div>

// //           {/* Mobile menu button */}
// //           <button 
// //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //             className="md:hidden text-gray-700 focus:outline-none"
// //           >
// //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //             </svg>
// //           </button>
// //         </div>

// //         {/* Mobile Navigation */}
// //         {isMobileMenuOpen && (
// //           <div className="md:hidden border-t border-gray-200 py-4">
// //             <div className="flex flex-col space-y-4">
// //               <Link 
// //                 to="/designer" 
// //                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
// //                 onClick={() => setIsMobileMenuOpen(false)}
// //               >
// //                 Designer
// //               </Link>
// //               <Link 
// //                 to="/cart" 
// //                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 flex items-center"
// //                 onClick={() => setIsMobileMenuOpen(false)}
// //               >
// //                 Cart
// //                 <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
// //                   {getCartItemCount()}
// //                 </span>
// //               </Link>
              
// //               {user ? (
// //                 <>
// //                   <Link 
// //                     to="/profile" 
// //                     className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
// //                     onClick={() => setIsMobileMenuOpen(false)}
// //                   >
// //                     Profile
// //                   </Link>
// //                   <button
// //                     onClick={() => {
// //                       onLogout();
// //                       setIsMobileMenuOpen(false);
// //                     }}
// //                     className="text-left px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition-colors"
// //                   >
// //                     Logout
// //                   </button>
// //                 </>
// //               ) : (
// //                 <div className="flex flex-col space-y-3">
// //                   <Link 
// //                     to="/login" 
// //                     className="text-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors"
// //                     onClick={() => setIsMobileMenuOpen(false)}
// //                   >
// //                     Login
// //                   </Link>
// //                   <Link 
// //                     to="/login" 
// //                     className="text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-medium rounded-lg transition-colors"
// //                     onClick={() => setIsMobileMenuOpen(false)}
// //                   >
// //                     Sign Up
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaUser, FaShoppingCart, FaPaintBrush, FaHome, FaPhoneAlt } from 'react-icons/fa';

// const Navbar = ({ user, onLogout }) => {
//   return (
//     <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 border-b border-gray-200 shadow-sm">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-xl">SC</span>
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               SHOECREATIFY
//             </span>
//           </Link>

//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2">
//               <FaHome />
//               <span>Home</span>
//             </Link>
//             {user && (
//               <>
//                 <Link to="/designer" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2">
//                   <FaPaintBrush />
//                   <span>Designer</span>
//                 </Link>
//                 <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2 relative">
//                   <FaShoppingCart />
//                   <span>Cart</span>
//                 </Link>
//               </>
//             )}
//             {/* Add Contact Link */}
//             <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2">
//               <FaPhoneAlt />
//               <span>Contact</span>
//             </Link>
//           </div>

//           {/* User Profile / Login */}
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <Link to="/profile" className="flex items-center space-x-3 group">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//                     {user.name?.charAt(0)?.toUpperCase() || 'U'}
//                   </div>
//                   <div className="hidden md:block">
//                     <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
//                       {user.name}
//                     </p>
//                     <p className="text-sm text-gray-500">View Profile</p>
//                   </div>
//                 </Link>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={onLogout}
//                   className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
//                 >
//                   Logout
//                 </motion.button>
//               </>
//             ) : (
//               <Link to="/login">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md"
//                 >
//                   Sign In
//                 </motion.button>
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <div className="md:hidden border-t border-gray-200 mt-2 pt-2">
//           <div className="flex justify-around">
//             <Link to="/" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
//               <FaHome className="text-xl" />
//               <span className="text-xs mt-1">Home</span>
//             </Link>
//             {user && (
//               <>
//                 <Link to="/designer" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
//                   <FaPaintBrush className="text-xl" />
//                   <span className="text-xs mt-1">Designer</span>
//                 </Link>
//                 <Link to="/cart" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
//                   <FaShoppingCart className="text-xl" />
//                   <span className="text-xs mt-1">Cart</span>
//                 </Link>
//               </>
//             )}
//             {/* Mobile Contact Link */}
//             <Link to="/contact" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
//               <FaPhoneAlt className="text-xl" />
//               <span className="text-xs mt-1">Contact</span>
//             </Link>
//             {user && (
//               <Link to="/profile" className="flex flex-col items-center text-gray-700 hover:text-blue-600 transition-colors">
//                 <FaUser className="text-xl" />
//                 <span className="text-xs mt-1">Profile</span>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FaUser, 
//   FaShoppingCart, 
//   FaPaintBrush, 
//   FaHome, 
//   FaPhoneAlt, 
//   FaSearch,
//   FaBars,
//   FaTimes,
//   FaHeart,
//   FaBoxOpen
// } from 'react-icons/fa';
// import { FiLogOut } from 'react-icons/fi';

// const Navbar = ({ user, onLogout, cartCount = 0 }) => {
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMenuOpen(false);
//     setShowSearch(false);
//   }, [location]);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Check if link is active
//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   // Navigation items
//   const navItems = [
//     { path: '/', label: 'Home', icon: <FaHome /> },
//     { path: '/designer', label: 'Designer', icon: <FaPaintBrush />, requiresAuth: true },
//     { path: '/gallery', label: 'Gallery', icon: <FaBoxOpen /> },
//     { path: '/contact', label: 'Contact', icon: <FaPhoneAlt /> },
//   ];

//   const userItems = user ? [
//     { path: '/profile', label: 'Profile', icon: <FaUser /> },
//     { path: '/cart', label: 'Cart', icon: <FaShoppingCart />, badge: cartCount },
//     { path: '/wishlist', label: 'Wishlist', icon: <FaHeart /> },
//   ] : [];

//   return (
//     <>
//       <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         isScrolled 
//           ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
//           : 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
//       }`}>
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <Link to="/" className="flex items-center space-x-3 group">
//               <motion.div 
//                 whileHover={{ rotate: 5, scale: 1.05 }}
//                 className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
//               >
//                 <span className="text-white font-bold text-lg">SC</span>
//               </motion.div>
//               <div className="hidden sm:block">
//                 <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                   SHOECREATIFY
//                 </span>
//                 <p className="text-xs text-gray-500 -mt-1">Design Your Story</p>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-1">
//               {navItems.map((item) => {
//                 if (item.requiresAuth && !user) return null;
                
//                 return (
//                   <Link 
//                     key={item.path}
//                     to={item.path}
//                     className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
//                       isActive(item.path)
//                         ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-100'
//                         : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                     }`}
//                   >
//                     <span className="text-sm">{item.icon}</span>
//                     <span className="font-medium">{item.label}</span>
//                   </Link>
//                 );
//               })}
              
//               {/* Search Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setShowSearch(!showSearch)}
//                 className="ml-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <FaSearch />
//               </motion.button>
//             </div>

//             {/* Desktop User Actions */}
//             <div className="hidden md:flex items-center space-x-3">
//               {user ? (
//                 <>
//                   {userItems.map((item) => (
//                     <Link 
//                       key={item.path}
//                       to={item.path}
//                       className="relative flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors group"
//                     >
//                       <span className="text-lg">{item.icon}</span>
//                       {item.badge > 0 && (
//                         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//                           {Math.min(item.badge, 9)}
//                         </span>
//                       )}
//                       <span className="text-sm font-medium hidden lg:inline">{item.label}</span>
//                     </Link>
//                   ))}
                  
//                   {/* User Menu */}
//                   <div className="relative group">
//                     <button className="flex items-center space-x-3 group">
//                       <div className="relative">
//                         <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
//                           {user.name?.charAt(0)?.toUpperCase() || 'U'}
//                         </div>
//                         <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                       </div>
//                       <div className="text-left hidden lg:block">
//                         <p className="font-semibold text-gray-900 text-sm">{user.name || 'User'}</p>
//                         <p className="text-xs text-gray-500">Designer</p>
//                       </div>
//                     </button>
                    
//                     {/* Dropdown */}
//                     <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
//                       <div className="p-4 border-b border-gray-100">
//                         <p className="font-semibold text-gray-900">{user.name}</p>
//                         <p className="text-sm text-gray-500 truncate">{user.email}</p>
//                       </div>
//                       <div className="p-2">
//                         <Link 
//                           to="/profile" 
//                           className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                         >
//                           <FaUser className="text-sm" />
//                           <span className="text-sm">My Profile</span>
//                         </Link>
//                         <Link 
//                           to="/my-designs" 
//                           className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                         >
//                           <FaPaintBrush className="text-sm" />
//                           <span className="text-sm">My Designs</span>
//                         </Link>
//                         <button
//                           onClick={onLogout}
//                           className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <FiLogOut className="text-sm" />
//                           <span className="text-sm">Log Out</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex items-center space-x-3">
//                   <Link to="/login">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
//                     >
//                       Sign In
//                     </motion.button>
//                   </Link>
//                   <Link to="/login">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-5 py-2.5 bg-white text-gray-800 rounded-lg border border-gray-300 hover:border-blue-400 hover:bg-gray-50 transition-colors font-medium"
//                     >
//                       Sign Up Free
//                     </motion.button>
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="flex items-center space-x-3 md:hidden">
//               {user && cartCount > 0 && (
//                 <Link to="/cart" className="relative">
//                   <FaShoppingCart className="text-xl text-gray-700" />
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
//                     {Math.min(cartCount, 9)}
//                   </span>
//                 </Link>
//               )}
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="p-2 text-gray-700 hover:text-blue-600 rounded-lg transition-colors"
//               >
//                 {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//               </button>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <AnimatePresence>
//             {showSearch && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="hidden md:block overflow-hidden"
//               >
//                 <div className="py-4 border-t border-gray-100">
//                   <div className="relative max-w-md mx-auto">
//                     <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="search"
//                       placeholder="Search designs, templates, or users..."
//                       className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       autoFocus
//                     />
//                     <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 font-medium">
//                       Search
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden overflow-hidden bg-white border-t border-gray-200"
//             >
//               <div className="container mx-auto px-4 py-4">
//                 {/* Search in mobile */}
//                 <div className="mb-4">
//                   <div className="relative">
//                     <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="search"
//                       placeholder="Search..."
//                       className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 {/* Navigation Links */}
//                 <div className="space-y-1">
//                   {navItems.map((item) => {
//                     if (item.requiresAuth && !user) return null;
                    
//                     return (
//                       <Link
//                         key={item.path}
//                         to={item.path}
//                         className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                           isActive(item.path)
//                             ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-100'
//                             : 'text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         <span className="text-lg">{item.icon}</span>
//                         <span className="font-medium">{item.label}</span>
//                       </Link>
//                     );
//                   })}
//                 </div>

//                 {/* User Links */}
//                 {user && (
//                   <>
//                     <div className="border-t border-gray-200 my-3 pt-3">
//                       <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                         Your Account
//                       </p>
//                       <div className="space-y-1">
//                         {userItems.map((item) => (
//                           <Link
//                             key={item.path}
//                             to={item.path}
//                             className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
//                           >
//                             <div className="flex items-center space-x-3">
//                               <span className="text-lg">{item.icon}</span>
//                               <span className="font-medium">{item.label}</span>
//                             </div>
//                             {item.badge > 0 && (
//                               <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
//                                 {item.badge}
//                               </span>
//                             )}
//                           </Link>
//                         ))}
//                         <Link
//                           to="/my-designs"
//                           className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
//                         >
//                           <FaPaintBrush className="text-lg" />
//                           <span className="font-medium">My Designs</span>
//                         </Link>
//                       </div>
//                     </div>

//                     {/* User Info */}
//                     <div className="border-t border-gray-200 my-3 pt-3">
//                       <div className="flex items-center space-x-3 px-4 py-3">
//                         <div className="relative">
//                           <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//                             {user.name?.charAt(0)?.toUpperCase() || 'U'}
//                           </div>
//                           <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                         </div>
//                         <div className="flex-1">
//                           <p className="font-semibold text-gray-900">{user.name}</p>
//                           <p className="text-sm text-gray-500 truncate">{user.email}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 {/* Auth Buttons */}
//                 {!user ? (
//                   <div className="border-t border-gray-200 pt-4 mt-3">
//                     <div className="grid grid-cols-2 gap-3">
//                       <Link to="/login">
//                         <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium">
//                           Sign In
//                         </button>
//                       </Link>
//                       <Link to="/signup">
//                         <button className="w-full py-3 bg-white text-gray-800 rounded-lg border border-gray-300 font-medium">
//                           Sign Up
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={onLogout}
//                     className="w-full mt-3 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium flex items-center justify-center space-x-2"
//                   >
//                     <FiLogOut />
//                     <span>Log Out</span>
//                   </button>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* Spacer for fixed navbar */}
//       <div className="h-16 md:h-16"></div>
//     </>
//   );
// };

// // Add default props
// Navbar.defaultProps = {
//   cartCount: 0,
//   user: null,
//   onLogout: () => console.log('Logout clicked'),
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaShoppingCart, 
  FaPaintBrush, 
  FaHome, 
  FaPhoneAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import shoecreatifyLogo from '../assets/logo.webp';

const Navbar = ({ user, onLogout, cartCount = 0 }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Simplified navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/designer', label: 'Design Studio', icon: <FaPaintBrush />, requiresAuth: true },
    { path: '/contact', label: 'Contact', icon: <FaPhoneAlt /> },
  ];

  const userItems = user ? [
    { path: '/profile', label: 'Profile', icon: <FaUser /> },
    { path: '/cart', label: 'Cart', icon: <FaShoppingCart />, badge: cartCount },
  ] : [];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo with Website Name */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                {/* Logo Image */}
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src={shoecreatifyLogo} 
                    alt="SHOECREATIFY Logo" 
                    className="h-10 w-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                          <span class="text-white font-bold text-lg">SC</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                
                {/* Website Name */}
                <div className="hidden sm:block">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                      SHOECREATIFY
                    </span>
                    <p className="text-xs text-gray-500 -mt-1">Design Your Story</p>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                if (item.requiresAuth && !user) return null;
                
                return (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-100'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  {userItems.map((item) => (
                    <Link 
                      key={item.path}
                      to={item.path}
                      className="relative flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.badge > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                          {Math.min(item.badge, 9)}
                        </span>
                      )}
                      <span className="text-sm font-medium hidden lg:inline">{item.label}</span>
                    </Link>
                  ))}
                  
                  {/* User Menu */}
                  <div className="relative group">
                    <button className="flex items-center space-x-3 group">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {user.firstName?.charAt(0)?.toUpperCase() || user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="text-left hidden lg:block">
                        <p className="font-semibold text-gray-900 text-sm">{user.firstName || user.name || 'User'}</p>
                        <p className="text-xs text-gray-500">Designer</p>
                      </div>
                    </button>
                    
                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user.firstName || user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link 
                          to="/profile" 
                          className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FaUser className="text-sm" />
                          <span className="text-sm">My Profile</span>
                        </Link>
                        <Link 
                          to="/designer" 
                          className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FaPaintBrush className="text-sm" />
                          <span className="text-sm">Design Studio</span>
                        </Link>
                        <Link 
                          to="/cart" 
                          className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FaShoppingCart className="text-sm" />
                          <span className="text-sm">My Cart {cartCount > 0 && `(${cartCount})`}</span>
                        </Link>
                        <button
                          onClick={onLogout}
                          className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiLogOut className="text-sm" />
                          <span className="text-sm">Log Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-3 md:hidden">
              {user && cartCount > 0 && (
                <Link to="/cart" className="relative">
                  <FaShoppingCart className="text-xl text-gray-700" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {Math.min(cartCount, 9)}
                  </span>
                </Link>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 rounded-lg transition-colors"
              >
                {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-4">
                {/* Logo and Name in Mobile */}
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img 
                      src={shoecreatifyLogo} 
                      alt="SHOECREATIFY Logo" 
                      className="h-10 w-auto object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                            <span class="text-white font-bold text-lg">SC</span>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      SHOECREATIFY
                    </span>
                    <p className="text-xs text-gray-500">Design Your Story</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1">
                  {navItems.map((item) => {
                    if (item.requiresAuth && !user) return null;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive(item.path)
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-100'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* User Links */}
                {user && (
                  <>
                    <div className="border-t border-gray-200 my-3 pt-3">
                      <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Your Account
                      </p>
                      <div className="space-y-1">
                        {userItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{item.icon}</span>
                              <span className="font-medium">{item.label}</span>
                            </div>
                            {item.badge > 0 && (
                              <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="border-t border-gray-200 my-3 pt-3">
                      <div className="flex items-center space-x-3 px-4 py-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.firstName?.charAt(0)?.toUpperCase() || user.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{user.firstName || user.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Auth Buttons */}
                {!user ? (
                  <div className="border-t border-gray-200 pt-4 mt-3">
                    <div className="flex flex-col gap-3">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium">
                          Get Started
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full mt-3 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium flex items-center justify-center space-x-2"
                  >
                    <FiLogOut />
                    <span>Log Out</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-16"></div>
    </>
  );
};

// Add default props
Navbar.defaultProps = {
  cartCount: 0,
  user: null,
  onLogout: () => console.log('Logout clicked'),
};

export default Navbar;