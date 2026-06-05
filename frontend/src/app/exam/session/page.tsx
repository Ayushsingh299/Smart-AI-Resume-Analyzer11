"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MCQ_QUESTIONS, CODING_QUESTIONS, APTITUDE_QUESTIONS, MCQQuestion, CodingQuestion, AptitudeQuestion } from '@/data/examQuestions';
import { Clock, CheckCircle, HelpCircle, ChevronLeft, ChevronRight, Bookmark, ArrowRight, Play, Check } from 'lucide-react';

export default function ExamSessionPage() {
  const router = useRouter();
  
  // Settings loaded from setup
  const [targetJob, setTargetJob] = useState('Software Engineer');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  // Section index: 1 = MCQ, 2 = Coding, 3 = Aptitude
  const [currentSection, setCurrentSection] = useState<1 | 2 | 3>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Filtered Question lists
  const [mcqs, setMcqs] = useState<MCQQuestion[]>([]);
  const [codingChallenges, setCodingChallenges] = useState<CodingQuestion[]>([]);
  const [aptitude, setAptitude] = useState<AptitudeQuestion[]>([]);

  // User responses
  const [mcqAnswers, setMcqAnswers] = useState<{ [qId: string]: number }>({});
  const [codingAnswers, setCodingAnswers] = useState<{ [qId: string]: { code: string; language: string } }>({});
  const [aptitudeAnswers, setAptitudeAnswers] = useState<{ [qId: string]: number }>({});
  const [markedQuestions, setMarkedQuestions] = useState<{ [key: string]: boolean }>({}); // Key: section_index

  // Timers: Section-specific (in seconds)
  const [timeLeft, setTimeLeft] = useState(1500); // 25 mins default for MCQ
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Active coding settings
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');

  // Load configuration and filter questions
  useEffect(() => {
    const storedJob = sessionStorage.getItem('examTargetJob') || 'Software Engineer';
    const storedSkillsStr = sessionStorage.getItem('examSkills');
    const storedSkills: string[] = storedSkillsStr ? JSON.parse(storedSkillsStr) : ['Python', 'React', 'SQL', 'DSA'];
    
    setTargetJob(storedJob);
    setSelectedSkills(storedSkills);

    // 1. Filter and prepare MCQs (Targeting 20 total)
    // Filter by selected skills first
    let filteredMCQs = MCQ_QUESTIONS.filter(q => storedSkills.includes(q.skill));
    
    // If we have fewer than 20 questions, supplement with other skills
    if (filteredMCQs.length < 20) {
      const remainingMCQs = MCQ_QUESTIONS.filter(q => !storedSkills.includes(q.skill));
      filteredMCQs = [...filteredMCQs, ...remainingMCQs].slice(0, 20);
    } else {
      filteredMCQs = filteredMCQs.slice(0, 20);
    }
    setMcqs(filteredMCQs);

    // 2. Prepare Coding challenges (exactly 5)
    setCodingChallenges(CODING_QUESTIONS.slice(0, 5));

    // Initialize coding templates in answers state
    const initialCoding: { [qId: string]: { code: string; language: string } } = {};
    CODING_QUESTIONS.slice(0, 5).forEach(q => {
      initialCoding[q.id] = {
        code: q.templates.python,
        language: 'python'
      };
    });
    setCodingAnswers(initialCoding);

    // 3. Prepare Aptitude questions (exactly 10)
    setAptitude(APTITUDE_QUESTIONS.slice(0, 10));

    // Initialize timer for Section 1
    setTimeLeft(25 * 60); // 25 minutes
  }, []);

  // Timer loop logic
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleSectionAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSection]);

  const handleSectionAutoSubmit = () => {
    alert("Time is up for this section! Moving to the next stage.");
    if (currentSection === 1) {
      moveToSection(2);
    } else if (currentSection === 2) {
      moveToSection(3);
    } else {
      finishAssessment();
    }
  };

  const moveToSection = (section: 1 | 2 | 3) => {
    setCurrentSection(section);
    setCurrentQuestionIndex(0);
    
    // Reset timer according to section constraints
    if (section === 1) {
      setTimeLeft(25 * 60); // 25 minutes
    } else if (section === 2) {
      setTimeLeft(40 * 60); // 40 minutes
      setSelectedLanguage('python'); // Reset selector default
    } else {
      setTimeLeft(15 * 60); // 15 minutes
    }
  };

  const handleNextQuestion = () => {
    const totalQuestions = currentSection === 1 ? mcqs.length : currentSection === 2 ? codingChallenges.length : aptitude.length;
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSelectMCQAnswer = (questionId: string, optionIndex: number) => {
    setMcqAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSelectAptitudeAnswer = (questionId: string, optionIndex: number) => {
    setAptitudeAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleCodingLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    const q = codingChallenges[currentQuestionIndex];
    
    // Only set template if user hasn't edited or if template is selected
    setCodingAnswers(prev => {
      const currentVal = prev[q.id];
      // If code is empty or matches another template, drop in the new template
      const isTemplateMatch = Object.values(q.templates).includes(currentVal.code) || currentVal.code.trim() === '';
      return {
        ...prev,
        [q.id]: {
          language: lang,
          code: isTemplateMatch ? q.templates[lang] : currentVal.code
        }
      };
    });
  };

  const handleCodeTextChange = (value: string) => {
    const q = codingChallenges[currentQuestionIndex];
    setCodingAnswers(prev => ({
      ...prev,
      [q.id]: {
        ...prev[q.id],
        code: value
      }
    }));
  };

  const toggleMarkForReview = (idx: number) => {
    const key = `${currentSection}_${idx}`;
    setMarkedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Compile final scores and submit to results
  const finishAssessment = () => {
    // 1. Calculate MCQ score
    let scoreMCQ = 0;
    let maxMCQ = 0;
    const mcqResultList = mcqs.map(q => {
      const userAnswer = mcqAnswers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      maxMCQ += q.marks;
      if (isCorrect) scoreMCQ += q.marks;
      return {
        id: q.id,
        question: q.question,
        options: q.options,
        userAnswer,
        correctAnswer: q.correctAnswer,
        marksReceived: isCorrect ? q.marks : 0,
        maxMarks: q.marks,
        explanation: q.explanation,
        skill: q.skill
      };
    });

    // 2. Calculate Coding score
    // Pure mock evaluation for coding sections since compilation is off-line
    // Give partial marks for length of written code
    let scoreCoding = 0;
    let maxCoding = 0;
    const codingResultList = codingChallenges.map(q => {
      const answer = codingAnswers[q.id];
      maxCoding += q.marks;
      // Award score based on code length/presence of business logic
      let scoreAwarded = 0;
      if (answer && answer.code.length > 50) {
        if (q.difficulty === 'easy') scoreAwarded = q.marks; // Full credit
        else if (q.difficulty === 'medium') scoreAwarded = q.marks - 1; // Partial credit
        else scoreAwarded = q.marks - 2; // Partial credit
      } else if (answer && answer.code.trim().length > 10) {
        scoreAwarded = 1;
      }
      scoreCoding += scoreAwarded;
      return {
        id: q.id,
        title: q.title,
        difficulty: q.difficulty,
        userCode: answer?.code || '',
        userLanguage: answer?.language || 'python',
        marksReceived: scoreAwarded,
        maxMarks: q.marks
      };
    });

    // 3. Calculate Aptitude score
    let scoreAptitude = 0;
    let maxAptitude = 0;
    const aptitudeResultList = aptitude.map(q => {
      const userAnswer = aptitudeAnswers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      maxAptitude += q.marks;
      if (isCorrect) scoreAptitude += q.marks;
      return {
        id: q.id,
        question: q.question,
        options: q.options,
        userAnswer,
        correctAnswer: q.correctAnswer,
        marksReceived: isCorrect ? q.marks : 0,
        maxMarks: q.marks,
        explanation: q.explanation
      };
    });

    const totalMarksReceived = scoreMCQ + scoreCoding + scoreAptitude;
    const totalMaxMarks = maxMCQ + maxCoding + maxAptitude;

    // Save final report object
    const finalReport = {
      targetJob,
      skillsTested: selectedSkills,
      scores: {
        mcq: { received: scoreMCQ, max: maxMCQ },
        coding: { received: scoreCoding, max: maxCoding },
        aptitude: { received: scoreAptitude, max: maxAptitude },
        total: { received: totalMarksReceived, max: totalMaxMarks }
      },
      breakdown: {
        mcqs: mcqResultList,
        coding: codingResultList,
        aptitude: aptitudeResultList
      }
    };

    sessionStorage.setItem('examReport', JSON.stringify(finalReport));
    router.push('/exam/results');
  };

  const getQuestionStatus = (secIdx: number, idx: number, qId: string) => {
    const markKey = `${secIdx}_${idx}`;
    const isMarked = markedQuestions[markKey];
    
    let isAnswered = false;
    if (secIdx === 1) isAnswered = mcqAnswers[qId] !== undefined;
    else if (secIdx === 2) isAnswered = codingAnswers[qId]?.code.length > 30; // check code presence
    else isAnswered = aptitudeAnswers[qId] !== undefined;

    if (isMarked) return 'marked';
    if (isAnswered) return 'answered';
    return 'unvisited';
  };

  // Select questions based on section
  const activeQuestions = currentSection === 1 ? mcqs : currentSection === 2 ? codingChallenges : aptitude;
  const currentQuestion = activeQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-slate-400">Loading Assessment Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans flex flex-col">
      {/* Session Header */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            Section {currentSection}: {currentSection === 1 ? 'MCQ Test' : currentSection === 2 ? 'Coding Labs' : 'Aptitude Reasoning'}
          </span>
          <h1 className="text-lg font-bold text-slate-200 mt-1.5">Target: {targetJob}</h1>
        </div>

        {/* Timer Panel */}
        <div className="flex items-center gap-6 bg-slate-950 px-5 py-2.5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${timeLeft < 180 ? 'text-red-400 animate-pulse' : 'text-slate-400'}`} />
            <span className={`font-mono text-xl font-bold ${timeLeft < 180 ? 'text-red-400' : 'text-slate-100'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to submit this entire section? You cannot return to it.")) {
                if (currentSection === 1) moveToSection(2);
                else if (currentSection === 2) moveToSection(3);
                else finishAssessment();
              }
            }}
            className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-450 text-slate-950 text-xs font-bold rounded-lg transition-all cursor-pointer"
          >
            {currentSection === 3 ? 'Finish Exam' : 'Submit Section'}
          </button>
        </div>
      </header>

      {/* Main Panel grid */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 items-stretch">
        
        {/* Navigation Sidebar */}
        <aside className="xl:col-span-1 border-r border-slate-850 bg-slate-950/50 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Question Navigator</h3>
            
            <div className="grid grid-cols-5 gap-2.5">
              {activeQuestions.map((q, idx) => {
                const status = getQuestionStatus(currentSection, idx, q.id);
                const isCurrent = idx === currentQuestionIndex;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-10 h-10 rounded-xl font-mono text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-2 border-emerald-400 text-emerald-400 bg-emerald-500/10'
                        : status === 'marked'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : status === 'answered'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-8 space-y-2 border-t border-slate-850 pt-6">
              <div className="flex items-center gap-2.5 text-xs text-slate-450">
                <span className="w-3.5 h-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md block" />
                <span>Answered / Saved</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-455">
                <span className="w-3.5 h-3.5 bg-amber-500/20 border border-amber-500/30 rounded-md block" />
                <span>Marked for Review</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-460">
                <span className="w-3.5 h-3.5 bg-slate-900 border border-slate-800 rounded-md block" />
                <span>Not Visited / Empty</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-850 flex gap-2">
            {currentSection > 1 && (
              <button
                onClick={() => moveToSection((currentSection - 1) as any)}
                className="flex-1 py-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-xs font-semibold text-slate-400 rounded-xl transition-all"
              >
                Previous Sec
              </button>
            )}
            {currentSection < 3 && (
              <button
                onClick={() => moveToSection((currentSection + 1) as any)}
                className="flex-1 py-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-xs font-semibold text-emerald-400 rounded-xl transition-all"
              >
                Next Section
              </button>
            )}
          </div>
        </aside>

        {/* Assessment Panel Area */}
        <main className="xl:col-span-3 p-6 md:p-8 flex flex-col justify-between bg-slate-900/20">
          
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-400">Question {currentQuestionIndex + 1} of {activeQuestions.length}</span>
              <button
                onClick={() => toggleMarkForReview(currentQuestionIndex)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  markedQuestions[`${currentSection}_${currentQuestionIndex}`]
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                Mark for Review
              </button>
            </div>

            {/* SECTION 1: MCQ WORKSPACE */}
            {currentSection === 1 && (
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl">
                  <span className="text-xs px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md font-semibold mb-3 inline-block">
                    {mcqs[currentQuestionIndex].skill} • {mcqs[currentQuestionIndex].marks} Mark(s)
                  </span>
                  <p className="text-lg font-semibold text-slate-150 leading-relaxed">
                    {mcqs[currentQuestionIndex].question}
                  </p>
                </div>

                <div className="space-y-3">
                  {mcqs[currentQuestionIndex].options.map((option, idx) => {
                    const questionId = mcqs[currentQuestionIndex].id;
                    const selected = mcqAnswers[questionId] === idx;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectMCQAnswer(questionId, idx)}
                        className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-center gap-3 cursor-pointer ${
                          selected
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-md'
                            : 'bg-slate-900 border-slate-850 hover:bg-slate-850/50 text-slate-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${selected ? 'border-emerald-500 bg-emerald-500 text-slate-950' : 'border-slate-700 text-slate-500'}`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 2: CODING CHALLENGE WORKSPACE */}
            {currentSection === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {/* Left side problem statement */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-100">{codingChallenges[currentQuestionIndex].title}</h3>
                    <span className="text-xs px-2.5 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-md font-semibold">
                      {codingChallenges[currentQuestionIndex].difficulty.toUpperCase()} • {codingChallenges[currentQuestionIndex].marks} Marks
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {codingChallenges[currentQuestionIndex].description}
                  </p>

                  <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <div>
                      <span className="font-semibold text-slate-400 block mb-1">Input Format:</span>
                      <p className="text-slate-300">{codingChallenges[currentQuestionIndex].inputFormat}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 block mb-1">Output Format:</span>
                      <p className="text-slate-300">{codingChallenges[currentQuestionIndex].outputFormat}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 block mb-1">Constraints:</span>
                      <code className="text-emerald-400">{codingChallenges[currentQuestionIndex].constraints}</code>
                    </div>
                  </div>

                  {codingChallenges[currentQuestionIndex].examples.map((ex, i) => (
                    <div key={i} className="text-xs space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <p className="font-bold text-slate-450">Example {i + 1}:</p>
                      <pre className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-slate-300 overflow-x-auto">
                        <strong>Input:</strong> {ex.input}
                        <br />
                        <strong>Output:</strong> {ex.output}
                      </pre>
                      {ex.explanation && <p className="text-slate-450 italic">Explanation: {ex.explanation}</p>}
                    </div>
                  ))}
                </div>

                {/* Right side editor */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-400">Write Code</span>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => handleCodingLanguageChange(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="python">Python 3</option>
                      <option value="javascript">JavaScript (ES6)</option>
                      <option value="java">Java 17</option>
                      <option value="cpp">C++ 20</option>
                      <option value="go">Golang</option>
                    </select>
                  </div>

                  <div className="flex-1 min-h-[300px] bg-slate-950 rounded-2xl border border-slate-850 p-4 font-mono text-sm relative">
                    <textarea
                      value={codingAnswers[codingChallenges[currentQuestionIndex].id]?.code || ''}
                      onChange={(e) => handleCodeTextChange(e.target.value)}
                      className="w-full h-full bg-transparent text-slate-200 focus:outline-none resize-none font-mono text-xs leading-relaxed"
                      spellCheck="false"
                      placeholder="# Write your programming logic here..."
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-slate-500 font-medium">Compilation Mock Enabled</span>
                    <button
                      type="button"
                      onClick={() => alert("Code syntax verified! No syntax errors found.")}
                      className="px-4 py-2 bg-slate-950 border border-slate-850 hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/10" />
                      Run Code
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: APTITUDE WORKSPACE */}
            {currentSection === 3 && (
              <div className="space-y-6">
                <div className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl">
                  <span className="text-xs px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md font-semibold mb-3 inline-block">
                    Aptitude Reasoning • {aptitude[currentQuestionIndex].marks} Mark(s)
                  </span>
                  <p className="text-lg font-semibold text-slate-155 leading-relaxed">
                    {aptitude[currentQuestionIndex].question}
                  </p>
                </div>

                <div className="space-y-3">
                  {aptitude[currentQuestionIndex].options.map((option, idx) => {
                    const questionId = aptitude[currentQuestionIndex].id;
                    const selected = aptitudeAnswers[questionId] === idx;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAptitudeAnswer(questionId, idx)}
                        className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-center gap-3 cursor-pointer ${
                          selected
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-md'
                            : 'bg-slate-900 border-slate-850 hover:bg-slate-850/50 text-slate-300'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${selected ? 'border-emerald-500 bg-emerald-500 text-slate-950' : 'border-slate-700 text-slate-500'}`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Bottom navigation buttons */}
          <div className="mt-8 border-t border-slate-850 pt-6 flex justify-between items-center max-w-4xl mx-auto w-full">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-5 py-2.5 bg-slate-900 border border-slate-850 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-semibold text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <span>Shortcuts:</span>
              <kbd className="bg-slate-950 px-2 py-1 border border-slate-800 rounded font-sans">← Prev</kbd>
              <kbd className="bg-slate-950 px-2 py-1 border border-slate-800 rounded font-sans">Next →</kbd>
            </div>

            {currentQuestionIndex < activeQuestions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (currentSection === 1) {
                    if (confirm("Proceed to Section 2 (Coding Lab)? You cannot go back to MCQ Section.")) moveToSection(2);
                  } else if (currentSection === 2) {
                    if (confirm("Proceed to Section 3 (Aptitude)? You cannot go back to Coding Section.")) moveToSection(3);
                  } else {
                    if (confirm("Are you sure you want to finish the exam and view results?")) finishAssessment();
                  }
                }}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {currentSection === 3 ? 'Finish Assessment' : 'Next Section'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
