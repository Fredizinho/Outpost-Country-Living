import React, { useState, useEffect } from 'react';
import { 
  CloudSun, CloudRain, Sun, Wind, Droplets, Gauge, Compass, 
  RefreshCw, Sparkles, MapPin, AlertTriangle, Calendar, ShieldCheck, 
  Thermometer, Umbrella, Info, ArrowUpRight, CloudLightning, CloudFog, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/Skeleton';

export interface MalawiLocationWeather {
  districtKey: string;
  districtName: string;
  region: 'Northern' | 'Central' | 'Southern';
  lat: number;
  lng: number;
  altitude: string;
  current: {
    tempC: number;
    feelsLikeC: number;
    humidity: number;
    windSpeedKmH: number;
    windDirectionDeg: number;
    precipitationMm: number;
    surfacePressureHpa: number;
    weatherCode: number;
    weatherLabel: string;
    weatherIcon: string;
    isDay: boolean;
  };
  daily: Array<{
    date: string;
    dayOfWeek: string;
    weatherCode: number;
    weatherLabel: string;
    weatherIcon: string;
    tempMaxC: number;
    tempMinC: number;
    precipSumMm: number;
    precipProbMax: number;
    uvIndexMax: number;
  }>;
  agriculturalAdvice: string;
  scoutingScore: number; // 1-10 scouting index for field work
  lastUpdated: string;
}

export interface LocationCoordinates {
  key: string;
  name: string;
  region: 'Northern' | 'Central' | 'Southern';
  lat: number;
  lng: number;
  altitude: string;
}

export const MALAWI_LOCATIONS: LocationCoordinates[] = [
  { key: 'dedza', name: 'Dedza Highlands', region: 'Central', lat: -14.38, lng: 34.33, altitude: '1,600m' },
  { key: 'mzimba', name: 'Mzimba Plateau', region: 'Northern', lat: -11.90, lng: 33.60, altitude: '1,350m' },
  { key: 'mzuzu', name: 'Mzuzu City & Viphya', region: 'Northern', lat: -11.46, lng: 34.02, altitude: '1,250m' },
  { key: 'lilongwe', name: 'Lilongwe Rural', region: 'Central', lat: -13.97, lng: 33.79, altitude: '1,050m' },
  { key: 'blantyre', name: 'Blantyre & Shire Highlands', region: 'Southern', lat: -15.79, lng: 35.00, altitude: '1,040m' },
  { key: 'mulanje', name: 'Mulanje Massif Slopes', region: 'Southern', lat: -16.03, lng: 35.50, altitude: '900m' },
  { key: 'zomba', name: 'Zomba Plateau', region: 'Southern', lat: -15.38, lng: 35.32, altitude: '1,400m' },
  { key: 'kasungu', name: 'Kasungu Plain', region: 'Central', lat: -13.03, lng: 33.48, altitude: '1,000m' },
  { key: 'thyolo', name: 'Thyolo Tea Belt', region: 'Southern', lat: -16.07, lng: 35.14, altitude: '950m' },
  { key: 'karonga', name: 'Karonga Lakeshore', region: 'Northern', lat: -9.93, lng: 33.93, altitude: '500m' },
  { key: 'mangochi', name: 'Mangochi Lake Basin', region: 'Central', lat: -14.48, lng: 35.26, altitude: '490m' },
  { key: 'nsanje', name: 'Lower Shire Valley (Nsanje)', region: 'Southern', lat: -16.92, lng: 35.26, altitude: '120m' },
];

// Interpret WMO Weather Codes
export function getWeatherDescription(code: number): { label: string; icon: string } {
  if (code === 0) return { label: 'Clear Sky & Sun', icon: 'sun' };
  if (code === 1) return { label: 'Mainly Clear', icon: 'sun' };
  if (code === 2) return { label: 'Partly Cloudy', icon: 'cloud-sun' };
  if (code === 3) return { label: 'Overcast & Cloudy', icon: 'cloud' };
  if (code === 45 || code === 48) return { label: 'Highland Fog & Mist', icon: 'fog' };
  if (code >= 51 && code <= 55) return { label: 'Light Drizzle (Chiperoni)', icon: 'drizzle' };
  if (code >= 61 && code <= 65) return { label: 'Moderate Rain Showers', icon: 'rain' };
  if (code >= 80 && code <= 82) return { label: 'Heavy Rain Showers', icon: 'rain-heavy' };
  if (code >= 95 && code <= 99) return { label: 'Thunderstorms & Rain', icon: 'lightning' };
  return { label: 'Scattered Clouds', icon: 'cloud-sun' };
}

export function RegionalWeatherWidget() {
  const { user } = useAuth();

  // Find matching key from user.district or user.region
  const getMatchedKey = () => {
    if (!user?.district) return 'dedza';
    const dLower = user.district.toLowerCase();
    const match = MALAWI_LOCATIONS.find(l => l.key.toLowerCase().includes(dLower) || dLower.includes(l.key.toLowerCase()));
    if (match) return match.key;
    if (user.region === 'Northern') return 'mzimba';
    if (user.region === 'Southern') return 'blantyre';
    return 'dedza';
  };

  const [selectedLocationKey, setSelectedLocationKey] = useState<string>(getMatchedKey);
  const [regionFilter, setRegionFilter] = useState<'all' | 'Northern' | 'Central' | 'Southern'>('all');
  const [weatherData, setWeatherData] = useState<MalawiLocationWeather | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Sync when user context changes
  useEffect(() => {
    const key = getMatchedKey();
    if (key !== selectedLocationKey) {
      setSelectedLocationKey(key);
    }
  }, [user?.district, user?.region]);

  const currentLocation = MALAWI_LOCATIONS.find(l => l.key === selectedLocationKey) || MALAWI_LOCATIONS[0];

  const fetchWeather = async (loc: LocationCoordinates, isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);
    setErrorMsg(null);

    try {
      // Call backend weather endpoint or directly fetch Open-Meteo
      const res = await fetch(`/api/weather?key=${loc.key}&lat=${loc.lat}&lng=${loc.lng}&name=${encodeURIComponent(loc.name)}&region=${loc.region}&altitude=${encodeURIComponent(loc.altitude)}`);
      
      if (!res.ok) {
        throw new Error('Weather endpoint error');
      }

      const data = await res.json();
      setWeatherData(data);
    } catch (err: any) {
      console.warn('Weather API failed, using fallback Open-Meteo direct fetch:', err);
      // Fallback: Direct fetch to Open-Meteo in browser
      try {
        const omRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,precipitation_probability_max,uv_index_max&timezone=Africa%2FBlantyre`
        );
        const omData = await omRes.json();

        const currentW = getWeatherDescription(omData.current.weather_code);
        const now = new Date();

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        const dailyFormatted = omData.daily.time.slice(0, 5).map((tStr: string, idx: number) => {
          const dDate = new Date(tStr);
          const dayName = idx === 0 ? 'Today' : days[dDate.getUTCDay()];
          const dDesc = getWeatherDescription(omData.daily.weather_code[idx]);
          return {
            date: tStr,
            dayOfWeek: dayName,
            weatherCode: omData.daily.weather_code[idx],
            weatherLabel: dDesc.label,
            weatherIcon: dDesc.icon,
            tempMaxC: Math.round(omData.daily.temperature_2m_max[idx]),
            tempMinC: Math.round(omData.daily.temperature_2m_min[idx]),
            precipSumMm: Math.round((omData.daily.precipitation_sum[idx] || 0) * 10) / 10,
            precipProbMax: omData.daily.precipitation_probability_max ? omData.daily.precipitation_probability_max[idx] : (omData.daily.precipitation_sum[idx] > 2 ? 80 : 20),
            uvIndexMax: omData.daily.uv_index_max ? Math.round(omData.daily.uv_index_max[idx]) : 8
          };
        });

        // Compute local advice
        let advice = "Optimal conditions for general farm operations. Ensure proper field mulching.";
        if (omData.current.precipitation > 1 || omData.daily.precipitation_sum[0] > 5) {
          advice = "Rainfall detected or expected. Inspect drainage ditches and delay heavy tillage to avoid soil compaction.";
        } else if (omData.current.temperature_2m > 30) {
          advice = "Hot and dry conditions. Priority on irrigation for young seedlings and shade nursery maintenance.";
        } else if (omData.current.relative_humidity_2m > 80) {
          advice = "High atmospheric moisture. Watch for fungal leaf spots (late blight) on potatoes and tomatoes.";
        }

        const formatted: MalawiLocationWeather = {
          districtKey: loc.key,
          districtName: loc.name,
          region: loc.region,
          lat: loc.lat,
          lng: loc.lng,
          altitude: loc.altitude,
          current: {
            tempC: Math.round(omData.current.temperature_2m),
            feelsLikeC: Math.round(omData.current.apparent_temperature),
            humidity: omData.current.relative_humidity_2m,
            windSpeedKmH: Math.round(omData.current.wind_speed_10m),
            windDirectionDeg: omData.current.wind_direction_10m,
            precipitationMm: omData.current.precipitation || 0,
            surfacePressureHpa: Math.round(omData.current.surface_pressure),
            weatherCode: omData.current.weather_code,
            weatherLabel: currentW.label,
            weatherIcon: currentW.icon,
            isDay: omData.current.is_day === 1
          },
          daily: dailyFormatted,
          agriculturalAdvice: advice,
          scoutingScore: omData.current.precipitation > 10 ? 4 : omData.current.temperature_2m > 34 ? 5 : 9,
          lastUpdated: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setWeatherData(formatted);
      } catch (fallbackErr) {
        setErrorMsg('Unable to retrieve weather forecast for this location. Please check internet connection.');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather(currentLocation);
  }, [selectedLocationKey]);

  const filteredLocations = MALAWI_LOCATIONS.filter(l => {
    if (regionFilter === 'all') return true;
    return l.region === regionFilter;
  });

  const renderWeatherIcon = (iconType: string, className = "w-6 h-6") => {
    switch (iconType) {
      case 'sun':
        return <Sun className={cn("text-amber-400", className)} />;
      case 'cloud-sun':
        return <CloudSun className={cn("text-amber-300", className)} />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className={cn("text-sky-300", className)} />;
      case 'rain-heavy':
        return <CloudRain className={cn("text-blue-400", className)} />;
      case 'lightning':
        return <CloudLightning className={cn("text-amber-400", className)} />;
      case 'fog':
        return <CloudFog className={cn("text-slate-300", className)} />;
      default:
        return <CloudSun className={cn("text-emerald-300", className)} />;
    }
  };

  return (
    <div className="bg-emerald-950 text-white rounded-[3rem] p-6 md:p-10 border border-emerald-800 shadow-2xl flex flex-col gap-8 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-emerald-800/80 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-amber-400/30">
              Real-Time Satellite & Agro-Met
            </span>
            <span className="text-xs text-emerald-300 font-semibold">Live Malawi Forecasts</span>
          </div>
          <h3 className="serif text-3xl font-bold text-white mt-1 flex items-center gap-2.5">
            <CloudSun className="text-amber-400" size={30} /> Regional Weather & Land Scouting Met
          </h3>
          <p className="text-xs text-emerald-200/80 font-medium mt-1 max-w-xl">
            Live atmospheric data, precipitation indices, and agricultural advisories for scouting outposts across Malawi's districts.
          </p>
        </div>

        {/* Region Filter Buttons & Manual Refresh */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-emerald-900/90 p-1.5 rounded-2xl border border-emerald-700 shadow-inner">
            {(['all', 'Northern', 'Central', 'Southern'] as const).map(reg => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all",
                  regionFilter === reg
                    ? "bg-amber-400 text-slate-950 font-extrabold shadow"
                    : "text-emerald-200 hover:text-white hover:bg-emerald-800/50"
                )}
              >
                {reg === 'all' ? 'All Regions' : `${reg}`}
              </button>
            ))}
          </div>

          <button
            onClick={() => fetchWeather(currentLocation, true)}
            disabled={isRefreshing || isLoading}
            className="p-3 rounded-2xl bg-emerald-900 hover:bg-emerald-800 border border-emerald-700 text-emerald-200 hover:text-white transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2 text-xs font-bold"
            title="Refresh weather data"
          >
            <RefreshCw size={15} className={cn(isRefreshing && "animate-spin text-amber-400")} />
            <span className="hidden sm:inline">Sync Live</span>
          </button>
        </div>
      </div>

      {/* District Selection Chips */}
      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80">
            Select Malawi Location Spot ({filteredLocations.length}):
          </span>
          {weatherData && (
            <span className="text-[10px] font-medium text-emerald-300/60">
              Updated: {weatherData.lastUpdated} CAT
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filteredLocations.map((loc) => {
            const isSelected = loc.key === selectedLocationKey;
            return (
              <button
                key={loc.key}
                onClick={() => setSelectedLocationKey(loc.key)}
                className={cn(
                  "px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border flex items-center gap-1.5 active:scale-95",
                  isSelected
                    ? "bg-amber-400 text-slate-950 border-amber-300 font-extrabold shadow-lg ring-2 ring-amber-300/40"
                    : "bg-emerald-900/60 text-emerald-100 border-emerald-800 hover:bg-emerald-800 hover:text-white"
                )}
              >
                <MapPin size={13} className={isSelected ? "text-slate-950" : "text-amber-400"} />
                <span>{loc.name}</span>
                <span className={cn("text-[9px] px-1.5 py-0.2 rounded font-black uppercase", isSelected ? "bg-slate-950/20 text-slate-900" : "bg-emerald-950 text-emerald-300")}>
                  {loc.altitude}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Weather Content View */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          {/* Main Weather Card Skeleton */}
          <div className="lg:col-span-5 bg-emerald-900/40 p-6 md:p-8 rounded-[2.5rem] border border-emerald-800/80 flex flex-col justify-between gap-6 min-h-[320px]">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2 w-2/3">
                <Skeleton variant="dark" className="h-4 w-32" />
                <Skeleton variant="dark" className="h-8 w-48" />
                <Skeleton variant="dark" className="h-3.5 w-24" />
              </div>
              <Skeleton variant="dark" className="h-12 w-12 rounded-2xl" />
            </div>

            <div className="flex items-baseline gap-4 my-2">
              <Skeleton variant="dark" className="h-16 w-36 rounded-2xl" />
              <Skeleton variant="dark" className="h-8 w-28 rounded-xl" />
            </div>

            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-emerald-800/80">
              <Skeleton variant="dark" className="h-14 rounded-2xl" />
              <Skeleton variant="dark" className="h-14 rounded-2xl" />
              <Skeleton variant="dark" className="h-14 rounded-2xl" />
              <Skeleton variant="dark" className="h-14 rounded-2xl" />
            </div>
          </div>

          {/* Forecast & Advisory Skeleton */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Skeleton variant="dark" className="h-4 w-40" />
                <Skeleton variant="dark" className="h-4 w-24" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} variant="dark" className="h-36 rounded-2xl" />
                ))}
              </div>
            </div>
            <Skeleton variant="dark" className="h-28 rounded-3xl" />
          </div>
        </div>
      ) : errorMsg ? (
        <div className="bg-rose-950/70 border border-rose-800 p-6 rounded-3xl text-rose-200 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-rose-400 shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold text-white">Weather Retrieval Error</span>
              <span className="text-xs text-rose-300">{errorMsg}</span>
            </div>
          </div>
          <button
            onClick={() => fetchWeather(currentLocation, true)}
            className="px-4 py-2 rounded-xl bg-rose-900 hover:bg-rose-800 text-rose-100 text-xs font-bold transition-all shrink-0 flex items-center gap-2 border border-rose-700"
          >
            <RefreshCw size={14} /> Retry Fetching
          </button>
        </div>
      ) : weatherData ? (

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          {/* Main Weather Card (Left Column) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900/90 to-emerald-950 p-6 md:p-8 rounded-[2.5rem] border border-emerald-700/80 shadow-xl flex flex-col justify-between gap-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase">
                  <MapPin size={14} /> {weatherData.region} Region • {weatherData.altitude}
                </div>
                <h4 className="serif text-3xl font-bold text-white mt-1">{weatherData.districtName}</h4>
                <p className="text-xs text-emerald-200 font-medium">{weatherData.current.weatherLabel}</p>
              </div>

              <div className="bg-emerald-800/80 p-3.5 rounded-2xl border border-emerald-600 shadow-inner">
                {renderWeatherIcon(weatherData.current.weatherIcon, "w-10 h-10")}
              </div>
            </div>

            {/* Main Temperature Display */}
            <div className="flex items-baseline gap-4 my-2">
              <span className="serif text-6xl md:text-7xl font-extrabold text-white tracking-tight">
                {weatherData.current.tempC}°<span className="text-4xl text-amber-300">C</span>
              </span>
              <div className="flex flex-col text-xs text-emerald-200">
                <span className="font-bold">Feels like {weatherData.current.feelsLikeC}°C</span>
                <span className="text-emerald-400/80 font-medium">
                  {weatherData.current.precipitationMm > 0 ? `${weatherData.current.precipitationMm}mm Current Rain` : 'No current rain'}
                </span>
              </div>
            </div>

            {/* Environmental Indicators Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-800/80">
              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800 flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase text-emerald-400 flex items-center gap-1">
                  <Droplets size={12} /> Humidity
                </span>
                <span className="font-extrabold text-white text-base">{weatherData.current.humidity}%</span>
              </div>

              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800 flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase text-emerald-400 flex items-center gap-1">
                  <Wind size={12} /> Wind
                </span>
                <span className="font-extrabold text-white text-base">{weatherData.current.windSpeedKmH} <span className="text-[10px] font-normal text-emerald-300">km/h</span></span>
              </div>

              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800 flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase text-emerald-400 flex items-center gap-1">
                  <Gauge size={12} /> Pressure
                </span>
                <span className="font-extrabold text-white text-base">{weatherData.current.surfacePressureHpa} <span className="text-[10px] font-normal text-emerald-300">hPa</span></span>
              </div>

              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800 flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase text-emerald-400 flex items-center gap-1">
                  <Umbrella size={12} /> Precip.
                </span>
                <span className="font-extrabold text-amber-300 text-base">{weatherData.current.precipitationMm} <span className="text-[10px] font-normal text-emerald-300">mm</span></span>
              </div>
            </div>

            {/* Scouting Suitability Badge */}
            <div className="bg-emerald-900/80 p-3.5 rounded-2xl border border-emerald-700/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-amber-400" />
                <span className="font-bold text-white">Outpost Field Work Rating</span>
              </div>
              <span className="font-black px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 text-xs">
                {weatherData.scoutingScore}/10 Suitable
              </span>
            </div>
          </div>

          {/* Right Column: 5-Day Forecast & Agro-Met Advisory */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* 5-Day Daily Forecast Cards */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-300 flex items-center gap-1.5">
                  <Calendar size={14} className="text-amber-400" /> 5-Day Regional Forecast
                </span>
                <span className="text-[10px] font-bold text-emerald-400/80">
                  {weatherData.districtName}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {weatherData.daily.map((day, idx) => (
                  <div
                    key={day.date || idx}
                    className={cn(
                      "p-3 rounded-2xl border flex flex-col justify-between items-center text-center gap-2 transition-all",
                      idx === 0
                        ? "bg-amber-400/15 border-amber-400/50 text-white shadow-md ring-1 ring-amber-400/30"
                        : "bg-emerald-900/60 border-emerald-800 text-emerald-100 hover:bg-emerald-800/80"
                    )}
                  >
                    <span className="text-xs font-extrabold text-amber-300 uppercase">{day.dayOfWeek}</span>
                    <div className="my-1">
                      {renderWeatherIcon(day.weatherIcon, "w-7 h-7")}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-200 line-clamp-1 leading-tight h-6">
                      {day.weatherLabel}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-extrabold pt-2 border-t border-emerald-800/80 w-full justify-center">
                      <span className="text-amber-300">{day.tempMaxC}°</span>
                      <span className="text-emerald-400/60 font-medium">{day.tempMinC}°</span>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] font-bold text-sky-300">
                      <Umbrella size={10} /> {day.precipSumMm}mm ({day.precipProbMax}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agricultural Weather Advisory Box */}
            <div className="bg-emerald-900/90 p-6 rounded-3xl border border-emerald-700 shadow-lg flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <h5 className="font-bold text-white text-sm">Agro-Meteorological Scouting Advisory</h5>
              </div>
              <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                {weatherData.agriculturalAdvice}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-800/80 text-[10px] font-bold text-emerald-300">
                <span>Recommended Crop Focus: Highland Vegetables, Maize, Legumes, Fruit Orchards</span>
                <span className="text-amber-300 flex items-center gap-1">
                  Solar Pump Capacity: High Efficiency
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-900/40 border border-emerald-800 p-8 rounded-3xl text-center flex flex-col items-center justify-center gap-3">
          <CloudSun size={32} className="text-amber-400/80" />
          <h4 className="font-bold text-white text-base">No Regional Weather Selected</h4>
          <p className="text-xs text-emerald-200/80 max-w-sm">
            Select an operational zone above to load real-time agro-meteorological telemetry and 5-day forecasts.
          </p>
        </div>
      )}

    </div>
  );
}
