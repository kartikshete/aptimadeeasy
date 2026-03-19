import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, User, Target, Flame } from 'lucide-react';
import { useUser } from './context/UserContext';

const Navbar = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            <BookOpen size={20} className="text-white" />
                        </div>
                        <span className="font-bold text-xl font-['Outfit'] tracking-tight text-white hidden sm:block">
                            Apti<span className="text-emerald-400">MadeEasy</span>
                        </span>
                    </NavLink>
                </div>

                {/* Navigation Links - Centered Pills */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 absolute left-1/2 -translate-x-1/2">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Quests
                    </NavLink>
                    <NavLink
                        to="/leaderboard"
                        className={({ isActive }) => `px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Leaderboard
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) => `px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Profile
                    </NavLink>
                </div>

                {/* Right Side Actions - Stats */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold text-sm">
                        <Flame size={16} /> {user.streak}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-bold text-sm">
                        <Trophy size={16} /> {user.xp}
                    </div>
                    <button
                        onClick={() => navigate('/profile')}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 overflow-hidden shadow-lg shadow-black/20"
                    >
                        {user.avatar ? (
                            <img src={user.avatar} alt="P" className="w-full h-full object-cover" />
                        ) : (
                            <User size={20} className="text-gray-400" />
                        )}
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
