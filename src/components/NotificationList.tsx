import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Notification } from '@/contexts/SimulationContext';

interface NotificationToastProps {
  notification: Notification;
  onDismiss?: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onDismiss }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-success/10 border-success/30';
      case 'warning':
        return 'bg-warning/10 border-warning/30';
      default:
        return 'bg-primary/10 border-primary/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border shadow-custom-md backdrop-blur-sm",
        getBgColor()
      )}
    >
      {getIcon()}
      <div className="flex-1">
        <p className="font-medium text-foreground text-sm">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{notification.time}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 rounded-full hover:bg-muted/50 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      )}
    </motion.div>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  showToast?: boolean;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, showToast = false }) => {
  if (showToast && notifications.length > 0) {
    return (
      <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto">
        <AnimatePresence mode="popLayout">
          <NotificationToast
            key={notifications[0].id}
            notification={notifications[0]}
          />
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <NotificationToast notification={notification} />
          </motion.div>
        ))}
      </AnimatePresence>
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">لا توجد إشعارات</h3>
          <p className="text-sm text-muted-foreground">
            ابدأ المحاكاة لرؤية الإشعارات
          </p>
        </div>
      )}
    </div>
  );
};

export { NotificationToast, NotificationList };
