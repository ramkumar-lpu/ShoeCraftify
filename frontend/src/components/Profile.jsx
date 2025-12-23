

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  BarChart3, 
  Edit3,
  Share2,
  Bell,
  Calendar,
  Zap,
  CheckCircle,
  Plus,
  AlertCircle,
  Users,
  Camera,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  LogOut,
  ChevronRight
} from 'lucide-react';

const Profile = ({ user, updateUser }) => {
  const [activeTab, setActiveTab] = useState('designs');
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ ...user });
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [notification, setNotification] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const fileInputRef = useRef(null);
  const notificationTimeoutRef = useRef(null);

  // Show notification helper
  const showNotificationMessage = useCallback((message, type = 'success') => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    setNotification({ message, type });
    
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  // ✅ FIXED: Fetch designs from savedShoeDesigns (same as My-Designs page)
  useEffect(() => {
    const fetchDesigns = async () => {
      setIsLoading(true);

      try {
        // Load from savedShoeDesigns (same key as Designer/My-Designs)
        const savedDesigns = localStorage.getItem('savedShoeDesigns');
        
        if (savedDesigns) {
          const parsedDesigns = JSON.parse(savedDesigns);
          
          // ✅ FILTER DESIGNS BY CURRENT USER ONLY
          const userDesigns = user?._id
            ? parsedDesigns.filter(
                design => !design.userId || design.userId === user._id || design.userId === user.id
              )
            : parsedDesigns;

          // Transform to match component structure
          const transformedDesigns = userDesigns.map((design) => ({
            id: design.id,
            name: design.name,
            colors: design.colors || {},
            preview: design.preview,
            createdAt: design.createdAt,
            category: 'Custom Design',
            emoji: '👟'
          }));

          setDesigns(transformedDesigns);
        } else {
          setDesigns([]);
        }
      } catch (err) {
        console.error('Error loading designs:', err);
        showNotificationMessage('Failed to load designs', 'error');
        setDesigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._id || user?.id) {
      fetchDesigns();
    } else {
      setIsLoading(false);
    }
  }, [user, showNotificationMessage]);

  // Listen for changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'savedShoeDesigns') {
        // Reload designs if storage changed
        const saved = localStorage.getItem('savedShoeDesigns');
        if (saved) {
          const parsed = JSON.parse(saved);
          const userDesigns = user?._id
            ? parsed.filter(
                design => !design.userId || design.userId === user._id || design.userId === user.id
              )
            : parsed;
          
          const transformed = userDesigns.map((design) => ({
            id: design.id,
            name: design.name,
            colors: design.colors || {},
            preview: design.preview,
            createdAt: design.createdAt,
            category: 'Custom Design',
            emoji: '👟'
          }));
          
          setDesigns(transformed);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  // Memoized stats - REAL DATA ONLY
  const designStats = useMemo(() => {
    const total = designs.length;
    const thisWeek = designs.filter(d => {
      const designDate = new Date(d.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return designDate >= weekAgo;
    }).length;

    const thisMonth = designs.filter(d => {
      const designDate = new Date(d.createdAt);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return designDate >= monthAgo;
    }).length;

    return { total, thisWeek, thisMonth };
  }, [designs]);

  // Memoized performance metrics - REAL DATA
  const performanceMetrics = useMemo(() => {
    const designCount = designs.length;
    const level = Math.floor(designCount / 5) + 1;
    const xp = designCount * 100;
    const nextLevelXp = level * 500;
    
    return {
      level,
      xp,
      nextLevelXp,
      rank: designCount >= 20 ? 'Expert Designer' :
            designCount >= 10 ? 'Advanced Designer' : 
            designCount >= 5 ? 'Intermediate Designer' : 
            designCount >= 1 ? 'Beginner Designer' : 'New Designer'
    };
  }, [designs.length]);

  // Memoized tabs
  const tabs = useMemo(() => [
    { id: 'designs', label: 'My Designs', icon: '', count: designs.length },
    { id: 'stats', label: 'Statistics', icon: '', count: null },
    { id: 'achievements', label: 'Achievements', icon: '', count: null },
    { id: 'settings', label: 'Settings', icon: '⚙️', count: null },
  ], [designs.length]);

  // Memoized achievements - REAL PROGRESS
  const achievements = useMemo(() => {
    const totalDesigns = designs.length;
    
    return [
      { 
        id: 1, 
        name: 'First Steps', 
        description: 'Create your first design',
        icon: '🎯', 
        unlocked: totalDesigns >= 1,
        progress: Math.min(totalDesigns, 1),
        total: 1
      },
      { 
        id: 2, 
        name: 'Getting Started', 
        description: 'Create 5 designs',
        icon: '🚀', 
        unlocked: totalDesigns >= 5,
        progress: Math.min(totalDesigns, 5),
        total: 5
      },
      { 
        id: 3, 
        name: 'Design Pro', 
        description: 'Create 10 designs',
        icon: '⭐', 
        unlocked: totalDesigns >= 10,
        progress: Math.min(totalDesigns, 10),
        total: 10
      },
      { 
        id: 4, 
        name: 'Master Creator', 
        description: 'Create 20 designs',
        icon: '👑', 
        unlocked: totalDesigns >= 20,
        progress: Math.min(totalDesigns, 20),
        total: 20
      },
      { 
        id: 5, 
        name: 'Prolific Designer', 
        description: 'Create 50 designs',
        icon: '💎', 
        unlocked: totalDesigns >= 50,
        progress: Math.min(totalDesigns, 50),
        total: 50
      },
      { 
        id: 6, 
        name: 'Weekly Warrior', 
        description: 'Create 3 designs in one week',
        icon: '⚡', 
        unlocked: designStats.thisWeek >= 3,
        progress: Math.min(designStats.thisWeek, 3),
        total: 3
      }
    ];
  }, [designs.length, designStats.thisWeek]);

  // Handle profile edit
  const handleEditProfile = useCallback(async () => {
    try {
      await updateUser(editForm);
      setEditingProfile(false);
      showNotificationMessage('Profile updated successfully!', 'success');
    } catch (err) {
      console.error('Error updating profile:', err);
      showNotificationMessage('Failed to update profile', 'error');
    }
  }, [editForm, updateUser, showNotificationMessage]);

  // Handle profile picture upload
  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotificationMessage('Image size should be less than 5MB', 'error');
      return;
    }

    if (!file.type.startsWith('image/')) {
      showNotificationMessage('Please upload a valid image file', 'error');
      return;
    }

    setUploadingImage(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageData = reader.result;
        
        await updateUser({ ...user, profileImage: imageData });
        setEditForm(prev => ({ ...prev, profileImage: imageData }));
        
        showNotificationMessage('Profile picture updated!', 'success');
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error uploading image:', err);
      showNotificationMessage('Failed to upload image', 'error');
      setUploadingImage(false);
    }
  }, [user, updateUser, showNotificationMessage]);

  // Handle password change
  const handlePasswordChange = useCallback(async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      showNotificationMessage('Please fill in all password fields', 'error');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotificationMessage('New passwords do not match', 'error');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showNotificationMessage('Password must be at least 6 characters', 'error');
      return;
    }

    try {
      await axios.post('/api/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, { withCredentials: true });

      showNotificationMessage('Password changed successfully!', 'success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordFields(false);
    } catch (err) {
      showNotificationMessage(err.response?.data?.message || 'Failed to change password', 'error');
    }
  }, [passwordData, showNotificationMessage]);

  // Handle share design
  const handleShareDesign = useCallback((design) => {
    if (navigator.share) {
      navigator.share({
        title: design.name,
        text: `Check out my shoe design: ${design.name}`,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotificationMessage('Link copied to clipboard!', 'success');
    }
  }, [showNotificationMessage]);

  // Handle tab change
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout error:', err);
      showNotificationMessage('Failed to logout', 'error');
    }
  }, [showNotificationMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ProfileHeader user={user} designCount={designs.length} />

        {/* Notification Toast */}
        <NotificationToast notification={notification} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <ProfileSidebar
            user={user}
            editingProfile={editingProfile}
            editForm={editForm}
            performanceMetrics={performanceMetrics}
            designStats={designStats}
            designs={designs}
            fileInputRef={fileInputRef}
            uploadingImage={uploadingImage}
            onEditFormChange={setEditForm}
            onEditProfile={handleEditProfile}
            onCancelEdit={() => setEditingProfile(false)}
            onStartEdit={() => setEditingProfile(true)}
            onImageUpload={handleImageUpload}
          />

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'designs' && (
                <DesignsTab
                  designs={designs}
                  isLoading={isLoading}
                  onShare={handleShareDesign}
                  onSelectDesign={setSelectedDesign}
                />
              )}

              {activeTab === 'stats' && (
                <StatsTab designStats={designStats} designs={designs} />
              )}

              {activeTab === 'achievements' && (
                <AchievementsTab 
                  achievements={achievements} 
                  designs={designs}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsTab 
                  user={user} 
                  fileInputRef={fileInputRef}
                  uploadingImage={uploadingImage}
                  showPasswordFields={showPasswordFields}
                  passwordData={passwordData}
                  onImageUpload={handleImageUpload}
                  onPasswordDataChange={setPasswordData}
                  onTogglePasswordFields={() => setShowPasswordFields(!showPasswordFields)}
                  onPasswordChange={handlePasswordChange}
                  onLogout={handleLogout}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Design Detail Modal */}
      <DesignDetailModal
        design={selectedDesign}
        onClose={() => setSelectedDesign(null)}
      />
    </div>
  );
};

