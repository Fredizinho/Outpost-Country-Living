import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught component error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center text-slate-100">
          <div className="bg-slate-900/90 border border-emerald-900/60 p-8 rounded-3xl max-w-md w-full shadow-2xl backdrop-blur flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
              <AlertTriangle size={28} />
            </div>
            
            <h2 className="font-serif text-2xl font-bold text-white">Temporary Loading Issue</h2>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              We encountered a network glitch while loading this section. Please reload the page or return to the main dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
              >
                <RefreshCw size={16} />
                Reload Page
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
              >
                <Home size={16} />
                Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
