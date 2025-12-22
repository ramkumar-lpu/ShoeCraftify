import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const Designer = ({ user }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [decals, setDecals] = useState([]);
  const [customName, setCustomName] = useState('My Custom Shoe');
  const [notification, setNotification] = useState(null);
  
  const notificationTimeoutRef = useRef(null);
  const nextIdRef = useRef(1);

  // Memoized static data
  const decalOptions = useMemo(() => [
    { id: 'star', name: 'Star', icon: '⭐' },
    { id: 'heart', name: 'Heart', icon: '❤️' },
    { id: 'lightning', name: 'Lightning', icon: '⚡' },
    { id: 'flame', name: 'Flame', icon: '🔥' },
    { id: 'geometric', name: 'Geometric', icon: '🔷' },
  ], []);

  const colorPalettes = useMemo(() => [
    ['#000000', '#FFFFFF', '#6B7280', '#3B82F6'],
    ['#EF4444', '#10B981', '#F59E0B', '#8B5CF6'],
    ['#FBCFE8', '#C7D2FE', '#A7F3D0', '#FDE68A'],
  ], []);

  const MAX_DECALS = 5;
  const BASE_PRICE = 2499;

  // Memoized decal positions
  const decalPositions = useMemo(() => [
    { top: '30%', left: '30%' },
    { top: '50%', left: '50%' },
    { top: '70%', left: '20%' },
    { top: '40%', left: '70%' },
    { top: '60%', left: '60%' },
  ], []);

  // Show notification helper
  const showNotification = useCallback((message, type = 'success') => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    setNotification({ message, type });
    
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  // Memoized handlers
  const handleColorChange = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  const handleNameChange = useCallback((e) => {
    setCustomName(e.target.value);
  }, []);

  const handleAddDecal = useCallback((decal) => {
    setDecals(prev => {
      if (prev.length >= MAX_DECALS) {
        showNotification(`Maximum ${MAX_DECALS} decals allowed`, 'warning');
        return prev;
      }
      
      const newDecal = {
        id: nextIdRef.current++,
        name: decal.name,
        icon: decal.icon,
      };

      return [...prev, newDecal];
    });
  }, [showNotification]);

  const handleRemoveDecal = useCallback((decalId) => {
    setDecals(prev => prev.filter(d => d.id !== decalId));
  }, []);

  const handleAddToCart = useCallback(() => {
    try {
      const cartItem = {
        id: `shoe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: customName || 'Custom Shoe Design',
        description: 'Custom designed shoe',
        color: selectedColor,
        price: BASE_PRICE,
        quantity: 1,
        customization: {
          color: selectedColor,
          decals: decals.map(d => d.name),
          createdAt: new Date().toISOString()
        }
      };

      addToCart(cartItem);
      showNotification(`${cartItem.name} added to cart! 🛒`, 'success');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      showNotification('Failed to add to cart. Please try again.', 'error');
    }
  }, [customName, selectedColor, decals, addToCart, showNotification]);

  const handleSaveDesign = useCallback(() => {
    try {
      const designData = {
        id: `design_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: user?._id || 'guest',
        name: customName,
        color: selectedColor,
        decals: decals,
        createdAt: new Date().toISOString()
      };

      const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns') || '[]');
      savedDesigns.push(designData);
      localStorage.setItem('savedDesigns', JSON.stringify(savedDesigns));
      
      showNotification('Design saved successfully! 🎨', 'success');
    } catch (error) {
      console.error('Failed to save design:', error);
      showNotification('Failed to save design. Please try again.', 'error');
    }
  }, [customName, selectedColor, decals, user, showNotification]);

  // Memoized design summary
  const designSummary = useMemo(() => ({
    name: customName,
    color: selectedColor,
    decalCount: decals.length,
    price: BASE_PRICE
  }), [customName, selectedColor, decals.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <DesignerHeader />

        {/* Notification */}
        <Notification notification={notification} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Design Controls */}
          <DesignControlsPanel
            customName={customName}
            selectedColor={selectedColor}
            colorPalettes={colorPalettes}
            decals={decals}
            decalOptions={decalOptions}
            maxDecals={MAX_DECALS}
            basePrice={BASE_PRICE}
            onNameChange={handleNameChange}
            onColorChange={handleColorChange}
            onAddDecal={handleAddDecal}
            onRemoveDecal={handleRemoveDecal}
            onSaveDesign={handleSaveDesign}
            onAddToCart={handleAddToCart}
          />

          {/* Middle Panel - Design Preview */}
          <DesignPreviewPanel
            selectedColor={selectedColor}
            decals={decals}
            decalPositions={decalPositions}
            designSummary={designSummary}
          />
        </div>
      </div>
    </div>
  );
};

// Designer Header Component
const DesignerHeader = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="mb-8 text-center"
  >
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
      Custom Shoe Designer
    </h1>
    <p className="text-gray-600">
      Create your unique shoe design
    </p>
  </motion.div>
));

