// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FaUser, 
//   FaShoppingCart, 
//   FaPaintBrush, 
//   FaHome, 
//   FaPhoneAlt,
//   FaBars,
//   FaTimes
// } from 'react-icons/fa';
// import { FiLogOut } from 'react-icons/fi';
// import shoecreatifyLogo from '../assets/logo.webp';

// // Throttle helper function
// const throttle = (func, limit) => {
//   let inThrottle;
//   return function() {
//     const args = arguments;
//     const context = this;
//     if (!inThrottle) {
//       func.apply(context, args);
//       inThrottle = true;
//       setTimeout(() => inThrottle = false, limit);
//     }
//   };
// };

// const Navbar = ({ user, onLogout, cartCount = 0 }) => {
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Combine scroll and route change logic with throttle
//   useEffect(() => {
//     setIsMenuOpen(false);
    
//     const handleScroll = throttle(() => {
//       setIsScrolled(window.scrollY > 10);
//     }, 100);
    
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [location]);

//   // Memoize the active check
//   const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

//   // Memoize navigation items
//   const navItems = useMemo(() => [
//     { path: '/', label: 'Home', icon: <FaHome /> },
//     { path: '/designer', label: 'Design Studio', icon: <FaPaintBrush />, requiresAuth: true },
//     { path: '/contact', label: 'Contact', icon: <FaPhoneAlt /> },
//   ], []);

//   const userItems = useMemo(() => user ? [
//     { path: '/profile', label: 'Profile', icon: <FaUser /> },
//     { path: '/cart', label: 'Cart', icon: <FaShoppingCart />, badge: cartCount },
//   ] : [], [user, cartCount]);

//   // Memoize toggle handler
//   const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

//   // Memoize logout handler
//   const handleLogout = useCallback(() => {
//     onLogout();
//     setIsMenuOpen(false);
//   }, [onLogout]);

//   return (
//     <>
//       <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         isScrolled 
//           ? 'bg-white/95 shadow-lg border-b border-gray-200/50' 
//           : 'bg-white/90 shadow-sm border-b border-gray-100'
//       }`}>
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.2 }}
//                 className="flex items-center space-x-3"
//               >
//                 <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
//                   <img 
//                     src={shoecreatifyLogo} 
//                     alt="SHOECREATIFY Logo" 
//                     className="h-10 w-auto object-contain"
//                     loading="eager"
//                     onError={(e) => {
//                       e.target.style.display = 'none';
//                       e.target.parentElement.innerHTML = `<div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md"><span class="text-white font-bold text-lg">SC</span></div>`;
//                     }}
//                   />
//                 </div>
                
//                 <div className="hidden sm:block">
//                   <div className="flex flex-col">
//                     <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
//                       SHOECREATIFY
//                     </span>
//                     <p className="text-xs text-gray-500 -mt-1">Design Your Story</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-1">
//               {navItems.map((item) => {
//                 if (item.requiresAuth && !user) return null;
//                 const active = isActive(item.path);
                
//                 return (
//                   <Link 
//                     key={item.path}
//                     to={item.path}
//                     className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
//                       active
//                         ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-100'
//                         : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                     }`}
//                   >
//                     <span className="text-sm">{item.icon}</span>
//                     <span className="font-medium">{item.label}</span>
//                   </Link>
//                 );
//               })}
//             </div>

//             {/* Desktop User Actions */}
//             <div className="hidden md:flex items-center space-x-3">
//               {user ? (
//                 <>
//                   {userItems.map((item) => {
//                     const active = isActive(item.path);
//                     return (
//                       <Link 
//                         key={item.path}
//                         to={item.path}
//                         className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
//                           active ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                         }`}
//                       >
//                         <span className="text-lg">{item.icon}</span>
//                         {item.badge > 0 && (
//                           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                             {Math.min(item.badge, 9)}
//                           </span>
//                         )}
//                         <span className="text-sm font-medium hidden lg:inline">{item.label}</span>
//                       </Link>
//                     );
//                   })}
                  
