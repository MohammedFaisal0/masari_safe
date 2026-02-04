import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSimulation } from '@/contexts/SimulationContext';

// Define route points (Riyadh area mock)
const routePoints: [number, number][] = [
  [24.7136, 46.6753], // Home
  [24.7150, 46.6780],
  [24.7170, 46.6810],
  [24.7190, 46.6850],
  [24.7210, 46.6880],
  [24.7230, 46.6900], // School
];

const homePosition: [number, number] = routePoints[0];
const schoolPosition: [number, number] = routePoints[routePoints.length - 1];

// Custom bus icon
const busIcon = L.divIcon({
  className: 'bus-marker',
  html: `
    <div style="
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #8E44AD 0%, #6c3483 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(142, 68, 173, 0.4);
      animation: bus-pulse 2s ease-in-out infinite;
    ">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M8 6v6m7-6v6M2 12h20M2 18h20M6 6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6z"/>
        <circle cx="7" cy="18" r="2"/>
        <circle cx="17" cy="18" r="2"/>
      </svg>
    </div>
    <style>
      @keyframes bus-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    </style>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Home icon
const homeIcon = L.divIcon({
  className: 'home-marker',
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background: #22c55e;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 10px rgba(34, 197, 94, 0.3);
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// School icon
const schoolIcon = L.divIcon({
  className: 'school-marker',
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background: #f59e0b;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 10px rgba(245, 158, 11, 0.3);
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.panTo(center, { animate: true, duration: 0.5 });
  }, [center, map]);

  return null;
};

const BusMap: React.FC = () => {
  const { busPosition, isSimulating } = useSimulation();
  const [currentBusPosition, setCurrentBusPosition] = useState<[number, number]>(homePosition);

  useEffect(() => {
    // Calculate bus position along the route based on percentage
    const routeLength = routePoints.length - 1;
    const progress = busPosition / 100;
    const segmentIndex = Math.min(Math.floor(progress * routeLength), routeLength - 1);
    const segmentProgress = (progress * routeLength) - segmentIndex;

    const start = routePoints[segmentIndex];
    const end = routePoints[Math.min(segmentIndex + 1, routeLength)];

    const lat = start[0] + (end[0] - start[0]) * segmentProgress;
    const lng = start[1] + (end[1] - start[1]) * segmentProgress;

    setCurrentBusPosition([lat, lng]);
  }, [busPosition]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-card">
      <MapContainer
        center={[24.7180, 46.6820]}
        zoom={14}
        scrollWheelZoom={false}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Route line */}
        <Polyline
          positions={routePoints}
          pathOptions={{
            color: '#8E44AD',
            weight: 4,
            opacity: 0.6,
            dashArray: '10, 10',
          }}
        />

        {/* Home marker */}
        <Marker position={homePosition} icon={homeIcon} />

        {/* School marker */}
        <Marker position={schoolPosition} icon={schoolIcon} />

        {/* Bus marker */}
        <Marker position={currentBusPosition} icon={busIcon} />

        {isSimulating && <MapUpdater center={currentBusPosition} />}
      </MapContainer>
    </div>
  );
};

export default BusMap;
