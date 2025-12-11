// import { useState } from 'react';
// import { motion } from 'framer-motion';

// const Designer = ({ user }) => {
//   const [activeTool, setActiveTool] = useState('canvas');
//   const [selectedColor, setSelectedColor] = useState('#3B82F6');
//   const [selectedMaterial, setSelectedMaterial] = useState('leather');
//   const [selectedPart, setSelectedPart] = useState('upper');

//   const colorOptions = [
//     { name: 'Blue', value: '#3B82F6' },
//     { name: 'Red', value: '#EF4444' },
//     { name: 'Green', value: '#10B981' },
//     { name: 'Purple', value: '#8B5CF6' },
//     { name: 'Black', value: '#111827' },
//     { name: 'White', value: '#F9FAFB' },
//     { name: 'Yellow', value: '#F59E0B' },
//     { name: 'Pink', value: '#EC4899' },
//   ];

//   const materialOptions = [
//     { name: 'Leather', icon: '🐂' },
//     { name: 'Canvas', icon: '🎨' },
//     { name: 'Suede', icon: '✨' },
//     { name: 'Mesh', icon: '🔲' },
//     { name: 'Rubber', icon: '⚫' },
//     { name: 'Knitted', icon: '🧶' },
//   ];

//   const shoeParts = [
//     { name: 'Upper', icon: '👟' },
//     { name: 'Sole', icon: '🦶' },
//     { name: 'Laces', icon: '🎀' },
//     { name: 'Heel', icon: '👠' },
//     { name: 'Toe', icon: '👞' },
//     { name: 'Tongue', icon: '👅' },
//   ];

//   const tools = [
//     { id: 'canvas', name: '3D Canvas', icon: '🎨' },
//     { id: 'color', name: 'Color Picker', icon: '🎨' },
//     { id: 'material', name: 'Materials', icon: '🧵' },
//     { id: 'pattern', name: 'Patterns', icon: '🔳' },
//     { id: 'texture', name: 'Textures', icon: '✨' },
//     { id: 'decal', name: 'Decals', icon: '🖼️' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex flex-col md:flex-row md:items-center justify-between">
//             <div>
//               <h1 className="text-4xl font-bold text-gray-900 mb-2">
//                 3D Shoe Designer
//               </h1>
//               <p className="text-gray-600">
//                 Design your custom shoes with our interactive 3D editor
//               </p>
//             </div>
//             <div className="flex items-center space-x-4 mt-4 md:mt-0">
//               <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
//                 Save Design
//               </button>
//               <button className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border-2 border-gray-300 hover:border-blue-500 transition-all">
//                 Export 3D Model
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Panel - Tools */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Tools Section */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white rounded-2xl p-6 shadow-lg"
//             >
//               <h2 className="text-xl font-bold text-gray-900 mb-6">Design Tools</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 {tools.map((tool) => (
//                   <button
//                     key={tool.id}
//                     onClick={() => setActiveTool(tool.id)}
//                     className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
//                       activeTool === tool.id
//                         ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500'
//                         : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
//                     }`}
//                   >
//                     <span className="text-3xl mb-2">{tool.icon}</span>
//                     <span className="text-sm font-medium text-gray-700">{tool.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Color Picker */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white rounded-2xl p-6 shadow-lg"
//             >
//               <h2 className="text-xl font-bold text-gray-900 mb-6">Colors</h2>
//               <div className="grid grid-cols-4 gap-3">
//                 {colorOptions.map((color) => (
//                   <button
//                     key={color.name}
//                     onClick={() => setSelectedColor(color.value)}
//                     className={`aspect-square rounded-lg flex items-center justify-center transition-transform ${
//                       selectedColor === color.value ? 'ring-4 ring-offset-2 ring-blue-500 scale-110' : ''
//                     }`}
//                     style={{ backgroundColor: color.value }}
//                     title={color.name}
//                   >
//                     {selectedColor === color.value && (
//                       <span className="text-white">✓</span>
//                     )}
//                   </button>
//                 ))}
//               </div>
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-gray-700">Selected Color:</span>
//                   <div className="flex items-center space-x-2">
//                     <div
//                       className="w-6 h-6 rounded-full border border-gray-300"
//                       style={{ backgroundColor: selectedColor }}
//                     ></div>
//                     <span className="font-mono text-sm">{selectedColor}</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Materials */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white rounded-2xl p-6 shadow-lg"
//             >
//               <h2 className="text-xl font-bold text-gray-900 mb-6">Materials</h2>
//               <div className="grid grid-cols-3 gap-4">
//                 {materialOptions.map((material) => (
//                   <button
//                     key={material.name}
//                     onClick={() => setSelectedMaterial(material.name.toLowerCase())}
//                     className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
//                       selectedMaterial === material.name.toLowerCase()
//                         ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500'
//                         : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
//                     }`}
//                   >
//                     <span className="text-2xl mb-2">{material.icon}</span>
//                     <span className="text-sm font-medium text-gray-700">{material.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Middle Panel - 3D Canvas */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-4 shadow-2xl h-full min-h-[600px] flex flex-col"
//             >
//               {/* Canvas Header */}
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-white text-lg font-medium">3D Preview</h3>
//                 <div className="flex items-center space-x-2">
//                   <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
//                     Reset View
//                   </button>
//                   <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                     Rotate
//                   </button>
//                 </div>
//               </div>

