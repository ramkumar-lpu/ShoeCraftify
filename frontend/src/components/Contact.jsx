// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

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
//       // Send email using your backend API
//       const response = await axios.post('/api/contact/send', {
//         ...formData,
//         toEmail: 'ramkkumar977@gmail.com', // Your email
//         replyTo: formData.email, // Sender's email for reply
//       });

//       if (response.data.success) {
//         // Reset form
//         setFormData({
//           name: '',
//           email: '',
//           subject: '',
//           message: '',
//           contactType: 'general'
//         });
        
//         setSubmitStatus('success');
//         setTimeout(() => setSubmitStatus(null), 5000);
//       } else {
//         throw new Error('Failed to send message');
//       }
      
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setSubmitStatus('error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // LPU Location Coordinates
//   const lpuLocation = {
//     lat: 31.2550,
//     lng: 75.7051,
//     address: "Lovely Professional University, Jalandhar - Delhi GT Road, Phagwara, Punjab 144411",
//     googleMapsUrl: "https://goo.gl/maps/9UwvR8PJhN8tE8b49"
//   };

//   // Function to open Google Maps
//   const openGoogleMaps = () => {
//     window.open(lpuLocation.googleMapsUrl, '_blank');
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
//                         <a 
//                           href="mailto:ramkkumar977@gmail.com" 
//                           className="text-blue-600 hover:text-blue-800 hover:underline"
//                         >
//                           ramkumar9219447537@gmail.com
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
//                       <p className="font-bold text-gray-800">Call/WhatsApp</p>
//                       <p className="text-gray-600">
//                         <a 
//                           href="tel:+919219447537" 
//                           className="text-blue-600 hover:text-blue-800 hover:underline"
//                         >
//                           +91 92194 47537
//                         </a>
//                       </p>
//                       <p className="text-sm text-gray-500 mt-1">Available on WhatsApp</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
//                     <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
//                       🏢
//                     </div>
//                     <div>
//                       <p className="font-bold text-gray-800">Visit Our Office</p>
//                       <p className="text-gray-600">Lovely Professional University</p>
//                       <p className="text-gray-600">Jalandhar - Delhi GT Road</p>
//                       <p className="text-gray-600">Phagwara, Punjab 144411</p>
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
//                       <p className="text-red-700">Please try again or email us directly at ramkumar9219447537@gmail.com</p>
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
//                       placeholder="name"
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
//                       placeholder="@example.com"
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
//                     href="https://wa.me/919219447537" 
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
//                     href="mailto:ramkkumar977@gmail.com" 
//                     className="flex items-center space-x-3 px-5 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
//                   >
//                     <span className="text-xl">📧</span>
//                     <div>
//                       <p className="font-medium">Direct Email</p>
//                       <p className="text-sm opacity-80">Email directly to ramkkumar977@gmail.com</p>
//                     </div>
//                   </a>
//                   <button
//                     onClick={openGoogleMaps}
//                     className="flex items-center space-x-3 px-5 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
//                   >
//                     <span className="text-xl">📍</span>
//                     <div>
//                       <p className="font-medium">Get Directions</p>
//                       <p className="text-sm opacity-80">Open LPU location in Google Maps</p>
//                     </div>
//                   </button>
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
//                     a: "We typically respond within 24 hours on business days. For urgent matters, please call or WhatsApp us at +91 92194 47537."
//                   },
//                   {
//                     q: "Can I modify my custom shoe design after ordering?",
//                     a: "Design modifications are possible within 24 hours of order placement. Contact us immediately if you need changes."
//                   },
//                   {
//                     q: "Do you offer bulk/wholesale pricing for college projects?",
//                     a: "Yes! Being based in LPU, we offer special pricing for college projects and bulk orders. Select 'Business Inquiry' in the contact form."
//                   },
//                   {
//                     q: "Can I visit your office at LPU?",
//                     a: "Yes! We're located at Lovely Professional University campus. Feel free to visit us during working hours, but we recommend scheduling an appointment first."
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
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Our Office at LPU</h3>
//             <div className="h-96 rounded-xl overflow-hidden">
//               {/* Google Maps Embed */}
//               <iframe
//                 title="LPU Location Map"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.8654506643735!2d75.70286257531632!3d31.254999374365718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a5747a9e91f%3A0xb74c8d90d2f0170e!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1702400000000!5m2!1sen!2sin"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 className="rounded-lg"
//               ></iframe>
//             </div>
//             <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
//               <div>
//                 <p className="text-gray-700 font-medium">{lpuLocation.address}</p>
//                 <p className="text-gray-500 text-sm mt-1">Lovely Professional University Campus</p>
//               </div>
//               <button
//                 onClick={openGoogleMaps}
//                 className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
//               >
//                 <span>📍</span>
//                 <span>Open in Google Maps</span>
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Contact;





import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowRight, Mail, Phone, MapPin, Clock, Send, 
  CheckCircle, AlertCircle, ChevronRight, Sparkles,
  MessageSquare, Palette, Target, Zap
} from 'lucide-react';

