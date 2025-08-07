import { createContext, useContext, useState, useEffect } from "react";
import authService from "../service/auth";

// Create context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        setError(null);
        if (loggedIn == true) {
          const userData = await authService.getCurrentUser();
          console.log("Server verification successful:", userData);
          setUser(userData);
        }
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [loggedIn]);

  const register = async (userData) => {
    try {
      setError(null);
      const data = await authService.register(userData);
      setLoggedIn(true);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setError(null);
      const data = await authService.login(credentials);
      setLoggedIn(true);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      authService.logout();
      setUser(null);
      setError(null);
      setLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };
  // delete account
  const deleteAccount = async (userid) => {
    try {
      authService.deleteUser(userid);
      setUser(null);
      setError(null);
    } catch (e) {
      console.log(e);
    }
  };

  const updateAccount = async (userid, updateData) => {
    try {
      authService.updateUser(userid, updateData);
    } catch (e) {
      console.log(e);
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return user.role === "ADMIN";
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user && loggedIn;
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    deleteAccount,
    updateAccount,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
