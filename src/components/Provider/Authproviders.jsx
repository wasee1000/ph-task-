import { createContext, useEffect, useState } from "react";
// import { auth } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleprovider = new GoogleAuthProvider();

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Sign up
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    signOut(auth);
  };
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  //
  //  google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleprovider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //
  const forgetpass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    user,
    setUser,
    login,
    register,
    logOut,
    setLoading,
    loading,
    updateUserProfile,
    googleLogin,
    forgetpass,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;