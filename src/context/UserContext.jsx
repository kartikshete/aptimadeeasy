import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    // Load from LocalStorage or default
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('apti_user');
        return saved ? JSON.parse(saved) : {
            name: 'Learner',
            username: '@apti_master',
            avatar: null, // null means default
            joinedDate: 'January 2026',
            xp: 0,
            streak: 1,
            league: 'Bronze'
        };
    });

    // Save to LocalStorage whenever user changes
    useEffect(() => {
        localStorage.setItem('apti_user', JSON.stringify(user));
    }, [user]);

    const updateProfile = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    const addXp = (amount) => {
        setUser(prev => ({ ...prev, xp: prev.xp + amount }));
    };

    const handleAvatarUpload = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProfile({ avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateProfile, addXp, handleAvatarUpload }}>
            {children}
        </UserContext.Provider>
    );
};
