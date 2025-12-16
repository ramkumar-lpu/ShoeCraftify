import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import Payment from './Payment';
import axios from 'axios';

const Cart = ({ user }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal
  } = useCart();

  const [showPayment, setShowPayment] = useState(false);

  const shipping = getCartTotal() > 5000 ? 0 : 50;
  const tax = getCartTotal() * 0.18;
  const total = getCartTotal() + shipping + tax;

  const handlePaymentSuccess = async (paymentData) => {
    console.log('Payment successful:', paymentData);

    try {
      // Create backend order
      const orderData = {
        items: cartItems.map(item => ({
          templateId: item.designId || 'custom',
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          customization: {
            description: typeof item.customization === 'string' ? item.customization : JSON.stringify(item.customization)
          }
        })),
        totalAmount: total,
        shippingAddress: {
          street: '123 Main St',
          city: 'Bangalore',
          state: 'KA',
          zipCode: '560001',
          country: 'India'
        },
        paymentStatus: 'completed'
      };

      const response = await axios.post('/api/orders', orderData);

      if (response.data.success) {
        // Don't close immediately, let Payment component show success screen
        // setShowPayment(false); 
        // alert(`Order placed successfully! Order ID: ${response.data.order._id}`);
        console.log('Order saved to DB, clearing cart...');
        clearCart();
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Payment successful but failed to record order. Please contact support.');
    }
  };

  if (showPayment) {
    return (
      <Payment
        user={user}
        cartItems={cartItems}
        onPaymentSuccess={handlePaymentSuccess}
        onClose={() => setShowPayment(false)}
      />
    );
  }

  // Helper to render customization safely
  const renderCustomization = (customization) => {
    if (!customization) return null;
    if (typeof customization === 'string') return customization;
    if (typeof customization === 'object') {
      // If it's an object, try to display meaningful parts or stringify
      return Object.entries(customization)
        .map(([key, val]) => `${key}: ${val}`)
        .join(', ');
    }
    return String(customization);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600">
            Review your custom designs and proceed to checkout
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    Cart Items ({cartItems.length})
                  </h2>
                  {cartItems.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start designing some amazing shoes!
                  </p>
                  <a
                    href="/designer"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Browse Designs
                  </a>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => {
                    // Handle color display: Hex (bg-color) or Gradient name (class)
                    const isHexColor = item.color && item.color.startsWith('#');
                    const colorStyle = isHexColor ? { backgroundColor: item.color } : {};
                    const colorClass = isHexColor
                      ? `w-32 h-32 rounded-xl flex items-center justify-center text-6xl shadow-lg`
                      : `w-32 h-32 rounded-xl bg-gradient-to-br ${item.color || 'from-blue-500 to-purple-500'} flex items-center justify-center text-6xl shadow-lg`;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-shrink-0">
                            <div className={colorClass} style={colorStyle}>
                              {item.image || '👟'}
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                  {item.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3">
                                  {item.description || 'Custom shoe design'}
                                </p>
                                {item.customization && (
                                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                    <div className="text-sm font-medium text-gray-700 mb-1">
                                      Customization:
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {renderCustomization(item.customization)}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                                  >
                                    −
                                  </button>
                                  <span className="px-4 py-1 text-gray-900 font-medium">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                                  >
                                    +
                                  </button>
                                </div>
                                <span className="text-gray-500 text-sm">
                                  ₹{(item.price || 0).toLocaleString()} each
                                </span>
                              </div>
                              <div className="text-lg font-bold text-gray-900">
                                ₹{((item.price || 0) * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex justify-between items-center"
              >
                <a
                  href="/designer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Continue Shopping</span>
                </a>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{Math.round(total).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Shipping calculated at checkout
                  </p>
                </div>
              </div>

              {cartItems.length > 0 && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPayment(true)}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Proceed to Checkout
                  </motion.button>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Secure Payment
                    </h3>
                    <div className="flex space-x-3">
                      {['💳', '🏦', '💰', '📱'].map((method, index) => (
                        <div
                          key={index}
                          className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg"
                        >
                          {method}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </>
              )}
            </motion.div>

            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                    🚚
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Free Shipping</h3>
                    <p className="text-sm text-gray-600">On orders over ₹5,000</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Fast Production</h3>
                    <p className="text-sm text-gray-600">2-3 week delivery</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white">
                    🔄
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Easy Returns</h3>
                    <p className="text-sm text-gray-600">30-day return policy</p>
                  </div>
                </div>
              </motion.div>
            )}

            {cartItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
              >
                <h3 className="font-bold text-gray-900 mb-4">
                  Design Suggestions
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Trending Sneakers', emoji: '👟', color: 'from-blue-400 to-cyan-400' },
                    { name: 'Classic Boots', emoji: '🥾', color: 'from-gray-600 to-gray-800' },
                    { name: 'Summer Sandals', emoji: '👡', color: 'from-orange-400 to-yellow-400' },
                  ].map((item, index) => (
                    <a
                      key={index}
                      href="/designer"
                      className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-colors cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl`}>
                        {item.emoji}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">Explore designs</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;