"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Target, Clock, ArrowRight, ShieldCheck, CheckSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function ExamPage() {
  const router = useRouter();
  const [targetJob, setTargetJob] = useState('Software Engineer');
  const [selectedSkills, setSelectedSkills] = useState<{ [key: string]: boolean }>({
    'Python': true,
    'React': true,
    'SQL': true,
    'DSA': true,
    'ML & AI': false,
    'DevOps': false,
    'TypeScript': false,
    'Java': false,
    'System Design': false,
    'Cloud': false,
    'Node.js': false,
    'Next.js': false
  });

  const skillsList = Object.keys(selectedSkills);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => ({
      ...prev,
      [skill]: !prev[skill]
    }));
  };

  const handleStartExam = () => {
    // Collect selected skills
    const skillsToTest = Object.keys(selectedSkills).filter(skill => selectedSkills[skill]);
    if (skillsToTest.length === 0) {
      alert("Please select at least one skill to test.");
      return;
    }

    // Save configuration parameters to session storage for the session page to load
    sessionStorage.setItem('examTargetJob', targetJob);
    sessionStorage.setItem('examSkills', JSON.stringify(skillsToTest));
    
    // Redirect to exam session page
    router.push('/exam/session');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-20">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            AI Skill <span className="text-emerald-400">Assessment</span>
          </h1>
          <p className="text-lg text-slate-400">
            Verify your skills across MCQs, Coding Challenges, and Aptitude tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          
          {/* Setup Form */}
          <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Target className="text-emerald-400 w-6 h-6" /> Configure Exam
            </h2>

            {/* Target Job */}
            <div>
              <label className="text-sm font-semibold text-slate-400 block mb-2">Target Job / Role</label>
              <input
                type="text"
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                placeholder="e.g. Full Stack Developer"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Selected Skills to test */}
            <div>
              <label className="text-sm font-semibold text-slate-400 block mb-2">Skills to Assess</label>
              <div className="grid grid-cols-2 gap-3">
                {skillsList.map((skill) => {
                  const checked = selectedSkills[skill];
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`p-3 rounded-xl border text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                        checked
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800'
                      }`}
                    >
                      <CheckSquare className={`w-4 h-4 ${checked ? 'text-emerald-400 fill-emerald-400/10' : 'text-slate-700'}`} />
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleStartExam}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg group cursor-pointer"
            >
              Start Skill Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Exam Structure details card */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-slate-100">Exam Structure</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Section 1: MCQ Assessment</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    20 technical multiple-choice questions (5 options each). Easy, Medium, and Hard difficulty matching your chosen skills.
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-semibold mt-1">
                    <Clock className="w-3 h-3" /> 25 Minutes
                  </span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Section 2: Coding Challenges</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    5 algorithmic code editor problems. Select from Python, JavaScript, Java, C++, or Go variables.
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-semibold mt-1">
                    <Clock className="w-3 h-3" /> 40 Minutes
                  </span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Section 3: Aptitude & Job Target</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    10 math logic, verbal reasoning, and pattern matching problems tailored to your target job profile.
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-semibold mt-1">
                    <Clock className="w-3 h-3" /> 15 Minutes
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-normal">
                Once started, the timer cannot be paused. Refreshing the browser will restart the active section timer. Prepare a quiet environment before initiating.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
