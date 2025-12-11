
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Profile = ({ user }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [designs, setDesigns] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading user designs
//     setTimeout(() => {
//       setDesigns([
//         { id: 1, name: 'Neon Runner', likes: 42, color: 'from-cyan-500 to-blue-500', emoji: '👟' },
//         { id: 2, name: 'Urban Boot', likes: 28, color: 'from-purple-500 to-pink-500', emoji: '🥾' },
//         { id: 3, name: 'Summer Sandal', likes: 56, color: 'from-orange-500 to-yellow-500', emoji: '👡' },
//         { id: 4, name: 'Elegant Heel', likes: 31, color: 'from-red-500 to-rose-500', emoji: '👠' },
//       ]);
//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   const stats = [
//     { label: 'Designs', value: designs.length, icon: '🎨', color: 'bg-gradient-to-r from-blue-500 to-cyan-400' },
//     { label: 'Total Likes', value: designs.reduce((sum, design) => sum + design.likes, 0), icon: '❤️', color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
//     { label: 'Following', value: 42, icon: '👥', color: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
//     { label: 'Downloads', value: 18, icon: '📥', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
//   ];

//   const tabs = [
//     { id: 'overview', label: 'Overview', icon: '📊' },
//     { id: 'designs', label: 'My Designs', icon: '👟' },
//     { id: 'activity', label: 'Activity', icon: '⚡' },
//     { id: 'settings', label: 'Settings', icon: '⚙️' },
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
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user.displayName}</span>
//           </h1>
//           <p className="text-gray-600">Manage your designs, profile, and preferences</p>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Profile Card */}
//           <div className="lg:col-span-1">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 text-white shadow-2xl"
//             >
//               {/* Profile Header */}
//               <div className="flex flex-col items-center mb-8">
//                 <div className="relative mb-6">
//                   {user.image ? (
//                     <img
//                       src={user.image}
//                       alt={user.displayName}
//                       className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20"
//                     />
//                   ) : (
//                     <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-5xl font-bold">
//                       {user.displayName?.charAt(0) || user.email?.charAt(0)}
//                     </div>
//                   )}
//                   <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
//                     PRO DESIGNER
//                   </div>
//                 </div>
                
//                 <h2 className="text-2xl font-bold text-center mb-1">{user.displayName}</h2>
//                 <p className="text-gray-300 text-sm mb-4">{user.email}</p>
                
//                 <div className="flex items-center space-x-2 text-yellow-400 mb-6">
//                   {'⭐'.repeat(4)}<span className="text-gray-400">⭐</span>
//                   <span className="text-sm ml-2">Level 4 Designer</span>
//                 </div>
//               </div>

//               {/* Stats Grid */}
//               <div className="grid grid-cols-2 gap-4 mb-8">
//                 {stats.map((stat, index) => (
//                   <div
//                     key={index}
//                     className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
//                   >
//                     <div className="text-2xl font-bold mb-1">{stat.value}</div>
//                     <div className="text-sm text-gray-300">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>

//               {/* Account Info */}
//               <div className="space-y-4 mb-8">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400">Account Type</span>
//                   <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium px-3 py-1 rounded-full">
//                     Google Account
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400">Member Since</span>
//                   <span className="text-white font-medium">
//                     {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400">Designer Level</span>
//                   <span className="text-white font-medium">Advanced</span>
//                 </div>
//               </div>

//               {/* Quick Action Button */}
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300"
//               >
//                 <div className="flex items-center justify-center">
//                   <span className="text-xl mr-2">🎨</span>
//                   Start New Design
//                 </div>
//               </motion.button>
//             </motion.div>

//             {/* Achievement Badges */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="mt-6 bg-white rounded-2xl p-6 shadow-lg"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
//               <div className="grid grid-cols-3 gap-3">
//                 {['🏆', '🚀', '🎯', '💎', '🌟', '⚡'].map((badge, index) => (
//                   <div
//                     key={index}
//                     className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-2xl hover:scale-105 transition-transform cursor-pointer"
//                   >
//                     {badge}
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Column - Content */}
//           <div className="lg:col-span-2">
//             {/* Tabs */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white rounded-2xl shadow-lg mb-6"
//             >
//               <div className="flex border-b border-gray-200">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex-1 py-4 px-6 font-medium text-sm lg:text-base flex items-center justify-center gap-2 transition-all ${
//                       activeTab === tab.id
//                         ? 'text-blue-600 border-b-2 border-blue-600'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     <span>{tab.icon}</span>
//                     <span>{tab.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Tab Content */}
//             <AnimatePresence mode="wait">
//               {activeTab === 'overview' && (
//                 <motion.div
//                   key="overview"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="space-y-6"
//                 >
//                   {/* Recent Designs */}
//                   <div className="bg-white rounded-2xl p-6 shadow-lg">
//                     <div className="flex justify-between items-center mb-6">
//                       <h2 className="text-xl font-bold text-gray-900">Recent Designs</h2>
//                       <button className="text-blue-600 hover:text-blue-700 font-medium">
//                         View All →
//                       </button>
//                     </div>
                    
