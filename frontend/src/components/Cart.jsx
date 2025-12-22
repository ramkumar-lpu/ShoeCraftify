import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

// Lazy load Payment component
const Payment = lazy(() => import('./Payment'));

const Cart = ({ user }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal
  } = useCart();

  const [showPayment, setShowPayment] = useState(false);

  // Memoize all calculations
  const cartTotal = useMemo(() => getCartTotal(), [cartItems]);
  
  const { shipping, tax, total } = useMemo(() => {
    const shippingCost = cartTotal > 5000 ? 0 : 50;
    const taxAmount = cartTotal * 0.18;
    const totalAmount = cartTotal + shippingCost + taxAmount;
    
    return {
      shipping: shippingCost,
      tax: taxAmount,
      total: totalAmount
    };
  }, [cartTotal]);

  // Memoize handlers
  const handlePaymentSuccess = useCallback(async (paymentData) => {
    console.log('Payment successful:', paymentData);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          templateId: item.designId || 'custom',
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          customization: {
            description: typeof item.customization === 'string' 
              ? item.customization 
              : JSON.stringify(item.customization)
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
        console.log('Order saved to DB, clearing cart...');
        clearCart();
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Payment successful but failed to record order. Please contact support.');
    }
  }, [cartItems, total, clearCart]);

  const handleClosePayment = useCallback(() => {
    setShowPayment(false);
  }, []);

  // Memoize customization renderer
  const renderCustomization = useCallback((customization) => {
    if (!customization) return null;
    if (typeof customization === 'string') return customization;
    if (typeof customization === 'object') {
      return Object.entries(customization)
        .map(([key, val]) => `${key}: ${val}`)
        .join(', ');
    }
    return String(customization);
  }, []);

  if (showPayment) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Payment
          user={user}
          cartItems={cartItems}
          onPaymentSuccess={handlePaymentSuccess}
          onClose={handleClosePayment}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
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
            <CartItemsSection 
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
              renderCustomization={renderCustomization}
            />

            {cartItems.length > 0 && (
              <ContinueShoppingLink />
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary 
              cartTotal={cartTotal}
              shipping={shipping}
              tax={tax}
              total={total}
              cartItems={cartItems}
              onCheckout={() => setShowPayment(true)}
            />

            {cartItems.length > 0 ? (
              <ShippingInfo />
            ) : (
              <DesignSuggestions />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Items Section Component
const CartItemsSection = React.memo(({ 
  cartItems, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  renderCustomization 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
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
            className="text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
    </div>

    {cartItems.length === 0 ? (
      <EmptyCart />
    ) : (
      <div className="divide-y divide-gray-200">
        {cartItems.map((item, index) => (
          <CartItem
            key={item.id}
            item={item}
            index={index}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            renderCustomization={renderCustomization}
          />
        ))}
      </div>
    )}
  </motion.div>
));

CartItemsSection.displayName = 'CartItemsSection';

// Cart Item Component
const CartItem = React.memo(({ item, index, removeFromCart, updateQuantity, renderCustomization }) => {
  const isHexColor = item.color && item.color.startsWith('#');
  const colorStyle = isHexColor ? { backgroundColor: item.color } : {};
  const colorClass = isHexColor
    ? 'w-32 h-32 rounded-xl flex items-center justify-center text-6xl shadow-lg'
    : `w-32 h-32 rounded-xl bg-gradient-to-br ${item.color || 'from-blue-500 to-purple-500'} flex items-center justify-center text-6xl shadow-lg`;

  const handleRemove = useCallback(() => {
    removeFromCart(item.id);
  }, [removeFromCart, item.id]);

  const handleDecrease = useCallback(() => {
    updateQuantity(item.id, item.quantity - 1);
  }, [updateQuantity, item.id, item.quantity]);

  const handleIncrease = useCallback(() => {
    updateQuantity(item.id, item.quantity + 1);
  }, [updateQuantity, item.id, item.quantity]);

  const itemTotal = useMemo(() => 
    ((item.price || 0) * item.quantity).toLocaleString(),
    [item.price, item.quantity]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.3 }}
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
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
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
                  onClick={handleDecrease}
                  className="px-3 py-1 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-1 text-gray-900 font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="px-3 py-1 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-gray-500 text-sm">
                ₹{(item.price || 0).toLocaleString()} each
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              ₹{itemTotal}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

CartItem.displayName = 'CartItem';

// Empty Cart Component
const EmptyCart = React.memo(() => (
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
));

EmptyCart.displayName = 'EmptyCart';

// Continue Shopping Link
const ContinueShoppingLink = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.3 }}
    className="mt-6 flex justify-between items-center"
  >
    <a
      href="/designer"
      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>Continue Shopping</span>
    </a>
  </motion.div>
));

ContinueShoppingLink.displayName = 'ContinueShoppingLink';

// Order Summary Component (Promo Code Removed)
const OrderSummary = React.memo(({ cartTotal, shipping, tax, total, cartItems, onCheckout }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
  >
    <h2 className="text-xl font-bold text-gray-900 mb-6">
      Order Summary
    </h2>

    <div className="space-y-4 mb-6">
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
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
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCheckout}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          Proceed to Checkout
        </motion.button>

        <PaymentMethods />
      </>
    )}
  </motion.div>
));

OrderSummary.displayName = 'OrderSummary';

// Payment Methods
const PaymentMethods = React.memo(() => (
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
));

PaymentMethods.displayName = 'PaymentMethods';

// Shipping Info Component
const ShippingInfo = React.memo(() => {
  const benefits = useMemo(() => [
    { emoji: '🚚', title: 'Free Shipping', desc: 'On orders over ₹5,000', color: 'from-blue-500 to-purple-500' },
    { emoji: '⚡', title: 'Fast Production', desc: '2-3 week delivery', color: 'from-green-500 to-emerald-500' },
    { emoji: '🔄', title: 'Easy Returns', desc: '30-day return policy', color: 'from-yellow-500 to-orange-500' },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
    >
      {benefits.map((item, index) => (
        <div key={index} className={`flex items-center space-x-3 ${index > 0 ? 'mt-4' : ''}`}>
          <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white flex-shrink-0`}>
            {item.emoji}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
});

ShippingInfo.displayName = 'ShippingInfo';

// Design Suggestions Component
const DesignSuggestions = React.memo(() => {
  const suggestions = useMemo(() => [
    { name: 'Trending Sneakers', emoji: '👟', color: 'from-blue-400 to-cyan-400' },
    { name: 'Classic Boots', emoji: '🥾', color: 'from-gray-600 to-gray-800' },
    { name: 'Summer Sandals', emoji: '👡', color: 'from-orange-400 to-yellow-400' },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
    >
      <h3 className="font-bold text-gray-900 mb-4">
        Design Suggestions
      </h3>
      <div className="space-y-3">
        {suggestions.map((item, index) => (
          <a
            key={index}
            href="/designer"
            className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg hover:bg-white transition-colors cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl flex-shrink-0`}>
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
  );
});

DesignSuggestions.displayName = 'DesignSuggestions';

// Loading Spinner for Payment lazy load
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading payment...</p>
    </div>
  </div>
);

export default React.memo(Cart);