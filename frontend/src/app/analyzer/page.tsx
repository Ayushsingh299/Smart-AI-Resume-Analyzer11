"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Sparkles, AlertCircle, FileText, CheckCircle } from 'lucide-react';

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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000');
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

  const radarData = results ? [
    { subject: 'Keywords', A: results.breakdown.keyword_match_score, fullMark: 100 },
    { subject: 'Impact', A: results.breakdown.impact_quantifiability_score, fullMark: 100 },
    { subject: 'Structure', A: results.breakdown.structure_formatting_score, fullMark: 100 },
    { subject: 'Overall ATS', A: results.overall_ats_score, fullMark: 100 },
  ] : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="container mx-auto px-6 py-12 max-w-7xl flex-1">
        <div className="flex flex-col mb-10 text-center items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Advanced AI Assessment
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            ATS Resume <span className="text-emerald-600 dark:text-emerald-400">Scanner</span>
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            Upload your resume and get an instant, highly detailed breakdown of your compatibility with the target role.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Upload Section - 4 Columns */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl dark:shadow-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                1. Upload PDF
              </h2>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors bg-slate-50 dark:bg-slate-800/50">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange}
                  className="hidden" 
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${file ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                    {file ? <CheckCircle className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
                  </div>
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-300">
                    {file ? file.name : "Click to browse PDF"}
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl dark:shadow-2xl">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                2. Target Role
              </h2>
              <textarea 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all outline-none"
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here..."
              />
              
              <button 
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className="w-full mt-6 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all flex items-center justify-center shadow-lg hover:shadow-emerald-500/25"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-slate-900/30 dark:border-t-slate-900 rounded-full animate-spin" />
                    Scanning ATS...
                  </span>
                ) : (
                  "Run Advanced Scan"
                )}
              </button>
              
              {error && (
                <div className="mt-4 p-3 rounded-lg bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium">
                  {error}
                </div>
              )}
            </div>
          </motion.div>

          {/* Results Dashboard - 8 Columns */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  
                  {/* Top Score Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Overall Score Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex items-center gap-8 shadow-xl">
                      <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle cx="64" cy="64" r="56" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="12" fill="none" />
                          <circle cx="64" cy="64" r="56" className={`${results.overall_ats_score > 75 ? 'stroke-emerald-500' : 'stroke-amber-500'} transition-all duration-1000`} strokeWidth="12" fill="none" strokeDasharray="351.86" strokeDashoffset={351.86 - (351.86 * results.overall_ats_score) / 100} strokeLinecap="round" />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                          <span className="text-4xl font-extrabold">{results.overall_ats_score}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">Overall Match</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">
                          {results.overall_ats_score >= 80 ? 'Excellent! Highly likely to pass ATS.' : results.overall_ats_score >= 60 ? 'Good, but needs keyword optimization.' : 'Needs significant improvement.'}
                        </p>
                      </div>
                    </div>

                    {/* Radar Chart */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl flex items-center justify-center h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                          <PolarGrid stroke="#cbd5e1" className="dark:stroke-slate-700" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar name="Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recommendations */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        Actionable Insights
                      </h3>
                      <ul className="space-y-4">
                        {results.recommendations.slice(0, 5).map((rec: string, idx: number) => (
                          <motion.li 
                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                            key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg"
                          >
                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-sm">{rec}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Missing Keywords */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        Missing Critical Keywords
                      </h3>
                      {results.insights.missing_critical_keywords.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {results.insights.missing_critical_keywords.map((kw: string, idx: number) => (
                            <motion.span 
                              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.05 }}
                              key={idx} className="px-4 py-2 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 rounded-xl font-medium text-sm shadow-sm"
                            >
                              {kw}
                            </motion.span>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-xl flex items-center gap-2 font-medium">
                          <CheckCircle className="w-5 h-5" />
                          No critical keywords missing! Great job!
                        </div>
                      )}
                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[400px] bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-800/50 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 mb-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg dark:shadow-none">
                    <FileText className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">Awaiting Resume</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg">
                    Upload your PDF and paste a job description to generate a highly detailed, visually mapped ATS scorecard.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  );
}
