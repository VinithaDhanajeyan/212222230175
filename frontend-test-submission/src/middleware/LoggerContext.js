import React, { createContext } from 'react';

export const LoggerContext = createContext();

const LoggerProvider = ({ children }) => {
  const log = (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}`;
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    logs.push(logEntry);
    localStorage.setItem('logs', JSON.stringify(logs));
  };

  return (
    <LoggerContext.Provider value={{ log }}>
      {children}
    </LoggerContext.Provider>
  );
};

export default LoggerProvider;