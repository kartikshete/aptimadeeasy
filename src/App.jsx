import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import TopicSelection from './TopicSelection';
import QuizScreen from './QuizScreen';
import Profile from './Profile';
import Leaderboard from './Leaderboard';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#09090b] text-white font-['Plus_Jakarta_Sans']">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/topics/:categoryId" element={<TopicSelection />} />
              <Route path="/quiz/:topicId" element={<QuizScreen />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
          <footer className="py-8 border-t border-white/5 text-center bg-[#09090b]">
            <p className="text-gray-600 text-sm font-medium">Powered by Raj Technologies | Kartik Shete</p>
          </footer>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
