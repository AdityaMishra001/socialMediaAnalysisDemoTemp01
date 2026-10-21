import React from 'react';
import { AnalysisResponse, FEEDBACK_SOURCES } from '../types';
import { X, Trash2, Calendar, Layers, ArrowRight, Clock } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyses: AnalysisResponse[];
  onSelectAnalysis: (analysis: AnalysisResponse) => void;
  onDeleteAnalysis: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  analyses,
  onSelectAnalysis,
  onDeleteAnalysis,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Analysis History</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Access your previous reports and insights
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {analyses.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Clock className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold">No past analyses recorded yet.</p>
              <p className="text-xs text-slate-400 mt-1">Submit your first batch of feedback to see it here.</p>
            </div>
          ) : (
            analyses.map((item) => {
              const sourceObj = FEEDBACK_SOURCES.find(s => s.value === item.feedback_source);
              const dateStr = item.created_at
                ? new Date(item.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Recent';

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200/90 hover:border-brand-300 hover:bg-brand-50/20 transition-all flex items-center justify-between gap-4 group"
                >
                  <div 
                    onClick={() => {
                      onSelectAnalysis(item);
                      onClose();
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                        {sourceObj?.label || item.feedback_source}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 capitalize px-2 py-0.5 bg-slate-100 rounded-md">
                        {item.result.overall_sentiment}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 line-clamp-1 font-medium mb-1">
                      {item.result.executive_summary}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>{item.item_count} items</span>
                      <span>•</span>
                      <span>{dateStr}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectAnalysis(item);
                        onClose();
                      }}
                      className="p-2 rounded-xl text-brand-600 hover:bg-brand-50 transition-colors"
                      title="View Report"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteAnalysis(item.id);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
