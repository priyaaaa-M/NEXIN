import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, Plus, Check, Heart, Calendar, Clock, Music, BookOpen, List, Target, Edit, Trash2, Search, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Goals = () => {
  // Time-based greeting
  const [greeting, setGreeting] = useState('Good Morning');
  const [currentTime, setCurrentTime] = useState(new Date());
  const userName = "Priyanka";

  // Timer states
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [todayStudyTime, setTodayStudyTime] = useState(0);
  const [yearlyStudyTime, setYearlyStudyTime] = useState(0);

  // Music player states
  const [musicSearch, setMusicSearch] = useState('');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [searchResults, setSearchResults] = useState([]);
  const audioRef = useRef(null);

  // Available songs
  const availableSongs = [
    { name: 'Taylor Swift', path: '/sounds/Taylor.mp3' },
    { name: 'Indian Bollywood', path: '/sounds/indian-bollywood-hindi-song-background-music-294105.mp3' },
    { name: 'Just Relax', path: '/sounds/just-relax-11157.mp3' },
    { name: 'Light Rain Piano', path: '/sounds/light-rain-piano-music-269245.mp3' },
    { name: 'Please Calm My Mind', path: '/sounds/please-calm-my-mind-125566.mp3' },
    { name: 'Serenity', path: '/sounds/serenity-329278.mp3' },
    { name: 'Sleepy Rain', path: '/sounds/sleepy-rain-116521.mp3' },
    { name: 'The Old Water Mill', path: '/sounds/the-old-water-mill-meditation-8005.mp3' }
  ];

  // Quotes array
  const quotes = [
    "The future belongs to those who believe in the beauty of their dreams.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Your time is limited, don't waste it living someone else's life.",
    "Everything you've ever wanted is on the other side of fear.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "The best way to predict the future is to create it.",
    "The secret of getting ahead is getting started.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones."
  ];

  const [currentQuote, setCurrentQuote] = useState('');

  // Rotate quotes 3 times a day
  useEffect(() => {
    const updateQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    };

    updateQuote();
    const quoteInterval = setInterval(updateQuote, 8 * 60 * 60 * 1000);

    return () => clearInterval(quoteInterval);
  }, []);

  // To-Do List
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete React project", completed: false, dueDate: new Date() },
    { id: 2, text: "Study for math exam", completed: false, dueDate: new Date() },
    { id: 3, text: "Read 30 pages", completed: true, dueDate: new Date() }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [todoEditText, setTodoEditText] = useState('');

  // Reward messages
  const partialRewardMessages = [
    "🌱 Great start! Keep going!",
    "💪 You're making progress!",
    "⭐ Almost there, keep it up!",
    "🎯 More than halfway done!"
  ];

  const fullRewardMessages = [
    "🎉 Amazing work! You've completed all tasks!",
    "🏆 Perfect score! Everything is done!",
    "⭐ Incredible! All tasks completed!",
    "🌟 You're unstoppable! All done!"
  ];

  // Task completion states
  const [showReward, setShowReward] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [pageGlow, setPageGlow] = useState(false);

  // Confetti animation component
  const Confetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 50 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              top: "-10%",
              left: `${Math.random() * 100}%`,
              scale: 0,
            }}
            animate={{
              top: "100%",
              scale: 1,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 0.5,
              ease: "easeOut"
            }}
          >
            <div
              className="w-3 h-3"
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
              }}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  // Check task completion and show reward
  const checkTaskCompletion = () => {
    const todaysTodos = todos.filter(todo => {
      const todoDate = new Date(todo.dueDate);
      const today = new Date();
      return todoDate.toDateString() === today.toDateString();
    });

    if (todaysTodos.length === 0) return;

    const completedCount = todaysTodos.filter(todo => todo.completed).length;
    const completionPercentage = (completedCount / todaysTodos.length) * 100;

    if (completionPercentage === 100) {
      const randomMessage = fullRewardMessages[Math.floor(Math.random() * fullRewardMessages.length)];
      setRewardMessage(randomMessage);
      setShowReward(true);
      setShowConfetti(true);
      setPageGlow(true);

      setTimeout(() => {
        setShowConfetti(false);
        setPageGlow(false);
      }, 2000);

      setTimeout(() => {
        setShowReward(false);
      }, 5000);
    } else if (completionPercentage >= 50 && !showReward) {
      const randomMessage = partialRewardMessages[Math.floor(Math.random() * partialRewardMessages.length)];
      setRewardMessage(randomMessage);
      setShowReward(true);

      setTimeout(() => {
        setShowReward(false);
      }, 3000);
    }
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    setTimeout(checkTaskCompletion, 100);
  };

  // Notes state
  const [notes, setNotes] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const textAreaRef = useRef(null);

  // Handle scroll for lined paper effect
  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollTop);
  };

  // Handle note content change
  const handleNoteContentChange = (e) => {
    setNotes({
      ...notes,
      [selectedDate]: e.target.value
    });
  };

  // Update scroll height when textarea content changes
  useEffect(() => {
    if (textAreaRef.current) {
      setScrollHeight(textAreaRef.current.scrollHeight);
    }
  }, [notes, selectedDate]);

  // Set greeting based on time of day
  useEffect(() => {
    const updateGreeting = () => {
      const hours = currentTime.getHours();
      if (hours < 12) {
        setGreeting('Good Morning');
      } else if (hours < 17) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    updateGreeting();
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
      updateGreeting();
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Update study time when timer stops
  useEffect(() => {
    if (!isRunning && timer > 0) {
      const minutes = Math.floor(timer / 60);
      setTodayStudyTime(prev => prev + minutes);
      setYearlyStudyTime(prev => prev + minutes);
      setTimer(0);
    }
  }, [isRunning, timer]);

  // Search songs function
  const searchSongs = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const results = availableSongs.filter(song =>
      song.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  // Handle music playback
  const playSong = (song) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    if (currentSong?.path === song.path && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      audioRef.current.src = song.path;
      audioRef.current.volume = volume / 100;
      setCurrentSong(song);

      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    } catch (error) {
      console.error("Error setting up audio:", error);
      setIsPlaying(false);
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error("Error resuming audio:", error);
          setIsPlaying(false);
        });
    }
  };

  // Update search results when search query changes
  useEffect(() => {
    searchSongs(musicSearch);
  }, [musicSearch]);

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Timer controls
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(0);
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // To-Do List functions
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false,
        dueDate: new Date()
      }]);
      setNewTodo('');
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setTodoEditText(todo.text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: todoEditText } : todo
    ));
    setEditingTodo(null);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Monthly goals state
  const [monthlyGoals, setMonthlyGoals] = useState([
    { id: 1, text: "Complete React project", completed: false },
    { id: 2, text: "Learn TypeScript", completed: false }
  ]);
  const [newMonthlyGoal, setNewMonthlyGoal] = useState('');
  const [editingMonthlyGoal, setEditingMonthlyGoal] = useState(null);
  const [monthlyGoalEditText, setMonthlyGoalEditText] = useState('');

  // Monthly goals functions
  const addMonthlyGoal = () => {
    if (newMonthlyGoal.trim()) {
      setMonthlyGoals([
        ...monthlyGoals,
        { id: Date.now(), text: newMonthlyGoal, completed: false }
      ]);
      setNewMonthlyGoal('');
    }
  };

  const toggleMonthlyGoal = (id) => {
    setMonthlyGoals(monthlyGoals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const startEditingMonthlyGoal = (goal) => {
    setEditingMonthlyGoal(goal.id);
    setMonthlyGoalEditText(goal.text);
  };

  const saveMonthlyGoalEdit = (id) => {
    if (monthlyGoalEditText.trim()) {
      setMonthlyGoals(monthlyGoals.map(goal =>
        goal.id === id ? { ...goal, text: monthlyGoalEditText } : goal
      ));
    }
    setEditingMonthlyGoal(null);
  };

  const deleteMonthlyGoal = (id) => {
    setMonthlyGoals(monthlyGoals.filter(goal => goal.id !== id));
  };

  // Manifestation state
  const [manifestations, setManifestations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Add new manifestation
  const addManifestation = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    setManifestations([
      ...manifestations,
      {
        id: Date.now(),
        content: '',
        date: formattedDate,
        color: `hsl(${Math.random() * 360}, 85%, 75%)`
      }
    ]);
    setCurrentPage(manifestations.length);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-midnight-500 to-midnight-700 p-6 transition-all duration-300 ${pageGlow ? 'brightness-125' : ''}`}>
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Greeting Section */}
      <div className="bg-gradient-to-r from-electric-500 to-electric-700 rounded-xl p-6 shadow-md mb-6">
        <h1 className="text-3xl font-bold text-white">
          {userName} - {greeting}
        </h1>
        <p className="text-electric-100">
          {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Timer Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-skyblue-500 to-skyblue-700 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Clock className="text-skyblue-200" /> Study Timer
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTimer}
                className="p-2 bg-white text-skyblue-600 rounded-full hover:bg-skyblue-100 transition-colors"
              >
                {isRunning ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                onClick={resetTimer}
                className="p-2 bg-skyblue-800 text-white rounded-full hover:bg-skyblue-700 transition-colors"
              >
                <SkipForward size={20} />
              </button>
            </div>
          </div>
          <div className="text-center mb-6">
            <span className="text-5xl font-bold text-white">
              {formatTime(timer)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-skyblue-400/30 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-sm text-skyblue-100 mb-1">Today</h3>
              <p className="text-xl font-semibold text-white">
                {Math.floor(todayStudyTime / 60)}h {todayStudyTime % 60}m
              </p>
            </div>
            <div className="bg-skyblue-400/30 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-sm text-skyblue-100 mb-1">Year Total</h3>
              <p className="text-xl font-semibold text-white">
                {Math.floor(yearlyStudyTime / 60)}h {yearlyStudyTime % 60}m
              </p>
            </div>
          </div>
        </div>

        {/* Music Player Section */}
        <div className="bg-gradient-to-br from-electric-500 to-electric-700 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
            <Music className="text-electric-200" /> Study Music
          </h2>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search music..."
              value={musicSearch}
              onChange={(e) => setMusicSearch(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg bg-electric-600/50 border border-electric-400 text-white placeholder-electric-200 focus:outline-none focus:ring-2 focus:ring-electric-300"
            />
            <Search className="absolute left-3 top-3.5 text-electric-200" size={18} />
          </div>
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto custom-scrollbar">
            {searchResults.map(track => (
              <div
                key={track.name}
                onClick={() => playSong(track)}
                className={`p-3 rounded-lg cursor-pointer flex justify-between items-center transition-colors ${currentSong?.path === track.path
                  ? 'bg-electric-400 text-white'
                  : 'bg-electric-600/30 text-electric-100 hover:bg-electric-500/50'
                  }`}
              >
                <div>
                  <p className="font-medium">{track.name}</p>
                </div>
                <span className="text-sm">▶</span>
              </div>
            ))}
          </div>
          {currentSong && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-white">{currentSong.name}</p>
                </div>
                <button
                  onClick={togglePlayPause}
                  className="p-2 bg-white text-electric-600 rounded-full hover:bg-electric-100 transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 size={18} className="text-electric-200" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                  className="w-full accent-electric-300"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quotes Section */}
      <div className="bg-gradient-to-br from-sunny-400 to-sunny-600 rounded-xl p-6 shadow-lg h-[90px] flex flex-col items-center justify-center relative overflow-hidden mb-6">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center px-8 relative z-10"
        >
          <p className="text-xl font-dancing-script leading-relaxed text-sunny-900">
            "{currentQuote}"
          </p>
        </motion.div>

        <button
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setCurrentQuote(quotes[randomIndex]);
          }}
          className="absolute bottom-4 right-4 p-2 text-sunny-800 hover:text-sunny-900 transition-colors"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Reward Message */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 text-lg"
          >
            {rewardMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* To-Do and Notes Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* To-Do List */}
        <div className="bg-midnight-400 rounded-xl p-6 shadow-lg h-[450px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <List className="text-skyblue-300" /> To-Do List
            </h2>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1 p-2 border border-midnight-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-500 bg-midnight-500 text-white placeholder-midnight-200"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button
              onClick={addTodo}
              className="p-2 bg-electric-600 text-white rounded-lg hover:bg-electric-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`p-3 rounded-lg border ${todo.completed
                  ? 'bg-electric-500/20 border-electric-400'
                  : 'bg-midnight-500 border-midnight-300'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${todo.completed
                        ? 'bg-electric-500 border-electric-500 text-white'
                        : 'border-midnight-200'
                        }`}
                    >
                      {todo.completed && <Check size={14} />}
                    </button>
                    {editingTodo === todo.id ? (
                      <input
                        type="text"
                        value={todoEditText}
                        onChange={(e) => setTodoEditText(e.target.value)}
                        onBlur={() => saveEdit(todo.id)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                        className="flex-1 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-electric-500 bg-midnight-600 text-white"
                        autoFocus
                      />
                    ) : (
                      <p className={`flex-1 truncate ${todo.completed
                        ? 'text-midnight-200 line-through'
                        : 'text-white'
                        }`}>
                        {todo.text}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    <button
                      onClick={() => startEditing(todo)}
                      className="p-1 text-midnight-200 hover:text-electric-400"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-1 text-midnight-200 hover:text-sunny-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-midnight-400 rounded-xl p-6 shadow-lg h-[450px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <BookOpen className="text-skyblue-400" /> Notes
            </h2>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-2 text-skyblue-400 hover:bg-midnight-500 rounded-lg"
            >
              <Calendar size={20} />
            </button>
          </div>

          {/* Calendar */}
          <AnimatePresence>
            {showCalendar && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-4 overflow-hidden"
              >
                <div className="bg-midnight-500 p-3 rounded-lg">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-midnight-200">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <button
                        key={day}
                        onClick={() => {
                          const newDate = new Date();
                          newDate.setDate(day);
                          setSelectedDate(newDate.toISOString().split('T')[0]);
                          setShowCalendar(false);
                        }}
                        className={`p-2 text-sm rounded-lg ${selectedDate === new Date(new Date().setDate(day)).toISOString().split('T')[0]
                          ? 'bg-electric-500 text-white'
                          : 'hover:bg-midnight-600 text-midnight-100'
                          }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Single Note with Lined Paper Effect */}
          <div className="bg-midnight-600 rounded-lg p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-midnight-100 font-medium">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
            </div>
            <div className="relative flex-1 overflow-hidden">
              <div
                className="absolute w-full pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 30px, #4B5563 31px)`,
                  backgroundSize: "100% 32px",
                  transform: `translateY(-${scrollPosition}px)`,
                  height: `${scrollHeight}px`,
                  marginTop: "2px",
                }}
              ></div>
              <textarea
                ref={textAreaRef}
                className="relative w-full h-full bg-transparent text-midnight-100 p-2 outline-none resize-none font-kalam font-light custom-scrollbar"
                style={{
                  lineHeight: "32px",
                  paddingTop: "8px",
                }}
                placeholder="Take a note..."
                value={notes[selectedDate] || ''}
                onChange={handleNoteContentChange}
                onScroll={handleScroll}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Goals and Manifestation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Goals */}
        <div className="bg-midnight-400 rounded-xl p-6 shadow-lg h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Target className="text-skyblue-400" /> Monthly Goals
            </h2>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a monthly goal..."
              value={newMonthlyGoal}
              onChange={(e) => setNewMonthlyGoal(e.target.value)}
              className="flex-1 p-2 border border-midnight-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-500 bg-midnight-500 text-white placeholder-midnight-200"
              onKeyPress={(e) => e.key === 'Enter' && addMonthlyGoal()}
            />
            <button
              onClick={addMonthlyGoal}
              className="p-2 bg-electric-600 text-white rounded-lg hover:bg-electric-700"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
            {monthlyGoals.map(goal => (
              <div
                key={goal.id}
                className={`p-3 rounded-lg border ${goal.completed
                  ? 'bg-electric-500/20 border-electric-400'
                  : 'bg-midnight-500 border-midnight-300'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleMonthlyGoal(goal.id)}
                      className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${goal.completed
                        ? 'bg-electric-500 border-electric-500 text-white'
                        : 'border-midnight-200'
                        }`}
                    >
                      {goal.completed && <Check size={14} />}
                    </button>
                    {editingMonthlyGoal === goal.id ? (
                      <input
                        type="text"
                        value={monthlyGoalEditText}
                        onChange={(e) => setMonthlyGoalEditText(e.target.value)}
                        onBlur={() => saveMonthlyGoalEdit(goal.id)}
                        onKeyPress={(e) => e.key === 'Enter' && saveMonthlyGoalEdit(goal.id)}
                        className="flex-1 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-electric-500 bg-midnight-600 text-white"
                        autoFocus
                      />
                    ) : (
                      <p className={`flex-1 truncate ${goal.completed
                        ? 'text-midnight-200 line-through'
                        : 'text-white'
                        }`}>
                        {goal.text}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    <button
                      onClick={() => startEditingMonthlyGoal(goal)}
                      className="p-1 text-midnight-200 hover:text-electric-400"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteMonthlyGoal(goal.id)}
                      className="p-1 text-midnight-200 hover:text-sunny-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manifestation Section */}
        <div className="bg-gradient-to-br from-sunny-400 to-sunny-600 rounded-xl p-6 shadow-lg h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-sunny-900 flex items-center gap-2">
              <Target className="text-sunny-800" /> Daily Affirmations
            </h2>
            <button
              onClick={addManifestation}
              className="p-2 bg-sunny-700 text-sunny-100 rounded-lg hover:bg-sunny-800"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden">
            {manifestations.map((manifestation, index) => (
              <motion.div
                key={manifestation.id}
                initial={{ rotateX: 90, y: 20, opacity: 0 }}
                animate={{
                  rotateX: index === currentPage ? 0 : 90,
                  y: index === currentPage ? 0 : 20,
                  opacity: index === currentPage ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  position: index === currentPage ? 'relative' : 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0
                }}
                className="bg-sunny-100/80 rounded-lg h-full flex flex-col"
              >
                <div className="text-xs text-sunny-800/70 mb-2 font-mono">
                  {manifestation.date}
                </div>
                <textarea
                  value={manifestation.content}
                  onChange={(e) => {
                    const newManifestations = [...manifestations];
                    newManifestations[index].content = e.target.value;
                    setManifestations(newManifestations);
                  }}
                  placeholder="Write your manifestation here..."
                  className="w-full flex-1 bg-transparent border-none focus:outline-none resize-none custom-scrollbar"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: '1.25rem',
                    lineHeight: '2',

                    background: `linear-gradient(transparent, transparent 31px, #D1D5DB 31px, #D1D5DB 32px, transparent 32px)`,
                    backgroundSize: '100% 32px',
                    color: manifestation.color
                  }}
                />
              </motion.div>
            ))}

            {manifestations.length === 0 && (
              <div className="text-center text-sunny-800/50 h-full flex flex-col items-center justify-center">
                <Target size={40} className="mb-4 opacity-70" />
                <p>Click + to start your manifestation journey</p>
              </div>
            )}

            {/* Page Navigation */}
            {manifestations.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-2 bg-gradient-to-t from-sunny-100/80 to-transparent pt-4">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  className="p-2 text-sunny-800/70 hover:text-sunny-900 disabled:opacity-50"
                  disabled={currentPage === 0}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(manifestations.length - 1, currentPage + 1))}
                  className="p-2 text-sunny-800/70 hover:text-sunny-900 disabled:opacity-50"
                  disabled={currentPage === manifestations.length - 1}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>

        <style jsx global>{`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`}
        </style>
      </div>
    </div>
  );
};

export default Goals;