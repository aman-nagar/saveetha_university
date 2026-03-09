import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { GradientBackground } from '../../components/ui/GradientBackground';
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaGraduationCap,
  FaIdCard,
  FaClipboardList,
  FaCheckCircle,
  FaHome,
  FaEdit,
} from 'react-icons/fa';

// Card Component with consistent styling
const Card = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    className={`bg-surface border border-border rounded-2xl shadow-lg overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

// Info Item with icon
const InfoItem = ({ icon: Icon, label, value, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
  >
    <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
      <Icon size={16} />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-bold text-muted uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-text break-words">
        {value || 'N/A'}
      </p>
    </div>
  </motion.div>
);

// Loading Skeleton
const SkeletonLoader = () => (
  <div className="space-y-4 p-4 sm:p-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-4 bg-border rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-border rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

// Main Dashboard Component
export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      setLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-32 sm:h-40">
              <SkeletonLoader />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <FaHome className="text-5xl text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text mb-2">Session Expired</h2>
          <p className="text-muted mb-6">Please log in to continue.</p>
          <a
            href="/login"
            className="inline-block px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
          >
            Go to Login
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text pb-20">
      {/* Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header with Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">
              Welcome Back
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-text mt-1">
              {user.name}
            </h1>
          </div>
          <FaGraduationCap className="text-4xl text-primary/20" />
        </motion.div>

        {/* Main Content Grid - Single Page Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <Card className="lg:col-span-1 overflow-hidden" delay={0.2}>
            {/* Profile Header with Gradient */}
            <div className="relative h-32 overflow-hidden">
              <GradientBackground seed={user.name} size="full" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Profile Content */}
            <div className="p-6 space-y-4">
              {/* Avatar */}
              <div className="flex flex-col items-center -mt-16">
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-full border-4 border-surface bg-primary/10 flex items-center justify-center overflow-hidden shadow-lg">
                    {user.photo && !imageError ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <FaUser className="text-3xl text-primary" />
                    )}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 border border-success/30 text-xs font-bold text-success mb-3">
                  <FaCheckCircle size={12} /> Active
                </div>
                <p className="font-bold text-lg text-text">{user.name}</p>
                <p className="text-sm text-muted font-mono mt-1">
                  {user.enrollment_no}
                </p>
              </div>

              {/* Course Info */}
              <div className="pt-3 border-t border-border space-y-2">
                <div className="text-center">
                  <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1">
                    Course
                  </p>
                  <p className="text-sm font-bold text-text">{user.course}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1">
                      Stream
                    </p>
                    <p className="text-xs font-bold text-text">{user.stream}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1">
                      Category
                    </p>
                    <p className="text-xs font-bold text-text">{user.category || 'General'}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-border space-y-2">
                <a
                  href="/student/id-card"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition text-sm"
                >
                  <FaIdCard size={14} /> ID Card
                </a>
                <a
                  href="/student/admit-card"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-secondary/10 text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white transition text-sm"
                >
                  <FaClipboardList size={14} /> Admit Card
                </a>
              </div>
            </div>
          </Card>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card delay={0.3}>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FaUser size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-text">Personal Information</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <InfoItem
                    icon={FaUser}
                    label="Father's Name"
                    value={user.father_name}
                    delay={0.35}
                  />
                  <InfoItem
                    icon={FaUser}
                    label="Mother's Name"
                    value={user.mother_name}
                    delay={0.4}
                  />
                  <InfoItem
                    icon={FaCalendarAlt}
                    label="Date of Birth"
                    value={user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}
                    delay={0.45}
                  />
                  <InfoItem
                    icon={FaUser}
                    label="Gender"
                    value={user.gender}
                    delay={0.5}
                  />
                </div>
              </div>
            </Card>

            {/* Contact & Location Information */}
            <Card delay={0.4}>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                    <FaEnvelope size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-text">Contact Information</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <InfoItem
                    icon={FaPhone}
                    label="Phone Number"
                    value={user.contact_number}
                    delay={0.45}
                  />
                  <InfoItem
                    icon={FaEnvelope}
                    label="Email Address"
                    value={user.email}
                    delay={0.5}
                  />
                </div>

                <div className="pt-2 space-y-2 border-t border-border">
                  <p className="text-xs font-bold text-muted uppercase tracking-wider">
                    Current Address
                  </p>
                  <div className="p-3 rounded-lg bg-bg border border-border flex gap-3">
                    <FaMapMarkerAlt className="text-primary flex-shrink-0 mt-1" size={16} />
                    <p className="text-sm text-text">
                      {user.address}
                      {user.city && `, ${user.city}`}
                      {user.state && `, ${user.state}`}
                      {user.country && `, ${user.country}`}
                      {user.pincode && ` - ${user.pincode}`}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Academic Status Card */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card delay={0.5}>
                <div className="p-6 text-center">
                  <div className="p-3 rounded-lg bg-success/10 text-success w-fit mx-auto mb-3">
                    <FaCheckCircle size={24} />
                  </div>
                  <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <p className="text-lg font-bold text-text">
                    {user.status === 1 ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </Card>

              <Card delay={0.55}>
                <div className="p-6 text-center">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent w-fit mx-auto mb-3">
                    <FaCalendarAlt size={24} />
                  </div>
                  <p className="text-xs text-muted font-bold uppercase tracking-wider mb-1">
                    Academic Year
                  </p>
                  <p className="text-lg font-bold text-text">
                    {new Date().getFullYear()} - {new Date().getFullYear() + 1}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
        className="fixed bottom-6 left-4 right-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-50 max-w-2xl"
      >
        <div className="bg-surface border border-border rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => (window.location.href = '/student/profile')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white font-semibold transition text-sm"
          >
            <FaEdit size={16} /> Edit Profile
          </button>

          <div className="hidden sm:block w-px h-8 bg-border" />

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-danger/10 text-danger hover:bg-danger hover:text-white font-semibold transition text-sm disabled:opacity-50"
          >
            {loggingOut ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
            ) : (
              <FaSignOutAlt size={16} />
            )}
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
