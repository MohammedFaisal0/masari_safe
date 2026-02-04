import React from 'react';
import { motion } from 'framer-motion';
import { Home, Bus, School, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TripStatus } from '@/contexts/SimulationContext';

interface StatusTimelineProps {
  currentStatus: TripStatus;
}

const steps = [
  { id: 'home', label: 'في المنزل', icon: Home },
  { id: 'in-bus', label: 'في الباص', icon: Bus },
  { id: 'at-school', label: 'في المدرسة', icon: School },
];

const StatusTimeline: React.FC<StatusTimelineProps> = ({ currentStatus }) => {
  const getStepStatus = (stepId: string) => {
    const statusOrder = ['home', 'in-bus', 'at-school'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full px-4">
      <div className="relative flex items-center justify-between">
        {/* Progress line background */}
        <div className="absolute top-6 right-8 left-8 h-1 bg-muted rounded-full" />
        
        {/* Animated progress line */}
        <motion.div
          className="absolute top-6 right-8 h-1 gradient-primary rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: currentStatus === 'home' ? '0%' : currentStatus === 'in-bus' ? '50%' : '100%',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ maxWidth: 'calc(100% - 64px)' }}
        />

        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex flex-col items-center z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: status === 'current' ? 1.1 : 1,
                  backgroundColor:
                    status === 'completed'
                      ? 'hsl(var(--success))'
                      : status === 'current'
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--muted))',
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shadow-custom-md",
                  status === 'current' && "ring-4 ring-primary/20"
                )}
              >
                {status === 'completed' ? (
                  <Check className="w-5 h-5 text-success-foreground" />
                ) : (
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      status === 'current' ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  />
                )}
              </motion.div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center",
                  status === 'current' ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