// Profile Header Component
const ProfileHeader = React.memo(({ user, designCount }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName || 'Designer'}! 👋
        </h1>
        <p className="text-gray-600">
          {designCount > 0 
            ? `You have ${designCount} custom design${designCount !== 1 ? 's' : ''}` 
            : 'Start your creative journey by designing your first shoe'}
        </p>
      </div>
      <button 
        onClick={() => window.location.href = '/designer'}
        className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
      >
        <Plus size={20} />
        New Design
      </button>
    </div>
  </motion.div>
));

ProfileHeader.displayName = 'ProfileHeader';

// Notification Toast Component
const NotificationToast = React.memo(({ notification }) => {
  if (!notification) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {notification.message}
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

NotificationToast.displayName = 'NotificationToast';

// Profile Sidebar Component
const ProfileSidebar = React.memo(({
  user,
  editingProfile,
  editForm,
  performanceMetrics,
  designStats,
  designs,
  fileInputRef,
  uploadingImage,
  onEditFormChange,
  onEditProfile,
  onCancelEdit,
  onStartEdit,
  onImageUpload
}) => (
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
            <div className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">
              {performanceMetrics.rank}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-1">
            {user?.firstName || 'Designer'} {user?.lastName || ''}
          </h2>
          <p className="text-gray-300 text-sm">{user?.email || ''}</p>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
            <Calendar size={12} />
            <span>
              Joined {user?.createdAt 
                ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) 
                : 'Recently'}
            </span>
          </div>
        </div>
        {!editingProfile && (
          <button 
            onClick={onStartEdit}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Edit3 size={18} />
          </button>
        )}
      </div>

      {/* Avatar with Upload */}
      <div className="relative mb-8">
        <div className="relative w-32 h-32 mx-auto">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-5xl font-bold shadow-xl overflow-hidden">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'
            )}
          </div>
          {/* Camera button overlay */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full shadow-lg transition-colors disabled:opacity-50"
          >
            {uploadingImage ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <Camera size={20} />
            )}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
          LEVEL {performanceMetrics.level}
        </div>
      </div>
      
      {/* XP Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-300">Progress to Level {performanceMetrics.level + 1}</span>
          <span className="text-white font-medium">{performanceMetrics.xp}/{performanceMetrics.nextLevelXp} XP</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(performanceMetrics.xp / performanceMetrics.nextLevelXp) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {performanceMetrics.nextLevelXp - performanceMetrics.xp} XP needed for next level
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/10 transition-colors">
          <div className="text-2xl font-bold mb-1">{designStats.total}</div>
          <div className="text-xs text-gray-300">Total</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/10 transition-colors">
          <div className="text-2xl font-bold mb-1">{designStats.thisWeek}</div>
          <div className="text-xs text-gray-300">This Week</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/10 transition-colors">
          <div className="text-2xl font-bold mb-1">{designStats.thisMonth}</div>
          <div className="text-xs text-gray-300">This Month</div>
        </div>
      </div>

      {editingProfile ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editForm.firstName || ''}
            onChange={(e) => onEditFormChange({ ...editForm, firstName: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            placeholder="First Name"
          />
          <input
            type="text"
            value={editForm.lastName || ''}
            onChange={(e) => onEditFormChange({ ...editForm, lastName: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            placeholder="Last Name"
          />
          <div className="flex gap-2">
            <button
              onClick={onEditProfile}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-opacity"
            >
              Save Changes
            </button>
            <button
              onClick={onCancelEdit}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => window.location.href = '/designer'}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex items-center justify-center gap-2">
            <Plus size={20} />
            <span>Create New Design</span>
          </div>
        </button>
      )}
    </motion.div>

    {/* Recent Designs */}
    {designs.length > 0 && (
      <RecentDesignsCard designs={designs.slice(0, 3)} />
    )}
  </div>
));

