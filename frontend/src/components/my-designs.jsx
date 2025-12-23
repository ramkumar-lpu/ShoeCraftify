// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useCart } from '../contexts/CartContext';

// // const MyDesigns = ({ user }) => {
// //   const navigate = useNavigate();
// //   const { addToCart, cartItems, removeFromCart } = useCart();
// //   const [designs, setDesigns] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Load designs from localStorage
// //   useEffect(() => {
// //     const loadDesigns = () => {
// //       try {
// //         const saved = localStorage.getItem('savedShoeDesigns');
// //         if (saved) {
// //           const parsedDesigns = JSON.parse(saved);
          
// //           // Keep legacy designs (no userId) + match id/_id
// //           const userDesigns = user
// //             ? parsedDesigns.filter(design =>
// //                 !design.userId || 
// //                 design.userId === user.id || 
// //                 design.userId === user._id
// //               )
// //             : parsedDesigns;
          
// //           setDesigns(userDesigns);
// //         } else {
// //           setDesigns([]);
// //         }
// //       } catch (error) {
// //         console.error('Error loading designs:', error);
// //         setDesigns([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadDesigns();
    
// //     // Listen for storage events from other tabs/windows
// //     const handleStorageChange = (e) => {
// //       if (e.key === 'savedShoeDesigns') {
// //         loadDesigns();
// //       }
// //     };

// //     window.addEventListener('storage', handleStorageChange);
// //     return () => window.removeEventListener('storage', handleStorageChange);
// //   }, [user]);

// //   // Convert USD to INR
// //   const convertToINR = (usdPrice) => {
// //     const exchangeRate = 83;
// //     return (usdPrice * exchangeRate).toFixed(2);
// //   };

// //   const handleAddToCart = (design) => {
// //     const cartItem = {
// //       id: design.id,
// //       name: design.name,
// //       colors: design.colors,
// //       preview: design.preview,
// //       price: 129.99,
// //       priceINR: convertToINR(129.99),
// //       quantity: 1,
// //       type: 'custom-design',
// //       createdAt: design.createdAt
// //     };

// //     addToCart(cartItem);
// //     alert(`"${design.name}" added to cart!`);
// //   };

// //   const handleDeleteDesign = (designId) => {
// //     if (window.confirm('Are you sure you want to delete this design?')) {
// //       const updated = designs.filter(d => d.id !== designId);
// //       setDesigns(updated);
      
// //       // Update localStorage - remove only this design
// //       const allDesigns = JSON.parse(localStorage.getItem('savedShoeDesigns') || '[]');
// //       const filteredDesigns = allDesigns.filter(d => d.id !== designId);
// //       localStorage.setItem('savedShoeDesigns', JSON.stringify(filteredDesigns));
      
// //       // Also remove from cart if it exists
// //       const cartItem = cartItems.find(item => item.id === designId);
// //       if (cartItem) {
// //         removeFromCart(designId);
// //       }
      
// //       alert('Design deleted successfully!');
// //     }
// //   };

// //   const handleEditDesign = (design) => {
// //     navigate('/designer', { state: { design } });
// //   };

// //   const handleDownloadDesign = (design) => {
// //     const dataStr = JSON.stringify(design, null, 2);
// //     const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
// //     const exportFileDefaultName = `${design.name.replace(/\s+/g, '-')}.json`;
    
// //     const linkElement = document.createElement('a');
// //     linkElement.setAttribute('href', dataUri);
// //     linkElement.setAttribute('download', exportFileDefaultName);
// //     document.body.appendChild(linkElement);
// //     linkElement.click();
// //     document.body.removeChild(linkElement);
    
// //     alert(`Design "${design.name}" downloaded!`);
// //   };

// //   const isInCart = (designId) => {
// //     return cartItems.some(item => item.id === designId);
// //   };

// //   // Function to format date
// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'Recently';
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-IN', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric'
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
// //         <p className="ml-4 text-gray-600">Loading your designs...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
// //           <div>
// //             <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
// //               My Designs
// //             </h1>
// //             <p className="text-gray-600">
// //               {designs.length} design{designs.length !== 1 ? 's' : ''} created
// //               {user && <span> by {user.name || user.email}</span>}
// //             </p>
// //           </div>
// //           <button
// //             onClick={() => navigate('/designer')}
// //             className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition duration-200 shadow-lg hover:shadow-xl"
// //           >
// //             + Create New Design
// //           </button>
// //         </div>

