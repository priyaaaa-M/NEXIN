import React from 'react';
import { Heart, Clock, Moon, Brain, BookOpen } from 'lucide-react';

const Personal = () => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Personal Dashboard</h1>
        <p className="text-gray-400">Track your habits, wellness, and personal development</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg text-red-400 mr-3">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Wellness</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300 text-sm">Exercise</span>
                <span className="text-gray-300 text-sm">3/5 days</span>
              </div>
              <div className="w-full bg-midnight-200 rounded-full h-2 overflow-hidden">
                <div className="bg-red-400 h-full rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300 text-sm">Water</span>
                <span className="text-gray-300 text-sm">6/8 glasses</span>
              </div>
              <div className="w-full bg-midnight-200 rounded-full h-2 overflow-hidden">
                <div className="bg-skyblue-400 h-full rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 mr-3">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Productivity</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">6.5<span className="text-sm text-gray-400 ml-1">hrs</span></div>
          <p className="text-gray-400 text-sm">Focus time today</p>
          <div className="mt-2 pt-2 border-t border-midnight-300 text-sm">
            <p className="text-green-400">+1.2 hrs from your average</p>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mr-3">
              <Moon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Sleep</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">7.2<span className="text-sm text-gray-400 ml-1">hrs</span></div>
          <p className="text-gray-400 text-sm">Average this week</p>
          <div className="mt-2 pt-2 border-t border-midnight-300 text-sm">
            <p className="text-yellow-400">0.8 hrs below target</p>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400 mr-3">
              <Brain className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Mindfulness</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">15<span className="text-sm text-gray-400 ml-1">min</span></div>
          <p className="text-gray-400 text-sm">Meditation today</p>
          <div className="mt-2 pt-2 border-t border-midnight-300 text-sm">
            <p className="text-green-400">3 day streak</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-midnight-400 rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Weekly Habits</h2>
            <button className="px-3 py-1 bg-electric-500 hover:bg-electric-400 text-white rounded-lg transition-colors text-sm">
              New Habit
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-6">
              {[
                { name: 'Morning Workout', target: '5 times/week', current: 3, progress: 60 },
                { name: 'Reading', target: '30 min/day', current: 5, progress: 71 },
                { name: 'Coding Practice', target: '1 hour/day', current: 6, progress: 85 },
                { name: 'Meditation', target: '15 min/day', current: 4, progress: 57 },
                { name: 'Journaling', target: 'Daily', current: 5, progress: 71 },
              ].map((habit, index) => (
                <div key={index} className="bg-midnight-300 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-white">{habit.name}</h3>
                      <p className="text-gray-400 text-sm">Target: {habit.target}</p>
                    </div>
                    <div className="bg-midnight-400 px-2 py-1 rounded text-sm text-white">
                      {habit.current}/7 days
                    </div>
                  </div>
                  <div className="w-full bg-midnight-500 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${habit.progress >= 80 ? 'bg-green-400' :
                          habit.progress >= 60 ? 'bg-yellow-400' :
                            'bg-red-400'
                        }`}
                      style={{ width: `${habit.progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <div className="flex space-x-1">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${i < habit.current ? 'bg-electric-400/20 text-electric-400' : 'bg-midnight-400 text-gray-500'
                            }`}
                        >
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </div>
                      ))}
                    </div>
                    <button className="text-electric-400 hover:text-electric-300 transition-colors text-sm">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200">
            <h2 className="text-xl font-semibold text-white">Learning Goals</h2>
          </div>
          <div className="p-4 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-electric-500/20 rounded-lg">
                  <BookOpen className="h-5 w-5 text-electric-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Machine Learning</h3>
                  <p className="text-gray-400 text-sm">Coursera Specialization</p>
                </div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300 text-sm">Progress</span>
                <span className="text-gray-300 text-sm">2/5 courses</span>
              </div>
              <div className="w-full bg-midnight-200 rounded-full h-2 overflow-hidden">
                <div className="bg-electric-400 h-full rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-skyblue-500/20 rounded-lg">
                  <BookOpen className="h-5 w-5 text-skyblue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">React Advanced</h3>
                  <p className="text-gray-400 text-sm">Udemy Course</p>
                </div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300 text-sm">Progress</span>
                <span className="text-gray-300 text-sm">16/20 hours</span>
              </div>
              <div className="w-full bg-midnight-200 rounded-full h-2 overflow-hidden">
                <div className="bg-skyblue-400 h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-sunny-500/20 rounded-lg">
                  <BookOpen className="h-5 w-5 text-sunny-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Japanese Language</h3>
                  <p className="text-gray-400 text-sm">Duolingo</p>
                </div>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300 text-sm">Progress</span>
                <span className="text-gray-300 text-sm">Level 8/25</span>
              </div>
              <div className="w-full bg-midnight-200 rounded-full h-2 overflow-hidden">
                <div className="bg-sunny-400 h-full rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>

            <button className="w-full py-2 mt-4 bg-midnight-300 hover:bg-midnight-200 text-gray-300 rounded-lg transition-colors text-sm">
              View All Learning Goals
            </button>
          </div>
        </div>
      </div>

      <div className="bg-midnight-400 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200">
          <h2 className="text-xl font-semibold text-white">Mood Tracker</h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-300 mb-3">Today's Mood</p>
            <div className="flex justify-between">
              {['😔', '😐', '🙂', '😊', '😁'].map((emoji, index) => (
                <button
                  key={index}
                  className={`w-16 h-16 text-2xl flex items-center justify-center rounded-lg transition-all ${index === 3 ? 'bg-electric-500/20 text-white ring-2 ring-electric-400' : 'bg-midnight-300 hover:bg-midnight-200'
                    }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-gray-300 mb-3">Mood This Week</p>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={index} className="text-center">
                  <div className={`w-full py-3 rounded-lg mb-2 ${['bg-red-400/20', 'bg-orange-400/20', 'bg-yellow-400/20', 'bg-green-400/20', 'bg-green-400/20', 'bg-yellow-400/20', 'bg-electric-400/20'][index]
                    }`}>
                    <span className="text-xl">
                      {['😔', '😐', '🙂', '😊', '😊', '🙂', '😁'][index]}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;