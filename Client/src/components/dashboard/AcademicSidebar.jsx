import React from 'react';
import { BookOpen, BarChart2, FileText, Calendar, Star, NotebookPen } from 'lucide-react';

const menuItems = [
  { label: 'Subjects', icon: <BookOpen className="text-blue-400" /> },
  { label: 'Progress Tracker', icon: <BarChart2 className="text-green-400" /> },
  { label: 'My Notes', icon: <FileText className="text-purple-400" /> },
  { label: 'Resources', icon: <FileText className="text-yellow-400" /> },
  { label: 'Study Planner', icon: <Calendar className="text-pink-400" /> },
  { label: 'Reflection Journal', icon: <Star className="text-orange-400" /> },
];

const AcademicSidebar = ({ selected, onSelect }) => (
  <aside className="w-64 min-h-full bg-midnight-800 border-r border-midnight-300 flex flex-col p-6">
    <h2 className="text-xl font-bold mb-6 text-skyblue-400">Academic</h2>
    <nav className="flex-1">
      <ul className="space-y-3">
        {menuItems.map((item, idx) => (
          <li key={item.label}>
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium hover:bg-midnight-600 focus:outline-none ${selected === idx ? 'bg-midnight-600 text-skyblue-400' : 'text-gray-300'}`}
              onClick={() => onSelect(idx)}
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default AcademicSidebar;
