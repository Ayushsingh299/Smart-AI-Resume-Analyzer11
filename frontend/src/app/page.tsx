import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
      </div>

      <main className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-emerald-300 text-sm font-medium tracking-wide">
          ✨ Introducing Version 2.0 with Advanced AI
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 text-transparent bg-clip-text">
          Smart AI Resume Analyzer
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl leading-relaxed">
          Your intelligent career partner. Automatically analyze, optimize, and craft resumes that bypass ATS filters and land you more interviews.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto justify-center">
          <Link href="/analyzer" className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1">
            Analyze Resume
          </Link>
          <Link href="/builder" className="px-8 py-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-md text-white font-semibold text-lg transition-all duration-300 hover:-translate-y-1">
            Resume Builder
          </Link>
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-lg hover:bg-white/[0.04] transition-colors text-left">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 text-2xl">
              🎯
            </div>
            <h3 className="text-xl font-bold mb-2">Semantic Matching</h3>
            <p className="text-slate-400 text-sm">Advanced Vector AI matches your experience contextually to the Job Description.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-lg hover:bg-white/[0.04] transition-colors text-left">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400 text-2xl">
              ✍️
            </div>
            <h3 className="text-xl font-bold mb-2">AI Resume Rewrite</h3>
            <p className="text-slate-400 text-sm">Automatically rephrases your bullet points using the XYZ formula via Gemini Pro.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-lg hover:bg-white/[0.04] transition-colors text-left">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400 text-2xl">
              📊
            </div>
            <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
            <p className="text-slate-400 text-sm">Get real-time insights into your skill gaps and ATS compatibility scores.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
