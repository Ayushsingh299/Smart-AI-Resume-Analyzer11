"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User, Mail, Briefcase, FileText, Save, Edit3, Award,
  BrainCircuit, BookOpen, ArrowRight, CheckCircle2,
  TrendingUp, Clock, LogOut, ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const ALL_SKILLS = [
  'Python', 'React', 'TypeScript', 'JavaScript', 'Java', 'Node.js',
  'SQL', 'DSA', 'ML & AI', 'DevOps', 'System Design', 'Cloud / AWS'
];

interface UserProfile {
  name: string;
  email: string;
  targetJob: string;
  bio: string;
  skills: string[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '', email: '', targetJob: '', bio: '', skills: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [examCount, setExamCount] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const userRes = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (userRes.ok) {
          const u = await userRes.json();
          setProfile({
            name: u.full_name || '',
            email: u.email || '',
            targetJob: u.target_job || 'Software Engineer',
            bio: u.bio || '',
            skills: ['Python', 'React', 'SQL'] // Mocked for now until skill profile is added
          });
        }

        const historyRes = await fetch('/api/exams/history', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (historyRes.ok) {
          const arr = await historyRes.json();
          setExamCount(arr.length);
          if (arr.length > 0) {
            const best = Math.max(...arr.map((r: any) => Math.round((r.score / r.total_questions) * 100)));
            setBestScore(best);
          } else {
            setBestScore(0);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const toggleSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: profile.name,
          target_job: profile.targetJob,
          bio: profile.bio
        })
      });
      
      if (res.ok) {
        setIsEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        localStorage.setItem('userName', profile.name);
        window.dispatchEvent(new Event('storage'));
      }
    } catch(e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/login';
  };

  const initials = profile.name
    ? profile.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : profile.email?.charAt(0).toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-20">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 pt-10 max-w-4xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-1">
              <User className="w-4 h-4" />My Profile
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100">Account & Settings</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 border border-red-500/20 text-sm font-medium transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Avatar + Stats */}
          <div className="space-y-5">
            {/* Avatar Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-3xl font-extrabold text-white mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                {initials}
              </div>
              <h2 className="text-xl font-bold text-slate-100">{profile.name || 'Your Name'}</h2>
              <p className="text-sm text-slate-400 mt-1">{profile.email || 'your@email.com'}</p>
              <span className="mt-3 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                {profile.targetJob || 'Software Engineer'}
              </span>
            </div>

            {/* Stats */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Career Stats</h3>
              {[
                { icon: BrainCircuit, label: 'Exams Taken',  value: examCount,    color: 'text-cyan-400' },
                { icon: TrendingUp,   label: 'Best Score',   value: `${bestScore}%`, color: 'text-emerald-400' },
                { icon: BookOpen,     label: 'Skills Listed', value: profile.skills.length, color: 'text-purple-400' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Icon className={`w-4 h-4 ${color}`} />{label}
                  </div>
                  <span className="text-sm font-bold text-slate-200">{value}</span>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-2">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Links</h3>
              {[
                { href: '/exam',            label: 'Take Skill Exam',  icon: BrainCircuit },
                { href: '/recommendations', label: 'Learning Hub',     icon: BookOpen },
                { href: '/dashboard',       label: 'Dashboard',        icon: TrendingUp },
              ].map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/60 text-slate-400 hover:text-emerald-300 text-sm transition-all group">
                  <Icon className="w-4 h-4" />{label}
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Edit Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Profile Info */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />Profile Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/40 text-slate-300 text-sm font-medium transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-sm font-medium transition-all cursor-pointer">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold transition-all cursor-pointer">
                      <Save className="w-3.5 h-3.5" />Save
                    </button>
                  </div>
                )}
              </div>

              {saved && (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mb-5 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" />Profile saved successfully!
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    disabled={!isEditing}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-2 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400 font-semibold block mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />Target Job Role
                  </label>
                  <input
                    type="text"
                    value={profile.targetJob}
                    disabled={!isEditing}
                    onChange={e => setProfile(p => ({ ...p, targetJob: e.target.value }))}
                    placeholder="e.g. Full Stack Developer, Data Scientist"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400 font-semibold block mb-2">Professional Bio</label>
                  <textarea
                    value={profile.bio}
                    disabled={!isEditing}
                    onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                    rows={3}
                    placeholder="A short description of your professional background and goals..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-200 mb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />Skills & Expertise
              </h2>
              <p className="text-xs text-slate-500 mb-5">Select skills that reflect your current expertise level.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ALL_SKILLS.map((skill) => {
                  const selected = profile.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      disabled={!isEditing}
                      onClick={() => toggleSkill(skill)}
                      className={`p-3 rounded-xl border text-sm font-semibold text-left flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                        selected
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 text-[10px] ${selected ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700'}`}>
                        {selected ? '✓' : ''}
                      </span>
                      {skill}
                    </button>
                  );
                })}
              </div>
              {!isEditing && (
                <p className="text-xs text-slate-600 mt-4 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />Click Edit to modify your skills
                </p>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
