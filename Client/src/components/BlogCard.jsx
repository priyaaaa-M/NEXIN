import React, { useState, useRef } from 'react';
import {
  Edit, FileText, BarChart2, Tag, Calendar,
  Search, Plus, Trash2, Eye, Save, Send,
  CheckCircle, Clock, ChevronDown, HardDrive, Image as ImageIcon, X, ArrowLeft
} from 'lucide-react';

const BlogCard = () => {
  // State management
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      content: 'Learn how to build your first React application with this comprehensive guide.\n\nReact has become one of the most popular front-end libraries for building user interfaces. Its component-based architecture makes it easy to build complex UIs from small, isolated pieces of code called components.',
      images: ['https://source.unsplash.com/random/600x400/?react'],
      category: 'Technology',
      tags: ['#Tech', '#Programming'],
      author: 'John Doe',
      lastUpdated: '2023-05-15',
      status: 'published',
      views: 150
    },
    {
      id: 2,
      title: 'Advanced CSS Techniques',
      content: 'Explore modern CSS features that will take your styling to the next level.\n\nCSS Grid and Flexbox have revolutionized how we create layouts on the web. With these tools, we can create complex responsive designs with less code and more flexibility than ever before.',
      images: ['https://source.unsplash.com/random/600x400/?css'],
      category: 'Design',
      tags: ['#Design', '#Web'],
      author: 'Jane Smith',
      lastUpdated: '2023-05-10',
      status: 'published',
      views: 89
    },
    {
      id: 3,
      title: 'Financial Planning for Beginners',
      content: 'Start your journey to financial freedom with these basic principles.\n\nUnderstanding how to manage your money is crucial for long-term stability. This guide covers budgeting, saving, and basic investment strategies to help you get started.',
      images: ['https://source.unsplash.com/random/600x400/?finance'],
      category: 'Finance',
      tags: ['#Finance', '#Money'],
      author: 'Robert Johnson',
      lastUpdated: '2023-05-18',
      status: 'published',
      views: 120
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    images: [],
    category: '',
    tags: [],
    author: '',
    status: 'draft',
    views: 0
  });
  const [currentTagFilter, setCurrentTagFilter] = useState(null);
  const fileInputRef = useRef(null);
  const tagInputRef = useRef(null);

  // Get all unique tags from posts
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  // Filter posts based on search query, active tab and tag filter
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || post.status === activeTab;
    const matchesTag = !currentTagFilter || post.tags.includes(currentTagFilter);
    return matchesSearch && matchesTab && matchesTag;
  });

  // Get posts filtered by tag (for horizontal scrolling section)
  const tagFilteredPosts = currentTagFilter
    ? posts.filter(post => post.tags.includes(currentTagFilter))
    : [];

  // Handler functions
  const handleSavePost = () => {
    if (selectedPost) {
      // Update existing post
      setPosts(posts.map(post =>
        post.id === selectedPost.id ? { ...selectedPost } : post
      ));
    } else {
      // Add new post
      const postToAdd = {
        ...newPost,
        id: posts.length + 1,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setPosts([...posts, postToAdd]);
    }
    setIsEditorOpen(false);
    setSelectedPost(null);
    setNewPost({
      title: '',
      content: '',
      images: [],
      category: '',
      tags: [],
      author: '',
      status: 'draft',
      views: 0
    });
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(null);
      setIsEditorOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedPost) {
      setSelectedPost({ ...selectedPost, [name]: value });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));

    if (selectedPost) {
      setSelectedPost({
        ...selectedPost,
        images: [...selectedPost.images, ...imageUrls]
      });
    } else {
      setNewPost({
        ...newPost,
        images: [...newPost.images, ...imageUrls]
      });
    }
  };

  const handleRemoveImage = (index) => {
    if (selectedPost) {
      const updatedImages = [...selectedPost.images];
      updatedImages.splice(index, 1);
      setSelectedPost({
        ...selectedPost,
        images: updatedImages
      });
    } else {
      const updatedImages = [...newPost.images];
      updatedImages.splice(index, 1);
      setNewPost({
        ...newPost,
        images: updatedImages
      });
    }
  };

  const handleAddTag = () => {
    const tagValue = tagInputRef.current.value.trim();
    if (tagValue && !tagValue.startsWith('#')) {
      tagInputRef.current.value = `#${tagValue}`;
      return;
    }

    if (tagValue && !(selectedPost ? selectedPost.tags : newPost.tags).includes(tagValue)) {
      if (selectedPost) {
        setSelectedPost({
          ...selectedPost,
          tags: [...selectedPost.tags, tagValue]
        });
      } else {
        setNewPost({
          ...newPost,
          tags: [...newPost.tags, tagValue]
        });
      }
      tagInputRef.current.value = '';
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    if (selectedPost) {
      setSelectedPost({
        ...selectedPost,
        tags: selectedPost.tags.filter(tag => tag !== tagToRemove)
      });
    } else {
      setNewPost({
        ...newPost,
        tags: newPost.tags.filter(tag => tag !== tagToRemove)
      });
    }
  };

  const openReaderView = (post) => {
    if (post.status === 'published') {
      // Increment view count
      setPosts(posts.map(p =>
        p.id === post.id ? { ...p, views: p.views + 1 } : p
      ));
      setSelectedPost(post);
      setIsReaderOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-50 text-gray-900 font-sans pt-20">
      {!isReaderOpen ? (
        <main className="container mx-auto px-4">
          {/* Filter, Search and New Post row - improved layout */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            {/* Tab Filters */}
            <div className="flex space-x-1 bg-midnight-100 p-1 rounded-lg">
              {['all', 'published', 'draft'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm capitalize ${activeTab === tab
                    ? 'bg-electric-500 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search and New Post - now properly aligned */}
            <div className="flex flex-1 md:flex-none items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-midnight-100 border-none rounded-lg focus:ring-2 focus:ring-electric-500 focus:outline-none text-sm text-white placeholder-gray-400"
                />
              </div>

              <button
                onClick={() => { setSelectedPost(null); setIsEditorOpen(true); }}
                className="flex-shrink-0 flex items-center bg-electric-500 hover:bg-electric-600 text-white px-4 py-2 rounded-md transition-colors whitespace-nowrap shadow-glow-purple"
              >
                <Plus className="mr-2" size={18} />
                New Post
              </button>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Filter by Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setCurrentTagFilter(currentTagFilter === tag ? null : tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${currentTagFilter === tag
                    ? 'bg-electric-500 text-white'
                    : 'bg-midnight-100 text-gray-300 hover:bg-midnight-200'
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Posts List - Main content */}
            <div className="lg:col-span-3">
              <div className="bg-midnight-100 rounded-lg border border-midnight-300 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 bg-midnight-200 p-3 border-b border-midnight-300 text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <div className="col-span-6">Title</div>
                  <div className="col-span-2 flex items-center">
                    <Tag className="mr-1" size={14} />
                    Category
                  </div>
                  <div className="col-span-2">Last Updated</div>
                  <div className="col-span-2">Status</div>
                </div>

                {/* Posts List */}
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <div
                      key={post.id}
                      className={`grid grid-cols-12 p-3 border-b border-midnight-300 ${post.status === 'published' ? 'hover:bg-electric-900/10 cursor-pointer' : ''} transition-colors items-center`}
                      onClick={() => post.status === 'published' ? openReaderView(post) : null}
                    >
                      <div className="col-span-6 font-medium text-white">
                        <p className="truncate">{post.title}</p>
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {post.content.replace(/<[^>]*>/g, '').substring(0, 60)}...
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {post.tags.map(tag => (
                            <span key={tag} className="text-xs bg-midnight-200 text-gray-300 px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-2 text-sm text-gray-400">{post.category}</div>
                      <div className="col-span-2 text-sm text-gray-500">{post.lastUpdated}</div>
                      <div className="col-span-2 flex items-center justify-between">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === 'published'
                          ? 'bg-skyblue-500/20 text-skyblue-500'
                          : 'bg-sunny-500/20 text-sunny-500'
                          }`}>
                          {post.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                        {post.status === 'draft' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPost(post);
                              setIsEditorOpen(true);
                            }}
                            className="text-electric-500 hover:text-electric-400"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No posts found matching your criteria
                  </div>
                )}
              </div>
            </div>

            {/* Analytics Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-midnight-100 border border-midnight-300 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3 flex items-center">
                  <BarChart2 className="mr-2 text-electric-500" size={18} />
                  Blog Stats
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Posts</p>
                    <p className="text-2xl font-bold text-white">{posts.length}</p>
                  </div>
                  <div className="flex space-x-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Published</p>
                      <p className="text-xl font-medium text-skyblue-500">
                        {posts.filter(p => p.status === 'published').length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Drafts</p>
                      <p className="text-xl font-medium text-sunny-500">
                        {posts.filter(p => p.status === 'draft').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Posts */}
              <div className="bg-midnight-100 border border-midnight-300 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Top Performing</h3>
                <div className="space-y-3">
                  {[...posts]
                    .filter(p => p.status === 'published')
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 3)
                    .map(post => (
                      <div
                        key={post.id}
                        className="flex justify-between items-center text-sm hover:bg-midnight-200 p-1 rounded cursor-pointer text-gray-300"
                        onClick={() => openReaderView(post)}
                      >
                        <p className="truncate pr-2">{post.title}</p>
                        <span className="flex items-center text-gray-400">
                          <Eye className="mr-1" size={14} />
                          {post.views}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-midnight-100 border border-midnight-300 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(posts.map(p => p.category))).map(category => (
                    <span
                      key={category}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-midnight-200 text-gray-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal scrolling section for tag-filtered posts */}
          {currentTagFilter && tagFilteredPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-bold text-white mb-4">More in {currentTagFilter}</h3>
              <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4">
                {tagFilteredPosts.map(post => (
                  <div
                    key={post.id}
                    onClick={() => openReaderView(post)}
                    className="flex-shrink-0 w-64 border border-midnight-300 rounded-lg overflow-hidden cursor-pointer hover:shadow-glow-purple transition-shadow bg-midnight-100"
                  >
                    {post.images.length > 0 && (
                      <img
                        src={post.images[0]}
                        alt={post.title}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h4 className="font-medium text-white truncate">{post.title}</h4>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-xs bg-midnight-200 text-gray-300 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      ) : (
        /* Full-page Reader View */
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setIsReaderOpen(false)}
            className="flex items-center text-electric-500 hover:text-electric-400 mb-6"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to all posts
          </button>

          <article className="prose max-w-none">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">{selectedPost.title}</h1>
              <div className="flex items-center text-sm text-gray-400 space-x-4 mb-4">
                <span>Category: {selectedPost.category}</span>
                <span>Last Updated: {selectedPost.lastUpdated}</span>
                <span className="flex items-center">
                  <Eye className="mr-1" size={14} />
                  {selectedPost.views} views
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setIsReaderOpen(false);
                      setCurrentTagFilter(tag);
                    }}
                    className="px-2 py-1 bg-electric-500/20 text-electric-500 text-xs rounded-full hover:bg-electric-500/30"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </header>

            {selectedPost.images.length > 0 && (
              <figure className="mb-8">
                <img
                  src={selectedPost.images[0]}
                  alt="Featured"
                  className="w-full h-auto rounded-lg"
                />
                <figcaption className="text-center text-sm text-gray-500 mt-2">
                  Featured image for {selectedPost.title}
                </figcaption>
              </figure>
            )}

            <div className="whitespace-pre-line text-gray-300">
              {selectedPost.content}
            </div>

            {selectedPost.images.length > 1 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPost.images.slice(1).map((img, index) => (
                  <img
                    key={index + 1}
                    src={img}
                    alt={`Post ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                ))}
              </div>
            )}

            <footer className="mt-12 pt-6 border-t border-midnight-300">
              <p className="text-gray-400">Written by <span className="font-medium text-white">{selectedPost.author}</span></p>
            </footer>
          </article>

          {/* Related posts by tag */}
          {selectedPost.tags.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-bold text-white mb-6">More posts you might like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts
                  .filter(post =>
                    post.id !== selectedPost.id &&
                    post.tags.some(tag => selectedPost.tags.includes(tag))
                  )
                  .slice(0, 3)
                  .map(post => (
                    <div
                      key={post.id}
                      onClick={() => openReaderView(post)}
                      className="border border-midnight-300 rounded-lg overflow-hidden cursor-pointer hover:shadow-glow-purple transition-shadow bg-midnight-100"
                    >
                      {post.images.length > 0 && (
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h4 className="font-medium text-white">{post.title}</h4>
                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                          {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.tags.map(tag => (
                            <span key={tag} className="text-xs bg-midnight-200 text-gray-300 px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-midnight-100 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
            {/* Modal header */}
            <div className="flex justify-between items-center p-4 border-b border-midnight-300">
              <h2 className="text-lg font-bold text-white">
                {selectedPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            {/* Modal content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={selectedPost ? selectedPost.title : newPost.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-midnight-300 rounded-md focus:ring-electric-500 focus:border-electric-500 bg-midnight-200 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
                  <textarea
                    name="content"
                    value={selectedPost ? selectedPost.content : newPost.content}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-3 py-2 border border-midnight-300 rounded-md focus:ring-electric-500 focus:border-electric-500 bg-midnight-200 text-white"
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={selectedPost ? selectedPost.author : newPost.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-midnight-300 rounded-md focus:ring-electric-500 focus:border-electric-500 bg-midnight-200 text-white"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Images</label>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {(selectedPost ? selectedPost.images : newPost.images).map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Post ${index}`}
                          className="h-24 w-24 object-cover rounded border border-midnight-300"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center px-3 py-2 bg-midnight-200 text-gray-300 rounded-md hover:bg-midnight-300"
                  >
                    <ImageIcon className="mr-2" size={16} />
                    Add Images
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(selectedPost ? selectedPost.tags : newPost.tags).map(tag => (
                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-midnight-200 text-gray-300">
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1.5 text-gray-500 hover:text-gray-300"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      ref={tagInputRef}
                      placeholder="Add tag (e.g. #Tech)"
                      className="flex-1 px-3 py-2 border border-midnight-300 rounded-l-md focus:ring-electric-500 focus:border-electric-500 bg-midnight-200 text-white"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-electric-500 text-white rounded-r-md hover:bg-electric-600"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <select
                      name="category"
                      value={selectedPost ? selectedPost.category : newPost.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-midnight-300 rounded-md focus:ring-electric-500 focus:border-electric-500 bg-midnight-200 text-white"
                    >
                      <option value="">Select a category</option>
                      <option value="Technology">Technology</option>
                      <option value="Design">Design</option>
                      <option value="Finance">Finance</option>
                      <option value="Business">Business</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <select
                      name="status"
                      value={selectedPost ? selectedPost.status : newPost.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-midnight-300 rounded-md focus:ring-electric-500 focus:border-electric-500 bg-midnight-200 text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex justify-between items-center p-4 border-t border-midnight-300">
              <div>
                {selectedPost && (
                  <button
                    onClick={() => handleDeletePost(selectedPost.id)}
                    className="flex items-center text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="mr-2" size={16} />
                    Delete Post
                  </button>
                )}
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 border border-midnight-300 rounded-md text-gray-300 hover:bg-midnight-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePost}
                  className="flex items-center px-4 py-2 bg-electric-500 text-white rounded-md hover:bg-electric-600 shadow-glow-purple"
                >
                  <Save className="mr-2" size={16} />
                  {selectedPost ? 'Update Post' : 'Save Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;