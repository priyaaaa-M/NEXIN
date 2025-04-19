import React from 'react';
import { Code, GitBranch, CheckCircle, Clock } from 'lucide-react';

const Projects = () => {
  // Mock data
  const projects = [
    {
      id: 1,
      name: 'Neural Network Visualizer',
      description: 'A web-based tool to visualize and interact with neural networks',
      progress: 65,
      status: 'In Progress',
      dueDate: 'Nov 15, 2025',
      tasks: 12,
      completedTasks: 8,
      collaborators: 3,
      tags: ['Web App', 'AI', 'JavaScript']
    },
    {
      id: 2,
      name: 'Smart Home IoT System',
      description: 'Connected devices system with mobile app control',
      progress: 40,
      status: 'In Progress',
      dueDate: 'Dec 5, 2025',
      tasks: 15,
      completedTasks: 6,
      collaborators: 4,
      tags: ['IoT', 'Mobile', 'Hardware']
    },
    {
      id: 3,
      name: 'Data Structures Library',
      description: 'Implementation of advanced data structures in C++',
      progress: 90,
      status: 'Almost Complete',
      dueDate: 'Oct 20, 2025',
      tasks: 10,
      completedTasks: 9,
      collaborators: 2,
      tags: ['C++', 'Algorithms', 'Library']
    },
  ];

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Project Builder</h1>
          <p className="text-gray-400">Manage your engineering projects and collaborations</p>
        </div>
        <button className="px-4 py-2 bg-electric-500 hover:bg-electric-400 text-white rounded-lg transition-colors">
          New Project
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mr-3">
              <Code className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Active Projects</h3>
            <span className="ml-auto w-8 h-8 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-full text-sm">
              3
            </span>
          </div>
          <p className="text-gray-300">You have 3 active projects with 8 upcoming deadlines</p>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400 mr-3">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Completed</h3>
            <span className="ml-auto w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full text-sm">
              5
            </span>
          </div>
          <p className="text-gray-300">You've completed 5 projects this semester</p>
        </div>

        <div className="bg-midnight-400 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400 mr-3">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Upcoming</h3>
            <span className="ml-auto w-8 h-8 flex items-center justify-center bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
              2
            </span>
          </div>
          <p className="text-gray-300">2 scheduled projects starting soon</p>
        </div>
      </div>

      <div className="bg-midnight-400 rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Current Projects</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded hover:bg-midnight-200 transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </button>
            <button className="p-2 rounded hover:bg-midnight-200 transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </button>
          </div>
        </div>
        <div className="divide-y divide-midnight-300">
          {projects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-midnight-300 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                <div className="flex-1 mb-4 lg:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white text-lg">{project.name}</h3>
                    <div className="flex items-center bg-midnight-300 text-gray-400 rounded-full px-2 py-0.5 text-xs">
                      <GitBranch className="h-3 w-3 mr-1" /> {project.collaborators}
                    </div>
                  </div>
                  <p className="text-gray-400 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="bg-midnight-300 text-gray-300 rounded-full px-2 py-0.5 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-full sm:w-40">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 text-sm">Progress</span>
                      <span className="text-gray-300 text-sm">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-midnight-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-skyblue-400 h-full rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="text-center">
                      <p className="text-gray-400 text-xs">Tasks</p>
                      <p className="text-white font-medium">{project.completedTasks}/{project.tasks}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-xs">Due</p>
                      <p className="text-white font-medium">{project.dueDate}</p>
                    </div>
                    <button className="p-2 rounded-full hover:bg-midnight-200 transition-colors">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-midnight-400 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-px h-full bg-midnight-300 relative">
              <div className="absolute w-3 h-3 rounded-full bg-green-400 -left-1 top-1"></div>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Today, 10:35 AM</p>
              <p className="text-white font-medium">You completed Task: "Implement API Authentication" in Neural Network Visualizer</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-px h-full bg-midnight-300 relative">
              <div className="absolute w-3 h-3 rounded-full bg-blue-400 -left-1 top-1"></div>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Today, 9:12 AM</p>
              <p className="text-white font-medium">Alex commented on Smart Home IoT System</p>
              <div className="mt-2 p-3 bg-midnight-300 rounded-lg text-gray-300">
                "The sensor integration looks good. Let's discuss the mobile UI tomorrow."
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-px h-full bg-midnight-300 relative">
              <div className="absolute w-3 h-3 rounded-full bg-yellow-400 -left-1 top-1"></div>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Yesterday, 4:45 PM</p>
              <p className="text-white font-medium">New deadline added for Data Structures Library</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;