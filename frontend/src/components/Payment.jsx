// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// const Payment = ({ user, cartItems = [], onPaymentSuccess, onClose }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [orderId, setOrderId] = useState(null);
//   const [paymentStatus, setPaymentStatus] = useState(null);
  
//   // Mock cart total if no cart items provided
//   const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const shipping = subtotal > 100 ? 0 : 9.99;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;

//   const paymentMethods = [
//     { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
//     { id: 'upi', name: 'UPI', icon: '📱' },
//     { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
//     { id: 'wallet', name: 'Wallet', icon: '💰' },
//   ];

//   // Initialize Razorpay payment
//   const initializeRazorpayPayment = async () => {
//     setIsLoading(true);
    
//     try {
//       // Step 1: Create order on your backend
//       const orderResponse = await axios.post('/api/payment/create-order', {
//         amount: Math.round(total * 100), // Convert to paise
//         currency: 'INR',
//         receipt: `receipt_${Date.now()}`,
//         notes: {
//           userId: user?._id || user?.id,
//           email: user?.email,
//         }
//       });

//       const orderData = orderResponse.data;
//       setOrderId(orderData.id);

//       // Step 2: Load Razorpay script
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => openRazorpay(orderData);
//       document.body.appendChild(script);

//     } catch (error) {
//       console.error('Error creating order:', error);
//       setIsLoading(false);
//     }
//   };

//   const openRazorpay = (orderData) => {
//     const options = {
//       key: process.env.RAZORPAY_KEY_ID, // Your Razorpay Key ID
//       amount: orderData.amount,
//       currency: orderData.currency,
//       name: 'SHOECREATIFY',
//       description: 'Custom Shoe Purchase',
//       order_id: orderData.id,
//       handler: async function(response) {
//         // Handle successful payment
//         await verifyPayment(response);
//       },
//       prefill: {
//         name: user?.firstName ? `${user.firstName} ${user.lastName}` : 'Customer',
//         email: user?.email || '',
//         contact: user?.phone || '',
//       },
//       notes: {
//         address: 'SHOECREATIFY Office',
//       },
//       theme: {
//         color: '#3B82F6',
//       },
//       modal: {
//         ondismiss: function() {
//           setIsLoading(false);
//         }
//       }
//     };

//     const razorpayInstance = new window.Razorpay(options);
//     razorpayInstance.open();
//   };

//   const verifyPayment = async (paymentResponse) => {
//     try {
//       const verifyResponse = await axios.post('/api/payment/verify', {
//         razorpay_order_id: paymentResponse.razorpay_order_id,
//         razorpay_payment_id: paymentResponse.razorpay_payment_id,
//         razorpay_signature: paymentResponse.razorpay_signature,
//       });

