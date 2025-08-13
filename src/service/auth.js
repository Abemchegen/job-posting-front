const API_BASE_URL = "http://127.0.0.1:8080";
class AuthService {
  // Register a new user
  async register(userData) {
    try {
      const response = await fetch("/users/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        let errorMessage = "Registration failed";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await fetch("/users/public/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Login failed";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async logout() {
    try {
      console.log("Logging out - clearing all auth data");
      const response = await fetch("/users/logout", {
        credentials: "include",
      });
      console.log("Server response status:", response.status);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async getCurrentUser() {
    try {
      const response = await fetch("/users/auth/me", {
        credentials: "include",
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        if (response.status === 401) {
          console.log("invalid, logging out");
          this.logout();
        }
        let errorMessage = "Failed to get user ";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      let userData;
      if (contentType && contentType.includes("application/json")) {
        userData = await response.json();
      } else {
        userData = await response.text();
      }
      return userData;
    } catch (error) {
      console.error("GET USER " + error);
      throw error;
    }
  }
  //admin
  async getUser(userid) {
    try {
      const response = await fetch(`/users/${userid}`, {
        credentials: "include",
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Failed to get user ";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      let userData;
      if (contentType && contentType.includes("application/json")) {
        userData = await response.json();
      } else {
        userData = await response.text();
      }
      return userData;
    } catch (error) {
      console.error("GET USER " + error);
      throw error;
    }
  }

  // Get all users (admin only)
  async getAllUsers() {
    try {
      const response = await fetch(`/users`, {
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Failed to get users";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Update user
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Failed to update user";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateCompanyDetails(userData) {
    try {
      const response = await fetch(`/company/updateDetails`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Failed to update Company Details";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async uploadPfp(userId, formData) {
    try {
      const response = await fetch(`/users/uploadImage/${userId}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Failed to upload profile pic for user";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updatePass(userid, submitData) {
    try {
      const response = await fetch(`/users/updatePas/${userid}`, {
        method: "PUT",
        body: JSON.stringify(submitData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Failed to change Password";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }

        throw new Error(errorMessage);
      }

      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Failed to delete user";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async fetchUsersWithFilters(params = "") {
    try {
      const response = await fetch(`/users${params}`, {
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Failed to delete user";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  s;
  async deletePic(userId) {
    try {
      const response = await fetch(`/users/deletePfp/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Failed to delete profilepic";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
