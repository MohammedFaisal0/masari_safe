import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useSimulation } from '@/contexts/SimulationContext';
import { NotificationList } from '@/components/NotificationList';
import BottomNavigation from '@/components/BottomNavigation';

const NotificationsPage: React.FC = () => {
  const { notifications } = useSimulation();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-hero px-6 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-custom-md">
            <Bell className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">الإشعارات</h1>
            <p className="text-sm text-muted-foreground">
              {notifications.length > 0
                ? `${notifications.length} إشعارات جديدة`
                : 'لا توجد إشعارات'
              }
            </p>
          </div>
        </motion.div>
      </div>

      {/* Notifications */}
      <div className="px-6 py-6">
        <NotificationList notifications={notifications} />
      </div>

      <BottomNavigation />
    </div>
  );
};

export default NotificationsPage;
