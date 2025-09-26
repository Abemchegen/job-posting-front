import { createContext, useContext, useState, useEffect } from "react";
import authService from "../service/auth";

// Create context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await authService.getCurrentUser();
      console.log(userData);
      setUser(userData);
    } catch (err) {
      setError(err.message);
      setUser(null);
      console.error(err);
      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup" &&
        window.location.pathname !== "/registerType" &&
        window.location.pathname !== "/verifyEmail"
      ) {
        window.location.replace("/");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    initAuth();
  }, []);

  const register = async (userData) => {
    try {
      setError(null);
      const data = await authService.register(userData);
      setUser(data);
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

      localStorage.setItem("accessToken", data.token);
      setUser(data.response);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  const uploadPfp = async (userid, formData) => {
    try {
      setError(null);
      const data = await authService.uploadPfp(userid, formData);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  const deletePic = async (userid) => {
    try {
      setError(null);
      const data = await authService.deletePic(userid);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  // Logout user
  const logout = async () => {
    try {
      const response = await authService.logout();
      setUser(null);
      setError(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tempContacts");
    } catch (e) {
      throw e;
    }
  };
  // delete account
  const deleteAccount = async (userid) => {
    try {
      await authService.deleteUser(userid);
      setUser(null);
      setError(null);
    } catch (e) {
      throw e;
    }
  };

  const updateAccount = async (userid, updateData) => {
    try {
      const response = await authService.updateUser(userid, updateData);
      return response;
    } catch (e) {
      throw e;
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await authService.getAllUsers();

      return response;
    } catch (e) {
      throw e;
    }
  };
  const getUser = async (id) => {
    try {
      const response = await authService.getUser(id);

      return response;
    } catch (e) {
      throw e;
    }
  };
  const updateCompanyDetails = async (updateData) => {
    try {
      const response = await authService.updateCompanyDetails(updateData);
      return response;
    } catch (e) {
      throw e;
    }
  };
  const updatePass = async (userid, updateData) => {
    try {
      const response = await authService.updatePass(userid, updateData);
      return response;
    } catch (e) {
      throw e;
    }
  };
  const verifyEmail = async (updateData) => {
    try {
      const response = await authService.verifyEmail(updateData);
      setUser(response.response);
      localStorage.setItem("accessToken", response.token);
      return response;
    } catch (e) {
      throw e;
    }
  };
  const resendVerCode = async (verifyBody) => {
    try {
      const response = await authService.resendVerCode(verifyBody);
      return response;
    } catch (e) {
      throw e;
    }
  };
  const fetchUsersWithFilters = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filters.role) params.append("role", filters.role);
      if (filters.search) params.append("search", filters.search);

      const data = await authService.fetchUsersWithFilters(
        params.toString() ? `?${params.toString()}` : ""
      );
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching users with filters:", err);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return !!user && user.role === "ADMIN";
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Context value
  const value = {
    user,
    setUser,
    loading,
    error,
    fetchUsersWithFilters,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    deleteAccount,
    uploadPfp,
    deletePic,
    getUser,
    updateAccount,
    register,
    getAllUsers,
    login,
    logout,
    updateCompanyDetails,
    updatePass,
    verifyEmail,
    resendVerCode,
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
