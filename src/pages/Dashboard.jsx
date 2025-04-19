import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Academic from '../components/dashboard/Academic';
import Projects from '../components/dashboard/Projects';
import Goals from '../components/dashboard/Goals';
import Finance from '../components/dashboard/Finance';
import Personal from '../components/dashboard/Personal';
import WorkDoneDesk from '../components/dashboard/WorkDoneDesk';
import Journal from '../components/dashboard/Journal';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-midnight-600 flex">
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/academic" replace />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/workdonedesk" element={<WorkDoneDesk />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;