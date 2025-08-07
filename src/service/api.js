const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    // Create base headers
    const baseHeaders = {
      "Content-Type": "application/json",
    };

    // Merge with any additional headers from options
    const config = {
      headers: {
        ...baseHeaders,
        ...options.headers,
      },
      ...options,
    };

    // For multipart/form-data, remove Content-Type header to let browser set it
    if (options.body instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    console.log("Headers:", config.headers);

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Job-related API calls
  async getAllJobPosts() {
    return this.request(`/jobpost`);
  }

  async getJobById(id) {
    return this.request(`/jobs/${id}`);
  }

  async createJob(jobData) {
    return this.request("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(id, jobData) {
    return this.request(`/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(id) {
    return this.request(`/jobs/${id}`, {
      method: "DELETE",
    });
  }

  // Application-related API calls
  async submitApplication(formData) {
    return this.request("/applications", {
      method: "POST",
      body: formData, // FormData will be handled correctly by fetch without Content-Type header
    });
  }

  async getAllApplications() {
    return this.request("/applications");
  }

  async getApplicationById(id) {
    return this.request(`/applications/${id}`);
  }

  async getJobApplications(jobId) {
    return this.request(`/jobs/${jobId}/applications`);
  }

  async updateApplicationStatus(id, status) {
    return this.request(`/applications/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  }

  // User-related API calls
  async getAllUsers() {
    return this.request("/auth/users");
  }

  async getUserById(id) {
    return this.request(`/auth/users/${id}`);
  }

  async createUser(userData) {
    return this.request("/auth/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id, userData) {
    return this.request(`/auth/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.request(`/auth/users/${id}`, {
      method: "DELETE",
    });
  }

  async getMyApplications() {
    console.log("API Service - getMyApplications called");

    return this.request("/my-applications");
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
