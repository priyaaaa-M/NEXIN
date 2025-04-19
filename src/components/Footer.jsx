import React from 'react';
import { Settings, Mail, Github as GitHub, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-midnight-600 relative">
      {/* Top glowing border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-electric-400 to-transparent"></div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-electric-400 via-skyblue-400 to-sunny-400 bg-clip-text text-transparent">
            Don't just study. Build. Create. Achieve.
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of engineering students who have transformed their academic journey with Priyaa Forge.
          </p>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-electric-500 to-skyblue-500 hover:from-electric-400 hover:to-skyblue-400 text-white transition-all shadow-glow-purple font-medium text-lg">
            Get Started Today
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Settings className="h-6 w-6 text-electric-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-electric-400 to-skyblue-400 bg-clip-text text-transparent">
                Priyaa Forge
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              The ultimate productivity platform for engineering students
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-electric-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-400 transition-colors">
                <GitHub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Features', 'Pricing', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-electric-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              {['Academic Tracker', 'Project Builder', 'Goal Manager', 'Work Done Desk', 'Finance Tools'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-electric-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4 text-electric-400" />
                <span>support@priyaaforge.com</span>
              </li>
              <li className="text-gray-400">
                <p>Engineering Building,</p>
                <p>University Campus,</p>
                <p>Tech City, TC 12345</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Priyaa Forge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;