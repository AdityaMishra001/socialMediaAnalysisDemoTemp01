import React from 'react';
import { Recommendation, PriorityType, EffortType } from '../types';
import { Target, TrendingUp, Zap, CheckCircle } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
  rank: number;
}

const getPriorityStyle = (priority: PriorityType) => {
  switch (priority) {
    case 'high':
      return {
        badge: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
        dot: 'bg-rose-500',
      };
    case 'medium':
      return {
        badge: 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
        dot: 'bg-amber-500',
      };
    default:
      return {
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-medium',
        dot: 'bg-emerald-500',
      };
  }
};

const getEffortLabel = (effort: EffortType) => {
  switch (effort) {
    case 'low':
      return { text: 'Quick Win (Low Effort)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    case 'high':
      return { text: 'Strategic Project (High Effort)', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    default:
      return { text: 'Medium Effort', color: 'text-slate-700 bg-slate-100 border-slate-200' };
  }
};

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  rank,
}) => {
  const priorityStyle = getPriorityStyle(recommendation.priority);
  const effortInfo = getEffortLabel(recommendation.effort);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
              {rank}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs border uppercase tracking-wider flex items-center gap-1.5 ${priorityStyle.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dot}`} />
              {recommendation.priority} priority
            </span>
          </div>

          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
            {recommendation.category}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
          {recommendation.title}
        </h4>

        {/* Rationale Grounded in Feedback */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            <Target className="w-3.5 h-3.5 text-brand-600" />
            <span>Why this matters (Grounding)</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            {recommendation.rationale}
          </p>
        </div>
      </div>

      <div>
        {/* Expected Impact Box */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-brand-50 to-indigo-50/60 border border-brand-100 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-900 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-brand-600" />
            <span>Expected Business / Content Impact</span>
          </div>
          <p className="text-xs text-brand-950 font-medium leading-relaxed">
            {recommendation.expected_impact}
          </p>
        </div>

        {/* Effort tag footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${effortInfo.color}`}>
            <Zap className="w-3 h-3 inline mr-1" />
            {effortInfo.text}
          </span>
        </div>
      </div>
    </div>
  );
};
