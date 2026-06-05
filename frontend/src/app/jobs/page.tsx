"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Search, BarChart3, TrendingUp, Building2, Globe, GraduationCap, Clock } from 'lucide-react';
import { JOB_SUGGESTIONS, LOCATION_SUGGESTIONS, EXPERIENCE_RANGES, JOB_MARKET_INSIGHTS, FEATURED_COMPANIES } from '@/data/jobData';
import { generateJobSearchUrls } from '@/lib/jobPortals';

import Navbar from '@/components/Navbar';

export default function JobsPage() {
  const [jobQuery, setJobQuery] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('all');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!jobQuery) return;
    const results = generateJobSearchUrls(jobQuery, location, experience);
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-20 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Smart Job <span className="text-emerald-400">Search</span>
          </h1>
          <p className="text-lg text-slate-400">
            Find your dream job across multiple platforms in one click.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="relative">
              <label className="text-sm font-medium text-slate-400 mb-2 block">Role or Keyword</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={jobQuery}
                  onChange={(e) => setJobQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-slate-400 mb-2 block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Bangalore"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium text-slate-400 mb-2 block">Experience</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
                >
                  {EXPERIENCE_RANGES.map(range => (
                    <option key={range.id} value={range.id}>{range.text}</option>
                  ))}
                </select>
              </div>
            </div>
            
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={handleSearch}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Jobs
            </button>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Search className="text-emerald-400" /> External Portals
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((result, idx) => (
                  <a 
                    key={idx} 
                    href={result.finalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800" style={{ color: result.color }}>
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-lg">{result.name}</h3>
                    </div>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-1">{result.title}</p>
                    <span className="text-emerald-400 text-sm font-medium group-hover:underline">
                      View Jobs →
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-400 py-8 bg-slate-900 rounded-2xl border border-slate-800">
                Please enter a job title to search.
              </div>
            )}
          </div>
        )}

        {/* Market Insights Tabs (Trending, Top Locations, Salary) */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="text-emerald-400" /> Market Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="text-cyan-400 w-5 h-5" /> Trending Skills
              </h3>
              <div className="space-y-4">
                {JOB_MARKET_INSIGHTS.trending_skills.slice(0,5).map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-200 text-sm">{skill.name}</span>
                    <span className="text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-2 py-1 rounded-full">{skill.growth}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="text-cyan-400 w-5 h-5" /> Top Locations
              </h3>
              <div className="space-y-4">
                {JOB_MARKET_INSIGHTS.top_locations.slice(0,5).map((loc, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-200 text-sm">{loc.name}</span>
                    <span className="text-slate-400 text-xs">{loc.jobs} Jobs</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="text-cyan-400 w-5 h-5" /> Salary Insights
              </h3>
              <div className="space-y-4">
                {JOB_MARKET_INSIGHTS.salary_insights.slice(0,5).map((insight, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-slate-200 text-sm font-medium mb-1">{insight.role}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-400 font-semibold">₹ {insight.range}</span>
                      <span className="text-slate-500">{insight.experience}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Featured Companies */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Globe className="text-emerald-400" /> Featured Tech Giants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_COMPANIES.tech.map((company, idx) => (
              <a 
                key={idx}
                href={company.careers_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all block"
              >
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="font-semibold text-lg" style={{ color: company.color }}>{company.name}</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4">{company.description}</p>
                <div className="flex flex-wrap gap-2">
                  {company.categories.map((cat, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-slate-950 rounded-md border border-slate-800 text-slate-300">
                      {cat}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
