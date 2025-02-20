import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllResults from './AllResults';
import PrimaryConcerns from './PrimaryConcerns';
import Navbar from './Navbar';

const BloodworkDashboard = () => {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllResults />} />
        <Route path="/concerns" element={<PrimaryConcerns />} />
      </Routes>
    </div>
  );
};

export default BloodworkDashboard; 