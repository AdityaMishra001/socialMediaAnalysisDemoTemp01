import { AnalysisResponse } from './types';

const API_BASE = '/api';

export async function submitAnalysis(formData: FormData): Promise<AnalysisResponse> {
  const response = await fetch(`${API_BASE}/analysis`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMsg = 'Failed to analyze feedback.';
    try {
      const errData = await response.json();
      if (errData.detail) {
        errorMsg = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
      }
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

export async function getAnalysis(id: string): Promise<AnalysisResponse> {
  const response = await fetch(`${API_BASE}/analysis/${id}`);
  if (!response.ok) {
    throw new Error('Analysis record not found.');
  }
  return response.json();
}

export async function listAnalyses(): Promise<AnalysisResponse[]> {
  const response = await fetch(`${API_BASE}/analysis`);
  if (!response.ok) {
    throw new Error('Failed to load past analyses.');
  }
  return response.json();
}

export async function deleteAnalysis(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/analysis/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete analysis.');
  }
}

export function getExportJsonUrl(id: string): string {
  return `${API_BASE}/export/${id}/json`;
}

export function getExportCsvUrl(id: string): string {
  return `${API_BASE}/export/${id}/csv`;
}

export async function checkHealth(): Promise<{ status: string; llm_configured: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch {
    return { status: 'offline', llm_configured: false };
  }
}
