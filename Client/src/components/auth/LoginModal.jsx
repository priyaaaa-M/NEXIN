import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [step, setStep] = useState(1); // 1: login, 2: otp
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [serverOtpToken, setServerOtpToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Send login request to backend to trigger OTP
      const res = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setServerOtpToken(data.otpToken); // Save OTP token from backend
        setStep(2);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Verify OTP
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, otpToken: serverOtpToken })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('nexin_token', data.token);
        onLoginSuccess(data.user);
        onClose();
      } else {
        setError(data.message || 'OTP verification failed');
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
        {step === 1 ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-purple mb-2">Login to Dashboard</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="p-2 rounded bg-main text-main border border-purple"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="p-2 rounded bg-main text-main border border-purple"
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="bg-purple text-main py-2 rounded font-semibold" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-purple mb-2">Enter OTP</h2>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              maxLength={6}
              required
              className="p-2 rounded bg-main text-main border border-purple tracking-widest text-center text-lg"
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="bg-purple text-main py-2 rounded font-semibold" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
