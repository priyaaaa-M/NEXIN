import React, { useState } from 'react';

const ProfileModal = ({ isOpen, onClose, user, onUpdate, onLogout }) => {
  const [form, setForm] = useState(user || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Send profile update to backend
      const token = localStorage.getItem('nexin_token');
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        onUpdate(data.user);
        onClose();
      } else {
        setError(data.message || 'Update failed');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-8 shadow-lg w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-purple mb-2">Edit Profile</h2>
          <button type="button" className="absolute left-2 top-2 text-sm bg-purple-700 text-main px-3 py-1 rounded" onClick={() => { onLogout(); onClose(); }}>Logout</button>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name || ''}
            onChange={handleChange}
            className="p-2 rounded bg-main text-main border border-purple"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email || ''}
            onChange={handleChange}
            className="p-2 rounded bg-main text-main border border-purple"
            disabled
          />
          {/* Add more fields as needed */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-purple text-main py-2 rounded font-semibold" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
