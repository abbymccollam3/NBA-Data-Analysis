import React, { createContext, useContext } from 'react';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  // For testing purposes, we'll hardcode a patient ID
  const patientId = "test-patient-1";

  return (
    <PatientContext.Provider value={{ patientId }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
}; 