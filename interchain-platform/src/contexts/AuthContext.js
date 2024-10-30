import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  registerUser,
  loginUser,
  logoutUser,
  onAuthStateChange
} from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return registerUser(email, password);
  }

  function login(email, password) {
    return loginUser(email, password);
  }

  function logout() {
    return logoutUser();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
