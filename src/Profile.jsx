import React, { useState, useRef } from 'react';
import { Flame, Trophy, Target, Clock, Settings, Edit2, Camera, Save, X } from 'lucide-react';
import { useUser } from './context/UserContext';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, updateProfile, handleAvatarUpload } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);

    // Local state for form editing
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
    });

    const handleEditClick = () => {
        setFormData({ name: user.name, username: user.username });
        setIsEditing(true);
    };

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleAvatarUpload(file);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Profile Card */}
            <div className="md:col-span-1 space-y-6">
                <div className="glass-card p-6 text-center relative overflow-hidden border-white/10">
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-emerald-600 to-teal-600 opacity-20" />

                    <div className="relative">
                        <div className="group relative w-28 h-28 mx-auto mb-4">
                            <div className="w-full h-full rounded-full bg-[#18181b] border-4 border-[#09090b] shadow-xl overflow-hidden flex items-center justify-center relative z-10">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-3xl font-bold text-gray-400">{user.name.charAt(0)}</span>
                                )}
                            </div>

                            {/* Camera Icon Overlay */}
                            <button
                                onClick={triggerFileInput}
                                className="absolute bottom-0 right-0 p-2 bg-emerald-600 rounded-full text-white shadow-lg hover:bg-emerald-500 transition-colors z-20 cursor-pointer"
                                title="Change Photo"
                            >
                                <Camera size={16} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={onFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        {isEditing ? (
                            <div className="space-y-3 px-2">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center font-bold text-white focus:outline-none focus:border-emerald-500"
                                    placeholder="Your Name"
                                />
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-center text-sm text-gray-300 focus:outline-none focus:border-emerald-500"
                                    placeholder="@username"
                                />
                                <div className="flex gap-2 justify-center mt-2">
                                    <button onClick={handleSave} className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30"><Save size={18} /></button>
                                    <button onClick={handleCancel} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"><X size={18} /></button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-white">
                                    {user.name}
                                    <button onClick={handleEditClick} className="text-gray-500 hover:text-white transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                </h2>
                                <p className="text-gray-400">{user.username}</p>
                                <p className="text-sm text-gray-400 mt-2 italic opacity-60 font-medium">Joined {user.joinedDate}</p>
                            </>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
                        <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-gray-300 transition-all">
                            <Settings size={16} /> Settings
                        </button>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-4 flex flex-col items-center justify-center gap-1 border-emerald-500/20 bg-emerald-500/5">
                        <Flame size={24} className="text-emerald-500 mb-1" fill="currentColor" />
                        <span className="text-2xl font-black text-white">{user.streak}</span>
                        <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Streak</span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-4 flex flex-col items-center justify-center gap-1 border-yellow-500/20 bg-yellow-500/5">
                        <Trophy size={24} className="text-yellow-500 mb-1" />
                        <span className="text-2xl font-black text-white">{user.xp}</span>
                        <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Total XP</span>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-6">

                {/* Achievements Segment */}
                <div className="space-y-4">
                    <h3 className="text-lg font-black px-1 flex items-center gap-2 uppercase tracking-widest text-white/80">
                        <Trophy size={20} className="text-yellow-500" /> Professional Feats
                    </h3>
                    <div className="glass-card p-6 border-white/5">
                        <div className="space-y-6">
                            {[
                                { title: 'Early Bird', desc: 'Solved a problem before sunrise', icon: '🌅', color: 'emerald' },
                                { title: 'Math Whiz', desc: 'Score 100% in Number System', icon: '🎯', color: 'emerald' },
                                { title: 'Critical Thinker', desc: 'Complete 10 reasoning modules', icon: '🧠', color: 'emerald' },
                            ].map((ach, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-5 p-3 rounded-2xl hover:bg-white/5 transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                                        {ach.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-100">{ach.title}</h4>
                                        <p className="text-sm text-gray-500">{ach.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <button className="w-full py-3 text-center text-xs font-black uppercase tracking-widest text-gray-500 hover:text-emerald-400 transition-colors">View All Achievements</button>
                        </div>
                    </div>
                </div>

                {/* Learning Stats */}
                <div className="space-y-4">
                    <h3 className="text-lg font-black px-1 flex items-center gap-2 uppercase tracking-widest text-white/80">
                        <Target size={20} className="text-emerald-500" /> Progress Overview
                    </h3>
                    <div className="glass-card p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[200px] border-white/5">
                        <div className="p-4 bg-emerald-500/10 rounded-full">
                            <Clock size={32} className="text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Learning Activity is being tracked...</p>
                            <p className="text-emerald-400/60 text-xs font-bold mt-1 uppercase tracking-tighter">Next Milestone: Expert Level</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Profile;
