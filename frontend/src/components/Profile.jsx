





// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   BarChart3, 
//   TrendingUp, 
//   Users, 
//   Download, 
//   Eye, 
//   Clock,
//   Star,
//   TrendingDown,
//   PieChart
// } from 'lucide-react';

// const Profile = ({ user, updateUser }) => {
//   const [activeTab, setActiveTab] = useState('analytics');
//   const [designs, setDesigns] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState('week');

//   useEffect(() => {
//     // Simulate loading user designs
//     setTimeout(() => {
//       setDesigns([
//         { id: 1, name: 'Neon Runner', likes: 42, views: 128, downloads: 18, color: 'from-cyan-500 to-blue-500', emoji: '👟', trend: 'up' },
//         { id: 2, name: 'Urban Boot', likes: 28, views: 96, downloads: 12, color: 'from-purple-500 to-pink-500', emoji: '🥾', trend: 'up' },
//         { id: 3, name: 'Summer Sandal', likes: 56, views: 210, downloads: 34, color: 'from-orange-500 to-yellow-500', emoji: '👡', trend: 'down' },
//         { id: 4, name: 'Elegant Heel', likes: 31, views: 87, downloads: 9, color: 'from-red-500 to-rose-500', emoji: '👠', trend: 'up' },
//       ]);
//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   // Analytics Data
//   const analyticsStats = [
//     { 
//       label: 'Total Designs', 
//       value: designs.length, 
//       change: '+12%', 
//       icon: BarChart3,
//       color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
//       trend: 'up'
//     },
//     { 
//       label: 'Monthly Views', 
//       value: designs.reduce((sum, d) => sum + d.views, 0), 
//       change: '+24%', 
//       icon: Eye,
//       color: 'bg-gradient-to-r from-purple-500 to-pink-500',
//       trend: 'up'
//     },
//     { 
//       label: 'Total Downloads', 
//       value: designs.reduce((sum, d) => sum + d.downloads, 0), 
//       change: '+8%', 
//       icon: Download,
//       color: 'bg-gradient-to-r from-green-500 to-emerald-500',
//       trend: 'up'
//     },
//     { 
//       label: 'Engagement Rate', 
//       value: '68%', 
//       change: '-3%', 
//       icon: Users,
//       color: 'bg-gradient-to-r from-orange-500 to-yellow-500',
//       trend: 'down'
//     },
//   ];

//   const chartData = {
//     week: {
//       labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//       views: [120, 190, 140, 250, 180, 210, 180],
//       designs: [4, 2, 5, 3, 6, 4, 5],
//       likes: [45, 38, 52, 67, 41, 58, 49]
//     },
//     month: {
//       labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//       views: [450, 520, 480, 600],
//       designs: [15, 18, 12, 20],
//       likes: [180, 210, 190, 250]
//     },
//     year: {
//       labels: ['Q1', 'Q2', 'Q3', 'Q4'],
//       views: [1800, 2200, 2100, 2400],
//       designs: [65, 80, 72, 90],
//       likes: [850, 1020, 950, 1100]
//     }
//   };

//   const tabs = [
//     { id: 'analytics', label: 'Analytics', icon: '📊' },
//     { id: 'designs', label: 'My Designs', icon: '👟' },
//     { id: 'performance', label: 'Performance', icon: '⚡' },
//     { id: 'settings', label: 'Settings', icon: '⚙️' },
//   ];

//   const topDesigns = [
//     { name: 'Neon Runner', popularity: 95, category: 'Sneakers' },
//     { name: 'Urban Boot', popularity: 87, category: 'Boots' },
//     { name: 'Summer Sandal', popularity: 92, category: 'Casual' },
//     { name: 'Elegant Heel', popularity: 78, category: 'Formal' },
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
//             Designer Analytics
//           </h1>
//           <p className="text-gray-600">
//             Track your design performance and growth metrics
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Profile & Quick Stats */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Profile Card */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 text-white shadow-2xl"
//             >
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
//                       {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
//                     </div>
//                   )}
//                   <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
//                     PRO DESIGNER
//                   </div>
//                 </div>
                