// //         {/* Empty State */}
// //         {designs.length === 0 ? (
// //           <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
// //             <div className="text-6xl mb-4">👟</div>
// //             <h2 className="text-3xl font-black mb-3 uppercase tracking-tight">
// //               No Designs Found
// //             </h2>
// //             <p className="text-gray-600 text-lg mb-8">
// //               {user 
// //                 ? `Start creating your first custom shoe design, ${user.name || user.email}!`
// //                 : 'Start creating your first custom shoe design and build your collection'
// //               }
// //             </p>
// //             <button
// //               onClick={() => navigate('/designer')}
// //               className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition duration-200"
// //             >
// //               Create Your First Design
// //             </button>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Designs Grid */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
// //               {designs.map((design) => {
// //                 const inCart = isInCart(design.id);
// //                 const priceINR = convertToINR(129.99);
                
// //                 return (
// //                   <div
// //                     key={design.id}
// //                     className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group"
// //                   >
// //                     {/* Design Preview */}
// //                     <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-56 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition duration-300">
// //                       {design.preview ? (
// //                         <img
// //                           src={design.preview}
// //                           alt={design.name}
// //                           className="w-full h-full object-contain p-4"
// //                         />
// //                       ) : (
// //                         <div className="flex flex-col items-center justify-center w-full h-full p-4">
// //                           <div className="text-5xl mb-3">👟</div>
// //                           <div className="flex flex-wrap gap-2 justify-center mb-3">
// //                             {design.colors && Object.entries(design.colors).map(([key, color]) => (
// //                               <div
// //                                 key={key}
// //                                 className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition transform"
// //                                 style={{ backgroundColor: color }}
// //                                 title={`${key}: ${color}`}
// //                               />
// //                             ))}
// //                           </div>
// //                           <span className="text-xs font-bold text-gray-500 uppercase">Preview Mode</span>
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Design Info */}
// //                     <div className="p-6">
// //                       <h3 className="text-lg font-black uppercase tracking-tight mb-2 line-clamp-2">
// //                         {design.name}
// //                       </h3>
// //                       <p className="text-sm text-gray-500 mb-4">
// //                         Created {formatDate(design.createdAt)}
// //                       </p>

// //                       {/* Color Info */}
// //                       <div className="mb-4 p-3 bg-gray-50 rounded-xl">
// //                         <p className="text-xs font-bold uppercase text-gray-600 mb-2">
// //                           Color Scheme
// //                         </p>
// //                         <div className="grid grid-cols-2 gap-2 text-[10px]">
// //                           {design.colors && Object.entries(design.colors).map(([part, color]) => (
// //                             <div key={part} className="flex items-center gap-2">
// //                               <div
// //                                 className="w-4 h-4 rounded border border-gray-300"
// //                                 style={{ backgroundColor: color }}
// //                               />
// //                               <span className="capitalize font-semibold text-gray-600 truncate">
// //                                 {part.replace(/([A-Z])/g, ' $1').trim()}
// //                               </span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>

// //                       {/* Price in INR */}
// //                       <div className="mb-6">
// //                         <div className="text-2xl font-black text-gray-900">
// //                           ₹{priceINR}
// //                         </div>
// //                         <div className="text-sm text-gray-500 line-through">
// //                           $129.99 USD
// //                         </div>
// //                       </div>

// //                       {/* Action Buttons */}
// //                       <div className="space-y-3">
// //                         <div className="grid grid-cols-2 gap-3">
// //                           <button
// //                             onClick={() => handleEditDesign(design)}
// //                             className="px-4 py-3 bg-black text-white text-xs font-bold uppercase rounded-xl hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2"
// //                           >
// //                             ✏️ Edit
// //                           </button>
// //                           <button
// //                             onClick={() => handleAddToCart(design)}
// //                             disabled={inCart}
// //                             className={`px-4 py-3 text-xs font-bold uppercase rounded-xl transition duration-200 flex items-center justify-center gap-2 ${
// //                               inCart
// //                                 ? 'bg-green-100 text-green-700 border-2 border-green-300 cursor-not-allowed'
// //                                 : 'border-2 border-black text-black hover:bg-black hover:text-white'
// //                             }`}
// //                           >
// //                             {inCart ? '✓ In Cart' : '🛒 Add Cart'}
// //                           </button>
// //                         </div>

