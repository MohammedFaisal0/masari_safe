import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type TripStatus = 'home' | 'in-bus' | 'at-school';

export interface Notification {
  id: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
}

interface SimulationContextType {
  isSimulating: boolean;
  tripStatus: TripStatus;
  busPosition: number; // 0-100 percentage along route
  notifications: Notification[];
  startSimulation: () => void;
  stopSimulation: () => void;
  resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
};

interface SimulationProviderProps {
  children: ReactNode;
}

export const SimulationProvider: React.FC<SimulationProviderProps> = ({ children }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [tripStatus, setTripStatus] = useState<TripStatus>('home');
  const [busPosition, setBusPosition] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: Notification['type'] = 'info') => {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      type,
    };
    setNotifications(prev => [notification, ...prev]);
  }, []);

  const startSimulation = useCallback(() => {
    setIsSimulating(true);
    setNotifications([]);
    setBusPosition(0);
    setTripStatus('home');

    // Notification at 0-3s: Bus arrived at home
    setTimeout(() => {
      addNotification('وصل الباص للمنزل', 'info');
    }, 1000);

    // Notification at 4-7s: Student left home
    setTimeout(() => {
      addNotification('تم خروج الطالب من المنزل', 'info');
      setTripStatus('in-bus');
    }, 5000);

    // Notification at 8-11s: Student boarded bus
    setTimeout(() => {
      addNotification('تم ركوب الطالب الباص', 'success');
    }, 9000);

    // Move bus along route
    let position = 0;
    const moveInterval = setInterval(() => {
      position += 4;
      setBusPosition(position);
      if (position >= 100) {
        clearInterval(moveInterval);
      }
    }, 1000);

    // Notification at 25-30s: Student arrived safely
    setTimeout(() => {
      addNotification('وصل الطالب للمدرسة بسلام', 'success');
      setTripStatus('at-school');
      setIsSimulating(false);
    }, 28000);

    // Store interval ID for cleanup
    return () => clearInterval(moveInterval);
  }, [addNotification]);

  const stopSimulation = useCallback(() => {
    setIsSimulating(false);
  }, []);

  const resetSimulation = useCallback(() => {
    setIsSimulating(false);
    setTripStatus('home');
    setBusPosition(0);
    setNotifications([]);
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        isSimulating,
        tripStatus,
        busPosition,
        notifications,
        startSimulation,
        stopSimulation,
        resetSimulation,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
