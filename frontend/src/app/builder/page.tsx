"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Builder() {
  const [personalInfo, setPersonalInfo] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: ''
  });
  
  const [summary, setSummary] = useState('');
  
  const [experiences, setExperiences] = useState([
    { company: '', position: '', start_date: '', end_date: '', responsibilities: '' }
  ]);
  
  const [education, setEducation] = useState([
    { school: '', degree: '', field: '', graduation_date: '', gpa: '' }
  ]);
  
  const [skills, setSkills] = useState({
    technical: '',
    soft: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [e.target.name]: e.target.value };
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([...experiences, { company: '', position: '', start_date: '', end_date: '', responsibilities: '' }]);
  };

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [e.target.name]: e.target.value };
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([...education, { school: '', degree: '', field: '', graduation_date: '', gpa: '' }]);
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSkills({ ...skills, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');

    // Prepare payload
    const payload = {
      personal_info: personalInfo,
      summary: summary,
      experiences: experiences.map(exp => ({
        ...exp,
        responsibilities: exp.responsibilities.split('\n').filter(r => r.trim() !== '')
      })),
      education: education,
      skills_categories: {
        technical: skills.technical.split('\n').filter(s => s.trim() !== ''),
        soft: skills.soft.split('\n').filter(s => s.trim() !== '')
      }
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/ai/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume PDF. Please check backend connection.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Professional_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      <nav className="p-6 border-b border-white/10 flex justify-between items-center">
        <Link href="/" className="text-emerald-400 font-semibold flex items-center gap-2 hover:text-emerald-300">
          ← Back to Home
        </Link>
        <Link href="/analyzer" className="text-slate-300 hover:text-white transition-colors">
          Go to Analyzer →
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Resume Builder
        </h1>
        
        <div className="space-y-8">
          {/* Personal Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400">1. Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="full_name" placeholder="Full Name" value={personalInfo.full_name} onChange={handlePersonalInfoChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
              <input name="email" placeholder="Email Address" value={personalInfo.email} onChange={handlePersonalInfoChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
              <input name="phone" placeholder="Phone Number" value={personalInfo.phone} onChange={handlePersonalInfoChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
              <input name="location" placeholder="Location (e.g., New York, NY)" value={personalInfo.location} onChange={handlePersonalInfoChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
              <input name="linkedin" placeholder="LinkedIn URL" value={personalInfo.linkedin} onChange={handlePersonalInfoChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none md:col-span-2" />
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400">2. Professional Summary</h2>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} placeholder="Briefly describe your professional background and goals..." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
          </div>

          {/* Experience */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400">3. Work Experience</h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-6 p-4 border border-slate-700 rounded-xl bg-slate-800/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input name="company" placeholder="Company Name" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
                  <input name="position" placeholder="Job Title" value={exp.position} onChange={(e) => handleExperienceChange(index, e)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
                  <input name="start_date" placeholder="Start Date (e.g., Jan 2020)" value={exp.start_date} onChange={(e) => handleExperienceChange(index, e)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
                  <input name="end_date" placeholder="End Date (e.g., Present)" value={exp.end_date} onChange={(e) => handleExperienceChange(index, e)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
                </div>
                <textarea name="responsibilities" placeholder="Key responsibilities (one per line)" value={exp.responsibilities} onChange={(e) => handleExperienceChange(index, e)} rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
              </div>
            ))}
            <button onClick={addExperience} className="text-sm font-semibold text-emerald-400 hover:text-emerald-300">+ Add Another Experience</button>
          </div>

          {/* Education */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400">4. Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4 p-4 border border-slate-700 rounded-xl bg-slate-800/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="school" placeholder="School/University" value={edu.school} onChange={(e) => handleEducationChange(index, e)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
                  <input name="degree" placeholder="Degree (e.g., B.S.)" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
                  <input name="field" placeholder="Field of Study" value={edu.field} onChange={(e) => handleEducationChange(index, e)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
                  <div className="flex gap-2">
                    <input name="graduation_date" placeholder="Grad Date" value={edu.graduation_date} onChange={(e) => handleEducationChange(index, e)} className="w-1/2 bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
                    <input name="gpa" placeholder="GPA (opt)" value={edu.gpa} onChange={(e) => handleEducationChange(index, e)} className="w-1/2 bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addEducation} className="text-sm font-semibold text-emerald-400 hover:text-emerald-300">+ Add Another Education</button>
          </div>

          {/* Skills */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-emerald-400">5. Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Technical Skills (one per line)</label>
                <textarea name="technical" value={skills.technical} onChange={handleSkillsChange} rows={5} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Soft Skills (one per line)</label>
                <textarea name="soft" value={skills.soft} onChange={handleSkillsChange} rows={5} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 focus:border-emerald-500 focus:outline-none" />
              </div>
            </div>
          </div>
          
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
          >
            {isGenerating ? "Generating ATS-Friendly PDF..." : "Download Professional Resume"}
          </button>
        </div>
      </main>
    </div>
  );
}
