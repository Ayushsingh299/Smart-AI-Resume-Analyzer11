"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useEffect, useState, useRef } from 'react';
import {
  FileSearch, BrainCircuit, Code2, Lightbulb, Rocket,
  MessageSquarePlus, BarChart3, Users, Award, ArrowRight,
  CheckCircle2, Zap, BookOpen, Target
} from 'lucide-react';

// ─── Animated Counter Hook ───────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Individual Stat Card ─────────────────────────────────────────────────────
function StatCard({ value, suffix, label, icon: Icon, color, started }: {
  value: number; suffix: string; label: string;
  icon: React.ElementType; color: string; started: boolean;
}) {
  const count = useCountUp(value, 1600, started);
  return (
    <div className="glass rounded-2xl p-6 text-center group hover:border-emerald-500/30 transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl font-extrabold text-slate-100 tabular-nums">
        {started ? count.toLocaleString() : '0'}{suffix}
      </div>
      <div className="text-sm text-slate-400 mt-1 font-medium">{label}</div>
    </div>
  );
}

const STATS = [
  { value: 12500, suffix: '+', label: 'Resumes Analyzed', icon: FileSearch, color: 'bg-emerald-500/15 text-emerald-400' },
  { value: 850,   suffix: '+', label: 'Exam Sessions Taken', icon: BrainCircuit, color: 'bg-cyan-500/15 text-cyan-400' },
  { value: 3200,  suffix: '+', label: 'Courses Recommended', icon: BookOpen, color: 'bg-purple-500/15 text-purple-400' },
  { value: 96,    suffix: '%', label: 'User Satisfaction', icon: Users, color: 'bg-amber-500/15 text-amber-400' },
];

const FEATURES = [
  {
    icon: FileSearch, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    title: 'ATS Resume Analyzer',
    desc: 'Upload your PDF resume and get a real ATS score, keyword gap analysis, and AI-powered improvement suggestions.',
    href: '/analyzer', cta: 'Analyze Now'
  },
  {
    icon: BrainCircuit, color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    title: 'Live Skill Exam',
    desc: 'Prove your skills across 3 sections — MCQ, live coding challenges, and aptitude tests. Get a detailed report card.',
    href: '/exam', cta: 'Take Exam'
  },
  {
    icon: Lightbulb, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    title: 'AI Learning Hub',
    desc: 'Follow curated roadmaps, watch embedded YouTube tutorials, and track your progress through learning milestones.',
    href: '/recommendations', cta: 'Explore Hub'
  },
  {
    icon: Code2, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    title: 'Resume Builder',
    desc: 'Build ATS-optimized, professional PDF resumes using our guided builder with AI-powered bullet point rewriter.',
    href: '/builder', cta: 'Build Resume'
  },
  {
    icon: Target, color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    title: 'Job Search Engine',
    desc: 'Search across 50+ portals simultaneously. Filter by location, experience level, and role to find the best matches.',
    href: '/jobs', cta: 'Search Jobs'
  },
  {
    icon: MessageSquarePlus, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    title: 'Feedback System',
    desc: 'Rate your experience, report bugs, and share feature requests. Your voice shapes the platform\'s roadmap.',
    href: '/feedback', cta: 'Give Feedback'
  },
];

const HOW_IT_WORKS = [
  {
    step: '01', icon: FileSearch, color: 'text-emerald-400',
    title: 'Upload Your Resume',
    desc: 'Drop your PDF resume. Our AI extracts all text, parses structure, and runs it through a multi-factor ATS scoring engine.'
  },
  {
    step: '02', icon: BarChart3, color: 'text-cyan-400',
    title: 'Get Your Report Card',
    desc: 'Instantly receive a score breakdown — ATS compatibility, keyword density, impact metrics, formatting grade, and missing skills.'
  },
  {
    step: '03', icon: BrainCircuit, color: 'text-purple-400',
    title: 'Prove & Improve Your Skills',
    desc: 'Take a targeted 3-section skill exam. The results drive personalized course recommendations to close your career gaps.'
  },
  {
    step: '04', icon: Rocket, color: 'text-amber-400',
    title: 'Land More Interviews',
    desc: 'Apply with a polished, ATS-optimized resume, verified skill certificates, and custom job search filters.'
  },
];

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-15%] left-[-5%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-purple-600/8 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 pt-20 pb-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-300 text-sm font-medium animate-fade-in">
          <Zap className="w-3.5 h-3.5 fill-emerald-400" />
          <span>Version 3.0 — Now with Live Exam Panel & Skill Assessment</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
          <span className="gradient-text">Smart AI</span>
          <br />
          <span className="text-slate-100">Resume Analyzer</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
          Your all-in-one career platform. Analyze resumes with AI, prove your skills in live exam panels, follow curated learning paths, and land more interviews.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 animate-fade-in-up delay-300">
          <Link
            href="/analyzer"
            id="hero-analyze-btn"
            className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_50px_rgba(16,185,129,0.55)] hover:-translate-y-1 flex items-center gap-2 group"
          >
            Analyze My Resume
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/exam"
            id="hero-exam-btn"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-300 font-bold text-base transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
          >
            <BrainCircuit className="w-4 h-4" />
            Take Skill Exam
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 justify-center animate-fade-in-up delay-400">
          {[
            { href: '/builder', label: 'Resume Builder' },
            { href: '/recommendations', label: 'AI Learning Hub' },
            { href: '/jobs', label: 'Job Search' },
            { href: '/dashboard', label: 'Dashboard' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-5 py-2 rounded-xl glass text-slate-300 hover:text-emerald-300 text-sm font-medium transition-all hover:border-emerald-500/30"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Stats ─────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} started={statsStarted} />
          ))}
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">The Process</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-slate-100">How It Works</h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">From resume upload to job offer — our platform guides every step.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map((step, idx) => (
            <div key={step.step} className="relative glass rounded-2xl p-6 group hover:border-slate-700 transition-all duration-300">
              {idx < HOW_IT_WORKS.length - 1 && (
                <div className="hidden lg:block absolute top-10 right-[-1.5rem] w-6 h-0.5 bg-slate-800 z-10" />
              )}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl font-black text-slate-800 leading-none font-mono select-none">{step.step}</span>
                <step.icon className={`w-7 h-7 ${step.color}`} />
              </div>
              <h3 className="text-base font-bold text-slate-200 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features Grid ─────────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">What's Inside</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-slate-100">Everything You Need</h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">Six powerful tools, one unified platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="glass rounded-2xl p-6 group hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${f.color} group-hover:scale-110 transition-transform`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed flex-1">{f.desc}</p>
              <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold text-emerald-400 group-hover:gap-2.5 transition-all">
                {f.cta} <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-16">
        <div className="glass rounded-3xl p-10 md:p-14 text-center relative overflow-hidden border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
          <Award className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            Start with a free resume analysis — no sign-up required. Upgrade to the full career ecosystem in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/analyzer"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Get Free Resume Score
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-slate-300 font-bold rounded-xl transition-all hover:-translate-y-0.5"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800/60 mt-4">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-500">
            © 2025 Smart AI Resume Analyzer. Built with ❤️ using Next.js & FastAPI.
          </span>
          <div className="flex gap-6 text-sm text-slate-500">
            {[
              { href: '/analyzer', label: 'Analyzer' },
              { href: '/exam', label: 'Exam' },
              { href: '/recommendations', label: 'Learning' },
              { href: '/feedback', label: 'Feedback' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-emerald-400 transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
