import React, { useState } from 'react';
import { BookText, Search, Calendar, Tags, Plus, X, Edit, Trash2 } from 'lucide-react';

const Journal = () => {
  const [activeTab, setActiveTab] = useState('entries');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: 'Project Breakthrough',
      content: `Finally solved the neural network architecture issue that was causing poor convergence! After three days of debugging and trying different approaches, I realized the problem was in how I was normalizing the input data.

Key learnings:
- Always check your data preprocessing steps first
- Batch normalization makes a huge difference in training stability
- The learning rate scheduler I implemented works really well

The model is now achieving 92% accuracy on the test set, which is a huge improvement from the previous 78%. I need to document this approach for the final project report.`,
      date: 'Today, 3:45 PM',
      mood: 'Excited',
      tags: ['Neural Networks', 'Success', 'Project']
    },
    {
      id: 2,
      title: 'Midterm Preparation',
      content: 'Need to focus more on algorithm complexity analysis. The practice questions from chapter 5 were particularly challenging. I spent 3 hours working through the recurrence relations and finally understand how to apply the master theorem. Need to create a cheat sheet for the different cases.',
      date: 'Yesterday, 9:30 PM',
      mood: 'Focused',
      tags: ['Study', 'Algorithms', 'Midterm']
    },
    {
      id: 3,
      title: 'Team Meeting Notes',
      content: 'Met with the project team today. We decided to use React for the frontend and Flask for the backend. Assigned tasks:\n- Sarah: User authentication\n- Mike: Database schema\n- Me: API endpoints\nNext meeting scheduled for Friday at 2pm.',
      date: '3 days ago',
      mood: 'Productive',
      tags: ['Team', 'Meeting', 'Project']
    },
  ]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    tags: [],
    mood: ''
  });
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTagFilter, setActiveTagFilter] = useState('all');

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'month' && entry.date.includes('Today')) ||
      (activeFilter === 'week' && (entry.date.includes('Today') || entry.date.includes('Yesterday')));
    const matchesTag = activeTagFilter === 'all' ||
      entry.tags.includes(activeTagFilter);

    return matchesSearch && matchesFilter && matchesTag;
  });

  const allTags = Array.from(new Set(entries.flatMap(entry => entry.tags)));

  const handleCreateEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry = {
        id: entries.length + 1,
        title: newEntry.title,
        content: newEntry.content,
        date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood: newEntry.mood || 'Neutral',
        tags: newEntry.tags
      };
      setEntries([entry, ...entries]);
      setNewEntry({ title: '', content: '', tags: [], mood: '' });
      setShowEntryForm(false);
    }
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
    if (selectedEntry && selectedEntry.id === id) {
      setSelectedEntry(null);
    }
  };

  const handleAddTag = (tag) => {
    if (!newEntry.tags.includes(tag)) {
      setNewEntry({ ...newEntry, tags: [...newEntry.tags, tag] });
    }
  };

  const handleRemoveTag = (tag) => {
    setNewEntry({ ...newEntry, tags: newEntry.tags.filter(t => t !== tag) });
  };

  return (
    <div className="min-h-screen bg-midnight-500 p-6 text-white">
      {selectedEntry ? (
        <div className="bg-midnight-400 rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-midnight-300 border-b border-midnight-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Journal Entry</h2>
            <button
              onClick={() => setSelectedEntry(null)}
              className="p-2 rounded-lg hover:bg-midnight-400 transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-medium text-white mb-1">{selectedEntry.title}</h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{selectedEntry.date}</span>
                  <span className="mx-2">•</span>
                  <span className="text-electric-400">{selectedEntry.mood}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-lg hover:bg-midnight-300 transition-colors"
                  onClick={() => {
                    setNewEntry({
                      title: selectedEntry.title,
                      content: selectedEntry.content,
                      tags: selectedEntry.tags,
                      mood: selectedEntry.mood
                    });
                    setShowEntryForm(true);
                    setSelectedEntry(null);
                  }}
                >
                  <Edit className="h-5 w-5 text-gray-400" />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-midnight-300 transition-colors"
                  onClick={() => handleDeleteEntry(selectedEntry.id)}
                >
                  <Trash2 className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="bg-midnight-300 rounded-lg p-6 text-gray-300 mb-4 whitespace-pre-line">
              {selectedEntry.content}
            </div>
            <div className="flex gap-2">
              {selectedEntry.tags.map((tag, index) => (
                <span key={index} className="bg-midnight-300 rounded-full px-3 py-1 text-gray-300 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : showEntryForm ? (
        <div className="bg-midnight-400 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">{newEntry.id ? 'Edit Entry' : 'New Journal Entry'}</h2>
            <button
              onClick={() => {
                setShowEntryForm(false);
                setNewEntry({ title: '', content: '', tags: [], mood: '' });
              }}
              className="p-2 rounded-lg hover:bg-midnight-300 transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                className="w-full bg-midnight-300 text-white border border-midnight-200 rounded-md px-3 py-2 focus:ring-electric-400 focus:border-electric-400"
                placeholder="Entry title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                rows="8"
                className="w-full bg-midnight-300 text-white border border-midnight-200 rounded-md px-3 py-2 focus:ring-electric-400 focus:border-electric-400"
                placeholder="Write your thoughts here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Mood</label>
              <select
                value={newEntry.mood}
                onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
                className="w-full bg-midnight-300 text-white border border-midnight-200 rounded-md px-3 py-2 focus:ring-electric-400 focus:border-electric-400"
              >
                <option value="">Select mood</option>
                <option value="Happy">Happy</option>
                <option value="Excited">Excited</option>
                <option value="Focused">Focused</option>
                <option value="Productive">Productive</option>
                <option value="Neutral">Neutral</option>
                <option value="Tired">Tired</option>
                <option value="Stressed">Stressed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newEntry.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-midnight-300 rounded-full px-3 py-1 text-gray-300 text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.filter(tag => !newEntry.tags.includes(tag)).map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddTag(tag)}
                    className="bg-midnight-300 rounded-full px-3 py-1 text-gray-300 text-sm hover:bg-midnight-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => {
                  setShowEntryForm(false);
                  setNewEntry({ title: '', content: '', tags: [], mood: '' });
                }}
                className="px-4 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-midnight-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEntry}
                className="px-4 py-2 bg-electric-500 hover:bg-electric-400 text-white rounded-lg transition-colors"
              >
                {newEntry.id ? 'Update Entry' : 'Create Entry'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Journal</h1>
              <p className="text-gray-400">Document your thoughts, ideas, and progress</p>
            </div>
            <button
              onClick={() => setShowEntryForm(true)}
              className="px-4 py-2 bg-electric-500 hover:bg-electric-400 text-white rounded-lg transition-colors flex items-center gap-2"
            >
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  className={`flex items-center rounded-full px-3 py-1 text-sm ${activeFilter === 'all' ? 'bg-electric-500/20 text-electric-400' : 'bg-midnight-300 text-gray-300'}`}
                  onClick={() => setActiveFilter('all')}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>All</span>
                </button>
                <button
                  className={`flex items-center rounded-full px-3 py-1 text-sm ${activeFilter === 'week' ? 'bg-electric-500/20 text-electric-400' : 'bg-midnight-300 text-gray-300'}`}
                  onClick={() => setActiveFilter('week')}
                >
                  <span>This Week</span>
                </button>
                <button
                  className={`flex items-center rounded-full px-3 py-1 text-sm ${activeFilter === 'month' ? 'bg-electric-500/20 text-electric-400' : 'bg-midnight-300 text-gray-300'}`}
                  onClick={() => setActiveFilter('month')}
                >
                  <span>This Month</span>
                </button>

                <button
                  className={`flex items-center rounded-full px-3 py-1 text-sm ${activeTagFilter === 'all' ? 'bg-electric-500/20 text-electric-400' : 'bg-midnight-300 text-gray-300'}`}
                  onClick={() => setActiveTagFilter('all')}
                >
                  <Tags className="h-4 w-4 mr-1" />
                  <span>All Tags</span>
                </button>

                {allTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`rounded-full px-3 py-1 text-sm ${activeTagFilter === tag ? 'bg-electric-500/20 text-electric-400' : 'bg-midnight-300 text-gray-300'}`}
                    onClick={() => setActiveTagFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No entries found. Create your first journal entry!
                  </div>
                ) : (
                  filteredEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-midnight-300 rounded-lg p-4 hover:bg-midnight-200 transition-colors cursor-pointer"
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-white">{entry.title}</h3>
                        <span className="text-gray-400 text-sm">{entry.date}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">
                        {entry.content.length > 100
                          ? entry.content.substring(0, 100) + '...'
                          : entry.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {entry.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-midnight-400 rounded-full px-2 py-0.5 text-gray-300 text-xs">
                              {tag}
                            </span>
                          ))}
                          {entry.tags.length > 3 && (
                            <span className="bg-midnight-400 rounded-full px-2 py-0.5 text-gray-300 text-xs">
                              +{entry.tags.length - 3}
                            </span>
                          )}
                        </div>
                        <span className="text-electric-400 text-sm">{entry.mood}</span>
                      </div>
                    </div>
                  ))
                )}
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
                  <span className="font-medium text-white">{entries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">This Month</span>
                  <span className="font-medium text-white">
                    {entries.filter(e => e.date.includes('Today')).length}
                  </span>
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
                <div className="bg-midnight-300 rounded-lg p-3 cursor-pointer hover:bg-midnight-200">
                  <p className="text-gray-300">What was the most challenging problem you solved this week?</p>
                </div>
                <div className="bg-midnight-300 rounded-lg p-3 cursor-pointer hover:bg-midnight-200">
                  <p className="text-gray-300">Describe a concept you learned today in your own words.</p>
                </div>
                <div className="bg-midnight-300 rounded-lg p-3 cursor-pointer hover:bg-midnight-200">
                  <p className="text-gray-300">What are three goals you want to accomplish this week?</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Journal;