import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Compass, ShieldAlert, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
      </div>

      <Navbar />

      <main className="container mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
        
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-emerald-300 text-sm font-medium tracking-wide animate-pulse">
          ✨ Introducing Version 3.0 with Live Exam Panel & Assessment
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 text-transparent bg-clip-text">
          Smart AI Resume Analyzer
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl leading-relaxed">
          Your intelligent career partner. Automatically analyze resumes, test technical skills in live exam panels, follow AI learning paths, and bypass ATS filters to land more interviews.
        </p>

        {/* Action button cards grid */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl mx-auto justify-center flex-wrap mb-16">
          <Link href="/analyzer" className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1">
            Analyze Resume
          </Link>
          <Link href="/builder" className="px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-750 backdrop-blur-md text-white font-bold text-base transition-all duration-300 hover:-translate-y-1">
            Resume Builder
          </Link>
          <Link href="/exam" className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-base transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-1">
            Live Skills Exam
          </Link>
          <Link href="/recommendations" className="px-6 py-3.5 rounded-xl border border-slate-750 bg-slate-900/50 hover:bg-slate-800/60 backdrop-blur-md text-emerald-400 font-bold text-base transition-all duration-300 hover:-translate-y-1">
            AI learning Hub
          </Link>
          <Link href="/jobs" className="px-6 py-3.5 rounded-xl border border-slate-750 bg-slate-900/50 hover:bg-slate-800/60 backdrop-blur-md text-white font-bold text-base transition-all duration-300 hover:-translate-y-1">
            Job Search
          </Link>
          <Link href="/dashboard" className="px-6 py-3.5 rounded-xl border border-slate-750 bg-slate-900/50 hover:bg-slate-800/60 backdrop-blur-md text-white font-bold text-base transition-all duration-300 hover:-translate-y-1">
            Dashboard
          </Link>
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-lg hover:bg-white/[0.04] transition-colors text-left">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 text-2xl">
              🎯
            </div>
            <h3 className="text-xl font-bold mb-2">Semantic Matching</h3>
            <p className="text-slate-400 text-sm">Advanced Vector AI matches your experience contextually to the Job Description.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-lg hover:bg-white/[0.04] transition-colors text-left">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 text-2xl">
              📝
            </div>
            <h3 className="text-xl font-bold mb-2">Skill Exam Panel</h3>
            <p className="text-slate-400 text-sm">Assess your logic with MCQs, code editors, and target job aptitude tests.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-lg hover:bg-white/[0.04] transition-colors text-left">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400 text-2xl">
              📊
            </div>
            <h3 className="text-xl font-bold mb-2">AI learning Paths</h3>
            <p className="text-slate-400 text-sm">Follow step-by-step career roadmaps, watch video lectures, and bridge gaps.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