ProfileSidebar.displayName = 'ProfileSidebar';

// Recent Designs Card
const RecentDesignsCard = React.memo(({ designs }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 }}
    className="bg-white rounded-2xl p-6 shadow-lg"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Recent Designs</h3>
      <span className="text-sm text-gray-500">{designs.length} shown</span>
    </div>
    <div className="space-y-3">
      {designs.map((design) => (
        <motion.div 
          key={design.id}
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
        >
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0 shadow-md"
            style={{ 
              backgroundColor: design.colors?.body || '#FFFFFF',
              border: '1px solid #e5e7eb'
            }}
          >
            {design.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">{design.name}</div>
            <div className="text-xs text-gray-500">
              {new Date(design.createdAt).toLocaleDateString()}
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </motion.div>
      ))}
    </div>
  </motion.div>
));

RecentDesignsCard.displayName = 'RecentDesignsCard';

// Tab Navigation Component
const TabNavigation = React.memo(({ tabs, activeTab, onTabChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden"
  >
    <div className="flex overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 min-w-[120px] py-4 px-6 font-medium text-sm lg:text-base flex items-center justify-center gap-2 transition-all relative ${
            activeTab === tab.id
              ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span>{tab.label}</span>
          {tab.count !== null && (
            <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  </motion.div>
));

TabNavigation.displayName = 'TabNavigation';

// Designs Tab Component
const DesignsTab = React.memo(({ designs, isLoading, onShare, onSelectDesign }) => (
  <motion.div
    key="designs"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="space-y-6"
  >
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-900">
        My Designs {designs.length > 0 && `(${designs.length})`}
      </h2>
      <button 
        onClick={() => window.location.href = '/my-designs'}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Plus size={18} />
        Create
      </button>
    </div>
    
    {isLoading ? (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    ) : designs.length === 0 ? (
      <EmptyDesignsState />
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {designs.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            onShare={onShare}
            onClick={() => onSelectDesign(design)}
          />
        ))}
      </div>
    )}
  </motion.div>
));

DesignsTab.displayName = 'DesignsTab';

// Empty Designs State
const EmptyDesignsState = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 text-center"
  >
    <div className="text-7xl mb-6 animate-bounce">👟</div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Designs Yet</h3>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      Start your creative journey by designing your first custom shoe. It's easy and fun!
    </p>
    <button
      onClick={() => window.location.href = '/designer'}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-3 shadow-lg text-lg font-semibold"
    >
      <Plus size={24} />
      Create Your First Design
    </button>
  </motion.div>
));

