import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({ 
    firstName: 'Test', 
    lastName: 'User',
    email: 'test@example.com',
    bio: '',
    country: '',
    gender: ''
  });
  
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef();
  const [bioLength, setBioLength] = useState(0);

  // Helper to split name for initials
  const getInitialsUrl = (firstName, lastName) => {
    return `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(firstName || '')}%20${encodeURIComponent(lastName || '')}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setBioLength(res.data.bio?.length || 0);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'bio') {
      setBioLength(value.length);
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Add profile data
      Object.entries(profile).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Add avatar file if selected
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      
      const res = await axios.put('/api/profile', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      
      setProfile(res.data.user);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const avatarSrc = avatarFile 
    ? URL.createObjectURL(avatarFile) 
    : getInitialsUrl(profile.firstName, profile.lastName);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-bg-main min-h-screen">
      <div className="bg-bg-card rounded-xl shadow-lg p-8 border border-border">
        <h1 className="text-2xl font-bold text-text-main mb-8">Basic Information</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Avatar */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="mb-4 relative">
              <img
                src={avatarSrc}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-border object-cover"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-accent text-white rounded-full p-2 hover:bg-opacity-90 transition-all duration-200"
                title="Change image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleAvatarChange}
              />
            </div>
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-accent hover:text-sky-400 text-sm font-medium transition-colors"
            >
              Change image
            </button>
          </div>
          
          {/* Right Column - Form */}
          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-bg-card border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-text-muted"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-bg-card border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-text-muted"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about yourself, your interests, and what makes you unique..."
                  className="w-full px-4 py-2 bg-bg-card border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-text-muted resize-none"
                />
                <div className="text-right text-xs text-text-muted mt-1">
                  {bioLength}/500
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-bg-card border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white cursor-pointer"
                  >
                    <option value="">Select your country</option>
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-bg-card border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent text-white cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-6 py-2 bg-accent text-white font-medium rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 transition-all duration-200"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
              
              {error && (
                <div className="text-red-400 text-sm mt-2">{error}</div>
              )}
              
              {success && (
                <div className="text-green-400 text-sm mt-2">{success}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
