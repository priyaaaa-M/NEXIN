import React, { useState, useEffect } from 'react';
import AcademicNavBar from './AcademicNavBar';
import AcademicSubjectCard from './AcademicSubjectCard';
import { Plus } from 'lucide-react';
import LoginModal from '../auth/LoginModal';
import ProfileModal from '../auth/ProfileModal';

const subjectCards = [];

const AcademicDesk = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for JWT in localStorage
    const token = localStorage.getItem('nexin_token');
    const userData = localStorage.getItem('nexin_user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('nexin_user', JSON.stringify(userData));
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('nexin_token');
    localStorage.removeItem('nexin_user');
  };
  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('nexin_user', JSON.stringify(updatedUser));
  };

  return (
    <div className="min-h-screen p-6 bg-main text-main flex flex-col">
      {/* Horizontal NavBar for Academic section */}
      <AcademicNavBar
        selected={selectedTab}
        onSelect={setSelectedTab}
        isLoggedIn={isLoggedIn}
        onProfileClick={() => setShowProfile(true)}
        onLoginClick={() => setShowLogin(true)}
      />
      {/* Main Section */}
      <div className="flex-1 p-8 overflow-x-auto">
        {selectedTab === 0 && (
          <div className="flex flex-wrap gap-8">
            {subjectCards.map((subject) => (
              <AcademicSubjectCard key={subject.name} subject={subject} />
            ))}
            {/* Add New Subject Card */}
            <div className="rounded-xl border-2 border-dashed border-skyblue-400 p-5 flex flex-col items-center justify-center min-w-[260px] max-w-[320px] cursor-pointer hover:bg-midnight-700 transition-all text-skyblue-400">
              <Plus className="h-8 w-8 mb-2" />
              <span className="font-bold">Add New Subject</span>
            </div>
          </div>
        )}
        {selectedTab === 1 && (
          <div className="text-xl text-skyblue-300 font-semibold">Progress Tracker Coming Soon...</div>
        )}
        {selectedTab === 2 && (
          <div className="text-xl text-purple-300 font-semibold">My Notes Coming Soon...</div>
        )}
        {selectedTab === 3 && (
          <div className="text-xl text-yellow-300 font-semibold">Resources Coming Soon...</div>
        )}
        {selectedTab === 4 && (
          <div className="text-xl text-pink-300 font-semibold">Study Planner Coming Soon...</div>
        )}
        {selectedTab === 5 && (
          <div className="text-xl text-orange-300 font-semibold">Reflection Journal Coming Soon...</div>
        )}
      </div>
      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={(userData) => {
          handleLoginSuccess(userData);
          setShowLogin(false);
        }}
      />
      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        user={user}
        onUpdate={handleProfileUpdate}
        onLogout={handleLogout}
      />
      {/* Optionally, add logout button inside ProfileModal or in nav */}
    </div>
  );
};

export default AcademicDesk;