const Contact = () => {
  const { scrollYProgress } = useScroll();
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

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
    { value: 'general', label: 'General Inquiry', icon: '💬', color: 'from-blue-500 to-cyan-500' },
    { value: 'support', label: 'Technical Support', icon: '🔧', color: 'from-purple-500 to-pink-500' },
    { value: 'design', label: 'Design Help', icon: '🎨', color: 'from-pink-500 to-rose-500' },
    { value: 'order', label: 'Order Issues', icon: '📦', color: 'from-emerald-500 to-green-500' },
    { value: 'business', label: 'Business', icon: '🤝', color: 'from-indigo-500 to-blue-500' },
    { value: 'feedback', label: 'Feedback', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
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
      const response = await axios.post('/api/contact/send', {
        ...formData,
        toEmail: 'ramkumar9219447537@gmail.com',
        replyTo: formData.email,
      });

      if (response.data.success) {
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

  const openGoogleMaps = () => {
    window.open("https://goo.gl/maps/9UwvR8PJhN8tE8b49", '_blank');
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <div className="bg-[#050505] text-white selection:bg-white selection:text-black min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050505] z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />
        
        <motion.div
          style={{ opacity: opacityHero, scale: scaleHero }}
          className="relative z-20 text-center px-6 max-w-5xl"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-white/30" />
            <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-white/60">
              Connect With Creators
            </span>
            <span className="h-px w-12 bg-white/30" />
          </div>

          <h1 className="mb-8 leading-[0.9] tracking-tight">
            <span className="block text-5xl md:text-[8rem] font-light bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Contact Us.
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Have questions about 3D shoe customization? Our design team is ready to help.
          </p>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT COLUMN - INFO CARDS */}
          <div className="space-y-8">
            {/* CONTACT INFO CARD */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl border border-white/10 p-8"
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <MessageSquare className="mr-4 text-blue-400" size={28} />
                Quick Contact
              </h2>
              
              <div className="space-y-6">
                <a 
                  href="mailto:ramkumar9219447537@gmail.com"
                  className="group flex items-center gap-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 transition-all"
                >
                  <motion.div 
                    animate={floatAnimation}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center"
                  >
                    <Mail className="w-8 h-8 text-blue-400" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-widest text-white/50">Email</p>
                    <p className="text-xl font-bold mt-1">ramkumar9219447537@gmail.com</p>
                    <p className="text-sm text-white/40 mt-2">24-hour response</p>
                  </div>
                  <ChevronRight className="text-white/30 group-hover:text-blue-400 transition-colors" />
                </a>

                <a 
                  href="https://wa.me/919219447537"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/30 transition-all"
                >
                  <motion.div 
                    animate={floatAnimation}
                    style={{ animationDelay: '0.5s' }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center"
                  >
                    <Phone className="w-8 h-8 text-green-400" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-widest text-white/50">Phone / WhatsApp</p>
                    <p className="text-xl font-bold mt-1">+91 92194 47537</p>
                    <p className="text-sm text-white/40 mt-2">Available now</p>
                  </div>
                  <ArrowRight className="text-white/30 group-hover:text-green-400 transition-colors" />
                </a>

                <button
                  onClick={openGoogleMaps}
                  className="group w-full flex items-center gap-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 transition-all text-left"
                >
                  <motion.div 
                    animate={floatAnimation}
                    style={{ animationDelay: '1s' }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center"
                  >
                    <MapPin className="w-8 h-8 text-red-400" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-widest text-white/50">Studio Location</p>
                    <p className="text-xl font-bold mt-1">Lovely Professional University</p>
                    <p className="text-sm text-white/40 mt-2">Phagwara, Punjab</p>
                  </div>
                  <ArrowRight className="text-white/30 group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            </motion.div>

            {/* HOURS CARD */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-3xl border border-white/10 p-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="mr-4 text-purple-400" size={24} />
                Design Studio Hours
              </h3>
              
              <div className="space-y-4">
                {[
                  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM', highlight: true },
                  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', hours: 'By Appointment', special: true },
                ].map((schedule, idx) => (
                  <div 
                    key={idx}
                    className={`flex justify-between items-center p-4 rounded-xl ${schedule.highlight ? 'bg-white/10' : 'bg-white/5'}`}
                  >
                    <span className="font-medium">{schedule.day}</span>
                    <span className={`font-bold ${schedule.special ? 'text-yellow-400' : 'text-white/70'}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-sm text-white/60">
                  <span className="text-purple-400 font-bold">LPU Students:</span> Get 20% off on all custom designs with valid ID.
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - FORM */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl border border-white/10 p-8"
            >
              {/* STATUS MESSAGES */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mr-4" />
                    <div>
                      <p className="text-xl font-bold text-green-300">Message Sent!</p>
                      <p className="text-green-400/80">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30"
                >
                  <div className="flex items-center">
                    <AlertCircle className="w-8 h-8 text-red-400 mr-4" />
                    <div>
                      <p className="text-xl font-bold text-red-300">Error Sending</p>
                      <p className="text-red-400/80">Please try again or contact us directly.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <h2 className="text-3xl font-bold mb-8">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NAME & EMAIL */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-white/50 mb-3">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-white/30"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-white/50 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-white/30"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* SUBJECT */}
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-white/30"
                    placeholder="Design consultation request"
                  />
                </div>

                {/* CONTACT TYPE */}
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-4">
                    Inquiry Type *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {contactTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`
                          relative flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
                          ${formData.contactType === type.value 
                            ? `border-white bg-gradient-to-br ${type.color}/20` 
                            : 'border-white/10 bg-white/5 hover:border-white/20'
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
                        <span className="text-xs font-medium text-center">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-sm uppercase tracking-widest text-white/50 mb-3">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none placeholder-white/30"
                    placeholder="Tell us about your 3D shoe design vision..."
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full py-5 px-8 rounded-2xl font-black uppercase tracking-widest text-sm
                      bg-gradient-to-r from-blue-600 to-purple-600 
                      hover:from-blue-700 hover:to-purple-700
                      disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed
                      text-white shadow-2xl transition-all duration-300
                      flex items-center justify-center gap-3
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* FAQ SECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl border border-white/10 p-8"
            >
              <h3 className="text-2xl font-bold mb-8">Common Questions</h3>
              
              <div className="space-y-4">
                {[
                  {
                    q: "How long does custom shoe production take?",
                    a: "Production takes 2-3 weeks. Rush orders (5-7 days) available for an additional 25% fee."
                  },
                  {
                    q: "Can LPU students visit the design studio?",
                    a: "Yes! Visit Block 32, LPU Campus. Book appointments via WhatsApp for personalized tours."
                  },
                  {
                    q: "Do you offer revisions on designs?",
                    a: "Unlimited revisions during design phase. Post-production modifications have additional charges."
                  },
                  {
                    q: "What materials do you work with?",
                    a: "Premium leather, sustainable fabrics, 3D-printed components, and smart materials."
                  }
                ].map((faq, index) => (
                  <div 
                    key={index}
                    className="group border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all cursor-pointer"
                  >
                    <details className="group">
                      <summary className="flex justify-between items-center cursor-pointer">
                        <h4 className="text-lg font-semibold group-hover:text-blue-300 transition-colors">
                          {faq.q}
                        </h4>
                        <span className="text-white/50 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-4 text-white/60 leading-relaxed">
                        {faq.a}
                      </p>
                    </details>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden"
          >
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Design Studio Location</h3>
                  <p className="text-white/60">Lovely Professional University Campus</p>
                </div>
                
                <button
                  onClick={openGoogleMaps}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition"
                >
                  Get Directions
                </button>
              </div>
              
              <div className="h-96 rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  title="LPU Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.8654506643735!2d75.70286257531632!3d31.254999374365718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a5747a9e91f%3A0xb74c8d90d2f0170e!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1702400000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm uppercase tracking-widest text-white/50 mb-2">Address</p>
                  <p className="text-lg">Block 32, Design Innovation Center</p>
                  <p className="text-white/60">LPU, Phagwara, Punjab 144411</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm uppercase tracking-widest text-white/50 mb-2">Campus Hours</p>
                  <p className="text-lg">Mon-Sat: 9AM-6PM</p>
                  <p className="text-white/60">Sunday: By Appointment</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm uppercase tracking-widest text-white/50 mb-2">Student Benefits</p>
                  <p className="text-lg">20% Discount</p>
                  <p className="text-white/60">Valid LPU ID Required</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 text-center px-6">
        <h2 className="text-5xl md:text-[6rem] font-light mb-8 leading-tight">
          Ready to design <br />
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            your masterpiece?
          </span>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            to="/designer"
            className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition inline-flex items-center justify-center gap-2"
          >
            <Palette size={16} />
            Start Designing
          </Link>
          
          <a
            href="https://wa.me/919219447537"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-5 bg-white/10 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition inline-flex items-center justify-center gap-2"
          >
            <Zap size={16} />
            Quick Chat
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;