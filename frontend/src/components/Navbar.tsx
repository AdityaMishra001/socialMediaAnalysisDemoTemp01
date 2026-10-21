import React from 'react';
import { Sparkles, History, PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface NavbarProps {
  onNewAnalysis: () => void;
  onOpenHistory: () => void;
  historyCount: number;
  hasActiveResult: boolean;
  isSimulated?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewAnalysis,
  onOpenHistory,
  historyCount,
  hasActiveResult,
  isSimulated,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          onClick={onNewAnalysis}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                FeedbackAI
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-200">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Voice-of-Customer Intelligence & Recommendation Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-slate-50 text-slate-600 border-slate-200">
            {isSimulated ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Smart Simulation Mode</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Connected</span>
              </>
            )}
          </div>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <History className="w-4 h-4 text-slate-500" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="bg-brand-100 text-brand-700 text-xs px-1.5 py-0.2 font-semibold rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {/* New Analysis Button */}
          {hasActiveResult && (
            <button
              onClick={onNewAnalysis}
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Analysis</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
