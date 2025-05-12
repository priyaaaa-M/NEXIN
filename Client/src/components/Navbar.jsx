import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Moon, Sun } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onLogin, isLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Focus', path: '/focus' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-midnight-700/95 backdrop-blur-md shadow-lg py-2 border-b border-midnight-500'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Settings className="h-7 w-7 text-electric-400 animate-spin-slow" />
            <span className="text-xl font-bold bg-gradient-to-r from-electric-400 to-skyblue-400 bg-clip-text text-transparent">
              NEXIN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-white hover:text-electric-400 transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-electric-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Auth Buttons and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-full border border-electric-400 text-electric-400 hover:bg-electric-400/10 transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="px-4 py-2 rounded-full text-gray-300 hover:text-electric-400 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onLogin}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-electric-500 to-electric-400 hover:from-electric-400 hover:to-electric-300 text-white transition-all shadow-glow-purple"
                >
                  Sign Up
                </button>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-electric-400 focus:outline-none transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-midnight-700/95 backdrop-blur-md mt-2 py-4 px-4 border-t border-midnight-500">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-gray-300 hover:text-electric-400 block transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col space-y-2">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-full border border-electric-400 text-electric-400 text-center hover:bg-electric-400/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    onLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-full text-gray-300 hover:text-electric-400 text-center transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-electric-500 to-electric-400 text-white text-center transition-all shadow-glow-purple"
                >
                  Sign Up
                </button>
              </>
            )}
            <div className="flex justify-center mt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;