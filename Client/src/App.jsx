import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import BlogCard from './components/BlogCard';
import FocusZoom from './components/FocusZoon';
import Navbar from './components/Navbar';
// import ContactPage from './pages/ContactPage'; 


const AppContent = ({ onLogin, onLogout, isLoggedIn }) => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!hideNavbar && <Navbar onLogin={onLogin} isLoggedIn={isLoggedIn} />}

      <Routes>
        <Route path="/" element={<HomePage onLogin={onLogin} isLoggedIn={isLoggedIn} />} />
        <Route path="/blog" element={<BlogCard />} />
        <Route path="/focus" element={<FocusZoom />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}

        <Route
          path="/dashboard/*"
          element={
            isLoggedIn ? (
              <Dashboard onLogout={onLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <AppContent onLogin={handleLogin} onLogout={handleLogout} isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;
