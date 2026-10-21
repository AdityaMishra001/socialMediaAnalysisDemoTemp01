import React, { useState } from 'react';
import { ThemeItem } from '../types';
import { ChevronDown, ChevronUp, Quote, AlertTriangle, Flame } from 'lucide-react';

interface ThemeCardProps {
  theme: ThemeItem;
}

const getUrgencyBadge = (urgency: string) => {
  switch (urgency) {
    case 'critical':
      return {
        bg: 'bg-rose-100 text-rose-800 border-rose-300',
        icon: <Flame className="w-3 h-3 text-rose-600 inline mr-1" />,
      };
    case 'high':
      return {
        bg: 'bg-amber-100 text-amber-800 border-amber-300',
        icon: <AlertTriangle className="w-3 h-3 text-amber-600 inline mr-1" />,
      };
    case 'medium':
      return {
        bg: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: null,
      };
    default:
      return {
        bg: 'bg-slate-100 text-slate-700 border-slate-200',
        icon: null,
      };
  }
};

const getSentimentBadge = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'negative':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'mixed':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  const [expanded, setExpanded] = useState(false);
  const urgencyInfo = getUrgencyBadge(theme.urgency);
  const sentimentClass = getSentimentBadge(theme.sentiment);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-bold text-slate-900 text-base leading-snug">
          {theme.theme}
        </h4>
        <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 whitespace-nowrap">
          {theme.count} {theme.count === 1 ? 'mention' : 'mentions'}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${sentimentClass}`}>
          {theme.sentiment}
        </span>

        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize flex items-center ${urgencyInfo.bg}`}>
          {urgencyInfo.icon}
          {theme.urgency} urgency
        </span>
      </div>

      {theme.representative_quotes && theme.representative_quotes.length > 0 && (
        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 italic">
            <Quote className="w-3.5 h-3.5 text-brand-500 mb-1" />
            <p className="line-clamp-2">
              "{theme.representative_quotes[0]}"
            </p>
          </div>

          {theme.representative_quotes.length > 1 && (
            <div>
              {expanded && (
                <div className="space-y-2 mt-2 pt-2 border-t border-slate-100">
                  {theme.representative_quotes.slice(1).map((quote, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs text-slate-700 italic"
                    >
                      <Quote className="w-3 h-3 text-brand-400 mb-1" />
                      <p>"{quote}"</p>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 mt-1 transition-colors"
              >
                {expanded ? (
                  <>
                    <span>Show less</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>+{theme.representative_quotes.length - 1} more quotes</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
