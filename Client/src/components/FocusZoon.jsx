import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FocusZoom = () => {
    const [activeTab, setActiveTab] = useState('dsa');
    const [progress, setProgress] = useState({
        dsa: 35,
        core: 20
    });
    const [isLoading, setIsLoading] = useState(true);
    const [expandedModule, setExpandedModule] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const modules = {
        dsa: [
            {
                id: 1,
                title: "DSA Basics to Advanced",
                description: "Comprehensive learning path",
                icon: "cube",
                content: [
                    "Step 1: Learn the basics",
                    "Step 2: Important Sorting Techniques",
                    "Step 3: Solve Array Problems [Easy -> Medium -> Hard]",
                    "Step 4: Binary Search [1D, 2D Arrays, Search Space]",
                    "Step 5: Strings [Basic and Medium]",
                    "Step 6: Linked Lists [All types]",
                    "Step 7: Trees and Graphs",
                    "Step 8: Dynamic Programming"
                ],
                stats: {
                    topics: 19,
                    problems: 463
                },
                progress: progress.dsa,
                color: "teal"
            },
            {
                id: 2,
                title: "DSA Concept Revision",
                description: "Master Key Topics",
                icon: "bulb",
                content: [
                    "Time Complexity Analysis",
                    "Space Complexity Optimization",
                    "Pattern Recognition Techniques",
                    "Problem Solving Approaches",
                    "Interview Preparation Strategies"
                ],
                stats: {
                    topics: 40,
                    problems: 200
                },
                progress: 25,
                color: "blue"
            }
        ],
        core: [
            {
                id: 3,
                title: "Operating Systems",
                description: "Master OS Concepts",
                icon: "cpu",
                content: [
                    "Processes and Threads",
                    "Memory Management",
                    "File Systems",
                    "Scheduling Algorithms",
                    "Deadlocks",
                    "Virtual Memory",
                    "I/O Systems"
                ],
                stats: {
                    topics: 15,
                    problems: 120
                },
                progress: progress.core,
                color: "purple"
            },
            {
                id: 4,
                title: "Database Systems",
                description: "SQL & NoSQL Mastery",
                icon: "database",
                content: [
                    "Relational Model",
                    "SQL Queries",
                    "Indexing",
                    "Transactions",
                    "NoSQL Databases",
                    "Database Design",
                    "Normalization"
                ],
                stats: {
                    topics: 12,
                    problems: 150
                },
                progress: 18,
                color: "indigo"
            },
            {
                id: 5,
                title: "Computer Networks",
                description: "Networking Fundamentals",
                icon: "network",
                content: [
                    "OSI Model",
                    "TCP/IP Protocol",
                    "Routing Algorithms",
                    "Network Security",
                    "Wireless Networks",
                    "Cloud Networking"
                ],
                stats: {
                    topics: 18,
                    problems: 130
                },
                progress: 15,
                color: "red"
            },
            {
                id: 6,
                title: "System Design",
                description: "Scalable Architecture",
                icon: "design",
                content: [
                    "Design Principles",
                    "Load Balancing",
                    "Caching Strategies",
                    "Database Scaling",
                    "Microservices",
                    "Distributed Systems"
                ],
                stats: {
                    topics: 10,
                    problems: 80
                },
                progress: 10,
                color: "pink"
            }
        ]
    };

    const renderIcon = (icon) => {
        switch (icon) {
            case 'cube':
                return (
                    <div className="w-24 h-24 bg-teal-800 rounded-lg transform rotate-45 flex items-center justify-center">
                        <div className="w-16 h-16 bg-teal-700 rounded transform -rotate-45"></div>
                    </div>
                );
            case 'bulb':
                return (
                    <svg className="w-24 h-24 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                );
            case 'cpu':
                return (
                    <svg className="w-24 h-24 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                );
            case 'database':
                return (
                    <svg className="w-24 h-24 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                );
            case 'network':
                return (
                    <svg className="w-24 h-24 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                );
            case 'design':
                return (
                    <svg className="w-24 h-24 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const getColorClasses = (color) => {
        switch (color) {
            case 'teal':
                return 'bg-teal-900 hover:bg-teal-800';
            case 'blue':
                return 'bg-blue-900 hover:bg-blue-800';
            case 'purple':
                return 'bg-purple-900 hover:bg-purple-800';
            case 'indigo':
                return 'bg-indigo-900 hover:bg-indigo-800';
            case 'red':
                return 'bg-red-900 hover:bg-red-800';
            case 'pink':
                return 'bg-pink-900 hover:bg-pink-800';
            default:
                return 'bg-gray-800 hover:bg-gray-700';
        }
    };

    const toggleModule = (id) => {
        setExpandedModule(expandedModule === id ? null : id);
    };

    return (
        <div className="bg-gray-900 min-h-screen pt-20 pb-6 px-6 text-white font-sans">
            {/* Module Title */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Module: {activeTab === 'dsa' ? 'Data Structures and Algorithms' : 'Core Subjects'}</h1>
                <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                >
                    View Dashboard
                </Link>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 mb-8">
                <button
                    className={`pb-2 px-4 font-medium text-lg ${activeTab === 'dsa' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('dsa')}
                >
                    DSA
                </button>
                <button
                    className={`pb-2 px-4 font-medium text-lg ${activeTab === 'core' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('core')}
                >
                    Core Subjects
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <>
                    {/* Content Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {modules[activeTab].map((module) => (
                            <div
                                key={module.id}
                                className={`${getColorClasses(module.color)} rounded-xl p-6 shadow-lg transition-all hover:shadow-xl cursor-pointer`}
                                onClick={() => toggleModule(module.id)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1">{module.title}</h2>
                                        <p className="text-gray-300 mb-4">{module.description}</p>
                                    </div>
                                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">NEXIN</span>
                                </div>

                                {/* Visual Element */}
                                <div className="flex justify-center my-6">
                                    {renderIcon(module.icon)}
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                                    <div
                                        className="bg-orange-500 h-2.5 rounded-full"
                                        style={{ width: `${module.progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-right text-sm text-gray-400 mt-1">{module.progress}% completed</p>

                                {/* Stats */}
                                <div className="flex justify-between text-gray-300 mt-6">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                        </svg>
                                        <span>{module.stats.topics} Topics</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{module.stats.problems}+ Problems</span>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedModule === module.id && (
                                    <div className="mt-6 pt-6 border-t border-gray-700">
                                        <h3 className="font-bold text-lg mb-3">Learning Path:</h3>
                                        <ul className="space-y-2">
                                            {module.content.map((item, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-orange-500 mr-2">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Additional Resources Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                                <h3 className="font-bold text-lg mb-2">Cheat Sheets</h3>
                                <p className="text-gray-400 mb-3">Quick reference guides for all topics</p>
                                <button className="text-orange-500 hover:text-orange-400 font-medium">View All →</button>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                                <h3 className="font-bold text-lg mb-2">Interview Prep</h3>
                                <p className="text-gray-400 mb-3">Common questions and solutions</p>
                                <button className="text-orange-500 hover:text-orange-400 font-medium">Explore →</button>
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                                <h3 className="font-bold text-lg mb-2">Community</h3>
                                <p className="text-gray-400 mb-3">Connect with other learners</p>
                                <button className="text-orange-500 hover:text-orange-400 font-medium">Join →</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FocusZoom;