EmptyDesignsState.displayName = 'EmptyDesignsState';

// Design Card Component
const DesignCard = React.memo(({ design, onShare, onClick }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Preview Image or Color Display */}
        {design.preview ? (
          <img
            src={design.preview}
            alt={design.name}
            className="w-16 h-16 rounded-xl flex-shrink-0 shadow-md object-contain bg-gray-50"
          />
        ) : (
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-md border border-gray-200"
            style={{ backgroundColor: design.colors?.body || '#FFFFFF' }}
          >
            {design.emoji}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{design.name}</h3>
          <p className="text-sm text-gray-500">{design.category}</p>
          <p className="text-xs text-gray-400 mt-1">
            Created {new Date(design.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
    
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
        <div 
          className="text-xl font-bold"
          style={{ color: design.colors?.body || '#000000' }}
        >
          ●
        </div>
        <div className="text-xs text-gray-600">Primary Color</div>
      </div>
      <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-gray-900">
          {new Date(design.createdAt).toLocaleDateString('en-US', { month: 'short' })}
        </div>
        <div className="text-xs text-gray-600">Created</div>
      </div>
    </div>
    
    <div className="flex gap-2">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          window.location.href = '/designer';
        }}
        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
      >
        <Edit3 size={16} />
        Edit
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onShare(design);
        }}
        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-opacity font-medium"
      >
        <Share2 size={16} />
        Share
      </button>
    </div>
  </motion.div>
));

DesignCard.displayName = 'DesignCard';

// Stats Tab Component
const StatsTab = React.memo(({ designStats, designs }) => {
  const timeStats = useMemo(() => {
    if (designs.length === 0) return { oldestDate: null, newestDate: null, daysSinceFirst: 0 };
    
    const dates = designs.map(d => new Date(d.createdAt).getTime());
    const oldest = Math.min(...dates);
    const newest = Math.max(...dates);
    const daysSinceFirst = Math.floor((Date.now() - oldest) / (1000 * 60 * 60 * 24));
    
    return {
      oldestDate: new Date(oldest).toLocaleDateString(),
      newestDate: new Date(newest).toLocaleDateString(),
      daysSinceFirst
    };
  }, [designs]);

  const avgDesignsPerWeek = useMemo(() => {
    if (designs.length === 0 || timeStats.daysSinceFirst === 0) return 0;
    const weeks = Math.max(timeStats.daysSinceFirst / 7, 1);
    return (designs.length / weeks).toFixed(1);
  }, [designs.length, timeStats.daysSinceFirst]);

  return (
    <motion.div
      key="stats"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Statistics</h2>
      
      {designs.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Statistics Yet</h3>
          <p className="text-gray-600">Create designs to see your statistics</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={<BarChart3 className="w-8 h-8" />}
              label="Total Designs"
              value={designStats.total}
              color="from-blue-500 to-cyan-500"
              subtitle={`${designStats.thisWeek} this week`}
            />
            <StatCard
              icon={<Zap className="w-8 h-8" />}
              label="Avg per Week"
              value={avgDesignsPerWeek}
              color="from-purple-500 to-pink-500"
              subtitle="Design frequency"
            />
            <StatCard
              icon={<Calendar className="w-8 h-8" />}
              label="Days Active"
              value={timeStats.daysSinceFirst}
              color="from-green-500 to-emerald-500"
              subtitle={`Since ${timeStats.oldestDate}`}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">This Week</div>
                  <div className="text-sm text-gray-600">Recent activity</div>
                </div>
                <div className="text-2xl font-bold text-blue-600">{designStats.thisWeek}</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">This Month</div>
                  <div className="text-sm text-gray-600">Monthly progress</div>
                </div>
                <div className="text-2xl font-bold text-purple-600">{designStats.thisMonth}</div>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">All Time</div>
                  <div className="text-sm text-gray-600">Total designs</div>
                </div>
                <div className="text-2xl font-bold text-green-600">{designStats.total}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
});

StatsTab.displayName = 'StatsTab';

// Stat Card Component
const StatCard = React.memo(({ icon, label, value, color, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl p-6 shadow-lg"
  >
    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${color} text-white mb-4`}>
      {icon}
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-gray-700 font-medium mb-1">{label}</div>
    <div className="text-sm text-gray-500">{subtitle}</div>
  </motion.div>
));

StatCard.displayName = 'StatCard';

// Achievements Tab Component
const AchievementsTab = React.memo(({ achievements, designs }) => {
  const unlockedCount = useMemo(() => 
    achievements.filter(a => a.unlocked).length,
    [achievements]
  );

  return (
    <motion.div
      key="achievements"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
          {unlockedCount}/{achievements.length} Unlocked
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {designs.length === 0 && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 text-center border-2 border-yellow-200">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Start Unlocking Achievements</h3>
          <p className="text-gray-600">Create designs to unlock achievements and level up!</p>
        </div>
      )}
    </motion.div>
  );
});

AchievementsTab.displayName = 'AchievementsTab';

// Achievement Card Component
const AchievementCard = React.memo(({ achievement }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    className={`rounded-2xl p-6 transition-all ${
      achievement.unlocked 
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 shadow-lg' 
        : 'bg-gray-50 border-2 border-gray-200 opacity-60'
    }`}
  >
    <div className="flex items-start gap-4">
      <div className={`text-5xl ${achievement.unlocked ? '' : 'grayscale'}`}>
        {achievement.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{achievement.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
        
        {achievement.unlocked ? (
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <CheckCircle size={16} />
            <span className="text-sm">Unlocked!</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress</span>
              <span className="font-medium">{achievement.progress}/{achievement.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </motion.div>
));

AchievementCard.displayName = 'AchievementCard';

// Settings Tab Component
const SettingsTab = React.memo(({ 
  user, 
  fileInputRef, 
  uploadingImage,
  showPasswordFields,
  passwordData,
  onImageUpload, 
  onPasswordDataChange,
  onTogglePasswordFields,
  onPasswordChange,
  onLogout
}) => (
  <motion.div
    key="settings"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
    
    <div className="bg-white rounded-2xl p-8 shadow-lg space-y-8">
      {/* Profile Picture Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Camera size={20} />
          Profile Picture
        </h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg overflow-hidden">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors disabled:opacity-50"
            >
              {uploadingImage ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <Camera size={16} />
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <p className="text-gray-700 font-medium mb-1">Update your profile picture</p>
            <p className="text-sm text-gray-500 mb-3">JPG, PNG or GIF (max 5MB)</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {uploadingImage ? 'Uploading...' : 'Upload Photo'}
            </button>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User size={20} />
          Account Information
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Full Name</div>
            <div className="font-medium text-gray-900">
              {user?.firstName || ''} {user?.lastName || ''}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Email Address</div>
            <div className="font-medium text-gray-900">{user?.email || ''}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Member Since</div>
            <div className="font-medium text-gray-900">
              {user?.createdAt 
                ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })
                : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lock size={20} />
          Password & Security
        </h3>
        
        {!showPasswordFields ? (
          <button
            onClick={onTogglePasswordFields}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Change Password
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) => onPasswordDataChange({ ...passwordData, currentPassword: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) => onPasswordDataChange({ ...passwordData, newPassword: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(e) => onPasswordDataChange({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={onPasswordChange}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Update Password
              </button>
              <button
                onClick={onTogglePasswordFields}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell size={20} />
          Notifications
        </h3>
        <div className="space-y-3">
          {['Email notifications', 'Design saved reminders', 'Weekly summary'].map((pref) => (
            <label key={pref} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <span className="text-gray-700 font-medium">{pref}</span>
              <input 
                type="checkbox" 
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" 
                defaultChecked={pref === 'Email notifications'} 
              />
            </label>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="pt-6 border-t border-gray-200">
        <button 
          onClick={onLogout}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  </motion.div>
));

SettingsTab.displayName = 'SettingsTab';

// Design Detail Modal Component
const DesignDetailModal = React.memo(({ design, onClose }) => {
  if (!design) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              {design.preview ? (
                <img
                  src={design.preview}
                  alt={design.name}
                  className="w-24 h-24 rounded-2xl mb-4 shadow-lg object-contain bg-gray-50"
                />
              ) : (
                <div 
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mb-4 shadow-lg"
                  style={{ backgroundColor: design.colors?.body || '#FFFFFF' }}
                >
                  {design.emoji}
                </div>
              )}
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{design.name}</h3>
              <p className="text-gray-600">{design.category}</p>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                <Calendar size={14} />
                Created: {new Date(design.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div 
                className="text-3xl font-bold"
                style={{ color: design.colors?.body || '#000000' }}
              >
                ●
              </div>
              <div className="text-sm text-gray-600 font-medium">Primary Color</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600">
                {Math.floor((Date.now() - new Date(design.createdAt).getTime()) / (1000 * 60 * 60 * 24))}d
              </div>
              <div className="text-sm text-gray-600 font-medium">Days Old</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/designer'}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-semibold py-4 rounded-xl transition-opacity flex items-center justify-center gap-2 shadow-lg"
            >
              <Edit3 size={20} />
              Edit Design
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

DesignDetailModal.displayName = 'DesignDetailModal';

export default React.memo(Profile);