// //                         <div className="grid grid-cols-2 gap-3">
// //                           <button
// //                             onClick={() => handleDownloadDesign(design)}
// //                             className="px-4 py-3 border-2 border-gray-300 text-gray-700 text-xs font-bold uppercase rounded-xl hover:border-gray-400 hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-2"
// //                           >
// //                             📥 Export
// //                           </button>
// //                           <button
// //                             onClick={() => handleDeleteDesign(design.id)}
// //                             className="px-4 py-3 border-2 border-red-300 text-red-600 text-xs font-bold uppercase rounded-xl hover:bg-red-50 transition duration-200 flex items-center justify-center gap-2"
// //                           >
// //                             🗑️ Delete
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>

// //             {/* Quick Actions */}
// //             <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
// //               <button
// //                 onClick={() => navigate('/designer')}
// //                 className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2"
// //               >
// //                 + Create Another Design
// //               </button>
// //               <button
// //                 onClick={() => navigate('/cart')}
// //                 className="px-8 py-4 border-2 border-black text-black rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition duration-200 flex items-center justify-center gap-2"
// //               >
// //                 🛒 View Cart ({cartItems.length})
// //               </button>
// //             </div>
            
// //             {/* Statistics */}
// //             <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
// //               <h3 className="text-xl font-black uppercase mb-4">Design Statistics</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div className="text-center p-4 bg-gray-50 rounded-xl">
// //                   <div className="text-3xl font-black text-gray-900">{designs.length}</div>
// //                   <div className="text-sm text-gray-600">Total Designs</div>
// //                 </div>
// //                 <div className="text-center p-4 bg-gray-50 rounded-xl">
// //                   <div className="text-3xl font-black text-gray-900">
// //                     {cartItems.filter(item => item.type === 'custom-design').length}
// //                   </div>
// //                   <div className="text-sm text-gray-600">In Cart</div>
// //                 </div>
// //                 <div className="text-center p-4 bg-gray-50 rounded-xl">
// //                   <div className="text-3xl font-black text-gray-900">
// //                     ₹{(designs.length * 129.99 * 83).toFixed(0)}
// //                   </div>
// //                   <div className="text-sm text-gray-600">Total Value (INR)</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyDesigns;







// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../contexts/CartContext';

// const MyDesigns = ({ user }) => {
//   const navigate = useNavigate();
//   const { addToCart, cartItems, removeFromCart } = useCart();
//   const [designs, setDesigns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load designs from localStorage
//   useEffect(() => {
//     const loadDesigns = () => {
//       try {
//         const saved = localStorage.getItem('savedShoeDesigns');
//         if (saved) {
//           const parsedDesigns = JSON.parse(saved);
          
//           // Debug: Log designs to check preview data
//           console.log('Loaded designs:', parsedDesigns);
//           parsedDesigns.forEach((design, index) => {
//             console.log(`Design ${index} (${design.name}):`, {
//               hasPreview: !!design.preview,
//               previewLength: design.preview ? design.preview.length : 0,
//               previewStart: design.preview ? design.preview.substring(0, 50) : 'none'
//             });
//           });
          
//           // Keep legacy designs (no userId) + match id/_id
//           const userDesigns = user
//             ? parsedDesigns.filter(design =>
//                 !design.userId || 
//                 design.userId === user.id || 
//                 design.userId === user._id
//               )
//             : parsedDesigns;
          
//           setDesigns(userDesigns);
//         } else {
//           setDesigns([]);
//         }
//       } catch (error) {
//         console.error('Error loading designs:', error);
//         setDesigns([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDesigns();
    
//     // Listen for storage events from other tabs/windows
//     const handleStorageChange = (e) => {
//       if (e.key === 'savedShoeDesigns') {
//         loadDesigns();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [user]);

