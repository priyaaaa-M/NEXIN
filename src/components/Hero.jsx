import React from 'react';
import { Calendar, BarChart2, Layout, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ onLogin }) => {
  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Hero Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-r from-electric-400 via-skyblue-400 to-sunny-400 bg-clip-text text-transparent">
              Your Engineering Journey,
            </span>{' '}
            <br />
            Streamlined
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl">
            All-in-one productivity suite designed specifically for engineering students.
            Track projects, manage goals, and visualize your progress all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              onClick={onLogin}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-electric-500 to-electric-400 hover:from-electric-400 hover:to-electric-300 text-white transition-all shadow-glow-purple font-medium"
            >
              Start for Free
            </button>
            <button className="px-6 py-3 rounded-full border border-skyblue-400 text-skyblue-400 hover:bg-skyblue-400/10 transition-all font-medium">
              Explore Demo
            </button>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
          {/* Student illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-gradient-to-br from-electric-500/30 to-skyblue-500/30 rounded-full flex items-center justify-center animate-pulse-slow">
              <img
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Student"
                className="w-44 h-44 object-cover rounded-full border-4 border-electric-400"
              />
            </div>
          </div>

          {/* Floating UI elements */}
          <div className="absolute top-20 left-10 md:left-0 animate-float">
            <div className="bg-midnight-300 p-4 rounded-xl shadow-glow-blue">
              <Calendar className="h-10 w-10 text-skyblue-400" />
            </div>
          </div>

          <div className="absolute top-32 right-10 md:right-20 animate-float" style={{ animationDelay: '1s' }}>
            <div className="bg-midnight-300 p-4 rounded-xl shadow-glow-purple">
              <BarChart2 className="h-10 w-10 text-electric-400" />
            </div>
          </div>

          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}>
            <div className="bg-midnight-300 p-4 rounded-xl shadow-glow-yellow">
              <Layout className="h-10 w-10 text-sunny-400" />
            </div>
          </div>

          <div className="absolute bottom-40 right-10 animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="bg-midnight-300 p-4 rounded-xl shadow-glow-blue">
              <MessageCircle className="h-10 w-10 text-skyblue-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;