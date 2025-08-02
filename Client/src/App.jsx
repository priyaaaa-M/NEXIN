import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import SubjectsHub from './pages/SubjectsHub';

const AppContent = ({ onLogin, onLogout, isLoggedIn }) => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/dashboard');

  return (
    <>

      <Routes>
        
        <Route path="/dashboard/*" element={<Dashboard onLogout={onLogout} />} />
        <Route path="*" element={<Navigate to="/dashboard/academic" replace />} />
      </Routes>
    </>
  );
};

function App() {
  // Use router-based navigation to show dashboard and academic section
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