DesignerHeader.displayName = 'DesignerHeader';

// Notification Component
const Notification = React.memo(({ notification }) => (
  <AnimatePresence>
    {notification && (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className={`px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'warning' ? 'bg-yellow-500' :
          'bg-red-500'
        } text-white font-medium`}>
          {notification.message}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));

Notification.displayName = 'Notification';

// Design Controls Panel Component
const DesignControlsPanel = React.memo(({
  customName,
  selectedColor,
  colorPalettes,
  decals,
  decalOptions,
  maxDecals,
  basePrice,
  onNameChange,
  onColorChange,
  onAddDecal,
  onRemoveDecal,
  onSaveDesign,
  onAddToCart
}) => (
  <div className="lg:col-span-1 space-y-6">
    {/* Design Name & Color */}
    <DesignDetailsCard
      customName={customName}
      selectedColor={selectedColor}
      colorPalettes={colorPalettes}
      onNameChange={onNameChange}
      onColorChange={onColorChange}
    />

    {/* Decals Selection */}
    <DecalsCard
      decals={decals}
      decalOptions={decalOptions}
      maxDecals={maxDecals}
      onAddDecal={onAddDecal}
      onRemoveDecal={onRemoveDecal}
    />

    {/* Action Buttons */}
    <ActionButtons
      basePrice={basePrice}
      onSaveDesign={onSaveDesign}
      onAddToCart={onAddToCart}
    />
  </div>
));

DesignControlsPanel.displayName = 'DesignControlsPanel';

// Design Details Card
const DesignDetailsCard = React.memo(({
  customName,
  selectedColor,
  colorPalettes,
  onNameChange,
  onColorChange
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl p-5 shadow-lg"
  >
    <h2 className="text-lg font-bold text-gray-900 mb-4">Design Details</h2>
    <div className="space-y-4">
      <div>
        <label htmlFor="design-name" className="block text-sm font-medium text-gray-700 mb-2">
          Design Name
        </label>
        <input
          id="design-name"
          type="text"
          value={customName}
          onChange={onNameChange}
          placeholder="Name your design"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          maxLength={50}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Color
        </label>
        <ColorPalettes
          colorPalettes={colorPalettes}
          selectedColor={selectedColor}
          onColorChange={onColorChange}
        />
      </div>
    </div>
  </motion.div>
));

DesignDetailsCard.displayName = 'DesignDetailsCard';

// Color Palettes Component
const ColorPalettes = React.memo(({ colorPalettes, selectedColor, onColorChange }) => (
  <div className="space-y-2">
    {colorPalettes.map((palette, index) => (
      <div key={index} className="flex space-x-2">
        {palette.map((color) => (
          <ColorButton
            key={color}
            color={color}
            isSelected={selectedColor === color}
            onClick={onColorChange}
          />
        ))}
      </div>
    ))}
  </div>
));

ColorPalettes.displayName = 'ColorPalettes';

// Color Button Component
const ColorButton = React.memo(({ color, isSelected, onClick }) => (
  <button
    onClick={() => onClick(color)}
    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
      isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
    }`}
    style={{ backgroundColor: color }}
    title={color}
    aria-label={`Select color ${color}`}
  />
));

ColorButton.displayName = 'ColorButton';

// Decals Card Component
const DecalsCard = React.memo(({
  decals,
  decalOptions,
  maxDecals,
  onAddDecal,
  onRemoveDecal
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
    className="bg-white rounded-xl p-5 shadow-lg"
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-gray-900">Decals</h2>
      <span className={`text-sm font-medium ${
        decals.length >= maxDecals ? 'text-red-500' : 'text-gray-500'
      }`}>
        {decals.length}/{maxDecals}
      </span>
    </div>
    
    <div className="grid grid-cols-5 gap-3 mb-4">
      {decalOptions.map((decal) => (
        <DecalButton
          key={decal.id}
          decal={decal}
          onAdd={onAddDecal}
          disabled={decals.length >= maxDecals}
        />
      ))}
    </div>

    <ActiveDecalsList
      decals={decals}
      onRemoveDecal={onRemoveDecal}
    />
  </motion.div>
));

DecalsCard.displayName = 'DecalsCard';

// Decal Button Component
const DecalButton = React.memo(({ decal, onAdd, disabled }) => (
  <button
    onClick={() => onAdd(decal)}
    disabled={disabled}
    className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center transition-all hover:scale-105"
    title={decal.name}
    aria-label={`Add ${decal.name} decal`}
  >
    <span className="text-2xl">{decal.icon}</span>
    <span className="text-xs mt-1 text-gray-700">{decal.name}</span>
  </button>
));

DecalButton.displayName = 'DecalButton';

// Active Decals List Component
const ActiveDecalsList = React.memo(({ decals, onRemoveDecal }) => {
  if (decals.length === 0) return null;

  return (
    <div className="border-t pt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Active Decals</h3>
      <div className="space-y-2">
        <AnimatePresence>
          {decals.map((decal) => (
            <ActiveDecalItem
              key={decal.id}
              decal={decal}
              onRemove={onRemoveDecal}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
});

ActiveDecalsList.displayName = 'ActiveDecalsList';

// Active Decal Item Component
const ActiveDecalItem = React.memo(({ decal, onRemove }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.2 }}
    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
  >
    <div className="flex items-center space-x-2">
      <span className="text-lg">{decal.icon}</span>
      <span className="text-sm text-gray-900">{decal.name}</span>
    </div>
    <button
      onClick={() => onRemove(decal.id)}
      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
      aria-label={`Remove ${decal.name} decal`}
    >
      Remove
    </button>
  </motion.div>
));

ActiveDecalItem.displayName = 'ActiveDecalItem';

// Action Buttons Component
const ActionButtons = React.memo(({ basePrice, onSaveDesign, onAddToCart }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    className="space-y-3"
  >
    <button
      onClick={onSaveDesign}
      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium hover:scale-105"
    >
      💾 Save Design
    </button>
    
    <button
      onClick={onAddToCart}
      className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium hover:scale-105"
    >
      🛒 Add to Cart - ₹{basePrice.toLocaleString()}
    </button>
  </motion.div>
));

ActionButtons.displayName = 'ActionButtons';

// Design Preview Panel Component
const DesignPreviewPanel = React.memo(({
  selectedColor,
  decals,
  decalPositions,
  designSummary
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="lg:col-span-2"
  >
    <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Design Preview
      </h2>
      
      <div className="flex flex-col items-center">
        {/* Shoe Visualization */}
        <ShoeVisualization
          selectedColor={selectedColor}
          decals={decals}
          decalPositions={decalPositions}
        />

        {/* Design Details */}
        <DesignDetails designSummary={designSummary} />
      </div>
    </div>
  </motion.div>
));

DesignPreviewPanel.displayName = 'DesignPreviewPanel';

// Shoe Visualization Component
const ShoeVisualization = React.memo(({ selectedColor, decals, decalPositions }) => (
  <div className="relative mb-8">
    <motion.div 
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-64 h-64 rounded-2xl shadow-lg transition-all duration-300"
      style={{ 
        backgroundColor: selectedColor,
        backgroundImage: decals.length > 0 
          ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent)' 
          : 'none'
      }}
    >
      {/* Decals with animation */}
      <AnimatePresence>
        {decals.map((decal, index) => (
          <motion.div
            key={decal.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute text-3xl"
            style={decalPositions[index] || { top: '50%', left: '50%' }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {decal.icon}
            </motion.span>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
    
    {/* Details Overlay */}
    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-600">Color:</div>
          <div 
            className="w-4 h-4 rounded border"
            style={{ backgroundColor: selectedColor }}
          />
        </div>
        <div className="text-sm text-gray-600">
          Decals: <span className="font-medium">{decals.length}</span>
        </div>
      </div>
    </div>
  </div>
));

ShoeVisualization.displayName = 'ShoeVisualization';

// Design Details Component
const DesignDetails = React.memo(({ designSummary }) => (
  <div className="w-full max-w-md space-y-4">
    <div className="bg-gray-50 rounded-xl p-4">
      <h3 className="font-medium text-gray-900 mb-2">Design Summary</h3>
      <div className="space-y-2 text-sm">
        <SummaryRow label="Name:" value={designSummary.name} />
        <SummaryRow label="Base Color:" value={designSummary.color} isColor />
        <SummaryRow label="Decals Applied:" value={designSummary.decalCount} />
        <SummaryRow label="Price:" value={`₹${designSummary.price.toLocaleString()}`} isBold />
      </div>
    </div>

    <QuickTips />
  </div>
));

DesignDetails.displayName = 'DesignDetails';

// Summary Row Component
const SummaryRow = React.memo(({ label, value, isColor, isBold }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    {isColor ? (
      <div className="flex items-center space-x-2">
        <div 
          className="w-3 h-3 rounded"
          style={{ backgroundColor: value }}
        />
        <span className="font-medium text-gray-900">{value}</span>
      </div>
    ) : (
      <span className={isBold ? 'font-bold text-gray-900' : 'font-medium text-gray-900'}>
        {value}
      </span>
    )}
  </div>
));

SummaryRow.displayName = 'SummaryRow';

// Quick Tips Component
const QuickTips = React.memo(() => {
  const tips = useMemo(() => [
    'Choose a base color first',
    'Add up to 5 decals',
    'Save your design before adding to cart',
    'You can edit anytime'
  ], []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
      <h3 className="font-medium text-gray-900 mb-2">💡 Tips</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        {tips.map((tip, index) => (
          <li key={index}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
});

QuickTips.displayName = 'QuickTips';

export default React.memo(Designer);