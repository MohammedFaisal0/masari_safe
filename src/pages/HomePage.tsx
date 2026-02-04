import React from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSimulation } from '@/contexts/SimulationContext';
import { useViewMode } from '@/contexts/ViewModeContext';
import StatusTimeline from '@/components/StatusTimeline';
import BusMap from '@/components/BusMap';
import { NotificationList } from '@/components/NotificationList';
import BottomNavigation from '@/components/BottomNavigation';

const HomePage: React.FC = () => {
  const { tripStatus, isSimulating, startSimulation, resetSimulation, notifications } = useSimulation();
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Notification Toast */}
      <NotificationList notifications={notifications} showToast />

      {/* Header */}
      <div className="gradient-hero px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-xl font-bold text-foreground">مرحباً 👋</h1>
            <p className="text-muted-foreground">ولي أمر الطالب <span className="font-semibold text-primary">محمد</span></p>
          </div>

          {/* View mode toggle */}
          <button
            onClick={toggleViewMode}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-custom-sm text-sm font-medium transition-all hover:shadow-custom-md"
          >
            <Users className="w-4 h-4 text-primary" />
            {viewMode === 'parent' ? 'وضع السائق' : 'وضع ولي الأمر'}
          </button>
        </motion.div>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 shadow-card"
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">حالة الرحلة</h2>
          <StatusTimeline currentStatus={tripStatus} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Map Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">موقع الباص</h2>
            <a href="/tracking" className="text-sm text-primary font-medium flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              عرض الخريطة
            </a>
          </div>
          <div className="h-48 rounded-2xl overflow-hidden shadow-card">
            <BusMap />
          </div>
        </motion.div>

        {/* Driver Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-card border border-border"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-custom-md">
              <span className="text-xl text-primary-foreground">خ</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">السائق: خالد محمد</h3>
              <p className="text-sm text-muted-foreground">باص رقم: 142</p>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-primary">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">5 دقائق</span>
              </div>
              <p className="text-xs text-muted-foreground">الوقت المتوقع</p>
            </div>
          </div>
        </motion.div>

        {/* Simulation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3"
        >
          <Button
            onClick={startSimulation}
            disabled={isSimulating}
            className="flex-1 h-14 rounded-xl text-base font-semibold gradient-primary hover:opacity-90 transition-opacity shadow-custom-md"
          >
            <Play className="w-5 h-5 ml-2" />
            بدء المحاكاة
          </Button>
          <Button
            onClick={resetSimulation}
            variant="outline"
            className="h-14 px-6 rounded-xl border-2 border-primary/20 hover:bg-primary/5"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default HomePage;
