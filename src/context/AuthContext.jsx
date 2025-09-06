import React, { createContext, useContext, useState } from 'react';
import { sampleUser } from '../data/museums.js';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock authentication - accept email 'a' and password 'a'
    if (email === 'a' && password === 'a') {
      setUser(sampleUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (name, email, password) => {
    // Mock signup - create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      bookings: []
    };
    setUser(newUser);
    return true;
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    login,
    logout,
    signup,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};