//   // Convert USD to INR
//   const convertToINR = (usdPrice) => {
//     const exchangeRate = 83;
//     return (usdPrice * exchangeRate).toFixed(2);
//   };

//   const handleAddToCart = (design) => {
//     const cartItem = {
//       id: design.id,
//       name: design.name,
//       colors: design.colors,
//       preview: design.preview,
//       price: 129.99,
//       priceINR: convertToINR(129.99),
//       quantity: 1,
//       type: 'custom-design',
//       createdAt: design.createdAt
//     };

//     addToCart(cartItem);
//     alert(`"${design.name}" added to cart!`);
//   };

//   const handleDeleteDesign = (designId) => {
//     if (window.confirm('Are you sure you want to delete this design?')) {
//       const updated = designs.filter(d => d.id !== designId);
//       setDesigns(updated);
      
//       // Update localStorage - remove only this design
//       const allDesigns = JSON.parse(localStorage.getItem('savedShoeDesigns') || '[]');
//       const filteredDesigns = allDesigns.filter(d => d.id !== designId);
//       localStorage.setItem('savedShoeDesigns', JSON.stringify(filteredDesigns));
      
//       // Also remove from cart if it exists
//       const cartItem = cartItems.find(item => item.id === designId);
//       if (cartItem) {
//         removeFromCart(designId);
//       }
      
//       alert('Design deleted successfully!');
//     }
//   };

//   const handleEditDesign = (design) => {
//     navigate('/designer', { state: { design } });
//   };

//   const handleDownloadDesign = (design) => {
//     const dataStr = JSON.stringify(design, null, 2);
//     const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
//     const exportFileDefaultName = `${design.name.replace(/\s+/g, '-')}.json`;
    
//     const linkElement = document.createElement('a');
//     linkElement.setAttribute('href', dataUri);
//     linkElement.setAttribute('download', exportFileDefaultName);
//     document.body.appendChild(linkElement);
//     linkElement.click();
//     document.body.removeChild(linkElement);
    
//     alert(`Design "${design.name}" downloaded!`);
//   };

//   const isInCart = (designId) => {
//     return cartItems.some(item => item.id === designId);
//   };

//   // Function to format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Recently';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//         <p className="ml-4 text-gray-600">Loading your designs...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
//           <div>
//             <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
//               My Designs
//             </h1>
//             <p className="text-gray-600">
//               {designs.length} design{designs.length !== 1 ? 's' : ''} created
//               {user && <span> by {user.name || user.email}</span>}
//             </p>
//           </div>
//           <button
//             onClick={() => navigate('/designer')}
//             className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition duration-200 shadow-lg hover:shadow-xl"
//           >
//             + Create New Design
//           </button>
//         </div>

//         {/* Empty State */}
//         {designs.length === 0 ? (
//           <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
//             <div className="text-6xl mb-4">👟</div>
//             <h2 className="text-3xl font-black mb-3 uppercase tracking-tight">
//               No Designs Found
//             </h2>
//             <p className="text-gray-600 text-lg mb-8">
//               {user 
//                 ? `Start creating your first custom shoe design, ${user.name || user.email}!`
//                 : 'Start creating your first custom shoe design and build your collection'
//               }
//             </p>
//             <button
//               onClick={() => navigate('/designer')}
//               className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition duration-200"
//             >
//               Create Your First Design
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* Designs Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//               {designs.map((design) => {
//                 const inCart = isInCart(design.id);
//                 const priceINR = convertToINR(129.99);
                
//                 // Debug: Check if preview exists
//                 const hasValidPreview = design.preview && design.preview.startsWith('data:image');
//                 console.log(`Card ${design.name}: hasValidPreview=${hasValidPreview}`);
                
