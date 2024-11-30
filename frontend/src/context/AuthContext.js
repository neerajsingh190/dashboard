// AuthContext.js
import React, { createContext, useState, useContext } from "react";

// Create the Auth Context
const AuthContext = createContext();

// Custom hook for consuming Auth Context
export const useAuth = () => useContext(AuthContext);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulate login function
  const login2 = (credentials) => {
    // Replace with actual login logic (API calls, etc.)
    setUser({ id: 1, username: credentials.username });
  };

  // Simulate logout function
  const logout = () => {
    setUser(null);
  };

  // Auth state and functions provided to children
  return (
    <AuthContext.Provider value={{ user, login2, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
