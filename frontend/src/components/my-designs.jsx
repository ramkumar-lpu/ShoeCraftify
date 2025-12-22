import React, { useState } from 'react';

const MyDesigns = () => {
  // Mock data for saved designs
  const [designs, setDesigns] = useState([
    {
      id: 1,
      name: 'Classic White Sneaker',
      image: 'https://via.placeholder.com/300x200',
      price: 129.99,
      inCart: false
    },
    {
      id: 2,
      name: 'Summer Casual Shoes',
      image: 'https://via.placeholder.com/300x200',
      price: 89.99,
      inCart: true
    },
    {
      id: 3,
      name: 'Basketball High Tops',
      image: 'https://via.placeholder.com/300x200',
      price: 149.99,
      inCart: false
    }
  ]);

  // Cart state
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(1);

  const handleAddToCart = (design) => {
    // Update design's inCart status
    setDesigns(designs.map(d => 
      d.id === design.id ? { ...d, inCart: true } : d
    ));
    
    // Add to cart array
    setCart([...cart, design]);
    setCartCount(cartCount + 1);
    
    alert(`Added "${design.name}" to cart!`);
  };

  const handleRemoveFromCart = (designId) => {
    // Update design's inCart status
    setDesigns(designs.map(d => 
      d.id === designId ? { ...d, inCart: false } : d
    ));
    
    // Remove from cart array
    setCart(cart.filter(item => item.id !== designId));
    if (cartCount > 0) setCartCount(cartCount - 1);
  };

  const handleDeleteDesign = (designId) => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      // Remove from designs
      setDesigns(designs.filter(d => d.id !== designId));
      
      // Also remove from cart if it's there
      handleRemoveFromCart(designId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Saved Designs</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <span className="text-gray-600">{cartCount} items in cart</span>
          </div>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">No saved designs yet.</p>
            </div>
          ) : (
            designs.map((design) => (
              <div key={design.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Design Image */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img 
                    src={design.image} 
                    alt={design.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Design Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{design.name}</h3>
                  <p className="text-gray-600 mb-4">${design.price.toFixed(2)}</p>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => design.inCart ? handleRemoveFromCart(design.id) : handleAddToCart(design)}
                      className={`flex-1 py-2 px-4 rounded ${
                        design.inCart 
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {design.inCart ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
                    
                    <button 
                      onClick={() => handleDeleteDesign(design.id)}
                      className="py-2 px-4 bg-red-100 text-red-600 hover:bg-red-200 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary (Simple) */}
        {cart.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
            <ul className="space-y-2 mb-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
              </div>
              <button className="w-full mt-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDesigns;