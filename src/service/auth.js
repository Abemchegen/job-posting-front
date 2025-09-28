const baseUrl = import.meta.env.VITE_API_BASE_URL;

class AuthService {
  async request(endpoint, options = {}, refresh = false) {
    const url = `${baseUrl}${endpoint}`;

    let baseHeaders = {
      "Content-Type": "application/json",
    };

    if (!refresh) {
      const token = localStorage.getItem("accessToken");
      baseHeaders = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };
    }

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
        const error = {
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
          const data = await this.refreshToken();
          localStorage.setItem("accessToken", data.token);
          return await this.request(endpoint, options);
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
  async register(userData) {
    return this.safeRequest(`/users/public`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }
  async login(credentials) {
    return this.safeRequest("/users/public/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }
  async logout() {
    return this.safeRequest("/users/logout");
  }
  async getCurrentUser() {
    return this.safeRequest("/users/auth/me");
  }
  async getUser(userid) {
    return this.safeRequest(`/users/${userid}`);
  }
  async getAllUsers() {
    return this.safeRequest(`/users`);
  }
  async verifyEmail(verifyBody) {
    return this.safeRequest(`/users/public/verifyEmail`, {
      method: "POST",
      body: JSON.stringify(verifyBody),
    });
  }

  async resendVerCode(email) {
    return this.safeRequest(
      `/users/public/resendCode?email=${encodeURIComponent(email)}`
    );
  }
  async updateUser(userId, userData) {
    return this.safeRequest(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }
  async updateCompanyDetails(userData) {
    return this.safeRequest(`/company/updateDetails`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }
  async uploadPfp(userId, formData) {
    return this.safeRequest(`/users/uploadImage/${userId}`, {
      method: "POST",
      body: formData,
    });
  }
  async updatePass(userid, submitData) {
    return this.safeRequest(`/users/updatePas/${userid}`, {
      method: "PUT",
      body: JSON.stringify(submitData),
    });
  }
  async deleteUser(userId) {
    return this.safeRequest(`/users/${userId}`, {
      method: "DELETE",
    });
  }
  async fetchUsersWithFilters(params = "") {
    return this.safeRequest(`/users${params}`);
  }
  async deletePic(userId) {
    return this.safeRequest(`/users/deletePfp/${userId}`, {
      method: "DELETE",
    });
  }
  async refreshToken() {
    return this.request(
      `/users/public/refresh`,
      {
        method: "POST",
        body: JSON.stringify({}),
      },
      true
    );
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
