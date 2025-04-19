import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Code,
  Target,
  BarChart2,
  User,
  LayoutDashboard,
  BookText,
  LogOut,
  Settings,
  Home
} from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Academic', icon: BookOpen, path: '/dashboard/academic' },
    { name: 'Projects', icon: Code, path: '/dashboard/projects' },
    { name: 'Goals', icon: Target, path: '/dashboard/goals' },
    { name: 'Finance', icon: BarChart2, path: '/dashboard/finance' },
    { name: 'Personal', icon: User, path: '/dashboard/personal' },
    { name: 'Work Done Desk', icon: LayoutDashboard, path: '/dashboard/workdonedesk' },
    { name: 'Journal', icon: BookText, path: '/dashboard/journal' },
  ];

  return (
    <div className="w-64 h-screen bg-midnight-500 fixed left-0 top-0 overflow-y-auto shadow-md">
      {/* Logo */}
      <div className="p-6 border-b border-midnight-300">
        <Link to="/" className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-electric-400" />
          <span className="text-lg font-bold bg-gradient-to-r from-electric-400 to-skyblue-400 bg-clip-text text-transparent">
            Priyaaaa
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                    ? 'bg-electric-500/20 text-electric-400'
                    : 'hover:bg-midnight-400 text-gray-300 hover:text-white'
                    }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-electric-400' : ''}`} />
                  <span className="transition-colors duration-200">{item.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-400 ml-auto"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-midnight-300">
        <div className="flex flex-col space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-midnight-400 text-gray-300 hover:text-white transition-all"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
