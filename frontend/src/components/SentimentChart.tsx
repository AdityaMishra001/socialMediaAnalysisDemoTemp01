import React from 'react';
import { SentimentDistribution, EmotionBreakdown, AspectSentiment, SentimentType } from '../types';
import { Smile, Frown, Meh, AlertCircle, Quote } from 'lucide-react';

interface SentimentChartProps {
  distribution: SentimentDistribution;
  emotions: EmotionBreakdown;
  aspects: AspectSentiment[];
  overall: SentimentType;
}

const getSentimentColor = (sentiment: SentimentType) => {
  switch (sentiment) {
    case 'positive':
      return { bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200', lightBg: 'bg-emerald-50' };
    case 'negative':
      return { bg: 'bg-rose-500', text: 'text-rose-700', border: 'border-rose-200', lightBg: 'bg-rose-50' };
    case 'mixed':
      return { bg: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-200', lightBg: 'bg-amber-50' };
    default:
      return { bg: 'bg-slate-400', text: 'text-slate-700', border: 'border-slate-200', lightBg: 'bg-slate-100' };
  }
};

export const SentimentChart: React.FC<SentimentChartProps> = ({
  distribution,
  emotions,
  aspects,
  overall,
}) => {
  const overallColors = getSentimentColor(overall);

  const emotionList = [
    { label: 'Delight', value: emotions.delight, color: 'bg-emerald-500' },
    { label: 'Satisfaction', value: emotions.satisfaction, color: 'bg-teal-500' },
    { label: 'Excitement', value: emotions.excitement, color: 'bg-indigo-500' },
    { label: 'Confusion', value: emotions.confusion, color: 'bg-amber-500' },
    { label: 'Frustration', value: emotions.frustration, color: 'bg-rose-500' },
    { label: 'Disappointment', value: emotions.disappointment, color: 'bg-red-400' },
  ].sort((a, b) => b.value - a.value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Overall & Distribution Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Overall Sentiment
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${overallColors.lightBg} ${overallColors.text} ${overallColors.border}`}>
              {overall}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${overallColors.bg} shadow-md`}>
              {overall === 'positive' && <Smile className="w-8 h-8" />}
              {overall === 'negative' && <Frown className="w-8 h-8" />}
              {overall === 'mixed' && <AlertCircle className="w-8 h-8" />}
              {overall === 'neutral' && <Meh className="w-8 h-8" />}
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 capitalize">
                {overall}
              </div>
              <p className="text-xs text-slate-500">
                Calculated across all analyzed feedback items
              </p>
            </div>
          </div>

          {/* Segmented Distribution Bar */}
          <div className="space-y-2 mb-6">
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div 
                style={{ width: `${distribution.positive}%` }} 
                className="bg-emerald-500 transition-all duration-700"
                title={`Positive: ${distribution.positive}%`}
              />
              <div 
                style={{ width: `${distribution.mixed}%` }} 
                className="bg-amber-500 transition-all duration-700"
                title={`Mixed: ${distribution.mixed}%`}
              />
              <div 
                style={{ width: `${distribution.neutral}%` }} 
                className="bg-slate-300 transition-all duration-700"
                title={`Neutral: ${distribution.neutral}%`}
              />
              <div 
                style={{ width: `${distribution.negative}%` }} 
                className="bg-rose-500 transition-all duration-700"
                title={`Negative: ${distribution.negative}%`}
              />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  Positive
                </span>
                <span className="font-bold text-emerald-900">{distribution.positive}%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-rose-50/60 border border-rose-100">
                <span className="flex items-center gap-1.5 font-medium text-rose-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  Negative
                </span>
                <span className="font-bold text-rose-900">{distribution.negative}%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                  Neutral
                </span>
                <span className="font-bold text-slate-800">{distribution.neutral}%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                <span className="flex items-center gap-1.5 font-medium text-amber-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  Mixed
                </span>
                <span className="font-bold text-amber-900">{distribution.mixed}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Emotional Intensity Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
          Emotional Spectrum
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Relative intensity of emotional signals identified in audience responses.
        </p>

        <div className="space-y-3.5">
          {emotionList.map((em) => (
            <div key={em.label} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">{em.label}</span>
                <span className="font-bold text-slate-900">{em.value}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${em.color} rounded-full transition-all duration-700`}
                  style={{ width: `${Math.min(100, Math.max(4, em.value))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Aspect-Based Sentiments */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
          Aspect-Based Sentiment
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Drill-down into specific dimensions of the experience.
        </p>

        <div className="space-y-3 flex-1 overflow-y-auto max-h-[290px] pr-1">
          {aspects.map((asp, idx) => {
            const aspectColors = getSentimentColor(asp.sentiment);
            const scorePercent = Math.round(asp.score * 100);

            return (
              <div 
                key={idx}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-xs text-slate-800">
                    {asp.aspect}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${aspectColors.lightBg} ${aspectColors.text} ${aspectColors.border}`}>
                    {scorePercent}%
                  </span>
                </div>

                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full ${aspectColors.bg} rounded-full`}
                    style={{ width: `${scorePercent}%` }}
                  />
                </div>

                {asp.supporting_examples && asp.supporting_examples.length > 0 && (
                  <p className="text-[11px] text-slate-500 italic line-clamp-1 flex items-center gap-1">
                    <Quote className="w-2.5 h-2.5 inline text-slate-400 flex-shrink-0" />
                    "{asp.supporting_examples[0]}"
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
