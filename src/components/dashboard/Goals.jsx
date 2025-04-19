import React from 'react';
import { Target, TrendingUp, Award } from 'lucide-react';

const Goals = () => {
  const academicGoals = [
    { id: 1, name: 'Maintain 3.8 GPA', timeframe: 'This semester', progress: 90, status: 'On Track' },
    { id: 2, name: 'Complete React certification', timeframe: '3 weeks', progress: 75, status: 'On Track' },
    { id: 3, name: 'Publish research paper', timeframe: '2 months', progress: 40, status: 'Needs Attention' },
  ];

  const personalGoals = [
    { id: 1, name: 'Read 2 books monthly', timeframe: 'Monthly', progress: 50, status: 'On Track' },
    { id: 2, name: '3 workouts weekly', timeframe: 'Weekly', progress: 65, status: 'On Track' },
  ];

  const careerGoals = [
    { id: 1, name: 'Secure summer internship', timeframe: 'By December', progress: 20, status: 'Just Started' },
    { id: 2, name: 'Build portfolio website', timeframe: '1 month', progress: 85, status: 'Almost Complete' },
  ];

  const renderGoals = (title, goals, color) => (
    <div className="bg-midnight-400 rounded-xl overflow-hidden">
      <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <button className="p-1 rounded hover:bg-midnight-200 transition-colors">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
      <div className="p-4 divide-y divide-midnight-300">
        {goals.map((goal) => (
          <div key={goal.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-white">{goal.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${goal.status === 'On Track' ? 'bg-green-500/20 text-green-400' :
                goal.status === 'Needs Attention' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                {goal.status}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3">{goal.timeframe}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-midnight-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${color}`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <span className="text-gray-300 text-sm">{goal.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Goal Manager</h1>
          <p className="text-gray-400">Track, visualize, and achieve your goals</p>
        </div>
        <button className="px-4 py-2 bg-electric-500 hover:bg-electric-400 text-white rounded-lg transition-colors">
          New Goal
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-electric-500/20 rounded-lg text-electric-400 mr-3">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Total Goals</h3>
            <span className="ml-auto w-8 h-8 flex items-center justify-center bg-electric-500/20 text-electric-400 rounded-full text-sm">
              7
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Completed: 1</span>
            <span className="text-gray-300">In Progress: 6</span>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400 mr-3">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Progress</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">68%</span>
            <span className="text-green-400 text-sm mb-1">+12% from last month</span>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400 mr-3">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Achievements</h3>
            <span className="ml-auto w-8 h-8 flex items-center justify-center bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
              5
            </span>
          </div>
          <p className="text-gray-300">You've earned 5 achievements this semester</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderGoals('Academic Goals', academicGoals, 'bg-electric-400')}
        {renderGoals('Personal Goals', personalGoals, 'bg-skyblue-400')}
        {renderGoals('Career Goals', careerGoals, 'bg-purple-400')}
      </div>
    </div>
  );
};

export default Goals;