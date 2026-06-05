"use client";

import React, { useState } from 'react';
import { ROADMAPS, FREE_COURSES, PREMIUM_COURSES, PRACTICE_RESOURCES, Course } from '@/data/recommendationsData';
import { Award, BookOpen, CheckSquare, Play, Video, ExternalLink, Star, Compass, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState<'paths' | 'free' | 'premium' | 'practice'>('paths');
  
  // Roadmap states
  const [selectedRoadmapRole, setSelectedRoadmapRole] = useState<string>(ROADMAPS[0].role);
  const [checkedSkills, setCheckedSkills] = useState<{ [key: string]: boolean }>({});
  
  // Video player state
  const [activeVideoEmbed, setActiveVideoEmbed] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('');

  const toggleSkillCheck = (skill: string) => {
    setCheckedSkills(prev => ({
      ...prev,
      [skill]: !prev[skill]
    }));
  };

  const handlePlayVideo = (embedId: string, title: string) => {
    setActiveVideoEmbed(embedId);
    setActiveVideoTitle(title);
  };

  const currentRoadmap = ROADMAPS.find(r => r.role === selectedRoadmapRole) || ROADMAPS[0];

  // Calculate roadmap progress
  const totalSkills = currentRoadmap.steps.reduce((acc, step) => acc + step.skills.length, 0);
  const completedSkills = currentRoadmap.steps.reduce((acc, step) => {
    return acc + step.skills.filter(skill => checkedSkills[skill]).length;
  }, 0);
  const progressPercent = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            AI learning <span className="text-emerald-400">Hub</span>
          </h1>
          <p className="text-lg text-slate-400">
            Curated roadmap milestones, video lectures, certifications, and developer resources.
          </p>
        </div>

        {/* Video Player Modal/Overlay if a video is playing */}
        {activeVideoEmbed && (
          <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-4xl w-full shadow-2xl relative">
              <button
                onClick={() => setActiveVideoEmbed(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-lg cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4 text-emerald-400 line-clamp-1">{activeVideoTitle}</h3>
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${activeVideoEmbed}?autoplay=1`}
                  title={activeVideoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4 flex justify-between items-center text-xs text-slate-400">
                <span>Source: YouTube Video Tutorial</span>
                <span className="text-emerald-400">Ready to Learn</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Buttons Navigation */}
        <div className="flex flex-wrap border-b border-slate-800 mb-10 p-1 bg-slate-900/50 rounded-2xl max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab('paths')}
            className={`flex-1 min-w-[150px] py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'paths' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            Learning Paths
          </button>
          <button
            onClick={() => setActiveTab('free')}
            className={`flex-1 min-w-[150px] py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'free' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            Free Tutorials
          </button>
          <button
            onClick={() => setActiveTab('premium')}
            className={`flex-1 min-w-[150px] py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'premium' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            Certifications
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 min-w-[150px] py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'practice' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Practice Hub
          </button>
        </div>

        {/* Tab Content 1: Learning Paths */}
        {activeTab === 'paths' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Roles Buttons selector */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {ROADMAPS.map((roadmap) => (
                <button
                  key={roadmap.role}
                  onClick={() => setSelectedRoadmapRole(roadmap.role)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    selectedRoadmapRole === roadmap.role
                      ? 'bg-slate-900 text-emerald-400 border-emerald-500/50 shadow-lg'
                      : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {roadmap.role}
                </button>
              ))}
            </div>

            {/* Path Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Progress Sidebar */}
              <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-20">
                <h3 className="text-xl font-bold mb-2 text-slate-100">{currentRoadmap.role} Path</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">{currentRoadmap.description}</p>
                
                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-400">Path Progress</span>
                    <span className="font-bold text-emerald-400">{progressPercent}%</span>
                  </div>
                  
                  <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                    <div
                      className="bg-emerald-400 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>

                  <div className="text-xs text-slate-500 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    💡 Check off the skills you have mastered to track your career readiness score!
                  </div>
                </div>
              </div>

              {/* Roadmap timeline steps */}
              <div className="lg:col-span-2 space-y-6">
                {currentRoadmap.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 font-bold text-6xl text-slate-950 select-none group-hover:text-slate-900/40 transition-colors pointer-events-none">
                      0{idx + 1}
                    </div>

                    <h4 className="text-xl font-bold mb-2 text-slate-100 relative z-10">{step.title}</h4>
                    <p className="text-slate-400 text-sm mb-6 relative z-10 leading-relaxed">{step.desc}</p>

                    <div className="border-t border-slate-800/80 pt-4 relative z-10">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Target Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill) => {
                          const isChecked = checkedSkills[skill] || false;
                          return (
                            <button
                              key={skill}
                              onClick={() => toggleSkillCheck(skill)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                isChecked
                                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <CheckSquare className={`w-3.5 h-3.5 ${isChecked ? 'text-emerald-400 fill-emerald-500/10' : 'text-slate-600'}`} />
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Tab Content 2: Free Video Tutorials */}
        {activeTab === 'free' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {FREE_COURSES.map((course) => (
              <div
                key={course.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col group"
              >
                {/* Fake video card preview */}
                <div className="aspect-video w-full bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-slate-850">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60 z-10" />
                  
                  {/* YouTube thumbnail placeholder styling */}
                  <img
                    src={`https://img.youtube.com/vi/${course.embedId}/mqdefault.jpg`}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <button
                    onClick={() => course.embedId && handlePlayVideo(course.embedId, course.title)}
                    className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 hover:scale-110 active:scale-95 text-slate-950 flex items-center justify-center shadow-lg relative z-20 transition-all cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </button>

                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] text-slate-300 font-semibold border border-slate-800 z-20">
                    {course.duration}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-semibold">
                    <span className="text-emerald-400">{course.platform}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>

                  <h3 className="font-bold text-lg mb-3 text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                    {course.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-850">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-950 rounded border border-slate-800 text-slate-400 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Certifications */}
        {activeTab === 'premium' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {PREMIUM_COURSES.map((course) => (
              <div
                key={course.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-emerald-500/40 transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-850 rounded-lg text-emerald-400 font-semibold">
                      {course.platform}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                      <Star className="w-4 h-4 fill-amber-400" />
                      {course.rating}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 my-5 text-sm">
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850/50">
                      <span className="text-xs text-slate-500 block">Duration</span>
                      <span className="font-semibold text-slate-300">{course.duration}</span>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-850/50">
                      <span className="text-xs text-slate-500 block">Cost / Tuition</span>
                      <span className="font-semibold text-slate-300 line-clamp-1">{course.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-850">
                  <span className="text-xs text-slate-400 font-medium">{course.level} Target</span>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-400 transition-all flex items-center gap-1.5"
                  >
                    View Program
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 4: Practice Hub */}
        {activeTab === 'practice' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {PRACTICE_RESOURCES.map((resource, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col justify-between hover:border-emerald-500/40 hover:bg-slate-900/60 transition-all group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">{resource.category}</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-500/30" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{resource.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-850">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full justify-center py-2.5 bg-slate-950 hover:bg-emerald-500 hover:text-slate-950 border border-slate-800 hover:border-emerald-500 rounded-xl text-xs font-bold text-slate-200 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {resource.cta}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
