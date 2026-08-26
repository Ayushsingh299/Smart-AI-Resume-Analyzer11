"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Validation/Error/Success states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError('');
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000');
        const res = await fetch(`${apiUrl}/api/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            token: tokenResponse.access_token
          })
        });
        
        if (!res.ok) {
          throw new Error('Google authentication failed');
        }
        const data = await res.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('isLoggedIn', 'true');
        
        const userRes = await fetch(`${apiUrl}/api/auth/me`, {
          credentials: 'include'
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          localStorage.setItem('userEmail', userData.email);
          localStorage.setItem('userName', userData.full_name);
        }
        
        window.dispatchEvent(new Event('storage'));
        router.push('/');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google Login Failed');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (activeTab === 'signup' && !name) {
      setError('Please enter your full name.');
      return;
    }

    if (activeTab === 'signup' && !agreeTerms) {
      setError('You must agree to the Terms of Service.');
      return;
    }

    setLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000');
      const endpoint = activeTab === 'login' ? `${apiUrl}/api/auth/login` : `${apiUrl}/api/auth/register`;
      const body = activeTab === 'login' 
        ? new URLSearchParams({ username: email, password: password }).toString()
        : JSON.stringify({ email, password, full_name: name });
      
      const headers = activeTab === 'login'
        ? { 'Content-Type': 'application/x-www-form-urlencoded' }
        : { 'Content-Type': 'application/json' };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Authentication failed');
      }

      const data = await res.json();
      
      if (activeTab === 'signup') {
        // Automatically log in after registration
        const loginRes = await fetch(`${apiUrl}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ username: email, password: password }).toString()
        });
        
        if (!loginRes.ok) {
          throw new Error('Registration successful, but auto-login failed. Please sign in manually.');
        }
        
        const loginData = await loginRes.json();
        localStorage.setItem('token', loginData.access_token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userName', data.full_name);
        
        setSuccess('Account registered and logged in successfully!');
        window.dispatchEvent(new Event('storage'));
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('isLoggedIn', 'true');
        
        const userRes = await fetch(`${apiUrl}/api/auth/me`, {
          credentials: 'include'
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          localStorage.setItem('userEmail', userData.email);
          localStorage.setItem('userName', userData.full_name);
        }
        
        setSuccess('Successfully logged in!');
        window.dispatchEvent(new Event('storage'));
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] -z-10" />

        <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative">
          
          {/* Top header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
              Welcome to NexusATS
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Access your personalized career ecosystem</p>
          </div>

          {/* Custom Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 p-1 bg-slate-100 dark:bg-slate-950/50 rounded-xl">
            <button
              onClick={() => {
                setActiveTab('login');
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'login'
                  ? 'bg-emerald-500 text-white dark:text-slate-950 shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('signup');
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'signup'
                  ? 'bg-emerald-500 text-white dark:text-slate-950 shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Password</label>
                {activeTab === 'login' && (
                  <button 
                    type="button"
                    onClick={async () => {
                      if (!email) {
                        setError('Please enter your email address to reset your password.');
                        setSuccess('');
                      } else {
                        try {
                          const apiUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000');
                          const res = await fetch(`${apiUrl}/api/auth/forgot-password`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email })
                          });
                          const data = await res.json();
                          if (res.ok) {
                            setSuccess(data.message || 'Password reset link sent to your email.');
                            setError('');
                          } else {
                            setError(data.detail || 'Failed to send reset link.');
                            setSuccess('');
                          }
                        } catch (err) {
                          setError('Failed to connect to the server.');
                          setSuccess('');
                        }
                      }
                    }}
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {activeTab === 'signup' && (
              <div className="flex items-start gap-2 mt-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 accent-emerald-500 rounded border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="agree" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer selection:bg-transparent">
                  I agree to the <span className="text-emerald-600 dark:text-emerald-400 hover:underline">Terms of Service</span> and <span className="text-emerald-600 dark:text-emerald-400 hover:underline">Privacy Policy</span>.
                </label>
              </div>
            )}

            {/* Notification messages */}
            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 disabled:opacity-50 text-white dark:text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social login divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <span className="relative bg-white dark:bg-slate-900 px-3 text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          {/* Social sign in */}
          <button
            type="button"
            disabled={loading}
            onClick={() => googleLogin()}
            className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google
          </button>
        </div>
      </main>
    </div>
  );
}
