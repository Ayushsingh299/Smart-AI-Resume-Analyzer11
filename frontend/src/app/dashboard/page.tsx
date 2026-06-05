"use client";

import React from 'react';
import Link from 'next/link';
import { Briefcase, LayoutDashboard, Users, FileText, Target, TrendingUp, Download, CheckCircle2, ShieldAlert } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  
  // Static mock data for now, since backend DB integration for metrics is pending.
  const metrics = {
    totalResumes: 248,
    avgAtsScore: 78,
    highPerforming: 156,
    successRate: 63
  };

  const recentSubmissions = [
    { id: 1, name: "Rehan Ahmed", role: "Software Engineer", date: "Today", score: 82, status: "High" },
    { id: 2, name: "Sarah Connor", role: "Data Scientist", date: "Yesterday", score: 91, status: "High" },
    { id: 3, name: "John Doe", role: "Frontend Developer", date: "Yesterday", score: 65, status: "Needs Work" },
    { id: 4, name: "Alice Smith", role: "Product Manager", date: "2 days ago", score: 76, status: "Good" },
    { id: 5, name: "Bob Johnson", role: "DevOps Engineer", date: "2 days ago", score: 54, status: "Needs Work" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-20 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <LayoutDashboard className="text-emerald-400 w-8 h-8" />
              Global Analytics Dashboard
            </h1>
            <p className="text-slate-400">Track resume performance and user insights.</p>
          </div>
          
          <button className="mt-4 md:mt-0 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium py-2 px-6 rounded-xl transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="w-24 h-24 text-blue-400 transform translate-x-4 -translate-y-4" />
            </div>
            <p className="text-slate-400 font-medium mb-1 relative z-10">Total Resumes Processed</p>
            <h2 className="text-4xl font-bold text-slate-100 mb-2 relative z-10">{metrics.totalResumes}</h2>
            <div className="flex items-center gap-2 text-sm relative z-10">
              <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
              <span className="text-slate-500">vs last week</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target className="w-24 h-24 text-emerald-400 transform translate-x-4 -translate-y-4" />
            </div>
            <p className="text-slate-400 font-medium mb-1 relative z-10">Average ATS Score</p>
            <h2 className="text-4xl font-bold text-slate-100 mb-2 relative z-10">{metrics.avgAtsScore}/100</h2>
            <div className="flex items-center gap-2 text-sm relative z-10">
              <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +3%
              </span>
              <span className="text-slate-500">vs last week</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 className="w-24 h-24 text-cyan-400 transform translate-x-4 -translate-y-4" />
            </div>
            <p className="text-slate-400 font-medium mb-1 relative z-10">High Performing (80+)</p>
            <h2 className="text-4xl font-bold text-slate-100 mb-2 relative z-10">{metrics.highPerforming}</h2>
            <div className="flex items-center gap-2 text-sm relative z-10">
              <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18%
              </span>
              <span className="text-slate-500">vs last week</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-24 h-24 text-purple-400 transform translate-x-4 -translate-y-4" />
            </div>
            <p className="text-slate-400 font-medium mb-1 relative z-10">Interview Success Rate</p>
            <h2 className="text-4xl font-bold text-slate-100 mb-2 relative z-10">{metrics.successRate}%</h2>
            <div className="flex items-center gap-2 text-sm relative z-10">
              <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +5%
              </span>
              <span className="text-slate-500">vs last month</span>
            </div>
          </div>

        </div>

        {/* Charts & Tables Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Table */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              Recent Submissions
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-sm text-slate-400">
                    <th className="pb-3 px-2 font-medium">Name</th>
                    <th className="pb-3 px-2 font-medium">Target Role</th>
                    <th className="pb-3 px-2 font-medium">Date</th>
                    <th className="pb-3 px-2 font-medium">ATS Score</th>
                    <th className="pb-3 px-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.map((sub, i) => (
                    <tr key={sub.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                      <td className="py-4 px-2 font-medium">{sub.name}</td>
                      <td className="py-4 px-2 text-slate-400">{sub.role}</td>
                      <td className="py-4 px-2 text-slate-400 text-sm">{sub.date}</td>
                      <td className="py-4 px-2 font-bold">{sub.score}</td>
                      <td className="py-4 px-2">
                        {sub.status === "High" && <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">High</span>}
                        {sub.status === "Good" && <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20">Good</span>}
                        {sub.status === "Needs Work" && <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium border border-amber-500/20">Needs Work</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>

          {/* Sidebar Area */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ShieldAlert className="text-amber-400 w-5 h-5" />
              Common Issues
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Missing Keywords</span>
                  <span className="text-amber-400 font-bold">45%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Poor Formatting</span>
                  <span className="text-red-400 font-bold">28%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-red-400 h-1.5 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">No Metrics</span>
                  <span className="text-blue-400 font-bold">62%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <p className="text-sm text-emerald-400 font-medium text-center">
                Note: Backend database integration is required to show real-time live data on this dashboard. Currently displaying demo metrics.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
