import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wifi,
  WifiOff,
  Database,
  MapPin,
  Clock,
  Sparkles,
  ChevronUp,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useActiveHomesteadDistrict } from '@/lib/activeDistrictSync';
import { DISTRICT_LIST } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { usePlatform } from '@/lib/platform';
import { cn } from '@/lib/utils';

export function WorkspaceStatusBar() {
  const navigate = useNavigate();
  const platform = usePlatform();
  const { isField, isLight } = useTheme();

  const [activeDistrictId, setActiveDistrictId] = useActiveHomesteadDistrict('dedza');
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isDistrictMenuOpen, setIsDistrictMenuOpen] = useState(false);
  const [lastSavedText, setLastSavedText] = useState('Saved locally');

  const activeDistrict =
    DISTRICT_LIST.find((d) => d.id === activeDistrictId) || DISTRICT_LIST[0];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Update last saved text on any workspace progress or note edit
    const handleProgress = () => {
      setLastSavedText('Auto-saved just now');
      setTimeout(() => setLastSavedText('Saved locally'), 4000);
    };

    window.addEventListener('outpost:progress-updated', handleProgress);
    window.addEventListener('outpost:tabs-updated', handleProgress);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('outpost:progress-updated', handleProgress);
      window.removeEventListener('outpost:tabs-updated', handleProgress);
    };
  }, []);

  return (
    <footer
      id="outpost-status-bar"
      aria-label="Desktop Workspace Status Bar"
      className={cn(
        'h-[26px] shrink-0 w-full px-3 sm:px-4 flex items-center justify-between border-t text-[11.5px] font-chrome select-none z-30 transition-colors duration-200',
        isField
          ? 'bg-black text-white border-white/20'
          : 'bg-[#F6F1E7] dark:bg-[#121C16] text-[#1F2A22] dark:text-[#EBF2EC] border-[#E4DCCB] dark:border-[#283C30]'
      )}
    >
      {/* Left zone: Network State & District Freshness */}
      <div className="flex items-center gap-3">
        {/* Offline / Online indicator */}
        <div
          className="flex items-center gap-1.5 cursor-default"
          title={isOnline ? 'Online: Cloud synchronization ready' : 'Offline: Local database vault active'}
        >
          <span
            className={cn(
              'w-2 h-2 rounded-full',
              isOnline
                ? 'bg-[#3F6B4E] dark:bg-[#4E8761]'
                : 'bg-[#C98A1B] dark:bg-[#E5A32B]'
            )}
          />
          <span className="font-medium text-[#1F2A22] dark:text-[#EBF2EC]">
            {isOnline ? 'Online ready' : 'Offline ready'}
          </span>
          <span className="text-[#5A6458] dark:text-[#8E9E92] hidden sm:inline">
            · District: {activeDistrict.name}
          </span>
        </div>
      </div>

      {/* Right zone: Selected District, Last Saved, App Version */}
      <div className="flex items-center gap-3">
        {/* Selected District (Clickable quick switch) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDistrictMenuOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-[4px] hover:bg-[#E4DCCB]/60 dark:hover:bg-[#283C30] text-[#1F2A22] dark:text-[#EBF2EC] transition-colors cursor-pointer"
            title="Active Homestead District"
          >
            <MapPin size={11} className="text-[#B4531F] dark:text-[#D3672E] shrink-0" />
            <span className="font-medium">District: {activeDistrict.name}</span>
            <span className="text-[#5A6458] dark:text-[#8E9E92] text-[10.5px] hidden md:inline">
              ({activeDistrict.region})
            </span>
          </button>

          {/* Quick District Popover Menu */}
          {isDistrictMenuOpen && (
            <div className="absolute bottom-full right-0 mb-1 w-64 max-h-64 overflow-y-auto custom-scrollbar rounded-[6px] border border-[#E4DCCB] dark:border-[#283C30] bg-[#FFFDF8] dark:bg-[#17241C] shadow-xl p-1 z-50 text-xs flex flex-col gap-0.5">
              <div className="px-2 py-1 text-[11px] font-semibold text-[#5A6458] dark:text-[#8E9E92] border-b border-[#E4DCCB]/80 dark:border-[#283C30]">
                Select Active District
              </div>
              {DISTRICT_LIST.map((dist) => (
                <button
                  key={dist.id}
                  type="button"
                  onClick={() => {
                    setActiveDistrictId(dist.id);
                    setIsDistrictMenuOpen(false);
                  }}
                  className={cn(
                    'h-7 px-2 rounded-[4px] flex items-center justify-between text-left transition-colors cursor-pointer text-[12px]',
                    activeDistrictId === dist.id
                      ? 'bg-[#2B4636] text-[#FFFDF8] font-medium'
                      : 'hover:bg-[#F6F1E7] dark:hover:bg-[#283C30] text-[#1F2A22] dark:text-[#EBF2EC]'
                  )}
                >
                  <span>{dist.name}</span>
                  {activeDistrictId === dist.id && <Check size={12} className="text-[#FFFDF8]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="text-[#E4DCCB] dark:text-[#283C30]" aria-hidden="true">
          |
        </span>

        {/* Last Saved */}
        <div className="flex items-center gap-1 text-[#5A6458] dark:text-[#8E9E92]">
          <Clock size={11} className="text-[#5A6458] dark:text-[#8E9E92] shrink-0" />
          <span className="text-[11px] hidden sm:inline">{lastSavedText}</span>
        </div>

        <span className="text-[#E4DCCB] dark:text-[#283C30]" aria-hidden="true">
          |
        </span>

        {/* App Version */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#5A6458] dark:text-[#8E9E92]">
          <span className="font-medium text-[#1F2A22] dark:text-[#EBF2EC]">Outpost 1.0</span>
          <span className="hidden lg:inline text-[#5A6458] dark:text-[#8E9E92]">({platform.os})</span>
        </div>
      </div>
    </footer>
  );
}

export default WorkspaceStatusBar;
