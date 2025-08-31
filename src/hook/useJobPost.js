import { useState, useEffect } from "react";
import apiService from "../service/api";
import { useAuth } from "../context/authContext";
import authService from "../service/auth";

export const useJobPosts = () => {
  const { user } = useAuth();
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllJobPostsCompany();
      console.log(data);
      setJobPosts(data || []);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching job post:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user && user.role == "COMPANY") {
      fetchJobPost();
    }
  }, [user]);

  const createJobPost = async (jobData) => {
    try {
      await apiService.createJobPost(jobData);
      await fetchJobPost(); // Refresh the list
      return { success: true };
    } catch (err) {
      setError(err.message);
      return null;
    }
  };
  const updateJobPost = async (jobData, postid) => {
    try {
      const response = await apiService.updateJobPost(jobData, postid);
      await fetchJobPost(); // Refresh the list
      return response;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const deleteJobPost = async (id) => {
    try {
      const response = await apiService.deleteJobPost(id);
      await fetchJobPost(); // Refresh the list
      return response;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };
  const getAllApplications = async (id) => {
    try {
      setLoading(true);
      const response = await apiService.getAllApplications(id);
      return response;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getanApplication = async (postid, appid) => {
    try {
      setLoading(true);
      const response = await apiService.getanApplication(postid, appid);
      return response;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateStatesofApplication = async (postid, appid, update) => {
    try {
      setLoading(true);
      const response = await apiService.updateStatesofApplication(
        postid,
        appid,
        update
      );
      return response;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsWithFilters = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.salary && filters.salary.final && filters.salary.initial) {
        params.append("salaryMin", filters.salary.initial);
        params.append("salaryMax", filters.salary.final);
      }
      if (filters.date) params.append("date", filters.date);
      if (filters.sort) params.append("sort", filters.sort);
      const data = await apiService.getAllJobPostsCompany(
        params.toString() ? `?${params.toString()}` : ""
      );
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching posts with filters:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    jobPosts,
    loading,
    error,
    fetchJobsWithFilters,
    updateJobPost,
    createJobPost,
    fetchJobPost,
    deleteJobPost,
    updateStatesofApplication,
    getanApplication,
    getAllApplications,
  };
};

export const useJobPost = (id) => {
  const [jobPost, setJobPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobPost = async () => {
      if (!id) {
        console.log("no id");
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getJobPostById(id);
        console.log(data);
        setJobPost(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching job post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPost();
  }, [id]);

  return { jobPost, loading, error };
};
