import React from 'react';
import { CheckCircle, Award, Star, TrendingUp } from 'lucide-react';

const WorkDoneDesk = () => {
  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white mb-2">Work Done Desk</h1>
          <div className="px-3 py-1 bg-electric-500/20 text-electric-400 rounded-full text-sm">
            Level 12
          </div>
        </div>
        <p className="text-gray-400">Visualize your progress and celebrate your achievements</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400 mr-3">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Tasks Completed</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">63</span>
            <span className="text-green-400 text-sm mb-1">this month</span>
          </div>
          <div className="mt-2 pt-2 border-t border-midnight-300">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Last month:</span>
              <span className="text-white">52 tasks</span>
            </div>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400 mr-3">
              <Star className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Points Earned</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">3,940</span>
            <span className="text-yellow-400 text-sm mb-1">+640 this week</span>
          </div>
          <div className="mt-2 pt-2 border-t border-midnight-300">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Next reward at:</span>
              <span className="text-white">5,000 points</span>
            </div>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 mr-3">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Achievements</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">15</span>
            <span className="text-purple-400 text-sm mb-1">out of 30</span>
          </div>
          <div className="mt-2 pt-2 border-t border-midnight-300">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Recent:</span>
              <span className="text-white">Early Bird (5 day streak)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-midnight-400 rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Your Progress Timeline</h2>
            <select className="bg-midnight-200 text-gray-300 rounded px-2 py-1 text-sm">
              <option>This Semester</option>
              <option>This Month</option>
              <option>This Week</option>
            </select>
          </div>
          <div className="p-6 space-y-6">
            <TimelineEntry
              icon={<CheckCircle className="h-4 w-4" />}
              bgColor="bg-electric-500"
              borderColor="bg-electric-500/30"
              title="Completed Advanced Algorithms Project"
              date="Today"
              description="Achieved a score of 95/100 on the final project."
              tags={["+200 points", "A Grade"]}
              tagColors={["electric", "green"]}
            />

            <TimelineEntry
              icon={<Award className="h-4 w-4" />}
              bgColor="bg-skyblue-500"
              borderColor="bg-skyblue-500/30"
              title="Earned 'Coding Streak' Achievement"
              date="Yesterday"
              description="Completed coding exercises for 7 consecutive days."
              tags={["+150 points", "Achievement"]}
              tagColors={["yellow", "purple"]}
            />

            <TimelineEntry
              icon={<TrendingUp className="h-4 w-4" />}
              bgColor="bg-sunny-500"
              borderColor="bg-sunny-500/30"
              title="Reached 50% on Neural Network Project"
              date="3 days ago"
              description="Completed the data preprocessing and model architecture."
              tags={["+100 points", "Milestone"]}
              tagColors={["blue", "green"]}
            />

            <TimelineEntry
              icon={<CheckCircle className="h-4 w-4" />}
              bgColor="bg-electric-500"
              title="Completed Database Systems Assignment"
              date="5 days ago"
              description="Implemented a relational database with normalized tables."
              tags={["+175 points", "A- Grade"]}
              tagColors={["electric", "green"]}
            />

            <div className="mt-6 text-center">
              <button className="text-electric-400 hover:text-electric-300 transition-colors">
                View Full Timeline
              </button>
            </div>
          </div>
        </div>

        <div className="bg-midnight-400 rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200">
            <h2 className="text-xl font-semibold text-white">Recent Achievements</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="bg-midnight-300 rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-center">
                <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                  <Award className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Coding Streak</h3>
                  <p className="text-gray-400 text-sm">7 consecutive days of coding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineEntry = ({
  icon,
  bgColor,
  borderColor,
  title,
  date,
  description,
  tags,
  tagColors,
}) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center text-white font-bold`}>
          {icon}
        </div>
        {borderColor && <div className={`h-full w-px ${borderColor} my-2`}></div>}
      </div>
      <div className="bg-midnight-300 rounded-lg p-4 flex-1">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium text-white">{title}</h3>
          <span className="text-gray-400 text-sm">{date}</span>
        </div>
        <p className="text-gray-300 text-sm">{description}</p>
        <div className="mt-2 flex gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`bg-${tagColors[index]}-500/20 text-${tagColors[index]}-400 rounded-full px-2 py-0.5 text-xs`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkDoneDesk;