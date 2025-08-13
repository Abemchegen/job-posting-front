import { useState, useEffect } from "react";
import apiService from "../service/api";
import { useAuth } from "../context/authContext";

export const useJobs = () => {
  const { user, isAdmin } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllJobs();
      console.log(data);
      setJobs(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user]);

  const createJob = async (jobData) => {
    try {
      await apiService.createJob(jobData);
      await fetchJobs(); // Refresh the list
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };
  const updateJobDetails = async (jobData) => {
    try {
      const response = await apiService.updateJobDetails(jobData);
      await fetchJobs(); // Refresh the list
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };
  const updateSubcatagory = async (subData) => {
    try {
      const response = await apiService.updateSubcatagory(subData);
      await fetchJobs(); // Refresh the list
      console.log(response);
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const addSubcatagory = async (subData) => {
    try {
      const response = await apiService.addSubcatagory(subData);
      await fetchJobs(); // Refresh the list
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const deleteaJob = async (id) => {
    try {
      const response = await apiService.deleteaJob(id);
      await fetchJobs(); // Refresh the list
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };
  const deleteSubcat = async (subData) => {
    try {
      const response = await apiService.deleteSubcat(subData);
      await fetchJobs(); // Refresh the list
      return response;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };
  const fetchJobsWithFilters = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      const data = await apiService.getAllJobs(
        params.toString() ? `?${params.toString()}` : ""
      );
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching jobs with filters:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    loading,
    updateJobDetails,
    updateSubcatagory,
    addSubcatagory,
    error,
    deleteSubcat,
    fetchJobs,
    fetchJobsWithFilters,
    createJob,
    deleteaJob,
  };
};

export const useJob = (id) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        console.log("no id");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getJobById(id);
        setJob(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  return { job, loading, error };
};