//                     {isLoading ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {[1, 2, 3, 4].map((i) => (
//                           <div key={i} className="animate-pulse">
//                             <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
//                             <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                             <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {designs.map((design) => (
//                           <motion.div
//                             key={design.id}
//                             whileHover={{ y: -5 }}
//                             className="group cursor-pointer"
//                           >
//                             <div className={`h-48 rounded-xl bg-gradient-to-br ${design.color} flex items-center justify-center text-8xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
//                               {design.emoji}
//                             </div>
//                             <h3 className="font-semibold text-gray-900 mb-1">{design.name}</h3>
//                             <div className="flex items-center text-gray-500 text-sm">
//                               <span className="mr-4">❤️ {design.likes} likes</span>
//                               <span>2 days ago</span>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* Quick Actions */}
//                   <div className="bg-white rounded-2xl p-6 shadow-lg">
//                     <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       {[
//                         { icon: '🎨', title: 'New Design', desc: 'Start creating', color: 'from-blue-500 to-cyan-400' },
//                         { icon: '📚', title: 'Templates', desc: 'Browse designs', color: 'from-purple-500 to-pink-500' },
//                         { icon: '🛠️', title: 'Customize', desc: 'Edit profile', color: 'from-orange-500 to-yellow-500' },
//                         { icon: '💬', title: 'Support', desc: 'Get help', color: 'from-green-500 to-emerald-500' },
//                       ].map((action, index) => (
//                         <motion.button
//                           key={index}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className={`bg-gradient-to-br ${action.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
//                         >
//                           <div className="text-3xl mb-3">{action.icon}</div>
//                           <div className="font-semibold">{action.title}</div>
//                           <div className="text-sm opacity-90">{action.desc}</div>
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {activeTab === 'designs' && (
//                 <motion.div
//                   key="designs"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="bg-white rounded-2xl p-6 shadow-lg"
//                 >
//                   <h2 className="text-xl font-bold text-gray-900 mb-6">My Design Library</h2>
//                   {/* Designs content here */}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Daily Inspiration */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-6 text-white mt-6 shadow-lg"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-xl font-bold mb-2">Today's Inspiration</h3>
//                   <p className="opacity-90">"SneakerHead 2024 Collection" is trending with 1.2K new designs</p>
//                 </div>
//                 <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg transition-colors">
//                   Explore
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;






import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Download, 
  Eye, 
  Clock,
  Star,
  TrendingDown,
  PieChart
} from 'lucide-react';

const Profile = ({ user, updateUser }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    // Simulate loading user designs
    setTimeout(() => {
      setDesigns([
        { id: 1, name: 'Neon Runner', likes: 42, views: 128, downloads: 18, color: 'from-cyan-500 to-blue-500', emoji: '👟', trend: 'up' },
        { id: 2, name: 'Urban Boot', likes: 28, views: 96, downloads: 12, color: 'from-purple-500 to-pink-500', emoji: '🥾', trend: 'up' },
        { id: 3, name: 'Summer Sandal', likes: 56, views: 210, downloads: 34, color: 'from-orange-500 to-yellow-500', emoji: '👡', trend: 'down' },
        { id: 4, name: 'Elegant Heel', likes: 31, views: 87, downloads: 9, color: 'from-red-500 to-rose-500', emoji: '👠', trend: 'up' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Analytics Data
  const analyticsStats = [
    { 
      label: 'Total Designs', 
      value: designs.length, 
      change: '+12%', 
      icon: BarChart3,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      trend: 'up'
    },
    { 
      label: 'Monthly Views', 
      value: designs.reduce((sum, d) => sum + d.views, 0), 
      change: '+24%', 
      icon: Eye,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      trend: 'up'
    },
    { 
      label: 'Total Downloads', 
      value: designs.reduce((sum, d) => sum + d.downloads, 0), 
      change: '+8%', 
      icon: Download,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      trend: 'up'
    },
    { 
      label: 'Engagement Rate', 
      value: '68%', 
      change: '-3%', 
      icon: Users,
      color: 'bg-gradient-to-r from-orange-500 to-yellow-500',
      trend: 'down'
    },
  ];

  const chartData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      views: [120, 190, 140, 250, 180, 210, 180],
      designs: [4, 2, 5, 3, 6, 4, 5],
      likes: [45, 38, 52, 67, 41, 58, 49]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      views: [450, 520, 480, 600],
      designs: [15, 18, 12, 20],
      likes: [180, 210, 190, 250]
    },
    year: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      views: [1800, 2200, 2100, 2400],
      designs: [65, 80, 72, 90],
      likes: [850, 1020, 950, 1100]
    }
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'designs', label: 'My Designs', icon: '👟' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const topDesigns = [
    { name: 'Neon Runner', popularity: 95, category: 'Sneakers' },
    { name: 'Urban Boot', popularity: 87, category: 'Boots' },
    { name: 'Summer Sandal', popularity: 92, category: 'Casual' },
    { name: 'Elegant Heel', popularity: 78, category: 'Formal' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Designer Analytics
          </h1>
          <p className="text-gray-600">
            Track your design performance and growth metrics
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 text-white shadow-2xl"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-6">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.displayName}
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-5xl font-bold">
                      {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    PRO DESIGNER
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-center mb-1">{user.firstName || 'Designer'}</h2>
                <p className="text-gray-300 text-sm mb-4">{user.email}</p>
                
                <div className="flex items-center space-x-2 text-yellow-400 mb-6">
                  {'⭐'.repeat(4)}<span className="text-gray-400">⭐</span>
                  <span className="text-sm ml-2">Level 4 Designer</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {analyticsStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
                  >
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                    <div className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center">
                  <span className="text-xl mr-2">📈</span>
                  View Full Report
                </div>
              </button>
            </motion.div>

            {/* Time Range Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Range</h3>
              <div className="grid grid-cols-3 gap-2">
                {['week', 'month', 'year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Top Designs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Designs</h3>
              <div className="space-y-4">
                {topDesigns.map((design, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{design.name}</div>
                      <div className="text-sm text-gray-500">{design.category}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${design.popularity}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{design.popularity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Analytics Dashboard */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg mb-6"
            >
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 px-6 font-medium text-sm lg:text-base flex items-center justify-center gap-2 transition-all ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Analytics Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {analyticsStats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl ${stat.color}`}>
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className={`flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 mr-1" />
                            )}
                            <span className="text-sm font-medium">{stat.change}</span>
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {stat.value}
                        </div>
                        <div className="text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">Views</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">Designs</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-600">Likes</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bar Chart */}
                    <div className="h-64 flex items-end space-x-2 mb-6">
                      {chartData[timeRange].labels.map((label, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="w-full flex space-x-1 mb-2">
                            <div 
                              className="w-full bg-blue-500 rounded-t"
                              style={{ height: `${(chartData[timeRange].views[index] / Math.max(...chartData[timeRange].views)) * 100}%` }}
                            ></div>
                            <div 
                              className="w-full bg-purple-500 rounded-t"
                              style={{ height: `${(chartData[timeRange].designs[index] / Math.max(...chartData[timeRange].designs)) * 100}%` }}
                            ></div>
                            <div 
                              className="w-full bg-green-500 rounded-t"
                              style={{ height: `${(chartData[timeRange].likes[index] / Math.max(...chartData[timeRange].likes)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {chartData[timeRange].views.reduce((a, b) => a + b, 0)}
                        </div>
                        <div className="text-sm text-blue-700">Total Views</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          {chartData[timeRange].designs.reduce((a, b) => a + b, 0)}
                        </div>
                        <div className="text-sm text-purple-700">Total Designs</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {chartData[timeRange].likes.reduce((a, b) => a + b, 0)}
                        </div>
                        <div className="text-sm text-green-700">Total Likes</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                      {[
                        { icon: '👤', text: 'New follower: @sneakerhead99', time: '2 min ago' },
                        { icon: '❤️', text: 'Your design "Neon Runner" got 5 new likes', time: '1 hour ago' },
                        { icon: '📥', text: 'Design "Urban Boot" was downloaded 3 times', time: '3 hours ago' },
                        { icon: '💬', text: 'New comment on your design collection', time: '5 hours ago' },
                        { icon: '🎯', text: 'Reached 1000 total design views', time: '1 day ago' },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="text-2xl mr-4">{activity.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{activity.text}</div>
                            <div className="text-sm text-gray-500">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Goals Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-6 text-white mt-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Monthly Goals Progress</h3>
                  <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-sm opacity-90">65% completed • 7 days remaining</p>
                </div>
                <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;