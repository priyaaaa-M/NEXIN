import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Check,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Plus,
  Link,
  FileText,
  Youtube,
  Calendar,
  Bookmark,
  MessageSquare,
  Download,
  Upload,
  Users,
  Bell
} from 'lucide-react';

const AcademicDesk = () => {
  // State for course selection
  const [selectedCourse, setSelectedCourse] = useState('B.Tech');
  const [duration, setDuration] = useState(4);
  const [activeSemester, setActiveSemester] = useState(1);
  const [expandedSubjects, setExpandedSubjects] = useState({});

  // Course options
  const courses = [
    { value: 'B.Tech', label: 'Bachelor of Technology' },
    { value: 'BCA', label: 'Bachelor of Computer Applications' },
    { value: 'B.Sc', label: 'Bachelor of Science (IT/CS)' },
    { value: 'MCA', label: 'Master of Computer Applications' },
    { value: 'M.Tech', label: 'Master of Technology' }
  ];

  // Sample semester data
  const semesters = Array.from({ length: duration * 2 }, (_, i) => i + 1);

  // Sample subjects data
  const subjects = {
    1: [
      {
        name: 'Mathematics I',
        units: [
          { name: 'Unit 1: Calculus', completed: true },
          { name: 'Unit 2: Linear Algebra', completed: true },
          { name: 'Unit 3: Differential Equations', completed: false }
        ],
        youtubeLinks: [
          { title: 'Calculus Basics', url: 'https://youtube.com/calc1' },
          { title: 'Linear Algebra Explained', url: 'https://youtube.com/linear1' }
        ],
        pdfs: [
          { name: 'Calculus Notes.pdf', url: '#', uploaded: '2 weeks ago' },
          { name: 'Practice Problems.pdf', url: '#', uploaded: '1 week ago' }
        ],
        notes: '',
        examDate: '2023-12-15',
        assignments: [
          { name: 'Assignment 1', due: '2023-11-20', completed: true },
          { name: 'Assignment 2', due: '2023-12-01', completed: false }
        ]
      },
      {
        name: 'Programming Fundamentals',
        units: [
          { name: 'Unit 1: Basic Syntax', completed: true },
          { name: 'Unit 2: Control Structures', completed: true },
          { name: 'Unit 3: Functions', completed: false }
        ],
        youtubeLinks: [],
        pdfs: [],
        notes: 'Focus on recursion practice for the exam',
        examDate: '',
        assignments: []
      }
    ],
    2: [
      {
        name: 'Data Structures',
        units: [
          { name: 'Unit 1: Arrays & Linked Lists', completed: false },
          { name: 'Unit 2: Trees & Graphs', completed: false },
          { name: 'Unit 3: Sorting Algorithms', completed: false }
        ],
        youtubeLinks: [],
        pdfs: [],
        notes: '',
        examDate: '',
        assignments: []
      }
    ]
  };

  // Toggle subject expansion
  const toggleSubject = (subjectName) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectName]: !prev[subjectName]
    }));
  };

  // Calculate semester progress
  const calculateSemesterProgress = (sem) => {
    if (!subjects[sem] || subjects[sem].length === 0) return 0;

    let totalUnits = 0;
    let completedUnits = 0;

    subjects[sem].forEach(subject => {
      subject.units.forEach(unit => {
        totalUnits++;
        if (unit.completed) completedUnits++;
      });
    });

    return totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
  };

  return (
    <div className="bg-midnight text-gray-100 min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-sunny mb-2">Academic Desk</h1>
        <p className="text-skyblue">Organize your semester-wise subjects, resources, and progress</p>
      </header>

      {/* Course Selection */}
      <div className="bg-midnight-50 rounded-xl p-6 mb-8 shadow-glow-purple">
        <h2 className="text-xl font-semibold text-white mb-4">Academic Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-skyblue mb-2">Select Your Course</label>
            <select
              className="w-full bg-midnight-100 border border-electric rounded-lg px-4 py-2 text-white focus:ring-electric focus:border-electric"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map(course => (
                <option key={course.value} value={course.value}>{course.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-skyblue mb-2">Course Duration</label>
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded-lg ${duration === 3 ? 'bg-electric text-white shadow-glow-purple' : 'bg-midnight-100 text-gray-300'}`}
                onClick={() => setDuration(3)}
              >
                3 Years
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${duration === 4 ? 'bg-electric text-white shadow-glow-purple' : 'bg-midnight-100 text-gray-300'}`}
                onClick={() => setDuration(4)}
              >
                4 Years
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Semester Navigation */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        {semesters.map(sem => (
          <button
            key={sem}
            className={`px-4 py-2 rounded-lg min-w-[100px] flex flex-col items-center ${activeSemester === sem ? 'bg-electric text-white shadow-glow-purple' : 'bg-midnight-50 text-gray-300 hover:bg-midnight-100'}`}
            onClick={() => setActiveSemester(sem)}
          >
            <span>Semester {sem}</span>
            <span className="text-xs mt-1">{calculateSemesterProgress(sem)}% Complete</span>
          </button>
        ))}
      </div>

      {/* Semester Content */}
      <div className="bg-midnight-50 rounded-xl overflow-hidden mb-8 shadow-glow-purple">
        <div className="px-6 py-4 bg-midnight-100 border-b border-electric flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Semester {activeSemester} Subjects</h2>
          <button className="flex items-center gap-2 bg-electric hover:bg-electric/90 px-3 py-1 rounded-lg text-sm shadow-glow-purple">
            <Plus size={16} /> Add Subject
          </button>
        </div>

        {subjects[activeSemester] ? (
          <div className="divide-y divide-midnight-100">
            {subjects[activeSemester].map((subject, index) => (
              <div key={index} className="p-4 hover:bg-midnight-100 transition-colors">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSubject(subject.name)}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen size={20} className="text-skyblue" />
                    <h3 className="font-medium text-lg text-white">{subject.name}</h3>
                  </div>
                  {expandedSubjects[subject.name] ? <ChevronUp className="text-electric" /> : <ChevronDown className="text-electric" />}
                </div>

                {expandedSubjects[subject.name] && (
                  <div className="mt-4 pl-9 space-y-6">
                    {/* Units */}
                    <div>
                      <h4 className="font-medium text-skyblue mb-2 flex items-center gap-2">
                        <FileText size={16} /> Units
                      </h4>
                      <div className="space-y-2">
                        {subject.units.map((unit, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={unit.completed}
                              onChange={() => { }}
                              className="h-4 w-4 rounded border-electric bg-midnight-100 text-electric focus:ring-electric"
                            />
                            <span className={unit.completed ? 'text-gray-400 line-through' : 'text-gray-200'}>
                              {unit.name}
                            </span>
                          </div>
                        ))}
                        <button className="flex items-center gap-1 text-electric text-sm mt-2">
                          <Plus size={14} /> Add Unit
                        </button>
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* YouTube Links */}
                      <div>
                        <h4 className="font-medium text-skyblue mb-2 flex items-center gap-2">
                          <Youtube size={16} /> Video Resources
                        </h4>
                        {subject.youtubeLinks.length > 0 ? (
                          <div className="space-y-2">
                            {subject.youtubeLinks.map((link, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-electric hover:underline flex items-center gap-1"
                                >
                                  <Link size={14} /> {link.title}
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">No video links added</p>
                        )}
                        <button className="flex items-center gap-1 text-electric text-sm mt-2">
                          <Plus size={14} /> Add Video Link
                        </button>
                      </div>

                      {/* PDF Resources */}
                      <div>
                        <h4 className="font-medium text-skyblue mb-2 flex items-center gap-2">
                          <FileText size={16} /> Study Materials
                        </h4>
                        {subject.pdfs.length > 0 ? (
                          <div className="space-y-2">
                            {subject.pdfs.map((pdf, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <a
                                    href={pdf.url}
                                    className="text-electric hover:underline"
                                  >
                                    {pdf.name}
                                  </a>
                                  <span className="text-gray-500 text-xs">{pdf.uploaded}</span>
                                </div>
                                <Download size={16} className="text-skyblue hover:text-white cursor-pointer" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">No materials uploaded</p>
                        )}
                        <button className="flex items-center gap-1 text-electric text-sm mt-2">
                          <Upload size={14} /> Upload Material
                        </button>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <h4 className="font-medium text-skyblue mb-2 flex items-center gap-2">
                        <Bookmark size={16} /> Personal Notes
                      </h4>
                      <textarea
                        className="w-full bg-midnight-100 border border-electric rounded-lg p-3 text-white focus:ring-electric focus:border-electric"
                        rows="3"
                        placeholder="Write your notes here..."
                        value={subject.notes}
                        onChange={() => { }}
                      />
                    </div>

                    {/* Assignments */}
                    <div>
                      <h4 className="font-medium text-skyblue mb-2 flex items-center gap-2">
                        <Calendar size={16} /> Assignments
                      </h4>
                      {subject.assignments.length > 0 ? (
                        <div className="space-y-2">
                          {subject.assignments.map((assignment, i) => (
                            <div key={i} className="flex items-center justify-between bg-midnight-100 p-2 rounded-lg">
                              <div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={assignment.completed}
                                    onChange={() => { }}
                                    className="h-4 w-4 rounded border-electric bg-midnight-50 text-electric focus:ring-electric"
                                  />
                                  <span className={assignment.completed ? 'text-gray-400 line-through' : 'text-white'}>
                                    {assignment.name}
                                  </span>
                                </div>
                                <div className="text-xs text-skyblue ml-6">Due: {assignment.due}</div>
                              </div>
                              {!assignment.completed && (
                                <Bell size={16} className="text-sunny cursor-pointer" />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No assignments added</p>
                      )}
                      <button className="flex items-center gap-1 text-electric text-sm mt-2">
                        <Plus size={14} /> Add Assignment
                      </button>
                    </div>

                    {/* Study Buddy */}
                    <div className="bg-midnight-100 p-3 rounded-lg border border-electric">
                      <h4 className="font-medium text-skyblue mb-2 flex items-center gap-2">
                        <Users size={16} /> Study Buddy
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">Share this subject with classmates</p>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="Enter classmate's email"
                          className="flex-1 bg-midnight-50 border border-electric rounded-lg px-3 py-1 text-white focus:ring-electric focus:border-electric"
                        />
                        <button className="bg-electric hover:bg-electric/90 px-3 py-1 rounded-lg text-sm shadow-glow-purple">
                          Share
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-skyblue">
                        <MessageSquare size={14} />
                        <span>Chat about this subject</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No subjects added for this semester yet.
          </div>
        )}
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-midnight-50 rounded-xl p-6 shadow-glow-purple">
          <h3 className="text-lg font-semibold text-white mb-4">Semester Progress</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-midnight-100"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-electric"
                  strokeWidth="8"
                  strokeDasharray={`${calculateSemesterProgress(activeSemester)} ${100 - calculateSemesterProgress(activeSemester)}`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-2xl font-bold text-white">{calculateSemesterProgress(activeSemester)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-midnight-50 rounded-xl p-6 shadow-glow-purple">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {subjects[activeSemester]?.flatMap(subject =>
              subject.assignments
                .filter(a => !a.completed)
                .map((assignment, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="p-2 bg-sunny/20 rounded-lg text-sunny">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{assignment.name}</p>
                      <p className="text-skyblue text-sm">{subject.name}</p>
                      <p className="text-gray-400 text-sm">Due: {assignment.due}</p>
                    </div>
                  </div>
                ))
            )}
            {!subjects[activeSemester]?.some(s => s.assignments.some(a => !a.completed)) && (
              <p className="text-gray-500 text-sm">No upcoming deadlines</p>
            )}
          </div>
        </div>

        <div className="bg-midnight-50 rounded-xl p-6 shadow-glow-purple">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-2 bg-electric hover:bg-electric/90 px-4 py-2 rounded-lg shadow-glow-purple">
              <Plus size={16} /> Add New Subject
            </button>
            <button className="w-full flex items-center gap-2 bg-midnight-100 hover:bg-midnight-200 px-4 py-2 rounded-lg border border-electric">
              <Download size={16} /> Download All Materials
            </button>
            <button className="w-full flex items-center gap-2 bg-midnight-100 hover:bg-midnight-200 px-4 py-2 rounded-lg border border-electric">
              <Calendar size={16} /> View Exam Schedule
            </button>
            <button className="w-full flex items-center gap-2 bg-midnight-100 hover:bg-midnight-200 px-4 py-2 rounded-lg border border-electric">
              <Users size={16} /> Find Study Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicDesk;