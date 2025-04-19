import React, { useState } from 'react';
import { BookText, Search, Calendar, Tags, Plus } from 'lucide-react';

const Journal = () => {
  const [activeTab, setActiveTab] = useState('entries');

  // Mock data
  const recentEntries = [
    {
      id: 1,
      title: 'Project Breakthrough',
      preview: 'Finally solved the neural network architecture issue that was causing...',
      date: 'Today, 3:45 PM',
      mood: 'Excited',
      tags: ['Neural Networks', 'Success', 'Project']
    },
    {
      id: 2,
      title: 'Midterm Preparation',
      preview: 'Need to focus more on algorithm complexity analysis. The practice questions...',
      date: 'Yesterday, 9:30 PM',
      mood: 'Focused',
      tags: ['Study', 'Algorithms', 'Midterm']
    },
    {
      id: 3,
      title: 'Team Meeting Notes',
      preview: 'Met with the project team today. We decided to use React for the frontend and...',
      date: '3 days ago',
      mood: 'Productive',
      tags: ['Team', 'Meeting', 'Project']
    },
  ];

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Journal</h1>
          <p className="text-gray-400">Document your thoughts, ideas, and progress</p>
        </div>
        <button className="px-4 py-2 bg-electric-500 hover:bg-electric-400 text-white rounded-lg transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Entry
        </button>
      </header>

      <div className="bg-midnight-400 rounded-xl overflow-hidden mb-8">
        <div className="flex border-b border-midnight-300">
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'entries'
                ? 'text-electric-400 border-b-2 border-electric-400'
                : 'text-gray-400 hover:text-gray-300'
              }`}
            onClick={() => setActiveTab('entries')}
          >
            Entries
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'templates'
                ? 'text-electric-400 border-b-2 border-electric-400'
                : 'text-gray-400 hover:text-gray-300'
              }`}
            onClick={() => setActiveTab('templates')}
          >
            Templates
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'tags'
                ? 'text-electric-400 border-b-2 border-electric-400'
                : 'text-gray-400 hover:text-gray-300'
              }`}
            onClick={() => setActiveTab('tags')}
          >
            Tags
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center bg-midnight-300 rounded-lg px-3 py-2 mb-6">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search journal entries..."
              className="bg-transparent border-none text-white placeholder-gray-400 focus:outline-none w-full"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center bg-midnight-300 rounded-full px-3 py-1 text-gray-300 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>This Month</span>
            </div>
            <div className="flex items-center bg-midnight-300 rounded-full px-3 py-1 text-gray-300 text-sm">
              <Tags className="h-4 w-4 mr-1" />
              <span>All Tags</span>
            </div>
            {['Project', 'Study', 'Ideas', 'Meetings'].map((tag, index) => (
              <div key={index} className="bg-midnight-300 rounded-full px-3 py-1 text-gray-300 text-sm">
                {tag}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="bg-midnight-300 rounded-lg p-4 hover:bg-midnight-200 transition-colors cursor-pointer">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium text-white">{entry.title}</h3>
                  <span className="text-gray-400 text-sm">{entry.date}</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{entry.preview}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {entry.tags.map((tag, index) => (
                      <span key={index} className="bg-midnight-400 rounded-full px-2 py-0.5 text-gray-300 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-electric-400 text-sm">{entry.mood}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-electric-500/20 rounded-lg text-electric-400 mr-3">
              <BookText className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Journal Stats</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Entries</span>
              <span className="font-medium text-white">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">This Month</span>
              <span className="font-medium text-white">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Streak</span>
              <span className="font-medium text-white">5 days</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-midnight-400 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Journal Prompts</h3>
          <div className="space-y-3">
            <div className="bg-midnight-300 rounded-lg p-3">
              <p className="text-gray-300">What was the most challenging problem you solved this week?</p>
            </div>
            <div className="bg-midnight-300 rounded-lg p-3">
              <p className="text-gray-300">Describe a concept you learned today in your own words.</p>
            </div>
            <div className="bg-midnight-300 rounded-lg p-3">
              <p className="text-gray-300">What are three goals you want to accomplish this week?</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-midnight-400 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200">
          <h2 className="text-xl font-semibold text-white">Featured Entry</h2>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-medium text-white mb-1">Project Breakthrough</h3>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Today, 3:45 PM</span>
                <span className="mx-2">•</span>
                <span className="text-electric-400">Excited</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-midnight-300 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-midnight-300 transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <div className="bg-midnight-300 rounded-lg p-6 text-gray-300 mb-4">
            <p className="mb-4">
              Finally solved the neural network architecture issue that was causing poor convergence!
              After three days of debugging and trying different approaches, I realized the problem
              was in how I was normalizing the input data.
            </p>
            <p className="mb-4">
              Key learnings:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Always check your data preprocessing steps first</li>
              <li>Batch normalization makes a huge difference in training stability</li>
              <li>The learning rate scheduler I implemented works really well</li>
            </ul>
            <p>
              The model is now achieving 92% accuracy on the test set, which is a huge improvement
              from the previous 78%. I need to document this approach for the final project report.
            </p>
          </div>
          <div className="flex gap-2">
            {['Neural Networks', 'Success', 'Project'].map((tag, index) => (
              <span key={index} className="bg-midnight-300 rounded-full px-3 py-1 text-gray-300 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;