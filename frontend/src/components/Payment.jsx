import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Payment = ({ user, cartItems = [], onPaymentSuccess, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Calculate order total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const tax = subtotal * 0.18;
  const total = Math.round(subtotal + shipping + tax);

  // Load Razorpay Script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);

    const res = await loadRazorpay();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Create Order on Backend
      const orderResponse = await axios.post('/api/payment/create-order', {
        amount: total
      });

      if (!orderResponse.data.success) {
        throw new Error('Server error creating order');
      }

      const { order } = orderResponse.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use env variable
        amount: order.amount,
        currency: order.currency,
        name: "ShoeCraftify",
        description: "Custom Shoe Order",
        image: "https://via.placeholder.com/150", // You can add a logo here
        order_id: order.id,
        handler: async function (response) {
          // 3. Verify Payment
          try {
            const verifyResponse = await axios.post('/api/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
              setPaymentStatus('success');
              if (onPaymentSuccess) {
                onPaymentSuccess({
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  amount: total,
                  method: 'Razorpay'
                });
              }
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification Error:', error);
            alert('Payment verification failed on server');
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "" // You can add user phone if available
        },
        theme: {
          color: "#3399cc"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Payment Error:', error);
      alert('Something went wrong initiating payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {paymentStatus === 'success' ? 'Payment Complete!' : 'Secure Checkout'}
              </h1>
              <p className="text-gray-600 mt-2">
                {paymentStatus === 'success'
                  ? 'Thank you for your purchase!'
                  : 'Complete your order securely with Razorpay'
                }
              </p>
            </div>
            {onClose && paymentStatus !== 'success' && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Section */}
          <div className="lg:col-span-2">
            {paymentStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Payment Successful!
                </h2>
                <p className="text-green-700 mb-6">
                  Your order has been confirmed.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="text-center mb-8">
                  <div className="text-5xl mb-4">💳</div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Pay ₹{total.toLocaleString()}
                  </h2>
                  <p className="text-gray-500">via Razorpay Secure Gateway</p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Pay Now'
                  )}
                </button>

                <div className="mt-6 flex items-center justify-center space-x-4 grayscale opacity-60">
                  <span className="text-sm">Secured by Razorpay</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;