//                 return (
//                   <div
//                     key={design.id}
//                     className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group"
//                   >
//                     {/* Design Preview */}
//                     <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-56 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition duration-300">
//                       {hasValidPreview ? (
//                         <img
//                           src={design.preview}
//                           alt={design.name}
//                           className="w-full h-full object-contain p-4"
//                           onError={(e) => {
//                             console.error('Image failed to load:', design.name);
//                             e.target.style.display = 'none';
//                           }}
//                         />
//                       ) : (
//                         <div className="flex flex-col items-center justify-center w-full h-full p-4">
//                           <div className="text-5xl mb-3">👟</div>
//                           <div className="flex flex-wrap gap-2 justify-center mb-3">
//                             {design.colors && Object.entries(design.colors).map(([key, color]) => (
//                               <div
//                                 key={key}
//                                 className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition transform"
//                                 style={{ backgroundColor: color }}
//                                 title={`${key}: ${color}`}
//                               />
//                             ))}
//                           </div>
//                           <span className="text-xs font-bold text-gray-500 uppercase">
//                             {design.preview ? 'Invalid Preview' : 'No Preview Captured'}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Design Info */}
//                     <div className="p-6">
//                       <h3 className="text-lg font-black uppercase tracking-tight mb-2 line-clamp-2">
//                         {design.name}
//                       </h3>
//                       <p className="text-sm text-gray-500 mb-4">
//                         Created {formatDate(design.createdAt)}
//                       </p>

//                       {/* Color Info */}
//                       <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//                         <p className="text-xs font-bold uppercase text-gray-600 mb-2">
//                           Color Scheme
//                         </p>
//                         <div className="grid grid-cols-2 gap-2 text-[10px]">
//                           {design.colors && Object.entries(design.colors).map(([part, color]) => (
//                             <div key={part} className="flex items-center gap-2">
//                               <div
//                                 className="w-4 h-4 rounded border border-gray-300"
//                                 style={{ backgroundColor: color }}
//                               />
//                               <span className="capitalize font-semibold text-gray-600 truncate">
//                                 {part.replace(/([A-Z])/g, ' $1').trim()}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Price in INR */}
//                       <div className="mb-6">
//                         <div className="text-2xl font-black text-gray-900">
//                           ₹{priceINR}
//                         </div>
//                         <div className="text-sm text-gray-500 line-through">
//                           $129.99 USD
//                         </div>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="space-y-3">
//                         <div className="grid grid-cols-2 gap-3">
//                           <button
//                             onClick={() => handleEditDesign(design)}
//                             className="px-4 py-3 bg-black text-white text-xs font-bold uppercase rounded-xl hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2"
//                           >
//                             ✏️ Edit
//                           </button>
//                           <button
//                             onClick={() => handleAddToCart(design)}
//                             disabled={inCart}
//                             className={`px-4 py-3 text-xs font-bold uppercase rounded-xl transition duration-200 flex items-center justify-center gap-2 ${
//                               inCart
//                                 ? 'bg-green-100 text-green-700 border-2 border-green-300 cursor-not-allowed'
//                                 : 'border-2 border-black text-black hover:bg-black hover:text-white'
//                             }`}
//                           >
//                             {inCart ? '✓ In Cart' : '🛒 Add Cart'}
//                           </button>
//                         </div>

//                         <div className="grid grid-cols-2 gap-3">
//                           <button
//                             onClick={() => handleDownloadDesign(design)}
//                             className="px-4 py-3 border-2 border-gray-300 text-gray-700 text-xs font-bold uppercase rounded-xl hover:border-gray-400 hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-2"
//                           >
//                             📥 Export
//                           </button>
//                           <button
//                             onClick={() => handleDeleteDesign(design.id)}
//                             className="px-4 py-3 border-2 border-red-300 text-red-600 text-xs font-bold uppercase rounded-xl hover:bg-red-50 transition duration-200 flex items-center justify-center gap-2"
//                           >
//                             🗑️ Delete
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Quick Actions */}
//             <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
//               <button
//                 onClick={() => navigate('/designer')}
//                 className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2"
//               >
//                 + Create Another Design
//               </button>
//               <button
//                 onClick={() => navigate('/cart')}
//                 className="px-8 py-4 border-2 border-black text-black rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition duration-200 flex items-center justify-center gap-2"
//               >
//                 🛒 View Cart ({cartItems.length})
//               </button>
//             </div>
            
