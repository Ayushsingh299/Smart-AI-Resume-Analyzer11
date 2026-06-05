"use client";

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, AlertCircle, Heart, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface FeedbackItem {
  id: string;
  name: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
}

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('Feature Request');
  const [comment, setComment] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Load initial feedback items or default mocks
    const stored = localStorage.getItem('userFeedbacks');
    if (stored) {
      setFeedbacks(JSON.parse(stored));
    } else {
      const defaultFeedbacks: FeedbackItem[] = [
        {
          id: '1',
          name: 'Ananya Sharma',
          rating: 5,
          category: 'General Feedback',
          comment: 'The resume builder generated a highly professional PDF. The AI bullet point recommendations are top-notch and actually bypass ATS checks.',
          date: 'June 02, 2026'
        },
        {
          id: '2',
          name: 'Rohan Deshmukh',
          rating: 4,
          category: 'Course Suggestion',
          comment: 'Could we get more advanced tutorials on System Design? The existing material is great but I would love deep dives.',
          date: 'May 28, 2026'
        },
        {
          id: '3',
          name: 'David Miller',
          rating: 5,
          category: 'Feature Request',
          comment: 'I really love the new skill exams feature! It helped me test my SQL and React abilities before interviews. Would love more test questions.',
          date: 'May 20, 2026'
        }
      ];
      setFeedbacks(defaultFeedbacks);
      localStorage.setItem('userFeedbacks', JSON.stringify(defaultFeedbacks));
    }

    // Load logged in user name if available
    const loggedName = localStorage.getItem('userName');
    if (loggedName) {
      setName(loggedName);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      name: name.trim() || 'Anonymous Developer',
      rating,
      category,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem('userFeedbacks', JSON.stringify(updated));

    // Clear form
    setComment('');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Share Your <span className="text-emerald-400">Feedback</span>
          </h1>
          <p className="text-lg text-slate-400">
            Help us improve. Rate your experience and suggest features or content.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Feedback Form Card */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="text-emerald-400 w-6 h-6" /> Write a Review
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Stars selection */}
              <div>
                <label className="text-sm font-semibold text-slate-400 block mb-2">Overall Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1 focus:outline-none transition-transform active:scale-95"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating ?? rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm font-bold text-slate-400 ml-2">
                    {rating} / 5
                  </span>
                </div>
              </div>

              {/* Category selector */}
              <div>
                <label className="text-sm font-semibold text-slate-400 block mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                >
                  <option value="General Feedback">General Feedback</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Course Suggestion">Course Suggestion</option>
                  <option value="Exam Panel Inquiry">Exam Panel Feedback</option>
                </select>
              </div>

              {/* Your Name */}
              <div>
                <label className="text-sm font-semibold text-slate-400 block mb-2">Your Name (Optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Comment text */}
              <div>
                <label className="text-sm font-semibold text-slate-400 block mb-2">Comments & Details</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you liked, what went wrong, or what we can add next..."
                  rows={5}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              {showSuccess && (
                <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                  <Heart className="w-5 h-5 fill-emerald-500/20 flex-shrink-0" />
                  <span>Thank you! Your feedback has been posted successfully.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Review
              </button>

            </form>
          </div>

          {/* Feedbacks Feed List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <AlertCircle className="text-emerald-400 w-6 h-6" /> User Reviews ({feedbacks.length})
              </h2>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {feedbacks.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800/50 border-dashed text-slate-500">
                  No reviews submitted yet. Be the first to leave one!
                </div>
              ) : (
                feedbacks.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-850 hover:border-slate-800 p-6 rounded-2xl transition-all hover:-translate-y-0.5 duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-100">{item.name}</h4>
                        <span className="text-xs text-slate-500">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md text-emerald-400 font-medium">
                          {item.category}
                        </span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${
                                s <= item.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-800'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-355 text-sm leading-relaxed whitespace-pre-wrap">{item.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