//                 <h2 className="text-2xl font-bold text-center mb-1">{user.firstName || 'Designer'}</h2>
//                 <p className="text-gray-300 text-sm mb-4">{user.email}</p>
                
//                 <div className="flex items-center space-x-2 text-yellow-400 mb-6">
//                   {'⭐'.repeat(4)}<span className="text-gray-400">⭐</span>
//                   <span className="text-sm ml-2">Level 4 Designer</span>
//                 </div>
//               </div>

//               {/* Quick Stats */}
//               <div className="grid grid-cols-2 gap-4 mb-8">
//                 {analyticsStats.map((stat, index) => (
//                   <div
//                     key={index}
//                     className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
//                   >
//                     <div className="text-2xl font-bold mb-1">{stat.value}</div>
//                     <div className="text-sm text-gray-300">{stat.label}</div>
//                     <div className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
//                       {stat.change}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300">
//                 <div className="flex items-center justify-center">
//                   <span className="text-xl mr-2">📈</span>
//                   View Full Report
//                 </div>
//               </button>
//             </motion.div>

//             {/* Time Range Selector */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white rounded-2xl p-6 shadow-lg"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Range</h3>
//               <div className="grid grid-cols-3 gap-2">
//                 {['week', 'month', 'year'].map((range) => (
//                   <button
//                     key={range}
//                     onClick={() => setTimeRange(range)}
//                     className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
//                       timeRange === range
//                         ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
//                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {range.charAt(0).toUpperCase() + range.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Top Designs */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white rounded-2xl p-6 shadow-lg"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Designs</h3>
//               <div className="space-y-4">
//                 {topDesigns.map((design, index) => (
//                   <div key={index} className="flex items-center justify-between">
//                     <div>
//                       <div className="font-medium text-gray-900">{design.name}</div>
//                       <div className="text-sm text-gray-500">{design.category}</div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div className="w-32 bg-gray-200 rounded-full h-2">
//                         <div 
//                           className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
//                           style={{ width: `${design.popularity}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-sm font-medium text-gray-700">{design.popularity}%</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Column - Analytics Dashboard */}
//           <div className="lg:col-span-2">
//             {/* Tabs */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
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

