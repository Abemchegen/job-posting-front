import { useState, useEffect } from "react";
import apiService from "../service/api";
import { useAuth } from "../context/authContext";

export const useApplications = () => {
  const { user } = useAuth();
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllJobPosts();

      setJobPosts(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching job post:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user && user.role == "AGENT") {
      fetchJobPost();
    }
  }, [user]);

  const apply = async (application, postid) => {
    try {
      const response = await apiService.apply(application, postid);
      return response;
    } catch (err) {
      setError(err.message);
      console.error("Error applying:", err);
      throw err;
    }
  };

  const deleteApplication = async (id) => {
    try {
      const response = await apiService.deleteApplication(id);
      return response;
    } catch (err) {
      setError(err.message);
      console.error("Error deleting application:", err);
      throw err;
    }
  };
  const getMyApplications = async () => {
    try {
      setLoading(true);
      const response = await apiService.getMyApplications();
      return response;
    } catch (err) {
      setError(err.message);
      console.error("Error fething applications:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getmyApplication = async (postid, appid) => {
    try {
      setLoading(true);
      const response = await apiService.getApplicationById(postid, appid);
      return response;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching application:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadCv = async (Cvdata) => {
    try {
      setLoading(true);
      const response = await apiService.uploadCv(Cvdata);
      return response;
    } catch (e) {
      setError(e.message);
      console.error("Error uploading cv:", e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateCv = async (Cvdata) => {
    try {
      setLoading(true);
      const response = await apiService.updateCv(Cvdata);
      return response;
    } catch (e) {
      setError(e.message);
      console.error("Error updating cv:", e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deleteCv = async (deleteid, deletename) => {
    try {
      setLoading(true);
      const response = await apiService.deleteCv(deleteid, deletename);
      return response;
    } catch (e) {
      setError(e.message);
      console.error("Error deleting cv:", e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const fetchJobsWithFilters = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (
        filters.salary &&
        filters.salary.initial != null &&
        filters.salary.final != null
      ) {
        params.append("salaryMin", filters.salary.initial);
        params.append("salaryMax", filters.salary.final);
      }
      if (filters.date) params.append("date", filters.date);
      if (filters.sort) params.append("sort", filters.sort);
      if (filters.search) params.append("search", filters.search);

      if (filters.applied) params.append("applied", filters.applied);
      const data = await apiService.getAllJobPosts(
        params.toString() ? `?${params.toString()}` : ""
      );
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching posts with filters:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const fetchApplicationsWithFilters = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (
        filters.salary &&
        filters.salary.initial != null &&
        filters.salary.final != null
      ) {
        params.append("salaryMin", filters.salary.initial);
        params.append("salaryMax", filters.salary.final);
      }
      if (filters.appliedAt) params.append("date", filters.appliedAt);
      if (filters.status) params.append("status", filters.status);
      if (filters.sort) params.append("sort", filters.sort);
      if (filters.search) params.append("search", filters.search);

      const data = await apiService.getMyApplications(
        params.toString() ? `?${params.toString()}` : ""
      );
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching applications with filters:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    jobPosts,
    loading,
    error,
    uploadCv,
    updateCv,
    deleteCv,
    fetchApplicationsWithFilters,
    fetchJobsWithFilters,
    getmyApplication,
    getMyApplications,
    fetchJobPost,
    deleteApplication,
    apply,
  };
};

export const useApplication = (id) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) {
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getApplicationById(id);

        setApplication(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching job post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  return { application, loading, error };
};
export const useAgentJobPost = (id) => {
  const [jobPost, setJobPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobPost = async () => {
      if (!id) {
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getJobPost(id);

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