//             {/* Statistics */}
//             <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
//               <h3 className="text-xl font-black uppercase mb-4">Design Statistics</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="text-center p-4 bg-gray-50 rounded-xl">
//                   <div className="text-3xl font-black text-gray-900">{designs.length}</div>
//                   <div className="text-sm text-gray-600">Total Designs</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 rounded-xl">
//                   <div className="text-3xl font-black text-gray-900">
//                     {cartItems.filter(item => item.type === 'custom-design').length}
//                   </div>
//                   <div className="text-sm text-gray-600">In Cart</div>
//                 </div>
//                 <div className="text-center p-4 bg-gray-50 rounded-xl">
//                   <div className="text-3xl font-black text-gray-900">
//                     ₹{(designs.length * 129.99 * 83).toFixed(0)}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Value (INR)</div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyDesigns;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const MyDesigns = ({ user }) => {
  const navigate = useNavigate();
  const { addToCart, cartItems, removeFromCart } = useCart();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load designs from localStorage
  useEffect(() => {
    const loadDesigns = () => {
      try {
        const saved = localStorage.getItem('savedShoeDesigns');
        if (saved) {
          const parsedDesigns = JSON.parse(saved);
          
          // Debug: Log designs to check preview data
          console.log('Loaded designs:', parsedDesigns);
          parsedDesigns.forEach((design, index) => {
            console.log(`Design ${index} (${design.name}):`, {
              hasPreview: !!design.preview,
              previewLength: design.preview ? design.preview.length : 0,
              previewStart: design.preview ? design.preview.substring(0, 50) : 'none'
            });
          });
          
          // Keep legacy designs (no userId) + match id/_id
          const userDesigns = user
            ? parsedDesigns.filter(design =>
                !design.userId || 
                design.userId === user.id || 
                design.userId === user._id
              )
            : parsedDesigns;
          
          setDesigns(userDesigns);
        } else {
          setDesigns([]);
        }
      } catch (error) {
        console.error('Error loading designs:', error);
        setDesigns([]);
      } finally {
        setLoading(false);
      }
    };

    loadDesigns();
    
    // Listen for storage events from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === 'savedShoeDesigns') {
        loadDesigns();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  // Convert USD to INR
  const convertToINR = (usdPrice) => {
    const exchangeRate = 83;
    return (usdPrice * exchangeRate).toFixed(2);
  };

  const handleAddToCart = (design) => {
    const cartItem = {
      id: design.id,
      name: design.name,
      colors: design.colors,
      preview: design.preview,
      price: 129.99,
      priceINR: convertToINR(129.99),
      quantity: 1,
      type: 'custom-design',
      createdAt: design.createdAt
    };

    addToCart(cartItem);
    alert(`"${design.name}" added to cart!`);
  };

  const handleDeleteDesign = (designId) => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      const updated = designs.filter(d => d.id !== designId);
      setDesigns(updated);
      
      // Update localStorage - remove only this design
      const allDesigns = JSON.parse(localStorage.getItem('savedShoeDesigns') || '[]');
      const filteredDesigns = allDesigns.filter(d => d.id !== designId);
      localStorage.setItem('savedShoeDesigns', JSON.stringify(filteredDesigns));
      
      // Also remove from cart if it exists
      const cartItem = cartItems.find(item => item.id === designId);
      if (cartItem) {
        removeFromCart(designId);
      }
      
      alert('Design deleted successfully!');
    }
  };

  const handleEditDesign = (design) => {
    navigate('/designer', { state: { design } });
  };

  // Download preview image
  const handleDownloadImage = (design) => {
    if (!design.preview) {
      alert('No preview image available to download');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = design.preview;
      link.download = `${design.name.replace(/\s+/g, '-')}-preview.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert(`Image for "${design.name}" downloaded!`);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image');
    }
  };

  const isInCart = (designId) => {
    return cartItems.some(item => item.id === designId);
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Loading your designs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
              My Designs
            </h1>
            <p className="text-gray-600">
              {designs.length} design{designs.length !== 1 ? 's' : ''} created
              {user && <span> by {user.name || user.email}</span>}
            </p>
          </div>
          <button
            onClick={() => navigate('/designer')}
            className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition duration-200 shadow-lg hover:shadow-xl"
          >
            + Create New Design
          </button>
        </div>

        {/* Empty State */}
        {designs.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">👟</div>
            <h2 className="text-3xl font-black mb-3 uppercase tracking-tight">
              No Designs Found
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {user 
                ? `Start creating your first custom shoe design, ${user.name || user.email}!`
                : 'Start creating your first custom shoe design and build your collection'
              }
            </p>
            <button
              onClick={() => navigate('/designer')}
              className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition duration-200"
            >
              Create Your First Design
            </button>
          </div>
        ) : (
          <>
            {/* Designs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {designs.map((design) => {
                const inCart = isInCart(design.id);
                const priceINR = convertToINR(129.99);
                
                // Debug: Check if preview exists
                const hasValidPreview = design.preview && design.preview.startsWith('data:image');
                console.log(`Card ${design.name}: hasValidPreview=${hasValidPreview}`);
                
                return (
                  <div
                    key={design.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group"
                  >
                    {/* Design Preview */}
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-56 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition duration-300">
                      {hasValidPreview ? (
                        <img
                          src={design.preview}
                          alt={design.name}
                          className="w-full h-full object-contain p-4"
                          onError={(e) => {
                            console.error('Image failed to load:', design.name);
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full p-4">
                          <div className="text-5xl mb-3">👟</div>
                          <div className="flex flex-wrap gap-2 justify-center mb-3">
                            {design.colors && Object.entries(design.colors).map(([key, color]) => (
                              <div
                                key={key}
                                className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition transform"
                                style={{ backgroundColor: color }}
                                title={`${key}: ${color}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-gray-500 uppercase">
                            {design.preview ? 'Invalid Preview' : 'No Preview Captured'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Design Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-black uppercase tracking-tight mb-2 line-clamp-2">
                        {design.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Created {formatDate(design.createdAt)}
                      </p>

                      {/* Color Info */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                        <p className="text-xs font-bold uppercase text-gray-600 mb-2">
                          Color Scheme
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          {design.colors && Object.entries(design.colors).map(([part, color]) => (
                            <div key={part} className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border border-gray-300"
                                style={{ backgroundColor: color }}
                              />
                              <span className="capitalize font-semibold text-gray-600 truncate">
                                {part.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price in INR */}
                      <div className="mb-6">
                        <div className="text-2xl font-black text-gray-900">
                          ₹{priceINR}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          $129.99 USD
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => handleEditDesign(design)}
                            className="px-4 py-3 bg-black text-white text-xs font-bold uppercase rounded-xl hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleAddToCart(design)}
                            disabled={inCart}
                            className={`px-4 py-3 text-xs font-bold uppercase rounded-xl transition duration-200 flex items-center justify-center gap-2 ${
                              inCart
                                ? 'bg-green-100 text-green-700 border-2 border-green-300 cursor-not-allowed'
                                : 'border-2 border-black text-black hover:bg-black hover:text-white'
                            }`}
                          >
                            {inCart ? '✓ In Cart' : '🛒 Add Cart'}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => handleDownloadImage(design)}
                            disabled={!design.preview}
                            className={`px-4 py-3 text-xs font-bold uppercase rounded-xl transition duration-200 flex items-center justify-center gap-2 ${
                              design.preview
                                ? 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50'
                                : 'border-2 border-gray-300 text-gray-400 cursor-not-allowed opacity-50'
                            }`}
                          >
                            📥 Download
                          </button>
                          <button
                            onClick={() => handleDeleteDesign(design.id)}
                            className="px-4 py-3 border-2 border-red-300 text-red-600 text-xs font-bold uppercase rounded-xl hover:bg-red-50 transition duration-200 flex items-center justify-center gap-2"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
              <button
                onClick={() => navigate('/designer')}
                className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2"
              >
                + Create Another Design
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="px-8 py-4 border-2 border-black text-black rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition duration-200 flex items-center justify-center gap-2"
              >
                🛒 View Cart ({cartItems.length})
              </button>
            </div>
            
            {/* Statistics */}
            <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="text-xl font-black uppercase mb-4">Design Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-black text-gray-900">{designs.length}</div>
                  <div className="text-sm text-gray-600">Total Designs</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-black text-gray-900">
                    {cartItems.filter(item => item.type === 'custom-design').length}
                  </div>
                  <div className="text-sm text-gray-600">In Cart</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-black text-gray-900">
                    ₹{(designs.length * 129.99 * 83).toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Value (INR)</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyDesigns;