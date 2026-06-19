"use client";

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, AlertCircle, Heart, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackItem {
  id: string;
  name: string;
  rating: number;
  category: string;
  comment: string;
  recommend: boolean | null;
  date: string;
}

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('Feature Request');
  const [comment, setComment] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [recommend, setRecommend] = useState<boolean | null>(true);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem('userFeedbacks');
    if (stored) {
      setFeedbacks(JSON.parse(stored));
    } else {
      const defaultFeedbacks: FeedbackItem[] = [
        {
          id: '1',
          name: 'Ananya Sharma',
          rating: 5,
          category: 'ATS Engine',
          comment: 'The new radar chart for ATS scoring is incredible! It clearly shows me where I am lacking keywords and how to improve my formatting.',
          recommend: true,
          date: 'June 18, 2026'
        },
        {
          id: '2',
          name: 'Rohan Deshmukh',
          rating: 4,
          category: 'Course Suggestion',
          comment: 'Could we get more advanced tutorials on System Design? The existing material is great but I would love deep dives.',
          recommend: true,
          date: 'June 15, 2026'
        },
        {
          id: '3',
          name: 'David Miller',
          rating: 5,
          category: 'Live Exam Panel',
          comment: 'I really love the new skill exams feature! It helped me test my SQL and React abilities before interviews.',
          recommend: true,
          date: 'June 10, 2026'
        }
      ];
      setFeedbacks(defaultFeedbacks);
      localStorage.setItem('userFeedbacks', JSON.stringify(defaultFeedbacks));
    }

    const loggedName = localStorage.getItem('userName');
    if (loggedName) setName(loggedName);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      name: name.trim() || 'Anonymous Professional',
      rating,
      category,
      comment: comment.trim(),
      recommend,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('userFeedbacks', JSON.stringify(updated));

    setComment('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans pb-20 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Share Your <span className="text-emerald-600 dark:text-emerald-400">Feedback</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Your voice shapes NexusATS. Rate your experience, suggest features, and let us know how we can improve your career journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Feedback Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="text-emerald-500 dark:text-emerald-400 w-6 h-6" /> Write a Review
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-2">Overall Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star} type="button"
                      onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(null)}
                      className="p-1 focus:outline-none transition-transform active:scale-95 cursor-pointer"
                    >
                      <Star className={`w-8 h-8 transition-colors ${star <= (hoverRating ?? rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                    </button>
                  ))}
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-2">
                    {rating} / 5
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-2">Category</label>
                <select
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer"
                >
                  <option value="General Feedback">General Feedback</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="ATS Engine">ATS Engine Feedback</option>
                  <option value="Resume Builder">Resume Builder Feedback</option>
                  <option value="Live Exam Panel">Live Exam Panel</option>
                  <option value="Course Suggestion">Course Suggestion</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-2">Would you recommend NexusATS?</label>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setRecommend(true)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border transition-all ${recommend === true ? 'bg-emerald-50 dark:bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                    <ThumbsUp className="w-4 h-4" /> Yes
                  </button>
                  <button type="button" onClick={() => setRecommend(false)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border transition-all ${recommend === false ? 'bg-red-50 dark:bg-red-500/20 border-red-500 text-red-600 dark:text-red-400 font-bold' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                    <ThumbsDown className="w-4 h-4" /> No
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-2">Your Name (Optional)</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-2">Comments & Details</label>
                <textarea
                  value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tell us what you liked, what went wrong, or what we can add next..." rows={4} required
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                />
              </div>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 p-3 rounded-xl mt-4">
                      <Heart className="w-5 h-5 fill-emerald-500/20 flex-shrink-0" />
                      <span>Thank you! Your feedback helps us grow.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Send className="w-5 h-5" /> Submit Review
              </button>

            </form>
          </motion.div>

          {/* Feedbacks Feed List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <AlertCircle className="text-emerald-500 dark:text-emerald-400 w-6 h-6" /> Community Voice ({feedbacks.length})
              </h2>
            </div>

            <div className="space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {feedbacks.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800/50 border-dashed text-slate-500">
                    No reviews submitted yet. Be the first to leave one!
                  </motion.div>
                ) : (
                  feedbacks.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-800 dark:text-slate-100">{item.name}</h4>
                            {item.recommend === true && <span className="flex items-center text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full"><ThumbsUp className="w-3 h-3 mr-1" /> Recommends</span>}
                            {item.recommend === false && <span className="flex items-center text-[10px] uppercase font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full"><ThumbsDown className="w-3 h-3 mr-1" /> Does Not Recommend</span>}
                          </div>
                          <span className="text-xs text-slate-500 font-medium">{item.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-emerald-600 dark:text-emerald-400 font-bold">
                            {item.category}
                          </span>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-4 h-4 ${s <= item.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-800'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{item.comment}</p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