//             {/* Analytics Content */}
//             <AnimatePresence mode="wait">
//               {activeTab === 'analytics' && (
//                 <motion.div
//                   key="analytics"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="space-y-6"
//                 >
//                   {/* Stats Grid */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {analyticsStats.map((stat, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="bg-white rounded-2xl p-6 shadow-lg"
//                       >
//                         <div className="flex items-center justify-between mb-4">
//                           <div className={`p-3 rounded-xl ${stat.color}`}>
//                             <stat.icon className="w-6 h-6 text-white" />
//                           </div>
//                           <div className={`flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
//                             {stat.trend === 'up' ? (
//                               <TrendingUp className="w-4 h-4 mr-1" />
//                             ) : (
//                               <TrendingDown className="w-4 h-4 mr-1" />
//                             )}
//                             <span className="text-sm font-medium">{stat.change}</span>
//                           </div>
//                         </div>
//                         <div className="text-3xl font-bold text-gray-900 mb-2">
//                           {stat.value}
//                         </div>
//                         <div className="text-gray-600">{stat.label}</div>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Charts */}
//                   <div className="bg-white rounded-2xl p-6 shadow-lg">
//                     <div className="flex justify-between items-center mb-6">
//                       <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
//                       <div className="flex items-center space-x-2">
//                         <div className="flex items-center">
//                           <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//                           <span className="text-sm text-gray-600">Views</span>
//                         </div>
//                         <div className="flex items-center">
//                           <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
//                           <span className="text-sm text-gray-600">Designs</span>
//                         </div>
//                         <div className="flex items-center">
//                           <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//                           <span className="text-sm text-gray-600">Likes</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Bar Chart */}
//                     <div className="h-64 flex items-end space-x-2 mb-6">
//                       {chartData[timeRange].labels.map((label, index) => (
//                         <div key={index} className="flex-1 flex flex-col items-center">
//                           <div className="w-full flex space-x-1 mb-2">
//                             <div 
//                               className="w-full bg-blue-500 rounded-t"
//                               style={{ height: `${(chartData[timeRange].views[index] / Math.max(...chartData[timeRange].views)) * 100}%` }}
//                             ></div>
//                             <div 
//                               className="w-full bg-purple-500 rounded-t"
//                               style={{ height: `${(chartData[timeRange].designs[index] / Math.max(...chartData[timeRange].designs)) * 100}%` }}
//                             ></div>
//                             <div 
//                               className="w-full bg-green-500 rounded-t"
//                               style={{ height: `${(chartData[timeRange].likes[index] / Math.max(...chartData[timeRange].likes)) * 100}%` }}
//                             ></div>
//                           </div>
//                           <span className="text-xs text-gray-500">{label}</span>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Metrics */}
//                     <div className="grid grid-cols-3 gap-4">
//                       <div className="text-center p-4 bg-blue-50 rounded-xl">
//                         <div className="text-2xl font-bold text-blue-600 mb-1">
//                           {chartData[timeRange].views.reduce((a, b) => a + b, 0)}
//                         </div>
//                         <div className="text-sm text-blue-700">Total Views</div>
//                       </div>
//                       <div className="text-center p-4 bg-purple-50 rounded-xl">
//                         <div className="text-2xl font-bold text-purple-600 mb-1">
//                           {chartData[timeRange].designs.reduce((a, b) => a + b, 0)}
//                         </div>
//                         <div className="text-sm text-purple-700">Total Designs</div>
//                       </div>
//                       <div className="text-center p-4 bg-green-50 rounded-xl">
//                         <div className="text-2xl font-bold text-green-600 mb-1">
//                           {chartData[timeRange].likes.reduce((a, b) => a + b, 0)}
//                         </div>
//                         <div className="text-sm text-green-700">Total Likes</div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Activity */}
//                   <div className="bg-white rounded-2xl p-6 shadow-lg">
//                     <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
//                     <div className="space-y-4">
//                       {[
//                         { icon: '👤', text: 'New follower: @sneakerhead99', time: '2 min ago' },
//                         { icon: '❤️', text: 'Your design "Neon Runner" got 5 new likes', time: '1 hour ago' },
//                         { icon: '📥', text: 'Design "Urban Boot" was downloaded 3 times', time: '3 hours ago' },
//                         { icon: '💬', text: 'New comment on your design collection', time: '5 hours ago' },
//                         { icon: '🎯', text: 'Reached 1000 total design views', time: '1 day ago' },
//                       ].map((activity, index) => (
//                         <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                           <div className="text-2xl mr-4">{activity.icon}</div>
//                           <div className="flex-1">
//                             <div className="font-medium text-gray-900">{activity.text}</div>
//                             <div className="text-sm text-gray-500">{activity.time}</div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Goals Progress */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-6 text-white mt-6 shadow-lg"
//             >
//               <div className="flex flex-col md:flex-row md:items-center justify-between">
//                 <div className="mb-4 md:mb-0">
//                   <h3 className="text-xl font-bold mb-2">Monthly Goals Progress</h3>
//                   <div className="w-full bg-white/20 rounded-full h-2 mb-2">
//                     <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
//                   </div>
//                   <p className="text-sm opacity-90">65% completed • 7 days remaining</p>
//                 </div>
//                 <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg transition-colors">
//                   View Details
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



import { useState, useEffect, useRef } from 'react';
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
  PieChart,
  Settings,
  Edit3,
  Share2,
  MoreVertical,
  Bell,
  Calendar,
  Target,
  Trophy,
  Zap,
  Filter,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Plus,
  Award,
  BarChart,
  Heart
} from 'lucide-react';

