import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { questions } from './data/questions';
import { categories } from './data/curriculum';

import { useUser } from './context/UserContext';

const QuizScreen = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { addXp } = useUser();

    // Find the topic details from curriculum to get title etc.
    const allTopics = categories.flatMap(c => c.sections.flatMap(s => s.topics));
    const topic = allTopics.find(t => t.id === topicId) || { id: topicId, title: "Unknown Topic" };

    const onBack = () => {
        navigate(-1);
    }
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds

    // Shuffling logic to ensure correct answers aren't always in the same position
    useEffect(() => {
        const rawQuestions = questions[topicId] || [];
        if (rawQuestions.length > 0) {
            const processed = rawQuestions
                .filter(q => q.options && Array.isArray(q.options) && q.options.length > 0) // Filter invalid questions
                .map(q => {
                    const correctAnswerText = q.options[q.correctAnswer];
                    // Use a proper shuffle algorithm (Fisher-Yates) or a stable sort
                    const optionsWithOrig = q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.correctAnswer }));
                    const shuffled = [...optionsWithOrig].sort(() => Math.random() - 0.5);

                    return {
                        ...q,
                        options: shuffled.map(s => s.text),
                        correctAnswer: shuffled.findIndex(s => s.isCorrect)
                    };
                });
            setShuffledQuestions(processed);
        } else {
            setShuffledQuestions([]);
        }
        // Reset state when topic changes
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowResult(false);
        setScore(0);
        setIsAnswered(false);
        setTimeLeft(3600);
    }, [topicId]);

    // Timer logic
    useEffect(() => {
        if (showResult || shuffledQuestions.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowResult(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showResult, shuffledQuestions.length]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        if (index === shuffledQuestions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            addXp(score * 10);
            setShowResult(true);
        }
    };

    if (shuffledQuestions.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#09090b]">
                <h2 className="text-3xl font-bold mb-4 text-white">Coming Soon!</h2>
                <p className="text-gray-400 mb-8 text-center max-w-md">We are currently adding quality questions for {topic.title}. Stay tuned!</p>
                <button onClick={onBack} className="btn-primary">Go Back</button>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#09090b]">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-card p-10 max-w-md w-full text-center border-white/10"
                >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
                        <LucideIcons.Trophy size={40} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-white">Quiz Completed!</h2>
                    <p className="text-gray-400 mb-8 text-sm">Well done! You've completed the {topic.title} module.</p>

                    <div className="relative inline-block mb-10">
                        <div className="text-6xl font-black active-gradient-text tracking-tighter">
                            {Math.round((score / shuffledQuestions.length) * 100)}%
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Score</p>
                            <p className="text-2xl font-black text-white">{score}/{shuffledQuestions.length}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Accuracy</p>
                            <p className="text-2xl font-black text-emerald-400">
                                {Math.round((score / shuffledQuestions.length) * 100)}%
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-400 mb-8 font-medium">
                        {Math.round((score / shuffledQuestions.length) * 100) >= 70
                            ? "🎉 Fantastic! You've mastered this topic."
                            : "Keep practicing! You're making progress every step."}
                    </p>

                    <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10 mb-8 text-center">
                        <p className="text-[10px] text-emerald-500/60 uppercase font-bold tracking-widest mb-1">Total XP Earned</p>
                        <p className="text-xl font-black text-emerald-400">+{score * 10} XP</p>
                    </div>

                    <button onClick={onBack} className="btn-primary w-full justify-center py-4 rounded-2xl">
                        Continue Path
                    </button>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

    return (
        <div className="min-h-screen bg-[#09090b]">
            <div className="max-w-4xl mx-auto p-6 lg:p-12">
                <div className="flex justify-between items-center mb-10">
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-bold text-sm">
                        <LucideIcons.X size={18} /> Quit
                    </button>

                    <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                        <LucideIcons.Timer size={18} className={timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'} />
                        <span className={`font-black tabular-nums ${timeLeft < 300 ? 'text-rose-500' : 'text-white'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    <div className="text-gray-500 font-black text-sm tabular-nums">
                        {currentQuestionIndex + 1} / {shuffledQuestions.length}
                    </div>
                </div>

                <div className="mb-8">
                    <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20"
                        />
                    </div>
                </div>

                <div className="space-y-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuestionIndex}
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-10"
                        >
                            <div className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                                        Question {currentQuestionIndex + 1}
                                    </span>
                                    <div className="h-[1px] flex-grow bg-white/5" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold leading-snug text-white">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {currentQuestion.options.map((option, idx) => {
                                    let statusClass = "border-white/5 bg-white/5 hover:bg-white/[0.08] hover:border-white/10";
                                    let iconColor = "text-gray-500";

                                    if (isAnswered) {
                                        if (idx === currentQuestion.correctAnswer) {
                                            statusClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                                            iconColor = "text-emerald-400";
                                        } else if (idx === selectedOption) {
                                            statusClass = "border-rose-500/50 bg-rose-500/10 text-rose-400";
                                            iconColor = "text-rose-400";
                                        } else {
                                            statusClass = "border-white/5 opacity-40";
                                        }
                                    } else if (selectedOption === idx) {
                                        statusClass = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                                        iconColor = "text-emerald-400";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(idx)}
                                            disabled={isAnswered}
                                            className={`p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden group flex items-center justify-between ${statusClass}`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black border transition-colors ${isAnswered && idx === currentQuestion.correctAnswer ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/10 text-gray-400 bg-white/5'}`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <span className="md:text-lg font-bold">{option}</span>
                                            </div>

                                            {isAnswered && idx === currentQuestion.correctAnswer && (
                                                <LucideIcons.CheckCircle2 className="text-emerald-400" size={24} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {isAnswered && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="mt-10 p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 relative overflow-hidden"
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                                        <LucideIcons.Info size={120} />
                                    </div>
                                    <div className="flex items-start gap-5 relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                            <LucideIcons.BookOpen size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm uppercase tracking-widest text-emerald-400 mb-2">Detailed Insight</h4>
                                            <p className="text-gray-300 leading-relaxed font-medium">
                                                {currentQuestion.explanation || "This question tests your conceptual understanding of the topic. Review the logic used to arrive at the correct answer."}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-10 flex justify-end relative z-50">
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="btn-primary px-10 py-4 rounded-2xl group cursor-pointer relative z-50"
                                            style={{ pointerEvents: 'auto' }}
                                        >
                                            {currentQuestionIndex === shuffledQuestions.length - 1 ? 'Finish Module' : 'Continue'}
                                            <LucideIcons.ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default QuizScreen;
