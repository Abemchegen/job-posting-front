import { over } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
class ApiService {
  async request(endpoint, options = {}) {
    const url = `${endpoint}`;

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
        let errorMessage = `HTTP error! status: ${response.status}`;
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
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

  // Job-related API calls
  async getAllJobs(params = "") {
    return this.request(`/job${params}`);
  }

  async getJobById(id) {
    return this.request(`/job/${id}`);
  }

  async createJob(jobData) {
    return this.request("/job/addJob", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async updateJobDetails(jobData) {
    return this.request(`/job/updateJobDetails`, {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async updateSubcatagory(subData) {
    return this.request(`/job/updateSubcatagory`, {
      method: "POST",
      body: JSON.stringify(subData),
    });
  }

  async addSubcatagory(subData) {
    return this.request(`/job/addSubcatagories`, {
      method: "POST",
      body: JSON.stringify(subData),
    });
  }

  async deleteaJob(id) {
    return this.request(`/job/${id}`, {
      method: "DELETE",
    });
  }

  async deleteSubcat(subData) {
    return this.request(`/job/removeSubcatagories`, {
      method: "POST",
      body: JSON.stringify(subData),
    });
  }

  // job post related api calls

  async getAllJobPostsCompany(params = "") {
    return this.request(`/jobpost/company${params}`);
  }

  async getJobPostById(id) {
    return this.request(`/jobpost/${id}`);
  }

  async createJobPost(jobData) {
    return this.request("/jobpost/create", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async updateJobPost(jobData, id) {
    return this.request(`/jobpost/update/${id}`, {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async deleteJobPost(id) {
    return this.request(`/jobpost/${id}`, {
      method: "DELETE",
    });
  }

  async getAllApplications(id) {
    return this.request(`/jobpost/${id}/jobApplication`);
  }

  async getanApplication(postid, appid) {
    return this.request(`/jobpost/${postid}/jobApplication/${appid}`);
  }

  async updateStatesofApplication(postid, appid, update) {
    return this.request(`/jobpost/${postid}/jobApplication/${appid}`, {
      method: "PUT",
      body: JSON.stringify(update),
    });
  }

  // Application-related API calls
  async getAllJobPosts(params = "") {
    return this.request(`/jobApplication/jobpost${params}`);
  }
  async getJobPost(id) {
    return this.request(`/jobApplication/jobpost/${id}`);
  }
  async apply(application, postid) {
    return this.request(`/jobApplication/${postid}/apply`, {
      method: "POST",
      body: application,
    });
  }
  async getMyApplications(params = "") {
    return this.request(`/jobApplication${params}`);
  }

  async getApplicationById(appid) {
    return this.request(`/jobApplication/${appid}`);
  }

  async deleteApplication(appid) {
    return this.request(`/jobApplication/${appid}`, {
      method: "DELETE",
    });
  }

  async updateApplication(updateData, appid) {
    return this.request(`/jobApplication/update/${appid}`, {
      method: "POST",
      body: JSON.stringify(updateData),
    });
  }
  async uploadCv(Cvdata) {
    return this.request(`/users/agent/uploadCv`, {
      method: "POST",
      body: JSON.stringify(Cvdata),
    });
  }
  async updateCv(Cvdata) {
    return this.request(`/users/agent/updateCv`, {
      method: "POST",
      body: JSON.stringify(Cvdata),
    });
  }

  async deleteCv(deleteid, deletename) {
    return this.request(`/users/agent/deleteCv/${deleteid}`, {
      method: "Delete",
      body: deletename,
    });
  }
  // chat-related API calls
  async getAllChats(params = "") {
    return this.request(`/chat/contacts${params}`);
  }

  async deleteChat(id) {
    return this.request(`/chat/delete/${id}`, {
      method: "DELETE",
    });
  }

  async fetchChatHistory(id) {
    return this.request(`/chat/history/${id}`);
  }
  async getUsertoChat(id) {
    return this.request(`/chat/${id}`);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
