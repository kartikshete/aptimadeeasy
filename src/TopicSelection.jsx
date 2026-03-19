import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { categories } from './data/curriculum';

const TopicSelection = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const category = categories.find(c => c.id === categoryId);

    if (!category) return <div className="text-white p-20 text-center">Category not found</div>;

    const onSelectTopic = (topic) => {
        navigate(`/quiz/${topic.id}`, { state: { categoryName: category.title } });
    };

    return (
        <div className="page-container max-w-5xl">
            <Link
                to="/"
                className="flex items-center gap-2 text-gray-500 hover:text-emerald-400 transition-colors mb-10 w-fit font-bold text-sm"
            >
                <LucideIcons.ArrowLeft size={18} /> Back to Quests
            </Link>

            <div className="mb-12 relative">
                <div className="absolute -left-12 top-0 bottom-0 w-1.5 bg-emerald-500/20 rounded-full hidden lg:block" />
                <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-4xl lg:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200"
                >
                    {category.title}
                </motion.h2>
                <p className="text-gray-400 text-lg font-medium">{category.description}</p>
            </div>

            <div className="space-y-12">
                {category.sections.map((section, sIdx) => (
                    <div key={sIdx} className="relative">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                <LucideIcons.LayoutGrid size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-200 tracking-tight">
                                {section.title}
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {section.topics.map((topic, tIdx) => {
                                const Icon = LucideIcons[topic.icon] || LucideIcons.HelpCircle;
                                return (
                                    <motion.div
                                        key={topic.id}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + tIdx * 0.05 }}
                                        onClick={() => onSelectTopic(topic)}
                                        className="glass-card p-6 cursor-pointer group hover:bg-[#1f1f23] flex items-center gap-5 border border-white/5"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                            <Icon size={22} />
                                        </div>

                                        <div className="flex-grow">
                                            <h4 className="font-bold text-gray-200 group-hover:text-white transition-colors">
                                                {topic.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                                    {topic.count} Questions
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                                            <LucideIcons.ChevronRight size={16} className="text-emerald-400" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicSelection;