const Profile = ({ user, updateUser }) => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [showNotifications, setShowNotifications] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ ...user });
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    score: 87,
    rank: 'Top 15%',
    level: 4,
    xp: 1250,
    nextLevelXp: 2000
  });
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Simulate loading user designs
    setTimeout(() => {
      setDesigns([
        { 
          id: 1, 
          name: 'Neon Runner', 
          likes: 42, 
          views: 128, 
          downloads: 18, 
          color: 'from-cyan-500 to-blue-500', 
          emoji: '👟', 
          trend: 'up',
          published: '2024-01-15',
          category: 'Sneakers',
          tags: ['sport', 'modern', 'comfort']
        },
        { 
          id: 2, 
          name: 'Urban Boot', 
          likes: 28, 
          views: 96, 
          downloads: 12, 
          color: 'from-purple-500 to-pink-500', 
          emoji: '🥾', 
          trend: 'up',
          published: '2024-01-10',
          category: 'Boots',
          tags: ['casual', 'urban', 'durable']
        },
        { 
          id: 3, 
          name: 'Summer Sandal', 
          likes: 56, 
          views: 210, 
          downloads: 34, 
          color: 'from-orange-500 to-yellow-500', 
          emoji: '👡', 
          trend: 'down',
          published: '2024-01-05',
          category: 'Casual',
          tags: ['summer', 'light', 'beach']
        },
        { 
          id: 4, 
          name: 'Elegant Heel', 
          likes: 31, 
          views: 87, 
          downloads: 9, 
          color: 'from-red-500 to-rose-500', 
          emoji: '👠', 
          trend: 'up',
          published: '2024-01-01',
          category: 'Formal',
          tags: ['elegant', 'party', 'formal']
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Notifications
  const [notifications] = useState([
    { id: 1, type: 'like', message: '5 new likes on Neon Runner', time: '2 min ago', read: false },
    { id: 2, type: 'download', message: 'Urban Boot downloaded 3 times', time: '1 hour ago', read: false },
    { id: 3, type: 'comment', message: 'New comment on your design', time: '3 hours ago', read: true },
    { id: 4, type: 'achievement', message: 'Level up! You\'re now Level 4', time: '1 day ago', read: true },
  ]);

  // Analytics Data
  const analyticsStats = [
    { 
      label: 'Total Designs', 
      value: designs.length, 
      change: '+12%', 
      icon: BarChart3,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      trend: 'up',
      description: 'Published designs'
    },
    { 
      label: 'Monthly Views', 
      value: designs.reduce((sum, d) => sum + d.views, 0), 
      change: '+24%', 
      icon: Eye,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      trend: 'up',
      description: 'Total views this month'
    },
    { 
      label: 'Total Downloads', 
      value: designs.reduce((sum, d) => sum + d.downloads, 0), 
      change: '+8%', 
      icon: Download,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      trend: 'up',
      description: 'Designs downloaded'
    },
    { 
      label: 'Engagement Rate', 
      value: '68%', 
      change: '-3%', 
      icon: Users,
      color: 'bg-gradient-to-r from-orange-500 to-yellow-500',
      trend: 'down',
      description: 'Likes per view'
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
    { id: 'analytics', label: 'Analytics', icon: '📊', color: 'from-blue-500 to-cyan-500' },
    { id: 'designs', label: 'My Designs', icon: '👟', color: 'from-purple-500 to-pink-500' },
    { id: 'performance', label: 'Performance', icon: '⚡', color: 'from-orange-500 to-yellow-500' },
    { id: 'settings', label: 'Settings', icon: '⚙️', color: 'from-green-500 to-emerald-500' },
  ];

  const achievements = [
    { id: 1, name: 'First Design', icon: '🎯', unlocked: true, date: '2023-12-01' },
    { id: 2, name: '50 Downloads', icon: '🏆', unlocked: true, date: '2024-01-10' },
    { id: 3, name: 'Community Star', icon: '⭐', unlocked: false },
    { id: 4, name: 'Design Pro', icon: '👑', unlocked: false },
  ];

  const handleEditProfile = () => {
    updateUser(editForm);
    setEditingProfile(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'designs':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Designs</h2>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Plus size={20} />
                New Design
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {designs.map((design) => (
                <motion.div
                  key={design.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${design.color} flex items-center justify-center text-3xl`}>
                        {design.emoji}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{design.name}</h3>
                        <p className="text-gray-600">{design.category}</p>
                        <div className="flex gap-2 mt-2">
                          {design.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{design.likes}</div>
                      <div className="text-sm text-gray-600">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{design.views}</div>
                      <div className="text-sm text-gray-600">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{design.downloads}</div>
                      <div className="text-sm text-gray-600">Downloads</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-opacity">
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'performance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Trophy size={24} />
                  <span className="text-sm opacity-90">Rank</span>
                </div>
                <div className="text-3xl font-bold mb-2">{performanceMetrics.rank}</div>
                <div className="text-sm opacity-90">Among all designers</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Zap size={24} />
                  <span className="text-sm opacity-90">Design Score</span>
                </div>
                <div className="text-3xl font-bold mb-2">{performanceMetrics.score}/100</div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${performanceMetrics.score}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Target size={24} />
                  <span className="text-sm opacity-90">Level Progress</span>
                </div>
                <div className="text-3xl font-bold mb-2">Level {performanceMetrics.level}</div>
                <div className="text-sm">
                  {performanceMetrics.xp}/{performanceMetrics.nextLevelXp} XP
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-xl border-2 ${achievement.unlocked ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50'} text-center`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className="font-medium text-gray-900">{achievement.name}</div>
                    {achievement.unlocked ? (
                      <>
                        <div className="text-sm text-green-600 mt-1 flex items-center justify-center gap-1">
                          <CheckCircle size={12} />
                          Unlocked
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{achievement.date}</div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-500 mt-1">Locked</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    {['Email notifications', 'Push notifications', 'Weekly reports', 'Comments'].map((pref) => (
                      <label key={pref} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <span className="text-gray-700">{pref}</span>
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" defaultChecked />
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                  <div className="space-y-3">
                    {['Make profile public', 'Show email to followers', 'Allow downloads', 'Show online status'].map((setting) => (
                      <label key={setting} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <span className="text-gray-700">{setting}</span>
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded" defaultChecked={setting === 'Make profile public'} />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default: // analytics
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
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
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-800 font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.description}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 md:mb-0">Performance Overview</h2>
                <div className="flex items-center space-x-4">
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
                  <Filter size={18} className="text-gray-500 cursor-pointer" />
                </div>
              </div>
              
              {/* Bar Chart */}
              <div className="h-64 flex items-end space-x-2 mb-6">
                {chartData[timeRange].labels.map((label, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex space-x-1 mb-2">
                      <motion.div 
                        className="w-full bg-blue-500 rounded-t hover:opacity-90 transition-opacity cursor-pointer"
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${(chartData[timeRange].views[index] / Math.max(...chartData[timeRange].views)) * 100}%` 
                        }}
                        transition={{ delay: index * 0.1 }}
                      ></motion.div>
                      <motion.div 
                        className="w-full bg-purple-500 rounded-t hover:opacity-90 transition-opacity cursor-pointer"
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${(chartData[timeRange].designs[index] / Math.max(...chartData[timeRange].designs)) * 100}%` 
                        }}
                        transition={{ delay: index * 0.1 }}
                      ></motion.div>
                      <motion.div 
                        className="w-full bg-green-500 rounded-t hover:opacity-90 transition-opacity cursor-pointer"
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${(chartData[timeRange].likes[index] / Math.max(...chartData[timeRange].likes)) * 100}%` 
                        }}
                        transition={{ delay: index * 0.1 }}
                      ></motion.div>
                    </div>
                    <span className="text-xs text-gray-500">{label}</span>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {chartData[timeRange].views.reduce((a, b) => a + b, 0)}
                  </div>
                  <div className="text-sm text-blue-700">Total Views</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {chartData[timeRange].designs.reduce((a, b) => a + b, 0)}
                  </div>
                  <div className="text-sm text-purple-700">Total Designs</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {chartData[timeRange].likes.reduce((a, b) => a + b, 0)}
                  </div>
                  <div className="text-sm text-green-700">Total Likes</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <motion.div 
                    key={notification.id}
                    whileHover={{ x: 5 }}
                    className={`flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      notification.type === 'like' ? 'bg-pink-100 text-pink-600' :
                      notification.type === 'download' ? 'bg-green-100 text-green-600' :
                      notification.type === 'comment' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {notification.type === 'like' ? '❤️' :
                       notification.type === 'download' ? '📥' :
                       notification.type === 'comment' ? '💬' : '🏆'}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{notification.message}</div>
                      <div className="text-sm text-gray-500">{notification.time}</div>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Designer Dashboard
              </h1>
              <p className="text-gray-600">
                Track your design performance and growth metrics
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                <Share2 size={18} />
                Share Profile
              </button>
            </div>
          </div>
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
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="px-3 py-1 bg-white/10 rounded-full text-sm">
                      Pro Designer
                    </div>
                    <Calendar size={16} className="opacity-70" />
                    <span className="text-sm opacity-70">Joined Jan 2024</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{user.firstName || 'Designer'}</h2>
                  <p className="text-gray-300">{user.email}</p>
                </div>
                <button 
                  onClick={() => setEditingProfile(true)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Edit3 size={20} />
                </button>
              </div>

              <div className="relative mb-8">
                {editingProfile ? (
                  <>
                    <div 
                      className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-5xl font-bold cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {editForm.firstName ? editForm.firstName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                ) : (
                  <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-5xl font-bold">
                    {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  LEVEL {performanceMetrics.level}
                </div>
              </div>
              
              {/* XP Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span>Level {performanceMetrics.level}</span>
                  <span>{performanceMetrics.xp}/{performanceMetrics.nextLevelXp} XP</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(performanceMetrics.xp / performanceMetrics.nextLevelXp) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {analyticsStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                    <div className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}
                    </div>
                  </motion.div>
                ))}
              </div>

              {editingProfile ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.firstName || ''}
                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="First Name"
                  />
                  <input
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                    placeholder="Email"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleEditProfile}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-opacity"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProfile(false)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center justify-center">
                    <span className="text-xl mr-2">📈</span>
                    View Full Report
                  </div>
                </button>
              )}
            </motion.div>

            {/* Time Range Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                <span>Time Range</span>
                <Clock size={18} className="text-gray-400" />
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {['week', 'month', 'year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                      timeRange === range
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Designs</h3>
                <span className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">See all</span>
              </div>
              <div className="space-y-4">
                {designs.sort((a, b) => b.views - a.views).slice(0, 3).map((design, index) => (
                  <motion.div 
                    key={design.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    onClick={() => setSelectedDesign(design)}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${design.color} flex items-center justify-center text-lg mr-3`}>
                        {design.emoji}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{design.name}</div>
                        <div className="text-sm text-gray-500">{design.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{design.views}</div>
                      <div className="text-xs text-gray-500">views</div>
                    </div>
                  </motion.div>
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
              className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden"
            >
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[120px] py-4 px-6 font-medium text-sm lg:text-base flex items-center justify-center gap-3 transition-all relative ${
                      activeTab === tab.id
                        ? `text-white bg-gradient-to-r ${tab.color}`
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>

            {/* Goals Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl p-8 text-white mt-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={20} />
                    <h3 className="text-xl font-bold">Monthly Goals Progress</h3>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 mb-3">
                    <div 
                      className="bg-white h-3 rounded-full transition-all duration-1000"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm opacity-90">
                    <span>65% completed</span>
                    <span>7 days remaining</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-lg transition-colors border border-white/30">
                    View Details
                  </button>
                  <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
                    Set New Goals
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Design Detail Modal */}
      <AnimatePresence>
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedDesign(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedDesign.color} flex items-center justify-center text-4xl mb-4`}>
                    {selectedDesign.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedDesign.name}</h3>
                  <p className="text-gray-600">{selectedDesign.category}</p>
                </div>
                <button 
                  onClick={() => setSelectedDesign(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{selectedDesign.likes}</div>
                  <div className="text-sm text-gray-600">Likes</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{selectedDesign.views}</div>
                  <div className="text-sm text-gray-600">Views</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{selectedDesign.downloads}</div>
                  <div className="text-sm text-gray-600">Downloads</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-opacity">
                  Edit Design
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors">
                  View Analytics
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;