import { useState, useEffect } from "react";
import apiService from "../service/api";
import { useAuth } from "../context/authContext";

export const useChats = () => {
  const { user } = useAuth();
  const [Contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllChats();
      setContacts(data || []);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  const deleteChat = async (subData) => {
    try {
      const response = await apiService.deleteChat(subData);
      await fetchChats();
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const fetchChatHistory = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.fetchChatHistory(id);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUsertoChat = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getUsertoChat(id);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchChatsWithFilters = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      const data = await apiService.getAllChats(
        params.toString() ? `?${params.toString()}` : ""
      );
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    Contacts,
    loading,
    error,
    getUsertoChat,
    fetchChats,
    fetchChatsWithFilters,
    deleteChat,
    fetchChatHistory,
    setContacts,
  };
};

export const useChat = (id) => {
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!id) {
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.fetchChatHistory(id);

        setChat(data || []);
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };
    fetchChatHistory();
  }, [id]);

  return { chat, loading, error };
};