//               {/* 3D Shoe Canvas */}
//               <div className="flex-1 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden relative">
//                 {/* Mock 3D Shoe */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="relative">
//                     {/* Shoe Base */}
//                     <div className="w-64 h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl transform rotate-12"></div>
                    
//                     {/* Shoe Details */}
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="text-white text-center">
//                         <div className="text-6xl mb-4">👟</div>
//                         <div className="text-lg font-medium">Interactive 3D Model</div>
//                         <p className="text-gray-400 text-sm mt-2">
//                           Real-time rendering of your design
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Shoe Parts Selection */}
//                 <div className="absolute bottom-4 left-0 right-0">
//                   <div className="flex justify-center space-x-4">
//                     {shoeParts.map((part) => (
//                       <button
//                         key={part.name}
//                         onClick={() => setSelectedPart(part.name.toLowerCase())}
//                         className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
//                           selectedPart === part.name.toLowerCase()
//                             ? 'bg-blue-600 text-white'
//                             : 'bg-white/10 text-white hover:bg-white/20'
//                         }`}
//                       >
//                         <span>{part.icon}</span>
//                         <span className="text-sm">{part.name}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Canvas Controls */}
//               <div className="mt-4 grid grid-cols-3 gap-4">
//                 <div className="bg-white/5 rounded-xl p-4">
//                   <div className="text-sm text-gray-400 mb-1">Zoom</div>
//                   <div className="flex items-center space-x-2">
//                     <button className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white">
//                       -
//                     </button>
//                     <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
//                       <div className="w-2/3 h-full bg-blue-500"></div>
//                     </div>
//                     <button className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white">
//                       +
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="bg-white/5 rounded-xl p-4">
//                   <div className="text-sm text-gray-400 mb-1">Rotation</div>
//                   <div className="flex items-center space-x-2">
//                     <div className="text-white text-sm">360°</div>
//                     <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
//                       <div className="w-1/2 h-full bg-purple-500"></div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-white/5 rounded-xl p-4">
//                   <div className="text-sm text-gray-400 mb-1">Lighting</div>
//                   <div className="flex items-center space-x-2">
//                     <div className="text-white text-sm">Studio</div>
//                     <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
//                       <div className="w-3/4 h-full bg-yellow-500"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Design Actions */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
//             >
//               <button className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center">
//                 <span className="text-2xl mb-2">💾</span>
//                 <span className="font-medium text-gray-700">Save</span>
//               </button>
//               <button className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center">
//                 <span className="text-2xl mb-2">📤</span>
//                 <span className="font-medium text-gray-700">Export</span>
//               </button>
//               <button className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center">
//                 <span className="text-2xl mb-2">🖨️</span>
//                 <span className="font-medium text-gray-700">Print</span>
//               </button>
//               <button className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center">
//                 <span className="text-2xl mb-2">🛒</span>
//                 <span className="font-medium">Order Now</span>
//               </button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Designer;



