import authService from "../service/auth";
class ApiService {
  async request(endpoint, options = {}) {
    const url = `${endpoint}`;
    const token = localStorage.getItem("accessToken");

    // Create base headers
    const baseHeaders = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    // Merge with any additional headers from options
    const config = {
      headers: {
        ...baseHeaders,
        ...options.headers,
      },
      credentials: "include",
      ...options,
    };

    // For multipart/form-data, remove Content-Type header to let browser set it
    if (options.body instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let error = {
          status: response.status,
        };
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          error.message = errorData.message;
        } else {
          const errorText = await response.text();
          error.message = errorText;
        }
        throw error;
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async safeRequest(endpoint, options = {}) {
    try {
      return await this.request(endpoint, options);
    } catch (err) {
      if (err.status === 401) {
        try {
          const data = await authService.refreshToken();
          localStorage.setItem("accessToken", data.token);
          return await apiService.request(endpoint, options);
        } catch (refreshErr) {
          localStorage.removeItem("accessToken");
          if (
            window.location.pathname !== "/" &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/signup" &&
            window.location.pathname !== "/registerType" &&
            window.location.pathname !== "/verifyEmail"
          ) {
            window.location.replace("/");
          }
        }
      }
      throw err;
    }
  }
  // Job-related API calls
  async getAllJobs(params = "") {
    return this.safeRequest(`/job${params}`);
  }

  async getJobById(id) {
    return this.safeRequest(`/job/${id}`);
  }

  async createJob(jobData) {
    return this.safeRequest("/job/addJob", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async updateJobDetails(jobData) {
    return this.safeRequest(`/job/updateJobDetails`, {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async updateSubcatagory(subData) {
    return this.safeRequest(`/job/updateSubcatagory`, {
      method: "POST",
      body: JSON.stringify(subData),
    });
  }

  async addSubcatagory(subData) {
    return this.safeRequest(`/job/addSubcatagories`, {
      method: "POST",
      body: JSON.stringify(subData),
    });
  }

  async deleteaJob(id) {
    return this.safeRequest(`/job/${id}`, {
      method: "DELETE",
    });
  }

  async deleteSubcat(subData) {
    return this.safeRequest(`/job/removeSubcatagories`, {
      method: "POST",
      body: JSON.stringify(subData),
    });
  }

  // job post related api calls

  async getAllJobPostsCompany(params = "") {
    return this.safeRequest(`/jobpost/company${params}`);
  }

  async getJobPostById(id) {
    return this.safeRequest(`/jobpost/${id}`);
  }

  async createJobPost(jobData) {
    return this.safeRequest("/jobpost/create", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async updateJobPost(jobData, id) {
    return this.safeRequest(`/jobpost/update/${id}`, {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async deleteJobPost(id) {
    return this.safeRequest(`/jobpost/${id}`, {
      method: "DELETE",
    });
  }

  async getAllApplications(id) {
    return this.safeRequest(`/jobpost/${id}/jobApplication`);
  }

  async getanApplication(postid, appid) {
    return this.safeRequest(`/jobpost/${postid}/jobApplication/${appid}`);
  }

  async updateStatesofApplication(postid, appid, update) {
    return this.safeRequest(`/jobpost/${postid}/jobApplication/${appid}`, {
      method: "PUT",
      body: JSON.stringify(update),
    });
  }

  // Application-related API calls
  async getAllJobPosts(params = "") {
    return this.safeRequest(`/jobApplication/jobpost${params}`);
  }
  async getJobPost(id) {
    return this.safeRequest(`/jobApplication/jobpost/${id}`);
  }
  async apply(application, postid) {
    return this.safeRequest(`/jobApplication/${postid}/apply`, {
      method: "POST",
      body: application,
    });
  }
  async getMyApplications(params = "") {
    return this.safeRequest(`/jobApplication${params}`);
  }

  async getApplicationById(appid) {
    return this.safeRequest(`/jobApplication/${appid}`);
  }

  async deleteApplication(appid) {
    return this.safeRequest(`/jobApplication/${appid}`, {
      method: "DELETE",
    });
  }

  async updateApplication(updateData, appid) {
    return this.safeRequest(`/jobApplication/update/${appid}`, {
      method: "POST",
      body: JSON.stringify(updateData),
    });
  }
  async uploadCv(Cvdata, userid) {
    return this.safeRequest(`/users/agent/uploadCv/${userid}`, {
      method: "POST",
      body: JSON.stringify(Cvdata),
    });
  }
  async updateCv(Cvdata, userid) {
    return this.safeRequest(`/users/agent/updateCv/${userid}`, {
      method: "POST",
      body: JSON.stringify(Cvdata),
    });
  }

  async deleteCv(deleteid, deletename, userid) {
    return this.safeRequest(
      `/users/agent/deleteCv/${deleteid}/user/${userid}`,
      {
        method: "DELETE",
        body: deletename,
      }
    );
  }
  // chat-related API calls
  async getAllChats(params = "") {
    return this.safeRequest(`/chat/contacts${params}`);
  }

  async deleteChat(id) {
    return this.safeRequest(`/chat/delete/${id}`, {
      method: "DELETE",
    });
  }

  async fetchChatHistory(id) {
    return this.safeRequest(`/chat/history/${id}`);
  }
  async getUsertoChat(id) {
    return this.safeRequest(`/chat/${id}`);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
