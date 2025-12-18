// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//     contactType: 'general'
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   const contactTypes = [
//     { value: 'general', label: 'General Inquiry', icon: '💬' },
//     { value: 'support', label: 'Technical Support', icon: '🔧' },
//     { value: 'design', label: 'Design Help', icon: '🎨' },
//     { value: 'order', label: 'Order Issues', icon: '📦' },
//     { value: 'business', label: 'Business Inquiry', icon: '🤝' },
//     { value: 'feedback', label: 'Feedback', icon: '⭐' },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Here you would typically send to your backend
//       // For now, we'll simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Reset form
//       setFormData({
//         name: '',
//         email: '',
//         subject: '',
//         message: '',
//         contactType: 'general'
//       });
      
//       setSubmitStatus('success');
//       setTimeout(() => setSubmitStatus(null), 5000);
      
//     } catch (error) {
//       setSubmitStatus('error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8 text-center"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Contact ShoeCreatify
//           </h1>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Get in touch with our team. We're here to help with design questions, 
//             technical support, or any other inquiries.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Contact Methods */}
//           <div className="lg:col-span-1">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="space-y-6"
//             >
//               {/* Contact Cards */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
//                     <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
//                       📧
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-800">Email Us</p>
//                       <p className="text-gray-600">
//                         <a href="mailto:support@shoecreatify.com" className="text-blue-600 hover:text-blue-800">
//                           support@shoecreatify.com
//                         </a>
//                       </p>
//                       <p className="text-sm text-gray-500 mt-1">Typically replies within 24 hours</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
//                     <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
//                       📱
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-800">Call Us</p>
//                       <p className="text-gray-600">
//                         <a href="tel:+911234567890" className="text-blue-600 hover:text-blue-800">
//                           +91 12345 67890
//                         </a>
//                       </p>
//                       <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9 AM - 6 PM IST</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
//                     <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
//                       🏢
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-800">Visit Us</p>
//                       <p className="text-gray-600">123 Design Street</p>
//                       <p className="text-gray-600">Creative City, CC 12345</p>
//                       <p className="text-gray-600">India</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Support Hours */}
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Support Hours</h3>
//                 <div className="space-y-3">
//                   {[
//                     { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM IST' },
//                     { day: 'Saturday', hours: '10:00 AM - 4:00 PM IST' },
//                     { day: 'Sunday', hours: 'Emergency Support Only' },
//                   ].map((schedule, idx) => (
//                     <div key={idx} className="flex justify-between items-center p-2 hover:bg-white/50 rounded-lg">
//                       <span className="font-medium text-gray-800">{schedule.day}</span>
//                       <span className="text-gray-600">{schedule.hours}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Links */}
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
//                 <div className="space-y-2">
//                   <Link to="/faq" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
//                     <span className="text-xl">❓</span>
//                     <div>
//                       <p className="font-medium text-gray-900">FAQ</p>
//                       <p className="text-sm text-gray-500">Common questions & answers</p>
//                     </div>
//                   </Link>
//                   <Link to="/design-help" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
//                     <span className="text-xl">🎨</span>
//                     <div>
//                       <p className="font-medium text-gray-900">Design Tutorials</p>
//                       <p className="text-sm text-gray-500">Learn 3D design techniques</p>
//                     </div>
//                   </Link>
//                   <Link to="/status" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
//                     <span className="text-xl">📊</span>
//                     <div>
//                       <p className="font-medium text-gray-900">System Status</p>
//                       <p className="text-sm text-gray-500">Check platform availability</p>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Column - Contact Form */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white rounded-2xl shadow-lg p-8"
//             >
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
//               {/* Status Messages */}
//               {submitStatus === 'success' && (
//                 <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
//                   <div className="flex items-center">
//                     <span className="text-green-600 text-xl mr-3">✅</span>
//                     <div>
//                       <p className="font-bold text-green-800">Message Sent Successfully!</p>
//                       <p className="text-green-700">We'll get back to you within 24 hours.</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {submitStatus === 'error' && (
//                 <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
//                   <div className="flex items-center">
//                     <span className="text-red-600 text-xl mr-3">❌</span>
//                     <div>
//                       <p className="font-bold text-red-800">Error Sending Message</p>
//                       <p className="text-red-700">Please try again or email us directly.</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Name & Email */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>

//                 {/* Subject */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Subject *
//                   </label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                     placeholder="Brief summary of your inquiry"
//                   />
//                 </div>

//                 {/* Contact Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Type of Inquiry *
//                   </label>
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                     {contactTypes.map((type) => (
//                       <label
//                         key={type.value}
//                         className={`
//                           relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all
//                           ${formData.contactType === type.value 
//                             ? 'border-blue-500 bg-blue-50' 
//                             : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                           }
//                         `}
//                       >
//                         <input
//                           type="radio"
//                           name="contactType"
//                           value={type.value}
//                           checked={formData.contactType === type.value}
//                           onChange={handleChange}
//                           className="sr-only"
//                         />
//                         <span className="text-2xl mb-2">{type.icon}</span>
//                         <span className="text-sm font-medium text-gray-800 text-center">
//                           {type.label}
//                         </span>
//                         {formData.contactType === type.value && (
//                           <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
//                             <div className="w-2 h-2 bg-white rounded-full"></div>
//                           </div>
//                         )}
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Message *
//                   </label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows="6"
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
//                     placeholder="Please provide detailed information about your inquiry..."
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-4">
//                   <motion.button
//                     type="submit"
//                     disabled={isSubmitting}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className={`
//                       w-full py-4 px-6 rounded-xl font-bold text-lg
//                       ${isSubmitting 
//                         ? 'bg-gray-400 cursor-not-allowed' 
//                         : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
//                       }
//                       text-white shadow-lg transition-all duration-200
//                     `}
//                   >
//                     {isSubmitting ? (
//                       <div className="flex items-center justify-center">
//                         <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
//                         Sending Message...
//                       </div>
//                     ) : (
//                       'Send Message'
//                     )}
//                   </motion.button>
//                   <p className="text-sm text-gray-500 text-center mt-4">
//                     By submitting this form, you agree to our{' '}
//                     <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
//                       Privacy Policy
//                     </a>
//                   </p>
//                 </div>
//               </form>

//               {/* Alternative Contact Methods */}
//               <div className="mt-8 pt-8 border-t border-gray-200">
//                 <h3 className="text-lg font-bold text-gray-900 mb-4">Prefer another way?</h3>
//                 <div className="flex flex-wrap gap-4">
//                   <a 
//                     href="https://wa.me/911234567890" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="flex items-center space-x-3 px-5 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
//                   >
//                     <span className="text-xl">💬</span>
//                     <div>
//                       <p className="font-medium">WhatsApp Chat</p>
//                       <p className="text-sm opacity-80">Fast response via WhatsApp</p>
//                     </div>
//                   </a>
//                   <a 
//                     href="https://twitter.com/shoecreatify" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="flex items-center space-x-3 px-5 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
//                   >
//                     <span className="text-xl">🐦</span>
//                     <div>
//                       <p className="font-medium">Twitter DM</p>
//                       <p className="text-sm opacity-80">Message us on Twitter</p>
//                     </div>
//                   </a>
//                   <a 
//                     href="https://discord.gg/shoecreatify" 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="flex items-center space-x-3 px-5 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
//                   >
//                     <span className="text-xl">🎮</span>
//                     <div>
//                       <p className="font-medium">Discord Community</p>
//                       <p className="text-sm opacity-80">Join our Discord server</p>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </motion.div>

//             {/* FAQ Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="mt-8 bg-white rounded-2xl shadow-lg p-8"
//             >
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
//               <div className="space-y-4">
//                 {[
//                   {
//                     q: "How long does it take to receive a response?",
//                     a: "We typically respond within 24 hours on business days. For urgent matters, please call our support line."
//                   },
//                   {
//                     q: "Can I modify my custom shoe design after ordering?",
//                     a: "Design modifications are possible within 24 hours of order placement. Contact us immediately if you need changes."
//                   },
//                   {
//                     q: "Do you offer bulk/wholesale pricing?",
//                     a: "Yes! For business inquiries, select 'Business Inquiry' in the contact form for special pricing."
//                   },
//                   {
//                     q: "What's your return policy for custom shoes?",
//                     a: "Due to the custom nature of our products, returns are handled case-by-case. Contact us for assistance."
//                   }
//                 ].map((faq, index) => (
//                   <div key={index} className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
//                     <details className="group">
//                       <summary className="flex justify-between items-center cursor-pointer list-none">
//                         <h4 className="text-lg font-medium text-gray-900">{faq.q}</h4>
//                         <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
//                       </summary>
//                       <p className="mt-3 text-gray-600">{faq.a}</p>
//                     </details>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Map Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden"
//         >
//           <div className="p-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Our Office</h3>
//             <div className="h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
//               <div className="text-center">
//                 <div className="text-4xl mb-4">📍</div>
//                 <p className="text-gray-700 font-medium">123 Design Street, Creative City</p>
//                 <p className="text-gray-600">CC 12345, India</p>
//                 <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                   Get Directions
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactType: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactTypes = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'support', label: 'Technical Support', icon: '🔧' },
    { value: 'design', label: 'Design Help', icon: '🎨' },
    { value: 'order', label: 'Order Issues', icon: '📦' },
    { value: 'business', label: 'Business Inquiry', icon: '🤝' },
    { value: 'feedback', label: 'Feedback', icon: '⭐' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using your backend API
      const response = await axios.post('/api/contact/send', {
        ...formData,
        toEmail: 'ramkkumar977@gmail.com', // Your email
        replyTo: formData.email, // Sender's email for reply
      });

      if (response.data.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          contactType: 'general'
        });
        
        setSubmitStatus('success');
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error('Failed to send message');
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // LPU Location Coordinates
  const lpuLocation = {
    lat: 31.2550,
    lng: 75.7051,
    address: "Lovely Professional University, Jalandhar - Delhi GT Road, Phagwara, Punjab 144411",
    googleMapsUrl: "https://goo.gl/maps/9UwvR8PJhN8tE8b49"
  };

  // Function to open Google Maps
  const openGoogleMaps = () => {
    window.open(lpuLocation.googleMapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact ShoeCreatify
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get in touch with our team. We're here to help with design questions, 
            technical support, or any other inquiries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Methods */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Contact Cards */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      📧
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Email Us</p>
                      <p className="text-gray-600">
                        <a 
                          href="mailto:ramkkumar977@gmail.com" 
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          ramkumar9219447537@gmail.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Typically replies within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                      📱
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Call/WhatsApp</p>
                      <p className="text-gray-600">
                        <a 
                          href="tel:+919219447537" 
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          +91 92194 47537
                        </a>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Available on WhatsApp</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                      🏢
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Visit Our Office</p>
                      <p className="text-gray-600">Lovely Professional University</p>
                      <p className="text-gray-600">Jalandhar - Delhi GT Road</p>
                      <p className="text-gray-600">Phagwara, Punjab 144411</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Support Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM IST' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM IST' },
                    { day: 'Sunday', hours: 'Emergency Support Only' },
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 hover:bg-white/50 rounded-lg">
                      <span className="font-medium text-gray-800">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link to="/faq" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <span className="text-xl">❓</span>
                    <div>
                      <p className="font-medium text-gray-900">FAQ</p>
                      <p className="text-sm text-gray-500">Common questions & answers</p>
                    </div>
                  </Link>
                  <Link to="/design-help" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <span className="text-xl">🎨</span>
                    <div>
                      <p className="font-medium text-gray-900">Design Tutorials</p>
                      <p className="text-sm text-gray-500">Learn 3D design techniques</p>
                    </div>
                  </Link>
                  <Link to="/status" className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <span className="text-xl">📊</span>
                    <div>
                      <p className="font-medium text-gray-900">System Status</p>
                      <p className="text-sm text-gray-500">Check platform availability</p>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-green-600 text-xl mr-3">✅</span>
                    <div>
                      <p className="font-bold text-green-800">Message Sent Successfully!</p>
                      <p className="text-green-700">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-red-600 text-xl mr-3">❌</span>
                    <div>
                      <p className="font-bold text-red-800">Error Sending Message</p>
                      <p className="text-red-700">Please try again or email us directly at ramkumar9219447537@gmail.com</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Brief summary of your inquiry"
                  />
                </div>

                {/* Contact Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Type of Inquiry *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {contactTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`
                          relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                          ${formData.contactType === type.value 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="contactType"
                          value={type.value}
                          checked={formData.contactType === type.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="text-2xl mb-2">{type.icon}</span>
                        <span className="text-sm font-medium text-gray-800 text-center">
                          {type.label}
                        </span>
                        {formData.contactType === type.value && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full py-4 px-6 rounded-xl font-bold text-lg
                      ${isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      }
                      text-white shadow-lg transition-all duration-200
                    `}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Sending Message...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </form>

              {/* Alternative Contact Methods */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Prefer another way?</h3>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://wa.me/919219447537" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-5 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                  >
                    <span className="text-xl">💬</span>
                    <div>
                      <p className="font-medium">WhatsApp Chat</p>
                      <p className="text-sm opacity-80">Fast response via WhatsApp</p>
                    </div>
                  </a>
                  <a 
                    href="mailto:ramkkumar977@gmail.com" 
                    className="flex items-center space-x-3 px-5 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                  >
                    <span className="text-xl">📧</span>
                    <div>
                      <p className="font-medium">Direct Email</p>
                      <p className="text-sm opacity-80">Email directly to ramkkumar977@gmail.com</p>
                    </div>
                  </a>
                  <button
                    onClick={openGoogleMaps}
                    className="flex items-center space-x-3 px-5 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
                  >
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="font-medium">Get Directions</p>
                      <p className="text-sm opacity-80">Open LPU location in Google Maps</p>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  {
                    q: "How long does it take to receive a response?",
                    a: "We typically respond within 24 hours on business days. For urgent matters, please call or WhatsApp us at +91 92194 47537."
                  },
                  {
                    q: "Can I modify my custom shoe design after ordering?",
                    a: "Design modifications are possible within 24 hours of order placement. Contact us immediately if you need changes."
                  },
                  {
                    q: "Do you offer bulk/wholesale pricing for college projects?",
                    a: "Yes! Being based in LPU, we offer special pricing for college projects and bulk orders. Select 'Business Inquiry' in the contact form."
                  },
                  {
                    q: "Can I visit your office at LPU?",
                    a: "Yes! We're located at Lovely Professional University campus. Feel free to visit us during working hours, but we recommend scheduling an appointment first."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer list-none">
                        <h4 className="text-lg font-medium text-gray-900">{faq.q}</h4>
                        <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-gray-600">{faq.a}</p>
                    </details>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Our Office at LPU</h3>
            <div className="h-96 rounded-xl overflow-hidden">
              {/* Google Maps Embed */}
              <iframe
                title="LPU Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.8654506643735!2d75.70286257531632!3d31.254999374365718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a5747a9e91f%3A0xb74c8d90d2f0170e!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1702400000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">{lpuLocation.address}</p>
                <p className="text-gray-500 text-sm mt-1">Lovely Professional University Campus</p>
              </div>
              <button
                onClick={openGoogleMaps}
                className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>📍</span>
                <span>Open in Google Maps</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;