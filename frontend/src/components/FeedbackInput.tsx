import React, { useState, useRef } from 'react';
import { 
  FEEDBACK_SOURCES, 
  ANALYSIS_GOALS 
} from '../types';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  FileSpreadsheet,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface FeedbackInputProps {
  onAnalyze: (formData: FormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const SAMPLE_DATASETS = [
  {
    name: 'Instagram Comments',
    source: 'instagram',
    goal: 'improve_content',
    text: `Loved this tutorial! Can you please make a follow-up on state management?
Audio was a bit low in the second half, hard to hear over the background music.
This is the best explanation of async await I have ever seen, thank you so much!
How do we deploy this to AWS? Would love a video on that next.
Great video as always! Keep up the amazing work!
The pacing was a bit too fast in the middle section, had to pause several times.
Can you please share the github repo link?
Loved the visuals and animations, very helpful.
Why didn't you use TypeScript for this? Would be much better.
Subscribed! Please do more videos like this every week!`
  },
  {
    name: 'Product Reviews (Headphones)',
    source: 'product_reviews',
    goal: 'improve_product',
    text: `Sound quality is phenomenal, deep bass and crystal clear mids. Worth every penny!
Battery life is decent, lasts about 18 hours instead of the advertised 24 hours.
The Bluetooth pairing keeps disconnecting whenever I walk into the next room. Very annoying.
Extremely comfortable for long flights. Noise cancellation blocked out the entire engine roar.
The accompanying mobile app crashes frequently on iOS 17. Please fix this bug!
Earpads started peeling slightly after 3 months of daily use. Build quality could be improved.
Customer service was quick to replace my faulty charging cable within 2 days. Impressed!
A bit on the heavy side compared to competitors, gives me a headache after 3 hours.
Great sound, but why is there no multipoint Bluetooth connection?
Overall 4/5 stars. Sound is top notch, app needs work.`
  },
  {
    name: 'Student Course Feedback',
    source: 'student_feedback',
    goal: 'improve_teaching',
    text: `Professor was very engaging and explained difficult calculus concepts clearly.
Homework assignments were way too long and took over 15 hours each week.
Loved the real-world engineering examples used in class, made the theory come alive.
The midterm exam had questions that were never covered in lectures or readings.
Office hours were extremely helpful, the teaching assistant was patient and thorough.
Slide decks are not uploaded in advance, making it hard to take structured notes.
Group projects felt unfair because some teammates did zero work. Need individual grading criteria.
Very inspiring instructor! One of the best classes I have taken this semester.
Would appreciate more practice problems before exams with step-by-step solutions.`
  }
];

export const FeedbackInput: React.FC<FeedbackInputProps> = ({
  onAnalyze,
  isLoading,
  error,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [source, setSource] = useState('instagram');
  const [goal, setGoal] = useState('improve_content');
  const [language, setLanguage] = useState('auto');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'csv' || ext === 'txt') {
      setSelectedFile(file);
    } else {
      alert('Please upload a valid .csv or .txt file.');
    }
  };

  const loadSample = (sample: typeof SAMPLE_DATASETS[0]) => {
    setActiveTab('text');
    setTextInput(sample.text);
    setSource(sample.source);
    setGoal(sample.goal);
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('feedback_source', source);
    formData.append('analysis_goal', goal);
    formData.append('language', language);

    if (activeTab === 'file' && selectedFile) {
      formData.append('file', selectedFile);
    } else if (textInput.trim()) {
      formData.append('feedback_text', textInput.trim());
    } else {
      alert('Please enter feedback text or upload a CSV/TXT file.');
      return;
    }

    await onAnalyze(formData);
  };

  const estimatedItems = textInput.trim() 
    ? textInput.split(/\n+/).filter(line => line.trim().length > 0).length 
    : 0;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Feedback Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Transform Raw Feedback Into Prioritized Action
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Upload reviews, comments, or survey exports. Our AI automatically extracts overall sentiment, 
          aspect breakdowns, recurring complaints, and actionable recommendations.
        </p>

        {/* Quick Sample Loaders */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Try instant sample:
          </span>
          {SAMPLE_DATASETS.map((sample) => (
            <button
              key={sample.name}
              type="button"
              onClick={() => loadSample(sample)}
              className="text-xs font-medium px-3 py-1 rounded-lg bg-white border border-slate-200 hover:border-brand-500 hover:text-brand-600 transition-all shadow-sm"
            >
              {sample.name}
            </button>
          ))}
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Error: </span>
            {error}
          </div>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {/* Step 1: Context & Goal Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Feedback Source
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            >
              {FEEDBACK_SOURCES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Adapts tone, terminology, and recommendation heuristics to this domain.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Primary Analysis Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            >
              {ANALYSIS_GOALS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Prioritizes action items specifically designed to achieve this objective.
            </p>
          </div>
        </div>

        {/* Step 2: Input Method Switcher */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              3. Provide Feedback Data
            </label>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'text'
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Paste Text</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('file')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'file'
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Upload CSV / TXT</span>
              </button>
            </div>
          </div>

          {activeTab === 'text' ? (
            <div>
              <textarea
                rows={9}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste your feedback comments, reviews, or survey responses here (one item per line or paragraph)..."
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-mono placeholder:font-sans"
              />
              <div className="flex items-center justify-between text-xs text-slate-500 mt-2 px-1">
                <span>
                  Estimated feedback items: <strong className="text-slate-800">{estimatedItems}</strong>
                </span>
                <span>{textInput.length.toLocaleString()} characters</span>
              </div>
            </div>
          ) : (
            <div>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  dragActive 
                    ? 'border-brand-500 bg-brand-50/50' 
                    : selectedFile 
                      ? 'border-emerald-300 bg-emerald-50/30' 
                      : 'border-slate-200 hover:border-brand-300 bg-slate-50/40'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
                  accept=".csv,.txt"
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm mb-1">{selectedFile.name}</span>
                    <span className="text-xs text-slate-500 mb-3">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Click to choose a different file
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Remove file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm mb-1">
                      Click to upload or drag & drop file
                    </span>
                    <p className="text-xs text-slate-500 max-w-xs mb-2">
                      Supports CSV files (auto-detects 'feedback', 'comment', or 'review' column) and TXT files.
                    </p>
                    <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                      Up to 20MB
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Strict structured schema • Grounded quotes • PII-safe</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || (activeTab === 'text' && !textInput.trim()) || (activeTab === 'file' && !selectedFile)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Analyzing Feedback...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Feedback</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
