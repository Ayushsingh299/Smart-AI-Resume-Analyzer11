"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, User, Menu, X, LogOut, FileText, CheckSquare, Award, Star } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        setUserEmail(localStorage.getItem('userEmail') || 'user@example.com');
      }
    };
    
    checkLogin();
    // Listen for storage changes to sync login status across tabs
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/analyzer', label: 'Analyzer' },
    { href: '/builder', label: 'Builder' },
    { href: '/jobs', label: 'Job Search' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/recommendations', label: 'Recommendations' },
    { href: '/exam', label: 'Skill Exam' },
    { href: '/feedback', label: 'Feedback' },
  ];

  return (
    <nav className="border-b border-slate-800 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Briefcase className="w-8 h-8 text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              AI Resume Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1 justify-center flex-1 mx-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-400 bg-emerald-500/10 border-b border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Auth Button */}
          <div className="hidden xl:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-1.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-slate-400">Logged in</span>
                  <span className="text-xs font-semibold text-slate-200 max-w-[120px] truncate">{userEmail}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-sm font-semibold text-white transition-all flex items-center gap-2"
              >
                <User className="w-4 h-4 text-emerald-400" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center gap-3">
            {isLoggedIn && (
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                {userEmail.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-lg px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-500/10 border-l-4 border-emerald-500'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-850">
            {isLoggedIn ? (
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-200 max-w-[150px] truncate">{userEmail}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-bold text-sm transition-all"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