//       if (verifyResponse.data.success) {
//         setPaymentStatus('success');
//         if (onPaymentSuccess) {
//           onPaymentSuccess(verifyResponse.data);
//         }
//       } else {
//         setPaymentStatus('failed');
//       }
//     } catch (error) {
//       console.error('Payment verification failed:', error);
//       setPaymentStatus('failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Mock payment for demo
//   const handleMockPayment = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setPaymentStatus('success');
//       setIsLoading(false);
//       if (onPaymentSuccess) {
//         onPaymentSuccess({ orderId: `mock_${Date.now()}` });
//       }
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <div className="flex justify-between items-center">
//             <h1 className="text-4xl font-bold text-gray-900">
//               Secure Payment
//             </h1>
//             {onClose && (
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             )}
//           </div>
//           <p className="text-gray-600 mt-2">
//             Complete your purchase with secure payment
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Payment Form */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white rounded-2xl shadow-lg p-6"
//             >
//               {/* Payment Methods */}
//               <div className="mb-8">
//                 <h2 className="text-xl font-bold text-gray-900 mb-6">
//                   Select Payment Method
//                 </h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {paymentMethods.map((method) => (
//                     <button
//                       key={method.id}
//                       onClick={() => setPaymentMethod(method.id)}
//                       className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
//                         paymentMethod === method.id
//                           ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500'
//                           : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
//                       }`}
//                     >
//                       <span className="text-2xl mb-2">{method.icon}</span>
//                       <span className="text-sm font-medium text-gray-700">{method.name}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Card Details Form */}
//               {paymentMethod === 'card' && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="mb-8"
//                 >
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     Card Details
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Card Number
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="1234 5678 9012 3456"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Expiry Date
//                         </label>
//                         <input
//                           type="text"
//                           placeholder="MM/YY"
//                           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           CVV
//                         </label>
//                         <input
//                           type="text"
//                           placeholder="123"
//                           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Cardholder Name
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="John Doe"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* UPI Form */}
//               {paymentMethod === 'upi' && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="mb-8"
//                 >
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     UPI Payment
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         UPI ID
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="username@bank"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       />
//                     </div>
//                     <p className="text-sm text-gray-500">
//                       Enter your UPI ID to proceed with the payment
//                     </p>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Terms and Conditions */}
//               <div className="p-4 bg-blue-50 rounded-xl mb-6">
//                 <div className="flex items-start">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     className="mt-1 mr-3"
//                   />
//                   <label htmlFor="terms" className="text-sm text-gray-700">
//                     I agree to the{' '}
//                     <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
//                       Terms & Conditions
//                     </a>{' '}
//                     and authorize SHOECREATIFY to charge my payment method for the total amount.
//                   </label>
//                 </div>
//               </div>

//               {/* Pay Now Button */}
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={process.env.NODE_ENV === 'development' ? handleMockPayment : initializeRazorpayPayment}
//                 disabled={isLoading}
//                 className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Processing Payment...
//                   </div>
//                 ) : (
//                   `Pay ₹${total.toFixed(2)}`
//                 )}
//               </motion.button>

//               {/* Payment Status */}
//               {paymentStatus && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`mt-4 p-4 rounded-xl text-center ${
//                     paymentStatus === 'success' 
//                       ? 'bg-green-50 text-green-700 border border-green-200'
//                       : 'bg-red-50 text-red-700 border border-red-200'
//                   }`}
//                 >
//                   {paymentStatus === 'success' ? (
//                     <>
//                       <div className="text-2xl mb-2">🎉</div>
//                       <div className="font-bold mb-1">Payment Successful!</div>
//                       <p>Your order has been confirmed. You will receive an email shortly.</p>
//                     </>
//                   ) : (
//                     <>
//                       <div className="text-2xl mb-2">❌</div>
//                       <div className="font-bold mb-1">Payment Failed</div>
//                       <p>Please try again or use a different payment method.</p>
//                     </>
//                   )}
//                 </motion.div>
//               )}
//             </motion.div>

//             {/* Security Info */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="mt-6 bg-white rounded-2xl p-6 shadow-lg"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
//                     🔒
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900">Secure Payment</h3>
//                     <p className="text-sm text-gray-600">
//                       256-bit SSL encryption. Your payment details are secure.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2">
//                   <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">
//                     PCI
//                   </div>
//                   <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">
//                     DSS
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white rounded-2xl shadow-lg p-6 sticky top-6"
//             >
//               <h2 className="text-xl font-bold text-gray-900 mb-6">
//                 Order Summary
//               </h2>

//               {/* Items List */}
//               <div className="mb-6">
//                 <h3 className="font-medium text-gray-700 mb-3">Items</h3>
//                 <div className="space-y-3">
//                   {cartItems.length > 0 ? (
//                     cartItems.map((item) => (
//                       <div key={item.id} className="flex justify-between items-center">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
//                             {item.image}
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900 text-sm">
//                               {item.name}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               Qty: {item.quantity}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="font-medium">
//                           ₹{(item.price * item.quantity).toFixed(2)}
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-4 text-gray-500">
//                       No items in cart
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Price Breakdown */}
//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal</span>
//                   <span>₹{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping</span>
//                   <span className={shipping === 0 ? 'text-green-600' : ''}>
//                     {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Tax (8%)</span>
//                   <span>₹{tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t border-gray-200 pt-3">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total</span>
//                     <span>₹{total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Need Help */}
//               <div className="pt-6 border-t border-gray-200">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
//                     💬
//                   </div>
//                   <div>
//                     <div className="font-medium text-gray-900">Need Help?</div>
//                     <a href="mailto:support@shoecreatify.com" className="text-sm text-blue-600 hover:text-blue-800">
//                       support@shoecreatify.com
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;





