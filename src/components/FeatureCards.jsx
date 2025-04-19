import React from 'react';
import { BookOpen, Code, Target, LayoutDashboard } from 'lucide-react';

const features = [
  {
    title: 'Academic Tracker',
    description: 'Track courses, assignments, and grades all in one place.',
    icon: <BookOpen className="h-8 w-8" />,
    color: 'from-electric-400 to-electric-600',
    shadow: 'shadow-glow-purple',
  },
  {
    title: 'Project Builder',
    description: 'Build and manage engineering projects with powerful tools.',
    icon: <Code className="h-8 w-8" />,
    color: 'from-skyblue-400 to-skyblue-600',
    shadow: 'shadow-glow-blue',
  },
  {
    title: 'Goal Manager',
    description: 'Set, track, and achieve your academic and personal goals.',
    icon: <Target className="h-8 w-8" />,
    color: 'from-sunny-400 to-sunny-600',
    shadow: 'shadow-glow-yellow',
  },
  {
    title: 'Work Done Desk',
    description: 'Visualize and celebrate your accomplishments and progress.',
    icon: <LayoutDashboard className="h-8 w-8" />,
    color: 'from-electric-400 to-skyblue-400',
    shadow: 'shadow-glow-purple',
  },
];

const FeatureCards = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-electric-400 to-skyblue-400 bg-clip-text text-transparent">
            Supercharge Your Productivity
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Powerful tools designed specifically for engineering students to excel in their academic journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-midnight-300 rounded-xl p-6 transition-all duration-300 hover:translate-y-[-4px] ${feature.shadow} group`}
          >
            <div className={`p-3 rounded-lg inline-block bg-gradient-to-br ${feature.color} mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-electric-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;