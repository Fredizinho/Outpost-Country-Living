import React, { useMemo } from 'react';
import { Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MapCompassAndScaleProps {
  currentZoom?: number;
  centerLat?: number;
  isAutoHidden?: boolean;
  onWakeUp?: () => void;
}

export function MapCompassAndScale({ 
  currentZoom = 7.5, 
  centerLat = -13.25,
  isAutoHidden = false,
  onWakeUp
}: MapCompassAndScaleProps) {
  // Approximate kilometers represented by a fixed 70px bar at given latitude and zoom level
  // meters per pixel = 156543.03392 * cos(lat * pi / 180) / (2 ^ zoom)
  const scaleInfo = useMemo(() => {
    const latRad = (centerLat * Math.PI) / 180;
    const metersPerPixel = (156543.03392 * Math.cos(latRad)) / Math.pow(2, currentZoom);
    
    // Choose a standard round distance in km or m
    const targetPixels = 64; // base width in pixels
    const targetMeters = metersPerPixel * targetPixels;

    let displayValue: string;
    let barWidthPx: number;

    if (targetMeters >= 50000) {
      // e.g. 100 km, 50 km
      const roundedKm = Math.round(targetMeters / 50000) * 50 || 50;
      displayValue = `${roundedKm} km`;
      barWidthPx = Math.max(36, Math.min(100, Math.round((roundedKm * 1000) / metersPerPixel)));
    } else if (targetMeters >= 10000) {
      // e.g. 20 km, 10 km
      const roundedKm = Math.round(targetMeters / 10000) * 10 || 10;
      displayValue = `${roundedKm} km`;
      barWidthPx = Math.max(36, Math.min(100, Math.round((roundedKm * 1000) / metersPerPixel)));
    } else if (targetMeters >= 1000) {
      // e.g. 5 km, 2 km, 1 km
      const roundedKm = Math.round(targetMeters / 1000) || 1;
      displayValue = `${roundedKm} km`;
      barWidthPx = Math.max(36, Math.min(100, Math.round((roundedKm * 1000) / metersPerPixel)));
    } else {
      const roundedMeters = Math.round(targetMeters / 100) * 100 || 200;
      displayValue = `${roundedMeters} m`;
      barWidthPx = Math.max(36, Math.min(100, Math.round(roundedMeters / metersPerPixel)));
    }

    return { displayValue, barWidthPx };
  }, [currentZoom, centerLat]);

  return (
    <div 
      className={cn(
        "absolute left-3 bottom-14 z-20 pointer-events-auto flex items-center gap-2.5 transition-all duration-300 font-mono",
        isAutoHidden ? "opacity-35 hover:opacity-100" : "opacity-100"
      )}
      id="map-compass-and-scale"
    >
      {/* 1. Mini Compass Rose */}
      <div 
        className="w-9 h-9 rounded-full bg-slate-950/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center relative cursor-default"
        title="True Geographic North (Malawi Transverse Mercator Projection)"
      >
        {/* Subtle Cardinal Ticks */}
        <div className="absolute inset-0.5 rounded-full border border-white/10 flex items-center justify-center">
          <span className="absolute -top-0.5 text-caption font-black text-rose-400 font-mono">N</span>
          <span className="absolute -bottom-0.5 text-caption font-bold text-slate-500 font-mono">S</span>
          <span className="absolute -left-0.5 text-caption font-bold text-slate-500 font-mono">W</span>
          <span className="absolute -right-0.5 text-caption font-bold text-slate-500 font-mono">E</span>
          
          {/* Compass Needle (Red North, Silver South) */}
          <svg className="w-5 h-5 drop-shadow-[0_0_4px_rgba(244,63,94,0.6)]" viewBox="0 0 24 24" fill="none">
            {/* North pointer (Red) */}
            <polygon points="12,2 8,12 12,10 16,12" fill="#f43f5e" />
            {/* South pointer (Slate) */}
            <polygon points="12,22 8,12 12,14 16,12" fill="#94a3b8" />
            {/* Center Pivot */}
            <circle cx="12" cy="12" r="1.5" fill="#020617" stroke="#ffffff" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* 2. Precision Metric Scale Bar */}
      <div 
        className="bg-slate-950/90 backdrop-blur-md border border-white/20 rounded-xl px-2.5 py-1 shadow-xl flex flex-col items-center justify-center gap-0.5"
        title={`Visual Scale: 0 to ${scaleInfo.displayValue}`}
      >
        <div className="flex items-center justify-between text-caption text-slate-300 w-full px-0.5">
          <span>0</span>
          <span className="font-bold text-amber-400">{scaleInfo.displayValue}</span>
        </div>
        
        {/* Graphic Bar with 2-tone segment */}
        <div 
          style={{ width: `${scaleInfo.barWidthPx}px` }} 
          className="h-1.5 flex rounded-sm overflow-hidden border border-white/30"
        >
          <div className="w-1/2 bg-white" />
          <div className="w-1/2 bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
