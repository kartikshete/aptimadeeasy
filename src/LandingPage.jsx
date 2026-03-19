import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { categories } from './data/curriculum';
import * as LucideIcons from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 relative min-h-screen">

            <div className="text-center space-y-3 mb-16 relative z-10 transition-all duration-500">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 pb-2"
                >
                    Aptitude Mastery Path
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 font-medium"
                >
                    Master Quantitative, Logical & Verbal skills step-by-step.
                </motion.p>
            </div>

            <div className="relative flex flex-col items-center gap-8">
                {/* Connecting Path Line */}
                <div className="quest-path-line" />

                {categories.map((category, idx) => {
                    const Icon = LucideIcons[category.icon];

                    return (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.5 }}
                            className="relative group w-full"
                        >
                            <div
                                onClick={() => navigate(`/topics/${category.id}`)}
                                className="glass-card p-6 flex items-center justify-between gap-6 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                                        <Icon size={30} strokeWidth={2} />
                                    </div>

                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-xl text-white group-hover:text-emerald-400 transition-colors">{category.title}</h3>
                                        <div className="flex items-center gap-2 text-sm mt-1">
                                            <span className="text-yellow-500 flex items-center gap-1 font-bold">
                                                <LucideIcons.Star size={14} fill="currentColor" /> {category.sections.length * 50} XP
                                            </span>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-gray-400 font-medium">{category.sections.reduce((acc, s) => acc + s.topics.length, 0)} Topics</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="hidden sm:block px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-emerald-500 hover:border-emerald-400 transition-all duration-300">
                                    Start
                                </button>
                                <LucideIcons.ChevronRight className="sm:hidden text-gray-600 group-hover:text-emerald-400 transition-colors" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

        </div>
    );
};

export default LandingPage;