//                   {/* User Menu */}
//                   <UserMenu user={user} handleLogout={handleLogout} cartCount={cartCount} />
//                 </>
//               ) : (
//                 <Link to="/login">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     transition={{ duration: 0.2 }}
//                     className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
//                   >
//                     Get Started
//                   </motion.button>
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="flex items-center space-x-3 md:hidden">
//               {user && cartCount > 0 && (
//                 <Link to="/cart" className="relative flex-shrink-0">
//                   <FaShoppingCart className="text-xl text-gray-700" />
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {Math.min(cartCount, 9)}
//                   </span>
//                 </Link>
//               )}
//               <button
//                 onClick={toggleMenu}
//                 className="p-2 text-gray-700 hover:text-blue-600 rounded-lg transition-colors"
//                 aria-label="Toggle menu"
//               >
//                 {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <MobileMenu 
//               navItems={navItems}
//               userItems={userItems}
//               user={user}
//               isActive={isActive}
//               handleLogout={handleLogout}
//               cartCount={cartCount}
//               onClose={() => setIsMenuOpen(false)}
//             />
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* Spacer */}
//       <div className="h-16 md:h-16" aria-hidden="true"></div>
//     </>
//   );
// };

// // Extracted User Menu Component
// const UserMenu = React.memo(({ user, handleLogout, cartCount }) => (
//   <div className="relative group">
//     <button className="flex items-center space-x-3" aria-label="User menu">
//       <div className="relative">
//         <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
//           {user.firstName?.charAt(0)?.toUpperCase() || user.name?.charAt(0)?.toUpperCase() || 'U'}
//         </div>
//         <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//       </div>
//       <div className="text-left hidden lg:block">
//         <p className="font-semibold text-gray-900 text-sm">{user.firstName || user.name || 'User'}</p>
//         <p className="text-xs text-gray-500">Designer</p>
//       </div>
//     </button>
    
//     <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
//       <div className="p-4 border-b border-gray-100">
//         <p className="font-semibold text-gray-900">{user.firstName || user.name}</p>
//         <p className="text-sm text-gray-500 truncate">{user.email}</p>
//       </div>
//       <div className="p-2">
//         <Link to="/profile" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//           <FaUser className="text-sm" />
//           <span className="text-sm">My Profile</span>
//         </Link>
//         <Link to="/designer" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//           <FaPaintBrush className="text-sm" />
//           <span className="text-sm">Design Studio</span>
//         </Link>
//         <Link to="/cart" className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//           <FaShoppingCart className="text-sm" />
//           <span className="text-sm">My Cart {cartCount > 0 && `(${cartCount})`}</span>
//         </Link>
//         <button
//           onClick={handleLogout}
//           className="flex items-center space-x-3 w-full px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//         >
//           <FiLogOut className="text-sm" />
//           <span className="text-sm">Log Out</span>
//         </button>
//       </div>
//     </div>
//   </div>
// ));

// UserMenu.displayName = 'UserMenu';

// // Extracted Mobile Menu Component
// const MobileMenu = React.memo(({ navItems, userItems, user, isActive, handleLogout, cartCount, onClose }) => (
//   <motion.div
//     initial={{ opacity: 0, height: 0 }}
//     animate={{ opacity: 1, height: 'auto' }}
//     exit={{ opacity: 0, height: 0 }}
//     transition={{ duration: 0.2 }}
//     className="md:hidden overflow-hidden bg-white border-t border-gray-200"
//   >
//     <div className="container mx-auto px-4 py-4 space-y-4">
//       {/* Navigation Links */}
//       <div className="space-y-1">
//         {navItems.map((item) => {
//           if (item.requiresAuth && !user) return null;
//           const active = isActive(item.path);
          
