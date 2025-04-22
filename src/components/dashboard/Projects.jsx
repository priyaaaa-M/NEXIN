import React, { useState, useRef } from 'react';
import {
  Code, GitBranch, CheckCircle, Clock, Calendar, Plus, Save, Github, X,
  Layout, Database, Users, ChevronDown, Search, FileText, Download, Star,
  Circle, Check, ChevronRight, Settings, Link, FileInput, List, Grid,
  Edit, Trash2, ChevronLeft
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const Projects = () => {
  // State management
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Neural Network Visualizer',
      type: 'Web App',
      purpose: 'Educational tool for visualizing ML models',
      frontend: ['React', 'Three.js'],
      backend: 'Node.js',
      database: 'MongoDB',
      layout: 'https://www.figma.com/embed?embed_host=share&url=https://figma.com/file/example1',
      startDate: '2025-10-01',
      deadline: '2025-11-15',
      team: ['user@example.com'],
      github: 'https://github.com/user/nn-visualizer',
      status: 'In Progress',
      progress: 65,
      tasks: [
        { id: 1, name: 'Setup React environment', completed: true },
        { id: 2, name: 'Implement 3D rendering', completed: true },
        { id: 3, name: 'Build API endpoints', completed: false }
      ],
      notes: 'Need to optimize the rendering pipeline for mobile devices',
      tags: ['AI', 'Visualization', 'Education'],
      createdAt: '2025-10-01'
    },
    {
      id: 2,
      name: 'Smart Home IoT System',
      type: 'IoT Platform',
      purpose: 'Home automation system with mobile control',
      frontend: ['React Native'],
      backend: 'Python',
      database: 'Firebase',
      layout: 'https://www.figma.com/embed?embed_host=share&url=https://figma.com/file/example2',
      startDate: '2025-09-15',
      deadline: '2025-12-20',
      team: ['user@example.com', 'collab@example.com'],
      github: 'https://github.com/user/smart-home-iot',
      status: 'In Progress',
      progress: 40,
      tasks: [
        { id: 1, name: 'Hardware prototyping', completed: true },
        { id: 2, name: 'Mobile app UI', completed: false },
        { id: 3, name: 'Cloud integration', completed: false }
      ],
      notes: 'Waiting for hardware components delivery',
      tags: ['IoT', 'Home Automation', 'Mobile'],
      createdAt: '2025-09-15'
    }
  ]);

  // UI States
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);
  const [githubLink, setGithubLink] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Refs
  const projectDetailRef = useRef();

  // PDF Export Handler
  const handleExportPDF = useReactToPrint({
    content: () => projectDetailRef.current,
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
        .print-section { break-inside: avoid; }
      }
    `,
    documentTitle: `${selectedProject?.name || 'Project'} Details`
  });

  // Form state with improved questions
  const [newProject, setNewProject] = useState({
    name: '',
    type: '',
    purpose: '',
    frontend: [],
    backend: '',
    database: '',
    layout: '',
    startDate: '',
    deadline: '',
    team: [],
    github: '',
    tags: []
  });

  // Available options
  const projectTypes = ['Web App', 'Mobile App', 'Desktop', 'IoT', 'Machine Learning', 'API Service'];
  const frontendTech = ['HTML/CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'Svelte', 'Flutter'];
  const backendTech = ['Node.js', 'Python', 'Ruby', 'Java', 'PHP', 'Go', '.NET'];
  const databases = ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'SQLite', 'Redis'];
  const projectTags = ['AI', 'Education', 'E-commerce', 'Healthcare', 'Finance', 'Gaming', 'Social'];

  // Handlers
  const handleCreateProject = (e) => {
    e.preventDefault();
    const project = {
      ...newProject,
      id: projects.length + 1,
      status: 'Not Started',
      progress: 0,
      tasks: [],
      notes: '',
      createdAt: new Date().toISOString()
    };
    setProjects([...projects, project]);
    setShowProjectForm(false);
    resetForm();
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();

    // Create updated project with all necessary data
    const updatedProject = {
      ...selectedProject,  // Keep existing data
      ...newProject,       // Add new form data
      id: selectedProject.id,
      updatedAt: new Date().toISOString(),
      progress: selectedProject.progress || 0,
      tasks: selectedProject.tasks || [],
      createdAt: selectedProject.createdAt
    };

    // Update projects array
    const updatedProjects = projects.map(p =>
      p.id === selectedProject.id ? updatedProject : p
    );

    // Update state
    setProjects(updatedProjects);
    setSelectedProject(updatedProject);

    // Reset form and close modal
    resetForm();
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
      if (selectedProject && selectedProject.id === id) {
        setSelectedProject(null);
      }
    }
  };

  const toggleSelection = (item, category) => {
    if (Array.isArray(newProject[category])) {
      setNewProject(prev => ({
        ...prev,
        [category]: prev[category].includes(item)
          ? prev[category].filter(i => i !== item)
          : [...prev[category], item]
      }));
    } else {
      setNewProject(prev => ({ ...prev, [category]: item }));
    }
  };

  const resetForm = () => {
    setNewProject({
      name: '',
      type: '',
      purpose: '',
      frontend: [],
      backend: '',
      database: '',
      layout: '',
      startDate: '',
      deadline: '',
      team: [],
      github: '',
      tags: []
    });
    setIsEditing(false);
    setShowProjectForm(false);
  };

  const setupEditForm = (project) => {
    setNewProject({
      name: project.name || '',
      type: project.type || '',
      purpose: project.purpose || '',
      frontend: project.frontend || [],
      backend: project.backend || '',
      database: project.database || '',
      layout: project.layout || '',
      startDate: project.startDate || '',
      deadline: project.deadline || '',
      team: project.team || [],
      github: project.github || '',
      tags: project.tags || []
    });
    setSelectedProject(project);
    setIsEditing(true);
    setShowProjectForm(true);
  };

  // Filter projects based on search and date
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!dateFilter) return matchesSearch;

    const projectDate = new Date(project.createdAt);
    return matchesSearch && (
      projectDate.getMonth() === dateFilter.getMonth() &&
      projectDate.getFullYear() === dateFilter.getFullYear()
    );
  });

  // Calendar handlers
  const handleCalendarClick = (date) => {
    setDateFilter(date);
    setShowCalendar(false);
  };

  const clearDateFilter = () => {
    setDateFilter(null);
  };

  return (
    <div className="text-gray-100 bg-gray-900 min-h-screen p-6">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Project Dashboard</h1>
          <p className="text-gray-400">Track and manage all your development projects</p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex items-center">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg mr-2"
            >
              <Calendar size={18} />
              {dateFilter ?
                `${dateFilter.toLocaleString('default', { month: 'short' })} ${dateFilter.getFullYear()}` :
                'Filter by date'}
            </button>
            {dateFilter && (
              <button
                onClick={clearDateFilter}
                className="text-gray-400 hover:text-white p-1"
              >
                <X size={16} />
              </button>
            )}
            {showCalendar && (
              <div className="absolute top-12 left-0 z-10 bg-gray-800 rounded-lg shadow-lg p-2">
                <div className="flex justify-between items-center mb-2 px-2">
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-medium">
                    {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-gray-400 p-1">{day}</div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <button
                      key={day}
                      onClick={() => handleCalendarClick(new Date(new Date().getFullYear(), new Date().getMonth(), day))}
                      className={`p-1 rounded-full w-8 h-8 ${dateFilter && dateFilter.getDate() === day ? 'bg-blue-600' :
                        'hover:bg-gray-700'
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsEditing(false);
              setShowProjectForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus size={18} /> New Project
          </button>
        </div>
      </header>

      {/* Project Creation/Edit Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {isEditing ? 'Edit Project' : 'New Project Questionnaire'}
              </h2>
              <button onClick={() => {
                setShowProjectForm(false);
                setIsEditing(false);
                resetForm();
              }} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={isEditing ? handleUpdateProject : handleCreateProject} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Project Name*</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Project Type*</label>
                  <select
                    value={newProject.type}
                    onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select type</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Project Purpose*</label>
                <textarea
                  value={newProject.purpose}
                  onChange={(e) => setNewProject({ ...newProject, purpose: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Describe what problem this project solves..."
                  required
                />
              </div>

              {/* Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Frontend*</label>
                  <div className="relative">
                    <div className="flex flex-wrap gap-2">
                      {frontendTech.map(tech => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => toggleSelection(tech, 'frontend')}
                          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${newProject.frontend.includes(tech) ?
                            'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        >
                          {newProject.frontend.includes(tech) && <Check size={14} />}
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Backend*</label>
                  <select
                    value={newProject.backend}
                    onChange={(e) => setNewProject({ ...newProject, backend: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select backend</option>
                    {backendTech.map(tech => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Database</label>
                  <select
                    value={newProject.database}
                    onChange={(e) => setNewProject({ ...newProject, database: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select database</option>
                    {databases.map(db => (
                      <option key={db} value={db}>{db}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Design & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Design Layout</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Figma, Adobe XD, or image URL"
                      value={newProject.layout}
                      onChange={(e) => setNewProject({ ...newProject, layout: e.target.value })}
                      className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <a
                      href="https://figma.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Layout size={16} /> Figma
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-300 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Deadline</label>
                    <input
                      type="date"
                      value={newProject.deadline}
                      onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Team & GitHub */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Team Members</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Add team member email"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value) {
                          setNewProject({
                            ...newProject,
                            team: [...newProject.team, e.target.value]
                          });
                          e.target.value = '';
                        }
                      }}
                      className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg"
                    >
                      <Users size={16} />
                    </button>
                  </div>
                  {newProject.team.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newProject.team.map((email, index) => (
                        <span key={index} className="bg-gray-700 text-sm px-2 py-1 rounded flex items-center gap-1">
                          {email}
                          <button
                            type="button"
                            onClick={() => setNewProject({
                              ...newProject,
                              team: newProject.team.filter((_, i) => i !== index)
                            })}
                            className="text-gray-400 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">GitHub Repository</label>
                  <input
                    type="url"
                    placeholder="https://github.com/username/repo"
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Project Tags */}
              <div>
                <label className="block text-gray-300 mb-2">Project Tags</label>
                <div className="flex flex-wrap gap-2">
                  {projectTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleSelection(tag, 'tags')}
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${newProject.tags.includes(tag) ?
                        'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                      {newProject.tags.includes(tag) && <Check size={14} />}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowProjectForm(false);
                    setIsEditing(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Save size={18} /> {isEditing ? 'Update' : 'Create'} Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-xl p-6 max-w-4xl w-full my-8" ref={projectDetailRef}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
                <p className="text-gray-400">{selectedProject.type} • Created {new Date(selectedProject.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setupEditForm(selectedProject)}
                  className="text-gray-400 hover:text-yellow-400 p-1"
                  title="Edit Project"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteProject(selectedProject.id)}
                  className="text-gray-400 hover:text-red-400 p-1"
                  title="Delete Project"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-4 py-2 font-medium ${activeTab === 'tasks' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                Tasks
              </button>
              <button
                onClick={() => setActiveTab('design')}
                className={`px-4 py-2 font-medium ${activeTab === 'design' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                Design
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 font-medium ${activeTab === 'notes' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                Notes
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-6 print-section">
              {activeTab === 'overview' && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Project Purpose</h3>
                    <p className="text-gray-300">{selectedProject.purpose}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print-section">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="text-gray-400 text-sm mb-1">Tech Stack</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-400">Frontend</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedProject.frontend.map(tech => (
                              <span key={tech} className="bg-gray-600 text-xs px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Backend</p>
                          <span className="bg-gray-600 text-xs px-2 py-1 rounded">
                            {selectedProject.backend}
                          </span>
                        </div>
                        {selectedProject.database && (
                          <div>
                            <p className="text-sm text-gray-400">Database</p>
                            <span className="bg-gray-600 text-xs px-2 py-1 rounded">
                              {selectedProject.database}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="text-gray-400 text-sm mb-1">Timeline</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-400">Start Date</p>
                          <p>{selectedProject.startDate || 'Not set'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Deadline</p>
                          <p>{selectedProject.deadline || 'Not set'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Status</p>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${selectedProject.status === 'Completed' ? 'bg-green-500' :
                              selectedProject.status === 'In Progress' ? 'bg-yellow-500' :
                                'bg-gray-500'
                              }`} />
                            <p>{selectedProject.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="text-gray-400 text-sm mb-1">Progress</h4>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall</span>
                          <span>{selectedProject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${selectedProject.progress}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Tasks</p>
                        <p>
                          {selectedProject.tasks.filter(t => t.completed).length} / {selectedProject.tasks.length} completed
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedProject.team.length > 0 && (
                    <div className="print-section">
                      <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.team.map((email, index) => (
                          <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                            {email}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.tags.length > 0 && (
                    <div className="print-section">
                      <h3 className="text-lg font-semibold mb-2">Project Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <span key={index} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'tasks' && (
                <div className="print-section">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Tasks</h3>
                    <button className="text-sm text-blue-400 hover:text-blue-300 no-print">
                      + Add Task
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedProject.tasks.length > 0 ? (
                      selectedProject.tasks.map(task => (
                        <div key={task.id} className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => { }}
                            className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 no-print"
                          />
                          <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                            {task.name}
                          </span>
                          <button className="text-gray-400 hover:text-white no-print">
                            <X size={16} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-4">No tasks yet</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="print-section">
                  <h3 className="text-lg font-semibold mb-2">Design Layout</h3>
                  {selectedProject.layout ? (
                    <div className="bg-gray-700 rounded-lg overflow-hidden">
                      {selectedProject.layout.includes('figma.com') ? (
                        <iframe
                          src={selectedProject.layout}
                          className="w-full h-[500px] border-none no-print"
                          allowFullScreen
                        />
                      ) : (
                        <div className="p-4 text-center">
                          <p className="text-gray-400 mb-2">Design link:</p>
                          <a
                            href={selectedProject.layout}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {selectedProject.layout}
                          </a>
                        </div>
                      )}
                      {selectedProject.layout.includes('figma.com') && (
                        <div className="print-only p-4">
                          <p className="text-gray-400 mb-2">Figma Design:</p>
                          <a href={selectedProject.layout} className="text-blue-400">
                            {selectedProject.layout}
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400">No design layout added yet</p>
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="print-section">
                  <h3 className="text-lg font-semibold mb-2">Project Notes</h3>
                  {selectedProject.notes ? (
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="whitespace-pre-line">{selectedProject.notes}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400">No notes added yet</p>
                  )}
                  <textarea
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px] no-print"
                    placeholder="Add project notes..."
                  />
                  <div className="flex justify-end mt-2 no-print">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
                      Save Notes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with GitHub link */}
            <div className="mt-8 pt-4 border-t border-gray-700 flex justify-between items-center no-print">
              {selectedProject.github ? (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                >
                  <Github size={18} /> View on GitHub
                </a>
              ) : (
                <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <Github size={18} /> Connect GitHub Repository
                </button>
              )}
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <Download size={16} /> Export as PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Projects</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400 mb-4">No projects found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setDateFilter(null);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg inline-flex items-center gap-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors cursor-pointer relative"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <span className="bg-gray-700 text-sm px-2 py-1 rounded">
                      {project.type}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.purpose}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.frontend.slice(0, 3).map(tech => (
                      <span key={tech} className="bg-gray-700 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.backend && (
                      <span className="bg-gray-700 text-xs px-2 py-1 rounded">
                        {project.backend}
                      </span>
                    )}
                    {project.frontend.length > 3 && (
                      <span className="bg-gray-700 text-xs px-2 py-1 rounded">
                        +{project.frontend.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-gray-400 text-xs">Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-700 rounded-full h-1.5">
                            <div
                              className="bg-blue-500 h-1.5 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-xs">{project.progress}%</span>
                        </div>
                      </div>

                      {project.github && (
                        <a
                          href={project.github}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-400">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setupEditForm(project);
                          }}
                          className="text-gray-400 hover:text-blue-400 p-1"
                          title="Edit Project"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                          className="text-gray-400 hover:text-red-400 p-1"
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GitHub Integration Footer */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">GitHub Integration</h3>
            <p className="text-gray-400">Connect your GitHub account to sync repositories</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/username"
              className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <Github size={18} /> Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;