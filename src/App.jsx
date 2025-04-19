import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock login function - in a real app this would interact with auth system
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Mock logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/dashboard/*"
          element={
            isLoggedIn ?
              <Dashboard onLogout={handleLogout} /> :
              <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;