//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               onClick={onClose}
//               className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                 active
//                   ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-100'
//                   : 'text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className="font-medium">{item.label}</span>
//             </Link>
//           );
//         })}
//       </div>

//       {/* User Links */}
//       {user && (
//         <>
//           <div className="border-t border-gray-200 pt-3">
//             <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//               Your Account
//             </p>
//             <div className="space-y-1">
//               {userItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={onClose}
//                   className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <span className="text-lg">{item.icon}</span>
//                     <span className="font-medium">{item.label}</span>
//                   </div>
//                   {item.badge > 0 && (
//                     <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
//                       {item.badge}
//                     </span>
//                   )}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* User Info */}
//           <div className="border-t border-gray-200 pt-3">
//             <div className="flex items-center space-x-3 px-4 py-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
//                 {user.firstName?.charAt(0)?.toUpperCase() || user.name?.charAt(0)?.toUpperCase() || 'U'}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="font-semibold text-gray-900">{user.firstName || user.name}</p>
//                 <p className="text-sm text-gray-500 truncate">{user.email}</p>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="w-full py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
//           >
//             <FiLogOut />
//             <span>Log Out</span>
//           </button>
//         </>
//       )}

//       {/* Auth Button */}
//       {!user && (
//         <Link to="/login" onClick={onClose} className="w-full">
//           <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
//             Get Started
//           </button>
//         </Link>
//       )}
//     </div>
//   </motion.div>
// ));

// MobileMenu.displayName = 'MobileMenu';

// Navbar.defaultProps = {
//   cartCount: 0,
//   user: null,
//   onLogout: () => console.log('Logout clicked'),
// };

// export default React.memo(Navbar);




import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { FiLogOut, FiUser, FiFolder } from 'react-icons/fi';
import shoecreatifyLogo from '../assets/logo.png';
import { MdOutlineImage } from 'react-icons/md'
const Navbar = ({ user, onLogout, cartCount = 0 }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/designer', label: 'Studio', requiresAuth: true },
    { path: '/suggestions', label: 'CratMan', requiresAuth: true },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="relative w-10 h-10 flex items-center justify-center bg-black rounded-xl overflow-hidden"
            >
              <img
                src={shoecreatifyLogo}
                alt="Logo"
                className="w-11 h-11 object-contain invert"
              />
            </motion.div>
            <span className="text-2xl font-semibold tracking-tight text-gray-600">
              ShoeCraftify
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center bg-gray-100/50 p-1 rounded-full border border-black/5">
            {navItems.map((item) => {
              if (item.requiresAuth && !user) return null;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-6 py-2 text-[10px] uppercase tracking-[0.15em] font-bold transition-all ${
                    active ? 'text-white' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-black rounded-full"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">

            {/* CART */}
            <Link to="/cart" className="relative p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* USER */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 pl-4 bg-gray-100 rounded-full border border-black/5">
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                    {user.firstName || 'Account'}
                  </span>
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {user.firstName?.charAt(0) || 'U'}
                  </div>
                </button>

                {/* DROPDOWN */}
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-black/5 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-4 border-b text-sm font-semibold truncate">
                    {user.email}
                  </div>
                  <div className="space-y-1 text-xs font-bold uppercase tracking-widest">
                    <DropdownLink to="/profile" icon={<FiUser />} label="Profile" />
                
                    <DropdownLink to="/my-designs" icon={<MdOutlineImage />} label="My Designs" />
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl"
                    >
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Login
                </button>
              </Link>
            )}

            {/* MOBILE */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-3 bg-gray-100 rounded-full"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col"
          >
            <div className="p-8 flex justify-between">
              <span className="font-black">ShoeCraftify</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-gray-100 rounded-full">
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-10 gap-6">
              {navItems.map((item, i) => (
                <motion.div key={item.path} initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-5xl font-black uppercase tracking-tight hover:text-gray-400"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DropdownLink = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
    {icon} {label}
  </Link>
);

export default Navbar;