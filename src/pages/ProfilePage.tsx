import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, MapPin, Bell, Shield, LogOut, ChevronLeft, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useViewMode } from '@/contexts/ViewModeContext';
import DriverStudentList from '@/components/DriverStudentList';
import BottomNavigation from '@/components/BottomNavigation';

const menuItems = [
  { icon: User, label: 'معلومات الحساب', href: '#' },
  { icon: Bell, label: 'إعدادات الإشعارات', href: '#' },
  { icon: Shield, label: 'الخصوصية والأمان', href: '#' },
  { icon: Phone, label: 'تواصل معنا', href: '#' },
];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { viewMode, toggleViewMode } = useViewMode();

  if (viewMode === 'driver') {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="gradient-hero px-6 pt-12 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-custom-md">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">وضع السائق</h1>
                <p className="text-sm text-muted-foreground">إدارة ركوب الطلاب</p>
              </div>
            </div>
            <button
              onClick={toggleViewMode}
              className="px-4 py-2 rounded-full bg-card border border-border shadow-custom-sm text-sm font-medium"
            >
              وضع ولي الأمر
            </button>
          </motion.div>
        </div>

        {/* Driver student list */}
        <div className="px-6 py-6">
          <DriverStudentList />
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with profile */}
      <div className="gradient-hero px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center shadow-custom-lg mb-4">
            <span className="text-3xl text-primary-foreground font-bold">أ</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">أحمد محمد العتيبي</h1>
          <p className="text-sm text-muted-foreground">ولي أمر الطالب محمد</p>
        </motion.div>
      </div>

      {/* Contact info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-6 -mt-4 bg-card rounded-2xl p-4 shadow-card border border-border"
      >
        <div className="flex items-center gap-3 py-2">
          <Phone className="w-5 h-5 text-primary" />
          <span className="text-sm text-foreground" dir="ltr">+966 512 345 678</span>
        </div>
        <div className="border-t border-border" />
        <div className="flex items-center gap-3 py-2">
          <Mail className="w-5 h-5 text-primary" />
          <span className="text-sm text-foreground">ahmed@example.com</span>
        </div>
        <div className="border-t border-border" />
        <div className="flex items-center gap-3 py-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-sm text-foreground">الرياض، حي النرجس</span>
        </div>
      </motion.div>

      {/* Menu items */}
      <div className="px-6 py-6 space-y-3">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="w-full flex items-center gap-4 p-4 bg-card rounded-xl shadow-custom-sm border border-border hover:shadow-custom-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 text-right font-medium text-foreground">{item.label}</span>
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        ))}

        {/* Logout button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-4 p-4 bg-destructive/10 rounded-xl border border-destructive/20 hover:bg-destructive/20 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <span className="flex-1 text-right font-medium text-destructive">تسجيل الخروج</span>
        </motion.button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
