import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSimulation } from '@/contexts/SimulationContext';
import { NotificationList } from '@/components/NotificationList';
import BusMap from '@/components/BusMap';
import BottomNavigation from '@/components/BottomNavigation';

const TrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, tripStatus, busPosition } = useSimulation();

  const getETA = () => {
    const remaining = 100 - busPosition;
    const minutes = Math.ceil((remaining / 100) * 5);
    return minutes;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Notification Toast */}
      <NotificationList notifications={notifications} showToast />

      {/* Map Container */}
      <div className="relative h-[60vh]">
        <BusMap />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/home')}
          className="absolute top-12 right-4 w-12 h-12 rounded-full bg-card shadow-custom-lg flex items-center justify-center z-10"
        >
          <ArrowRight className="w-6 h-6 text-foreground" />
        </motion.button>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-12 left-4 right-20 z-10"
        >
          <div className="bg-card rounded-full px-4 py-2.5 shadow-custom-lg flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${
              tripStatus === 'in-bus' ? 'bg-success animate-pulse' : 'bg-warning'
            }`} />
            <span className="text-sm font-medium text-foreground">
              {tripStatus === 'home' && 'في انتظار الباص'}
              {tripStatus === 'in-bus' && 'الطالب في الباص'}
              {tripStatus === 'at-school' && 'وصل للمدرسة'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative -mt-8 mx-4 bg-card rounded-3xl shadow-custom-lg overflow-hidden"
      >
        {/* Progress bar */}
        <div className="h-1.5 bg-muted">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${busPosition}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-6">
          {/* Driver info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-custom-md">
              <User className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-foreground">السائق: خالد</h3>
              <p className="text-sm text-muted-foreground">باص رقم 142 • السعة: 30 طالب</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <Clock className="w-5 h-5" />
                <span className="text-2xl font-bold">{getETA()}</span>
              </div>
              <p className="text-xs text-muted-foreground">دقائق للوصول</p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <span className="text-2xl font-bold">{Math.round(busPosition)}%</span>
              </div>
              <p className="text-xs text-muted-foreground">اكتمال الرحلة</p>
            </div>
          </div>
        </div>
      </motion.div>

      <BottomNavigation />
    </div>
  );
};

export default TrackingPage;
