"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, BookOpen, Compass, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { FREE_COURSES, PREMIUM_COURSES } from '@/data/recommendationsData';

export default function ExamResultsPage() {
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  
  // Accordion review states
  const [openReviewId, setOpenReviewId] = useState<string | null>(null);
  const [activeReviewTab, setActiveReviewTab] = useState<'mcqs' | 'coding' | 'aptitude'>('mcqs');

  useEffect(() => {
    const dataStr = sessionStorage.getItem('examReport');
    if (dataStr) {
      setReport(JSON.parse(dataStr));
    } else {
      // Mock report if user directly hits this page without taking exam
      const mockReport = {
        targetJob: 'Full Stack Engineer',
        skillsTested: ['Python', 'React', 'SQL', 'DSA'],
        scores: {
          mcq: { received: 14, max: 20 },
          coding: { received: 8, max: 15 },
          aptitude: { received: 8, max: 10 },
          total: { received: 30, max: 45 }
        },
        breakdown: {
          mcqs: [
            { id: "m1", question: "What will be the output of print([x for x in range(5) if x % 2 == 0])?", options: ["[0, 1, 2, 3, 4]", "[0, 2, 4]", "[2, 4]", "[1, 3]", "[0, 2, 4, 6]"], userAnswer: 1, correctAnswer: 1, marksReceived: 1, maxMarks: 1, explanation: "Filters out odd numbers.", skill: "Python" },
            { id: "m4", question: "In React, what is the primary purpose of the 'key' prop in lists?", options: ["CSS styling", "Store database record IDs", "Help React identify changed, added, or removed items", "Encrypt elements", "Trigger re-renders"], userAnswer: 0, correctAnswer: 2, marksReceived: 0, maxMarks: 1, explanation: "Keys identify changes uniquely.", skill: "React" }
          ],
          coding: [
            { id: "c1", title: "Reverse a String", difficulty: "easy", userCode: "def reverse_string(s):\n    return s[::-1]", userLanguage: "python", marksReceived: 2, maxMarks: 2 }
          ],
          aptitude: [
            { id: "a1", question: "DevOps specialty count out of 60 students if 30% AI and 50% Web?", options: ["18", "12", "15", "20"], userAnswer: 1, correctAnswer: 1, marksReceived: 1, maxMarks: 1, explanation: "60 * 20% = 12." }
          ]
        }
      };
      setReport(mockReport);
    }
  }, []);

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p>Loading report card...</p>
      </div>
    );
  }

  const overallPercent = Math.round((report.scores.total.received / report.scores.total.max) * 100);
  
  // Decide feedback levels
  let performanceClass = "Needs Work";
  let feedbackText = "Based on your scores, we recommend focusing on core foundations. Go through the Learning Paths and watch the free courses linked below.";
  let badgeColor = "bg-red-500/10 text-red-400 border border-red-500/20";
  
  if (overallPercent >= 75) {
    performanceClass = "Industry Ready";
    feedbackText = "Excellent performance! You demonstrate strong engineering logic and tool familiarity. You are ready to start applying for jobs.";
    badgeColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
  } else if (overallPercent >= 45) {
    performanceClass = "Moderate Readiness";
    feedbackText = "You have a solid foundation but have minor gaps. Focus on practicing algorithms and reviewing database theories.";
    badgeColor = "bg-amber-500/10 text-amber-300 border border-amber-500/20";
  }

  // Find incorrect skills to suggest courses
  const incorrectSkills: string[] = [];
  report.breakdown.mcqs.forEach((item: any) => {
    if (item.marksReceived === 0 && !incorrectSkills.includes(item.skill)) {
      incorrectSkills.push(item.skill);
    }
  });

  // Filter recommendations based on wrong answers
  const recommendedFree = FREE_COURSES.filter(c => 
    c.tags.some(tag => incorrectSkills.includes(tag) || (tag === "DSA" && incorrectSkills.includes("DSA")))
  ).slice(0, 3);

  const recommendedPremium = PREMIUM_COURSES.filter(c => 
    c.tags.some(tag => incorrectSkills.includes(tag))
  ).slice(0, 2);

  // If no specific recommendations (perfect score or none matches), show top default courses
  const finalFreeRecs = recommendedFree.length > 0 ? recommendedFree : FREE_COURSES.slice(0, 2);
  const finalPremiumRecs = recommendedPremium.length > 0 ? recommendedPremium : PREMIUM_COURSES.slice(0, 1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        
        {/* Top summary card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-3 text-center md:text-left">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
              {performanceClass}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100">
              Assessment Report
            </h1>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              {feedbackText}
            </p>
          </div>

          {/* Large Circle score progress bar */}
          <div className="relative w-36 h-36 flex items-center justify-center bg-slate-950 rounded-full border border-slate-800 shadow-inner flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-slate-900"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-emerald-400 transition-all duration-1000"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={402}
                strokeDashoffset={402 - (402 * overallPercent) / 100}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-100">{overallPercent}%</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                {report.scores.total.received} / {report.scores.total.max} marks
              </span>
            </div>
          </div>

        </div>

        {/* Section Marks breakdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <span className="text-xs text-slate-500 block mb-1">Section 1: MCQ Score</span>
            <h3 className="text-2xl font-bold text-slate-200">
              {report.scores.mcq.received} <span className="text-sm text-slate-500">/ {report.scores.mcq.max} marks</span>
            </h3>
            <div className="w-full bg-slate-950 rounded-full h-1.5 mt-4">
              <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${(report.scores.mcq.received / report.scores.mcq.max) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <span className="text-xs text-slate-500 block mb-1">Section 2: Coding Lab Score</span>
            <h3 className="text-2xl font-bold text-slate-200">
              {report.scores.coding.received} <span className="text-sm text-slate-500">/ {report.scores.coding.max} marks</span>
            </h3>
            <div className="w-full bg-slate-950 rounded-full h-1.5 mt-4">
              <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${(report.scores.coding.received / report.scores.coding.max) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <span className="text-xs text-slate-500 block mb-1">Section 3: Aptitude Score</span>
            <h3 className="text-2xl font-bold text-slate-200">
              {report.scores.aptitude.received} <span className="text-sm text-slate-500">/ {report.scores.aptitude.max} marks</span>
            </h3>
            <div className="w-full bg-slate-950 rounded-full h-1.5 mt-4">
              <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${(report.scores.aptitude.received / report.scores.aptitude.max) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          
          {/* Left Review column */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="text-emerald-400 w-6 h-6" /> Questions Review
            </h2>

            {/* Sub-tabs for section review */}
            <div className="flex border-b border-slate-800 mb-6 p-1 bg-slate-950 rounded-xl">
              <button
                onClick={() => { setActiveReviewTab('mcqs'); setOpenReviewId(null); }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeReviewTab === 'mcqs' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                MCQs
              </button>
              <button
                onClick={() => { setActiveReviewTab('coding'); setOpenReviewId(null); }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeReviewTab === 'coding' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Coding
              </button>
              <button
                onClick={() => { setActiveReviewTab('aptitude'); setOpenReviewId(null); }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeReviewTab === 'aptitude' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Aptitude
              </button>
            </div>

            {/* Tab content loops */}
            <div className="space-y-3">
              
              {/* MCQs */}
              {activeReviewTab === 'mcqs' && report.breakdown.mcqs.map((item: any, idx: number) => {
                const isOpen = openReviewId === item.id;
                const isCorrect = item.marksReceived > 0;
                
                return (
                  <div key={item.id} className="border border-slate-850 rounded-2xl overflow-hidden bg-slate-950/40">
                    <button
                      onClick={() => setOpenReviewId(isOpen ? null : item.id)}
                      className="w-full text-left p-4 flex justify-between items-center gap-4 hover:bg-slate-900/50 transition-colors"
                    >
                      <div className="flex gap-3 items-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCorrect ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                          {isCorrect ? '✓' : '✕'}
                        </span>
                        <span className="text-sm font-semibold text-slate-200 line-clamp-1">Q{idx + 1}: {item.question}</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 border-t border-slate-850 space-y-4 text-sm bg-slate-900/30">
                        <p className="font-medium text-slate-305">{item.question}</p>
                        <div className="space-y-2">
                          {item.options.map((opt: string, oIdx: number) => {
                            const isUserSelection = item.userAnswer === oIdx;
                            const isCorrectAns = item.correctAnswer === oIdx;
                            return (
                              <div
                                key={oIdx}
                                className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-3 ${
                                  isCorrectAns
                                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                                    : isUserSelection
                                    ? 'bg-red-500/10 border-red-500/40 text-red-400'
                                    : 'bg-slate-950 border-slate-850 text-slate-400'
                                }`}
                              >
                                <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                                <span>{opt}</span>
                                {isCorrectAns && <span className="text-[10px] bg-emerald-500/25 px-1.5 py-0.5 rounded font-bold uppercase ml-auto">Correct</span>}
                                {isUserSelection && !isCorrectAns && <span className="text-[10px] bg-red-500/25 px-1.5 py-0.5 rounded font-bold uppercase ml-auto">Your Choice</span>}
                              </div>
                            );
                          })}
                        </div>
                        <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl">
                          <span className="text-xs font-bold text-slate-450 uppercase block mb-1">Explanation</span>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* CODING */}
              {activeReviewTab === 'coding' && report.breakdown.coding.map((item: any, idx: number) => {
                const isOpen = openReviewId === item.id;
                const attempted = item.userCode.trim().length > 30;
                
                return (
                  <div key={item.id} className="border border-slate-850 rounded-2xl overflow-hidden bg-slate-950/40">
                    <button
                      onClick={() => setOpenReviewId(isOpen ? null : item.id)}
                      className="w-full text-left p-4 flex justify-between items-center gap-4 hover:bg-slate-900/50 transition-colors"
                    >
                      <div className="flex gap-3 items-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${attempted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                          {attempted ? '✓' : '—'}
                        </span>
                        <span className="text-sm font-semibold text-slate-200 line-clamp-1">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 border border-slate-800 rounded">{item.marksReceived} / {item.maxMarks} pts</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-4 border-t border-slate-850 space-y-4 text-sm bg-slate-900/30">
                        <div>
                          <span className="text-xs font-semibold text-slate-550 uppercase block mb-2">Submitted Code ({item.userLanguage})</span>
                          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                            {item.userCode || '# No code submitted for this challenge.'}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* APTITUDE */}
              {activeReviewTab === 'aptitude' && report.breakdown.aptitude.map((item: any, idx: number) => {
                const isOpen = openReviewId === item.id;
                const isCorrect = item.marksReceived > 0;
                
                return (
                  <div key={item.id} className="border border-slate-850 rounded-2xl overflow-hidden bg-slate-950/40">
                    <button
                      onClick={() => setOpenReviewId(isOpen ? null : item.id)}
                      className="w-full text-left p-4 flex justify-between items-center gap-4 hover:bg-slate-900/50 transition-colors"
                    >
                      <div className="flex gap-3 items-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCorrect ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                          {isCorrect ? '✓' : '✕'}
                        </span>
                        <span className="text-sm font-semibold text-slate-200 line-clamp-1">Q{idx + 1}: {item.question}</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 border-t border-slate-850 space-y-4 text-sm bg-slate-900/30">
                        <p className="font-medium text-slate-305">{item.question}</p>
                        <div className="space-y-2">
                          {item.options.map((opt: string, oIdx: number) => {
                            const isUserSelection = item.userAnswer === oIdx;
                            const isCorrectAns = item.correctAnswer === oIdx;
                            return (
                              <div
                                key={oIdx}
                                className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-3 ${
                                  isCorrectAns
                                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                                    : isUserSelection
                                    ? 'bg-red-500/10 border-red-500/40 text-red-400'
                                    : 'bg-slate-950 border-slate-850 text-slate-400'
                                }`}
                              >
                                <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                                <span>{opt}</span>
                                {isCorrectAns && <span className="text-[10px] bg-emerald-500/25 px-1.5 py-0.5 rounded font-bold uppercase ml-auto">Correct</span>}
                                {isUserSelection && !isCorrectAns && <span className="text-[10px] bg-red-500/25 px-1.5 py-0.5 rounded font-bold uppercase ml-auto">Your Choice</span>}
                              </div>
                            );
                          })}
                        </div>
                        <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl">
                          <span className="text-xs font-bold text-slate-450 uppercase block mb-1">Explanation</span>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </div>

          {/* Right Recommendation column */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Action buttons */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
              <button
                onClick={() => router.push('/exam')}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Retake Assessment
              </button>
              
              <Link
                href="/recommendations"
                className="w-full py-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl font-bold text-slate-200 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                Go to learning Hub
              </Link>
            </div>

            {/* Course Recommendations */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="text-emerald-400 w-5 h-5" /> Recommended Courses
              </h3>
              
              <div className="space-y-4">
                {finalFreeRecs.map((course) => (
                  <a
                    key={course.id}
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-slate-950 border border-slate-850 p-4 rounded-2xl hover:border-emerald-500/30 transition-all group"
                  >
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">{course.platform}</span>
                    <h4 className="text-sm font-bold text-slate-200 mt-1 group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                      {course.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 block mt-2">{course.duration} • Free Lecture</span>
                  </a>
                ))}

                {finalPremiumRecs.map((course) => (
                  <a
                    key={course.id}
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-slate-950 border border-slate-850 p-4 rounded-2xl hover:border-emerald-500/30 transition-all group"
                  >
                    <span className="text-[10px] text-cyan-400 font-bold uppercase">{course.platform}</span>
                    <h4 className="text-sm font-bold text-slate-200 mt-1 group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                      {course.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 block mt-2">Specialization Certificate</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
