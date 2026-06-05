"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Analyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('General Software Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);

    try {
      // Calling the actual FastAPI endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/ai/upload-and-score`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        let errorMsg = 'Failed to analyze resume.';
        try {
          const errData = await response.json();
          errorMsg = errData.detail || errorMsg;
        } catch(e) {}
        throw new Error(errorMsg);
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative flex flex-col">
      <Navbar />

      <main className="container mx-auto px-6 py-12 max-w-5xl flex-1">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          ATS Resume Analyzer
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4">1. Upload Resume</h2>
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors bg-slate-800/50">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange}
                  className="hidden" 
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
                    📄
                  </div>
                  <span className="text-slate-300 text-sm">
                    {file ? file.name : "Click to upload PDF"}
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4">2. Target Role</h2>
              <textarea 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none"
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
              />
              
              <button 
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className="w-full mt-4 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-colors flex items-center justify-center shadow-lg"
              >
                {isAnalyzing ? "Scanning with ATS..." : "Analyze Now"}
              </button>
              
              {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* Score Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
                    <span className="text-slate-400 text-sm mb-2">Overall ATS</span>
                    <span className={`text-4xl font-bold ${results.overall_ats_score > 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {results.overall_ats_score}
                    </span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
                    <span className="text-slate-400 text-sm mb-2">Keywords</span>
                    <span className="text-3xl font-bold text-blue-400">{results.breakdown.keyword_match_score}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
                    <span className="text-slate-400 text-sm mb-2">Impact</span>
                    <span className="text-3xl font-bold text-purple-400">{results.breakdown.impact_quantifiability_score}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center">
                    <span className="text-slate-400 text-sm mb-2">Structure</span>
                    <span className="text-3xl font-bold text-teal-400">{results.breakdown.structure_formatting_score}</span>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    💡 Actionable Insights
                  </h3>
                  <ul className="space-y-4">
                    {results.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-slate-300">
                        <span className="text-emerald-400 mt-1">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-slate-800">
                    <p className="text-sm text-slate-400 mb-2">Missing Critical Keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {results.insights.missing_critical_keywords.map((kw: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full text-xs">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full bg-slate-900/50 border border-slate-800/50 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center opacity-50">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-slate-300 mb-2">Awaiting Resume</h3>
                <p className="text-slate-500 max-w-sm">
                  Upload your PDF and paste a job description on the left to see your real-time ATS scorecard and actionable insights.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
