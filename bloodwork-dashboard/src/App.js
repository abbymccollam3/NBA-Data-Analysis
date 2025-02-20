import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BloodworkDashboard from './components/BloodworkDashboard';
import { PatientProvider } from './context/PatientContext';

function App() {
  return (
    <Router>
      <PatientProvider>
        <BloodworkDashboard />
      </PatientProvider>
    </Router>
  );
}

export default App; 