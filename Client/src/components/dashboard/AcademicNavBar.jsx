import React from 'react';
import { BookOpen, BarChart2, FileText, Calendar, Star, User } from 'lucide-react';

const menuItems = [
  { label: 'Subjects', icon: <BookOpen className="text-blue-400" /> },
  { label: 'Progress Tracker', icon: <BarChart2 className="text-green-400" /> },
  { label: 'My Notes', icon: <FileText className="text-purple-400" /> },
  { label: 'Resources', icon: <FileText className="text-yellow-400" /> },
  { label: 'Study Planner', icon: <Calendar className="text-pink-400" /> },
  { label: 'Reflection Journal', icon: <Star className="text-orange-400" /> },
];

const AcademicNavBar = ({ selected, onSelect, isLoggedIn, onProfileClick, onLoginClick }) => (
  <nav className="w-full flex justify-center items-center gap-6 bg-midnight-800 border-b border-midnight-300 py-3 mb-8 rounded-b-xl shadow-md">
    {menuItems.map((item, idx) => (
      <button
        key={item.label}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all text-base hover:bg-midnight-700 focus:outline-none ${selected === idx ? 'bg-midnight-600 text-skyblue-400 shadow-lg' : 'text-gray-300'}`}
        onClick={() => onSelect(idx)}
      >
        {item.icon}
        {item.label}
      </button>
    ))}
    {/* Profile button (always after Journal) */}
    {isLoggedIn ? (
      <button
        className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all text-base bg-midnight-600 text-purple-300 shadow-lg hover:bg-midnight-700 focus:outline-none"
        onClick={onProfileClick}
      >
        <User className="text-purple-400" />
        Profile
      </button>
    ) : (
      <button
        className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all text-base bg-purple-700 text-main shadow-lg hover:bg-purple-800 focus:outline-none"
        onClick={onLoginClick}
      >
        <User className="text-main" />
        Login
      </button>
    )}
  </nav>
);

export default AcademicNavBar;
