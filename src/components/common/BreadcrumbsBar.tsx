import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, Folder } from 'lucide-react';
import { DISTRICT_LIST } from '@/constants';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface BreadcrumbSegment {
  label: string;
  path?: string;
  isLast?: boolean;
}

export function BreadcrumbsBar() {
  const location = useLocation();
  const { isField, isLight } = useTheme();

  const segments = useMemo<BreadcrumbSegment[]>(() => {
    const path = location.pathname;
    const search = new URLSearchParams(location.search);
    const result: BreadcrumbSegment[] = [{ label: 'Outpost', path: '/' }];

    if (path === '/') {
      result[0].isLast = true;
      return result;
    }

    if (path.startsWith('/scout') || path.startsWith('/map') || path.startsWith('/regions')) {
      result.push({ label: 'Land & Water', path: '/scout-map' });
      if (path.includes('/regions/')) {
        const districtId = path.replace('/regions/', '');
        const dist = DISTRICT_LIST.find((d) => d.id === districtId);
        result.push({ label: 'District GIS Map', path: '/scout-map' });
        result.push({ label: dist ? `${dist.name} Highlands` : districtId, isLast: true });
        return result;
      }
      result.push({ label: '28-District GIS Map', isLast: true });
      return result;
    }

    if (path.startsWith('/where') || path.startsWith('/suitability') || path.startsWith('/property-evaluator')) {
      result.push({ label: 'Land & Water', path: '/where' });
      result.push({ label: 'Tenure & Land Protocols', isLast: true });
      return result;
    }

    if (path.startsWith('/what')) {
      result.push({ label: 'Agronomy & Soils', path: '/what' });
      result.push({ label: 'Soil Stratigraphy & Crops', isLast: true });
      return result;
    }

    if (path.startsWith('/agriculture') || path.startsWith('/edenic-farming')) {
      result.push({ label: 'Agronomy & Soils', path: '/agriculture' });
      result.push({ label: 'Edenic Farming Protocols', isLast: true });
      return result;
    }

    if (path.startsWith('/seasons') || path.startsWith('/almanac')) {
      result.push({ label: 'Agronomy & Soils', path: '/seasons' });
      result.push({ label: 'Seasonal Farm Almanac', isLast: true });
      return result;
    }

    if (path.startsWith('/sanitarium')) {
      result.push({ label: 'Health & Lifestyle', path: '/sanitarium' });
      result.push({ label: 'Sanitarium Blueprint', isLast: true });
      return result;
    }

    if (path.startsWith('/kitchen')) {
      result.push({ label: 'Health & Lifestyle', path: '/kitchen' });
      result.push({ label: 'Country Kitchen Recipes', isLast: true });
      return result;
    }

    if (path.startsWith('/calculators')) {
      result.push({ label: 'Off-Grid Engineering', path: '/calculators' });
      result.push({ label: 'Solar & Water Sizers', isLast: true });
      return result;
    }

    if (path.startsWith('/how')) {
      result.push({ label: 'Off-Grid Engineering', path: '/how' });
      result.push({ label: 'Homestead Construction Specs', isLast: true });
      return result;
    }

    if (path.startsWith('/skills')) {
      result.push({ label: 'Self-Reliance Trades', path: '/skills' });
      if (path.length > 8) {
        const skillSlug = path.replace('/skills/', '').replace(/-/g, ' ');
        result.push({
          label: skillSlug.replace(/\b\w/g, (c) => c.toUpperCase()),
          isLast: true,
        });
        return result;
      }
      result.push({ label: 'Field Manual Protocols', isLast: true });
      return result;
    }

    if (path.startsWith('/blueprints')) {
      result.push({ label: 'Sanctuary Campus', path: '/blueprints' });
      result.push({ label: 'Institutional Outpost Blueprints', isLast: true });
      return result;
    }

    if (path.startsWith('/community') || path.startsWith('/directory')) {
      result.push({ label: 'Fellowship', path: '/community' });
      result.push({ label: 'Steward & Mission Directory', isLast: true });
      return result;
    }

    if (path.startsWith('/tracker')) {
      result.push({ label: 'Sanctuary Path', path: '/tracker' });
      result.push({ label: 'Transition Readiness Ledger', isLast: true });
      return result;
    }

    if (path.startsWith('/devotional')) {
      result.push({ label: 'Sanctuary Altar', path: '/devotional' });
      result.push({ label: 'Daily Manna Devotional', isLast: true });
      return result;
    }

    if (path.startsWith('/vision')) {
      result.push({ label: 'Sanctuary Altar', path: '/vision' });
      result.push({ label: 'Spirit of Prophecy Archive', isLast: true });
      return result;
    }

    if (path.startsWith('/account')) {
      result.push({ label: 'Steward Profile', isLast: true });
      return result;
    }

    if (path.startsWith('/settings') || path.startsWith('/preferences')) {
      result.push({ label: 'System', path: '/settings' });
      const tab = search.get('tab');
      const tabLabel =
        tab === 'data'
          ? 'Data & Vault'
          : tab === 'district'
          ? 'District Focus'
          : tab === 'diagnostics'
          ? 'Diagnostics'
          : tab === 'about'
          ? 'About'
          : 'Appearance';
      result.push({ label: 'Workspace Settings', path: '/settings' });
      result.push({ label: tabLabel, isLast: true });
      return result;
    }

    // Generic fallback
    const rawSegment = path.replace(/^\//, '').replace(/-/g, ' ');
    result.push({
      label: rawSegment.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Workspace',
      isLast: true,
    });
    return result;
  }, [location.pathname, location.search]);

  return (
    <nav
      aria-label="Workspace Breadcrumbs"
      className={cn(
        'h-[26px] shrink-0 w-full px-3 sm:px-4 flex items-center justify-between border-b text-[11.5px] font-chrome select-none z-20 transition-colors',
        isField
          ? 'bg-black text-white border-white/20'
          : 'bg-[#F6F1E7] text-[#1F2A22] border-[#E4DCCB]'
      )}
    >
      {/* Left breadcrumb chain */}
      <ol className="flex items-center gap-1.5 min-w-0 overflow-hidden">
        {segments.map((seg, idx) => {
          const isFirst = idx === 0;
          const isCurrent = idx === segments.length - 1;

          return (
            <li key={idx} className="inline-flex items-center gap-1.5 shrink-0 max-w-[200px] truncate">
              {idx > 0 && (
                <ChevronRight size={10} className="text-[#5A6458] shrink-0" />
              )}

              {isCurrent ? (
                <span
                  aria-current="page"
                  className="font-medium text-[#1F2A22] truncate"
                >
                  {seg.label}
                </span>
              ) : seg.path ? (
                <Link
                  to={seg.path}
                  className="hover:underline hover:text-[#B4531F] text-[#5A6458] transition-colors truncate flex items-center gap-1"
                >
                  {isFirst && <Home size={10} className="shrink-0 text-[#5A6458]" />}
                  <span>{seg.label}</span>
                </Link>
              ) : (
                <span className="text-[#5A6458] truncate">{seg.label}</span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Right subtle workspace context indicator */}
      <div className="hidden sm:flex items-center gap-2 text-[10.5px] text-[#5A6458] shrink-0">
        <span>Desktop Workspace</span>
        <span>•</span>
        <span>28 Districts</span>
      </div>
    </nav>
  );
}

export default BreadcrumbsBar;