import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Payment = ({ user, cartItems = [], onPaymentSuccess, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  
  // Calculate total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = Math.round((subtotal + shipping + tax) * 100); // Convert to paise

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '📱', description: 'Instant payment via UPI ID' },
    { id: 'qrcode', name: 'QR Code', icon: '📲', description: 'Scan QR code to pay' },
    { id: 'card', name: 'Card', icon: '💳', description: 'Credit/Debit Card' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'Internet Banking' },
  ];

  const upiApps = [
    { name: 'Google Pay', color: 'from-purple-500 to-purple-700', icon: 'G' },
    { name: 'PhonePe', color: 'from-blue-500 to-blue-700', icon: 'P' },
    { name: 'Paytm', color: 'from-blue-400 to-cyan-500', icon: 'P' },
    { name: 'BHIM', color: 'from-green-500 to-emerald-700', icon: 'B' },
  ];

  // Generate UPI ID from email if available
  const generateUpiId = () => {
    if (user?.email) {
      const emailParts = user.email.split('@');
      return `${emailParts[0]}@okicici`; // Example UPI ID format
    }
    return 'customer@razorpay'; // Fallback
  };

  // Initialize Razorpay payment
  const initializeRazorpayPayment = async () => {
    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter your UPI ID');
      return;
    }

    setIsLoading(true);
    
    try {
      // Create order on backend
      const orderResponse = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount: total,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          userId: user?._id || user?.id,
          email: user?.email,
          paymentMethod: paymentMethod,
          cartItems: cartItems
        }
      });

      const orderData = orderResponse.data;
      setOrderId(orderData.id);

      // For UPI payment
      if (paymentMethod === 'upi') {
        // Create UPI payment intent
        await handleUpiPayment(orderData);
      } 
      // For QR Code payment
      else if (paymentMethod === 'qrcode') {
        setQrCodeGenerated(true);
        // Simulate QR code generation
        setTimeout(() => {
          simulatePaymentSuccess(orderData.id);
        }, 3000);
      }
      // For other payment methods
      else {
        // Load Razorpay script for card/netbanking
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => openRazorpayCheckout(orderData);
        document.body.appendChild(script);
      }

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initialization failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleUpiPayment = async (orderData) => {
    try {
      // For UPI, we can use deep linking
      const upiLinks = {
        'Google Pay': `upi://pay?pa=${upiId}&pn=SHOECREATIFY&am=${(total/100).toFixed(2)}&cu=INR&tn=Order-${orderData.id}`,
        'PhonePe': `phonepe://pay?pa=${upiId}&pn=SHOECREATIFY&am=${(total/100).toFixed(2)}&cu=INR`,
        'Paytm': `paytmmp://pay?pa=${upiId}&pn=SHOECREATIFY&am=${(total/100).toFixed(2)}&cu=INR`,
      };

      // Show UPI apps selection
      const selectedApp = window.prompt(
        'Select UPI App:\n1. Google Pay\n2. PhonePe\n3. Paytm\n4. BHIM\n\nEnter number (1-4):',
        '1'
      );

      let upiLink = '';
      switch(selectedApp) {
        case '1': upiLink = upiLinks['Google Pay']; break;
        case '2': upiLink = upiLinks['PhonePe']; break;
        case '3': upiLink = upiLinks['Paytm']; break;
        case '4': 
          upiLink = `upi://pay?pa=${upiId}&pn=SHOECREATIFY&am=${(total/100).toFixed(2)}&cu=INR`;
          break;
        default: upiLink = upiLinks['Google Pay'];
      }

      // Open UPI app or show instructions
      window.location.href = upiLink;
      
      // Start polling for payment status
      pollPaymentStatus(orderData.id);

    } catch (error) {
      console.error('UPI payment error:', error);
      alert('Failed to initiate UPI payment. Please try another method.');
      setIsLoading(false);
    }
  };

  const openRazorpayCheckout = (orderData) => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_your_test_key',
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'SHOECREATIFY',
      description: 'Custom Shoe Purchase',
      order_id: orderData.id,
      handler: async function(response) {
        await verifyPayment(response);
      },
      prefill: {
        name: user?.firstName ? `${user.firstName} ${user.lastName}` : 'Customer',
        email: user?.email || '',
        contact: user?.phone || '',
      },
      notes: {
        address: 'SHOECREATIFY Custom Shoes',
      },
      theme: {
        color: '#3B82F6',
      },
      modal: {
        ondismiss: function() {
          setIsLoading(false);
        }
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const pollPaymentStatus = async (orderId) => {
    // Poll for payment status every 2 seconds
    const interval = setInterval(async () => {
      try {
        // In real app, you would check with your backend
        // For demo, simulate success after 5 seconds
        setTimeout(() => {
          clearInterval(interval);
          simulatePaymentSuccess(orderId);
        }, 5000);
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 2000);
  };

  const simulatePaymentSuccess = async (orderId) => {
    try {
      // Simulate payment verification
      const mockPaymentId = `pay_${Date.now()}`;
      const mockSignature = `sig_${Date.now()}`;
      
      // Verify with backend
      const verifyResponse = await axios.post('http://localhost:5000/api/payment/verify', {
        razorpay_order_id: orderId,
        razorpay_payment_id: mockPaymentId,
        razorpay_signature: mockSignature,
        amount: total,
        currency: 'INR'
      });

      if (verifyResponse.data.success) {
        setPaymentStatus('success');
        if (onPaymentSuccess) {
          onPaymentSuccess({
            orderId: orderId,
            paymentId: mockPaymentId,
            amount: total/100,
            currency: 'INR',
            timestamp: new Date().toISOString()
          });
        }
      } else {
        setPaymentStatus('failed');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentStatus('failed');
    } finally {
      setIsLoading(false);
      setQrCodeGenerated(false);
    }
  };

  const verifyPayment = async (paymentResponse) => {
    try {
      const verifyResponse = await axios.post('http://localhost:5000/api/payment/verify', {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
      });

      if (verifyResponse.data.success) {
        setPaymentStatus('success');
        if (onPaymentSuccess) {
          onPaymentSuccess(verifyResponse.data);
        }
      } else {
        setPaymentStatus('failed');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      setPaymentStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate QR Code component
  const QRCodeDisplay = () => (
    <div className="bg-white rounded-2xl p-6 text-center">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Scan QR Code to Pay</h3>
      
      {/* Mock QR Code */}
      <div className="mx-auto w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
        <div className="text-white text-center">
          <div className="text-4xl mb-2">📱</div>
          <div className="text-sm">UPI QR Code</div>
          <div className="text-xs mt-2">₹{(total/100).toFixed(2)}</div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">
        Scan this QR code with any UPI app to complete payment
      </p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-700 mb-2">UPI ID for manual entry:</div>
        <div className="font-mono text-lg font-bold text-gray-900">
          shoecreatify@razorpay
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        {upiApps.map((app, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white font-bold text-lg mb-1`}>
              {app.icon}
            </div>
            <div className="text-xs text-gray-600">{app.name}</div>
          </div>
        ))}
      </div>
      
      <p className="text-gray-500 text-xs mt-4">
        Payment will be confirmed automatically once completed
      </p>
    </div>
  );

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
                Complete Payment
              </h1>
              <p className="text-gray-600 mt-2">
                Secure payment for your custom shoes
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Options */}
          <div className="lg:col-span-2">
            {qrCodeGenerated ? (
              <QRCodeDisplay />
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                {/* Payment Methods */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Select Payment Method
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all ${
                          paymentMethod === method.id
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500'
                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                        }`}
                      >
                        <span className="text-2xl mb-2">{method.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{method.name}</span>
                        <span className="text-xs text-gray-500 mt-1">{method.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* UPI Payment Form */}
                {paymentMethod === 'upi' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      UPI Payment
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Enter UPI ID
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@bank"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Example: yourname@okicici, mobilenumber@ybl
                        </p>
                      </div>
                      
                      {/* Quick UPI Suggestions */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Quick Fill:</p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setUpiId(generateUpiId())}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full hover:bg-blue-200 transition-colors"
                          >
                            Use my email
                          </button>
                          <button
                            onClick={() => setUpiId('shoecreatify@razorpay')}
                            className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full hover:bg-purple-200 transition-colors"
                          >
                            Use demo UPI
                          </button>
                        </div>
                      </div>

                      {/* UPI Apps */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Open with:</p>
                        <div className="grid grid-cols-4 gap-3">
                          {upiApps.map((app, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setUpiId('shoecreatify@razorpay');
                                alert(`Opening ${app.name}...`);
                              }}
                              className={`p-3 rounded-xl bg-gradient-to-br ${app.color} text-white flex flex-col items-center justify-center hover:opacity-90 transition-opacity`}
                            >
                              <span className="text-lg font-bold mb-1">{app.icon}</span>
                              <span className="text-xs">{app.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Card Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* QR Code Instructions */}
                {paymentMethod === 'qrcode' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8 p-4 bg-blue-50 rounded-xl"
                  >
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">📲</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">QR Code Payment</h4>
                        <p className="text-sm text-gray-600">
                          A QR code will be generated for you to scan with any UPI app
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Terms and Conditions */}
                <div className="p-4 bg-blue-50 rounded-xl mb-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 mr-3"
                      defaultChecked
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                        Terms & Conditions
                      </a>{' '}
                      and authorize SHOECREATIFY to process my payment.
                    </label>
                  </div>
                </div>

                {/* Pay Now Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={initializeRazorpayPayment}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {paymentMethod === 'qrcode' ? 'Generating QR Code...' : 'Processing Payment...'}
                    </div>
                  ) : (
                    `Pay ₹${(total/100).toFixed(2)}`
                  )}
                </motion.button>

                {/* Payment Status */}
                {paymentStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-xl text-center ${
                      paymentStatus === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {paymentStatus === 'success' ? (
                      <>
                        <div className="text-2xl mb-2">🎉</div>
                        <div className="font-bold mb-1">Payment Successful!</div>
                        <p>Your order has been confirmed. You will receive an email shortly.</p>
                        <button
                          onClick={onClose}
                          className="mt-3 px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Continue Shopping
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl mb-2">❌</div>
                        <div className="font-bold mb-1">Payment Failed</div>
                        <p>Please try again or use a different payment method.</p>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Security Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                    🔒
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">100% Secure Payment</h3>
                    <p className="text-sm text-gray-600">
                      All transactions are secured with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">
                    PCI
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">
                    DSS
                  </div>
                </div>
              </div>
            </motion.div>
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

              {/* Items List */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Items</h3>
                <div className="space-y-3">
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            {item.image || '👟'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="font-medium">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No items in cart
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{(subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{(total/100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    💬
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Need Help?</div>
                    <a href="mailto:support@shoecreatify.com" className="text-sm text-blue-600 hover:text-blue-800">
                      support@shoecreatify.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6"
            >
              <h3 className="font-bold text-gray-900 mb-3">Payment Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>UPI payments are instant and recommended</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Keep your UPI app ready for OTP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Save payment receipt for future reference</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Contact support if payment fails</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;