import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FeedbackInput } from './components/FeedbackInput';
import { Dashboard } from './components/Dashboard';
import { HistoryModal } from './components/HistoryModal';
import { AnalysisResponse } from './types';
import { submitAnalysis, listAnalyses, deleteAnalysis, checkHealth } from './api';

export function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResponse | null>(null);
  const [history, setHistory] = useState<AnalysisResponse[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendHealth, setBackendHealth] = useState<{ status: string; llm_configured: boolean }>({
    status: 'checking',
    llm_configured: false,
  });

  // Load past analyses and health status on mount
  useEffect(() => {
    refreshHistory();
    checkHealth().then(setBackendHealth);
  }, []);

  const refreshHistory = async () => {
    try {
      const data = await listAnalyses();
      setHistory(data);
    } catch {
      // Backend may be booting up
    }
  };

  const handleAnalyze = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await submitAnalysis(formData);
      setCurrentAnalysis(result);
      await refreshHistory();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this analysis report?')) {
      return;
    }
    try {
      await deleteAnalysis(id);
      if (currentAnalysis?.id === id) {
        setCurrentAnalysis(null);
      }
      await refreshHistory();
    } catch (err: any) {
      alert(err.message || 'Failed to delete record.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        onNewAnalysis={() => setCurrentAnalysis(null)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        hasActiveResult={currentAnalysis !== null}
        isSimulated={!backendHealth.llm_configured}
      />

      <main className="flex-1 pb-16">
        {currentAnalysis ? (
          <Dashboard
            analysis={currentAnalysis}
            onNewAnalysis={() => setCurrentAnalysis(null)}
          />
        ) : (
          <FeedbackInput
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            error={error}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>FeedbackAI — Turn unstructured Voice-of-Customer noise into high-impact action.</span>
          <span className="text-slate-400">FastAPI • React • TypeScript • Tailwind CSS</span>
        </div>
      </footer>

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        analyses={history}
        onSelectAnalysis={(item) => setCurrentAnalysis(item)}
        onDeleteAnalysis={handleDelete}
      />
    </div>
  );
}

export default App;
