import React from 'react';
import { Trophy, Medal, User, Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from './context/UserContext';

const rankingData = [
    { rank: 1, name: 'Sanket Patel', xp: 2450, avatar: 'SP', league: 'Master', current: false },
    { rank: 2, name: 'Priya Sharma', xp: 2300, avatar: 'PS', league: 'Master', current: false },
    { rank: 3, name: 'Rohit Verma', xp: 1950, avatar: 'RV', league: 'Expert', current: false },
    { rank: 4, name: 'Ananya Iyer', xp: 1800, avatar: 'AI', league: 'Expert', current: false },
    { rank: 5, name: 'Vikram Singh', xp: 1650, avatar: 'VS', league: 'Intermediate', current: false },
];

const Leaderboard = () => {
    const { user } = useUser();

    // Insert current user into the list if not there, or update current user rank based on XP
    // For demo purposes, we'll just append them at the end with their actual XP
    const displayUsers = [...rankingData];

    // Add current user if not already present in demo data
    const currentUserInTable = {
        rank: '?',
        name: user.name + ' (You)',
        xp: user.xp,
        avatar: user.name.charAt(0),
        league: user.league,
        current: true
    };

    displayUsers.push(currentUserInTable);

    return (
        <div className="max-w-3xl mx-auto py-12 px-6 space-y-10">

            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-6 bg-emerald-500/10 rounded-full mb-2 ring-4 ring-emerald-500/5 animate-bounce">
                    <Trophy size={48} className="text-emerald-500" fill="currentColor" />
                </div>
                <div>
                    <h1 className="text-4xl font-black active-gradient-text tracking-tighter uppercase italic">Apti Legends</h1>
                    <p className="text-gray-500 text-sm font-bold tracking-widest uppercase mt-2">The Absolute Rankings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {displayUsers.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                            flex items-center justify-between p-5 rounded-[2rem] border transition-all relative overflow-hidden group
                            ${item.current
                                ? 'bg-emerald-500/10 border-emerald-500/50 shadow-xl shadow-emerald-500/10'
                                : 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-white/10'}
                        `}
                    >
                        {item.current && (
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Star size={60} fill="currentColor" className="text-emerald-400" />
                            </div>
                        )}

                        <div className="flex items-center gap-6 relative z-10">
                            <span className={`
                                w-10 font-black text-center text-lg
                                ${index === 0 ? 'text-yellow-400' :
                                    index === 1 ? 'text-gray-400' :
                                        index === 2 ? 'text-orange-500' : 'text-gray-600'}
                            `}>
                                {item.rank === '?' ? index + 1 : item.rank}
                            </span>

                            <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg border-2
                                ${item.current
                                    ? 'bg-emerald-500 border-white/20 text-white'
                                    : 'bg-white/5 border-white/10 text-gray-400'}
                            `}>
                                {item.avatar}
                            </div>

                            <div>
                                <h3 className={`font-bold flex items-center gap-2 ${item.current ? 'text-white' : 'text-gray-200'}`}>
                                    {item.name}
                                    {item.current && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">You</span>}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-none">{item.league}</span>
                                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center gap-0.5">
                                        Active <ArrowUpRight size={10} />
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 relative z-10">
                            <div className="text-right">
                                <span className="block font-black text-xl text-emerald-400">{item.xp} <span className="text-[10px] text-gray-500">XP</span></span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                {index < 3 ? (
                                    <Medal size={20} className={index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-orange-500'} />
                                ) : (
                                    <Star size={18} className="text-gray-700" />
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-6 border-white/5 bg-white/[0.02] text-center rounded-[2.5rem]">
                <p className="text-gray-500 text-sm italic">Rankings are updated every 24 hours based on solving activity.</p>
            </div>
        </div>
    );
};

export default Leaderboard;