import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const Designer = ({ user }) => {
  const { addToCart } = useCart();
  const [activeTool, setActiveTool] = useState('browse');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [selectedMaterial, setSelectedMaterial] = useState('leather');
  const [selectedSize, setSelectedSize] = useState('US 9');
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customName, setCustomName] = useState('My Custom Shoe');
  const [isSaving, setIsSaving] = useState(false);

  // Shoe design templates
  const shoeTemplates = [
    {
      id: 1,
      name: "Urban Runner Pro",
      category: "Sneakers",
      basePrice: 129.99,
      image: "👟",
      colors: ["#3B82F6", "#EF4444", "#10B981", "#8B5CF6"],
      materials: ["leather", "canvas", "mesh"],
      description: "High-performance urban sneaker with custom color options"
    },
    {
      id: 2,
      name: "Classic Oxford",
      category: "Formal",
      basePrice: 189.99,
      image: "👞",
      colors: ["#111827", "#6B7280", "#92400E", "#DC2626"],
      materials: ["leather", "suede"],
      description: "Elegant formal shoe with premium materials"
    },
    {
      id: 3,
      name: "Sport Trailblazer",
      category: "Sports",
      basePrice: 149.99,
      image: "🥾",
      colors: ["#059669", "#3B82F6", "#F59E0B", "#EC4899"],
      materials: ["mesh", "rubber", "knitted"],
      description: "Trail running shoe with advanced grip technology"
    },
    {
      id: 4,
      name: "Summer Breeze",
      category: "Casual",
      basePrice: 89.99,
      image: "👡",
      colors: ["#F59E0B", "#EC4899", "#8B5CF6", "#10B981"],
      materials: ["leather", "canvas", "rubber"],
      description: "Lightweight casual sandal for summer"
    },
    {
      id: 5,
      name: "Street Style High-Top",
      category: "Sneakers",
      basePrice: 139.99,
      image: "👟",
      colors: ["#1E293B", "#DC2626", "#7C3AED", "#059669"],
      materials: ["canvas", "leather", "suede"],
      description: "Street-style high-top sneaker with customizable details"
    },
    {
      id: 6,
      name: "Elegant Pump",
      category: "Formal",
      basePrice: 169.99,
      image: "👠",
      colors: ["#DC2626", "#000000", "#7C3AED", "#6B7280"],
      materials: ["leather", "suede", "satin"],
      description: "Elegant women's pump with custom heel height"
    }
  ];

  const colorOptions = [
    { name: 'Navy Blue', value: '#1E40AF' },
    { name: 'Crimson Red', value: '#DC2626' },
    { name: 'Forest Green', value: '#059669' },
    { name: 'Royal Purple', value: '#7C3AED' },
    { name: 'Jet Black', value: '#000000' },
    { name: 'Pure White', value: '#FFFFFF' },
    { name: 'Sunset Orange', value: '#EA580C' },
    { name: 'Rose Pink', value: '#BE185D' },
    { name: 'Gold', value: '#D97706' },
    { name: 'Silver Gray', value: '#6B7280' },
  ];

  const materialOptions = [
    { id: 'leather', name: 'Premium Leather', price: 20, icon: '🐂', description: 'Full-grain leather' },
    { id: 'suede', name: 'Suede', price: 25, icon: '✨', description: 'Soft suede finish' },
    { id: 'canvas', name: 'Canvas', price: 10, icon: '🎨', description: 'Durable canvas' },
    { id: 'mesh', name: 'Breathable Mesh', price: 15, icon: '🔲', description: 'Athletic mesh' },
    { id: 'rubber', name: 'Rubber', price: 5, icon: '⚫', description: 'Flexible rubber' },
    { id: 'knitted', name: 'Knitted', price: 18, icon: '🧶', description: 'Modern knitted fabric' },
  ];

  const sizeOptions = ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'];

  const tools = [
    { id: 'browse', name: 'Browse', icon: '👁️' },
    { id: 'color', name: 'Colors', icon: '🎨' },
    { id: 'material', name: 'Materials', icon: '🧵' },
    { id: 'details', name: 'Details', icon: '✨' },
    { id: 'size', name: 'Size', icon: '📏' },
    { id: 'save', name: 'Save', icon: '💾' },
  ];

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedDesign) return 0;
    const materialPrice = materialOptions.find(m => m.id === selectedMaterial)?.price || 0;
    return selectedDesign.basePrice + materialPrice;
  };

  // Handle design selection
  const handleSelectDesign = (design) => {
    setSelectedDesign(design);
    setActiveTool('color');
    setCustomName(`${design.name} Custom`);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedDesign) {
      alert('Please select a design first!');
      return;
    }

    const material = materialOptions.find(m => m.id === selectedMaterial);
    
    const cartItem = {
      id: `custom_${selectedDesign.id}_${Date.now()}`,
      name: customName,
      description: selectedDesign.description,
      image: selectedDesign.image,
      color: selectedColor,
      material: material?.name || selectedMaterial,
      size: selectedSize,
      price: calculateTotalPrice(),
      quantity: 1,
      customization: `Color: ${colorOptions.find(c => c.value === selectedColor)?.name || selectedColor}, Material: ${material?.name}, Size: ${selectedSize}`,
      designId: selectedDesign.id,
      timestamp: new Date().toISOString()
    };

    addToCart(cartItem);
    
    // Show success message
    alert(`${customName} has been added to your cart!`);
    
    // Reset selection
    setSelectedDesign(null);
    setCustomName('My Custom Shoe');
  };

  // Handle save design
  const handleSaveDesign = async () => {
    if (!selectedDesign) {
      alert('Please select a design first!');
      return;
    }

    setIsSaving(true);
    
    try {
      // Save design to user's profile
      const designData = {
        userId: user?._id || user?.id,
        name: customName,
        templateId: selectedDesign.id,
        color: selectedColor,
        material: selectedMaterial,
        size: selectedSize,
        price: calculateTotalPrice(),
        createdAt: new Date().toISOString()
      };

      // Here you would typically save to backend
      console.log('Saving design:', designData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Design saved to your profile!');
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Failed to save design. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Load designs on mount
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDesigns(shoeTemplates);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                3D Shoe Designer
              </h1>
              <p className="text-gray-600">
                Design custom shoes from templates or create your own masterpiece
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {selectedDesign && (
                <button
                  onClick={handleSaveDesign}
                  disabled={isSaving}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Design'}
                </button>
              )}
              <button 
                onClick={() => setSelectedDesign(null)}
                className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border-2 border-gray-300 hover:border-blue-500 transition-all"
              >
                Start New
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Tools & Templates */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tools Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Design Tools</h2>
              <div className="grid grid-cols-3 gap-3">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                      activeTool === tool.id
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-2xl mb-1">{tool.icon}</span>
                    <span className="text-xs font-medium text-gray-700">{tool.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Design Templates */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shoe Templates</h2>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="h-24 bg-gray-200 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {designs.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => handleSelectDesign(design)}
                      className={`w-full p-4 rounded-xl flex items-center space-x-4 transition-all ${
                        selectedDesign?.id === design.id
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="text-3xl">{design.image}</div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-gray-900">{design.name}</div>
                        <div className="text-sm text-gray-600">{design.category}</div>
                        <div className="text-sm font-medium text-blue-600">
                          From ${design.basePrice}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Design Stats */}
            {selectedDesign && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
              >
                <h2 className="text-xl font-bold mb-4">Design Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Template:</span>
                    <span className="font-medium">{selectedDesign.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Material:</span>
                    <span className="font-medium">{materialOptions.find(m => m.id === selectedMaterial)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium">{selectedSize}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Price:</span>
                      <span>${calculateTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Middle Panel - Design Canvas & Customization */}
          <div className="lg:col-span-2">
            {/* Design Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-4 shadow-2xl h-full min-h-[600px] flex flex-col"
            >
              {/* Canvas Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-medium">
                  {selectedDesign ? `${selectedDesign.name} Designer` : 'Select a Template'}
                </h3>
                {selectedDesign && (
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                      Reset
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Preview 360°
                    </button>
                  </div>
                )}
              </div>

              {/* 3D Design Canvas */}
              <div className="flex-1 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden relative flex items-center justify-center">
                {selectedDesign ? (
                  <div className="text-center">
                    {/* Shoe Preview */}
                    <div className="mb-6">
                      <div 
                        className="w-64 h-64 mx-auto rounded-3xl flex items-center justify-center text-8xl transform rotate-12 shadow-2xl"
                        style={{ 
                          backgroundColor: selectedColor,
                          border: '8px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        {selectedDesign.image}
                      </div>
                    </div>
                    
                    {/* Design Info */}
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">{customName}</h3>
                      <p className="text-gray-300 mb-4">{selectedDesign.description}</p>
                      <div className="flex justify-center space-x-4">
                        <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                          {colorOptions.find(c => c.value === selectedColor)?.name}
                        </div>
                        <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                          {materialOptions.find(m => m.id === selectedMaterial)?.name}
                        </div>
                        <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                          {selectedSize}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-white p-8">
                    <div className="text-6xl mb-4">👟</div>
                    <h3 className="text-2xl font-bold mb-2">Select a Template to Begin</h3>
                    <p className="text-gray-300">
                      Choose from our collection of shoe templates to start designing
                    </p>
                    <p className="text-gray-400 text-sm mt-4">
                      Browse templates on the left panel
                    </p>
                  </div>
                )}
              </div>

              {/* Customization Controls */}
              {selectedDesign && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  {activeTool === 'color' && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-medium mb-3">Select Color</h4>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setSelectedColor(color.value)}
                            className={`w-10 h-10 rounded-full transition-transform ${
                              selectedColor === color.value ? 'ring-4 ring-white scale-110' : ''
                            }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTool === 'material' && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-medium mb-3">Select Material</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {materialOptions.map((material) => (
                          <button
                            key={material.id}
                            onClick={() => setSelectedMaterial(material.id)}
                            className={`p-3 rounded-lg flex flex-col items-center transition-all ${
                              selectedMaterial === material.id
                                ? 'bg-white/20 border-2 border-white'
                                : 'bg-white/10 hover:bg-white/20'
                            }`}
                          >
                            <span className="text-2xl mb-1">{material.icon}</span>
                            <span className="text-xs text-white">{material.name}</span>
                            <span className="text-xs text-gray-300">+${material.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTool === 'size' && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-medium mb-3">Select Size</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {sizeOptions.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-2 rounded-lg transition-all ${
                              selectedSize === size
                                ? 'bg-white text-gray-900 font-bold'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTool === 'details' && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-medium mb-3">Custom Details</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-300 mb-1">Design Name</label>
                          <input
                            type="text"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-white/40"
                            placeholder="Enter custom name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-1">Notes (Optional)</label>
                          <textarea
                            className="w-full px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-white/40"
                            rows="2"
                            placeholder="Add any special instructions..."
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Action Buttons */}
            {selectedDesign && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <button
                  onClick={handleSaveDesign}
                  disabled={isSaving}
                  className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center disabled:opacity-50"
                >
                  <span className="text-2xl mb-2">💾</span>
                  <span className="font-medium">{isSaving ? 'Saving...' : 'Save Design'}</span>
                </button>
                <button
                  onClick={() => {
                    // Export design
                    alert('Design exported! Download will start shortly.');
                  }}
                  className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center"
                >
                  <span className="text-2xl mb-2">📤</span>
                  <span className="font-medium text-gray-700">Export Design</span>
                </button>
                <button
                  onClick={handleAddToCart}
                  className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center"
                >
                  <span className="text-2xl mb-2">🛒</span>
                  <span className="font-medium">Add to Cart - ${calculateTotalPrice().toFixed(2)}</span>
                </button>
              </motion.div>
            )}

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Need Help Designing?
                  </h3>
                  <p className="text-gray-600">
                    Watch our tutorial or contact our design experts
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                    Watch Tutorial
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Get Expert Help
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designer;