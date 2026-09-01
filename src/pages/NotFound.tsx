import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="px-6 py-20 text-center flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="w-20 h-20 bg-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-800 shadow-inner">
        <Compass size={40} />
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h2 className="serif text-4xl font-bold text-emerald-950">Page Not Found</h2>
        <p className="text-slate-600 text-sm font-medium">
          The requested path could not be located in the sanctuary directory.
        </p>
      </div>

      <Link
        to="/"
        className="bg-emerald-800 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg transition-all flex items-center gap-2"
      >
        <Home size={16} /> Return to Sanctuary Home
      </Link>
    </div>
  );
}

export default NotFound;
