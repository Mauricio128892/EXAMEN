// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  // signInWithEmailAndPassword, // REMOVIDO: Ya no se usa para este revert
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // REMOVIDO: Ya no se exporta la función 'login' para email/password
  // const login = async (email, password) => {
  //   return signInWithEmailAndPassword(auth, email, password);
  // };

  const logout = async () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    // login, // REMOVIDO: No se exporta
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
