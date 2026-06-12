"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, FileText, BrainCircuit, Compass, Briefcase,
  Target, TrendingUp, Award, CheckCircle2, Clock,
  ArrowRight, RefreshCw, User, Star, BarChart3, Zap
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface ExamRecord {
  date: string;
  targetJob: string;
  scores: {
    total: { received: number; max: number };
    mcq: { received: number; max: number };
    coding: { received: number; max: number };
    aptitude: { received: number; max: number };
  };
  skillsTested: string[];
}

const QUICK_ACTIONS = [
  { href: '/analyzer',        icon: FileText,     color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-400', label: 'Analyze Resume',   desc: 'Upload and score your PDF' },
  { href: '/exam',            icon: BrainCircuit, color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/20 text-cyan-400',             label: 'Take Skill Exam',  desc: '3-section assessment panel' },
  { href: '/recommendations', icon: Compass,      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400',    label: 'Learning Hub',     desc: 'Courses, videos & roadmaps' },
  { href: '/builder',         icon: Briefcase,    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400',            label: 'Resume Builder',   desc: 'Build an ATS-optimized PDF' },
  { href: '/jobs',            icon: Target,       color: 'from-rose-500/20 to-rose-600/10 border-rose-500/20 text-rose-400',            label: 'Job Search',       desc: 'Find matching opportunities' },
  { href: '/feedback',        icon: Star,         color: 'from-amber-500/20 to-amber-600/10 border-amber-500/20 text-amber-400',        label: 'Give Feedback',    desc: 'Share your experience' },
];

function getGradeColor(pct: number) {
  if (pct >= 75) return 'text-emerald-400';
  if (pct >= 45) return 'text-amber-400';
  return 'text-red-400';
}
function getGradeLabel(pct: number) {
  if (pct >= 75) return 'Industry Ready';
  if (pct >= 45) return 'Moderate Readiness';
  return 'Needs Work';
}

export default function DashboardPage() {
  const [username, setUsername] = useState('User');
  const [examHistory, setExamHistory] = useState<ExamRecord[]>([]);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const u = JSON.parse(stored);
      setUsername(u.name || u.email?.split('@')[0] || 'User');
    }

    const history: ExamRecord[] = [];
    const savedHistory = localStorage.getItem('examHistory');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      if (Array.isArray(parsed)) history.push(...parsed);
    }
    if (history.length === 0) {
      const latestReport = sessionStorage.getItem('examReport');
      if (latestReport) {
        const p = JSON.parse(latestReport);
        history.push({
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          targetJob: p.targetJob || 'Software Engineer',
          scores: p.scores,
          skillsTested: p.skillsTested || []
        });
      }
    }
    if (history.length === 0) {
      history.push(
        { date: '05 Jun 2025', targetJob: 'Full Stack Engineer', scores: { total: { received: 30, max: 45 }, mcq: { received: 14, max: 25 }, coding: { received: 10, max: 15 }, aptitude: { received: 6, max: 10 } }, skillsTested: ['Python', 'React', 'SQL'] },
        { date: '01 Jun 2025', targetJob: 'Backend Developer',   scores: { total: { received: 22, max: 45 }, mcq: { received: 10, max: 25 }, coding: { received: 7,  max: 15 }, aptitude: { received: 5, max: 10 } }, skillsTested: ['Python', 'SQL', 'DSA'] }
      );
    }
    setExamHistory(history);
    setBestScore(Math.max(...history.map(r => Math.round((r.scores.total.received / r.scores.total.max) * 100))));
  }, []);

  const latestExam = examHistory[0];
  const latestPct = latestExam ? Math.round((latestExam.scores.total.received / latestExam.scores.total.max) * 100) : 0;
  const circumference = 2 * Math.PI * 54;
  const allSkills = [...new Set(examHistory.flatMap(e => e.skillsTested))];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-20">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-10 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-1">
              <LayoutDashboard className="w-4 h-4" />Career Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100">
              Welcome back, <span className="text-emerald-400">{username}</span> 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">Here's your career progress overview.</p>
          </div>
          <Link href="/profile" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 text-sm font-medium transition-all">
            <User className="w-4 h-4" />View Profile
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: TrendingUp,   label: 'Exams Taken',  value: examHistory.length, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { icon: Award,        label: 'Best Score',   value: `${bestScore}%`,    color: 'text-cyan-400',    bg: 'bg-cyan-500/10' },
            { icon: CheckCircle2, label: 'Latest Score', value: `${latestPct}%`,    color: 'text-purple-400',  bg: 'bg-purple-500/10' },
            { icon: Star,         label: 'Skills Tested',value: allSkills.length,   color: 'text-amber-400',   bg: 'bg-amber-500/10' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-100">{value}</div>
                <div className="text-xs text-slate-500 font-medium">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Career Readiness Ring */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-bold text-slate-300 mb-6">Career Readiness</h2>
            <div className="relative w-36 h-36 mb-6">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#1e293b" strokeWidth="10" />
                <circle cx="60" cy="60" r="54" fill="none"
                  stroke={latestPct >= 75 ? '#10b981' : latestPct >= 45 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="10" strokeDasharray={circumference}
                  strokeDashoffset={circumference - (circumference * latestPct) / 100}
                  strokeLinecap="round" className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-extrabold ${getGradeColor(latestPct)}`}>{latestPct}%</span>
                <span className="text-[10px] text-slate-500 font-semibold">Overall</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${latestPct >= 75 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : latestPct >= 45 ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
              {getGradeLabel(latestPct)}
            </span>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed max-w-[180px]">Based on your latest exam. Take more to improve.</p>
            <Link href="/exam" className="mt-5 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2">
              <RefreshCw className="w-3.5 h-3.5" />Retake Exam
            </Link>
          </div>

          {/* Exam History */}
          <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" />Exam History
              </h2>
              <Link href="/exam" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
                New Exam <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {examHistory.map((record, idx) => {
                const pct = Math.round((record.scores.total.received / record.scores.total.max) * 100);
                return (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="text-sm font-bold text-slate-200">{record.targetJob}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />{record.date}
                        </div>
                      </div>
                      <span className={`text-lg font-extrabold tabular-nums ${getGradeColor(pct)}`}>{pct}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[{ label: 'MCQ', s: record.scores.mcq }, { label: 'Coding', s: record.scores.coding }, { label: 'Aptitude', s: record.scores.aptitude }].map(({ label, s }) => (
                        <div key={label} className="bg-slate-900 rounded-xl p-2 text-center">
                          <div className="text-xs text-slate-500 mb-1">{label}</div>
                          <div className="text-sm font-bold text-slate-200">{s.received}<span className="text-slate-600">/{s.max}</span></div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${pct >= 75 ? 'bg-emerald-500' : pct >= 45 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {record.skillsTested.map((skill) => (
                        <span key={skill} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-medium border border-slate-700">{skill}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-slate-200 mb-5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_ACTIONS.map(({ href, icon: Icon, color, label, desc }) => (
              <Link key={href} href={href} className={`bg-gradient-to-br ${color} border rounded-2xl p-5 group hover:-translate-y-1 transition-all duration-300 flex items-start gap-4`}>
                <div className="w-10 h-10 rounded-xl bg-slate-900/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-200">{label}</div>
                  <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all mt-0.5 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
