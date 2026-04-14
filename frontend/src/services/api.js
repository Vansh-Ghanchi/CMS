import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      const token = localStorage.getItem("token");
      
      if (!token) {
        // No token at all, just redirect to login if not already there
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      } else {
        // Token exists but is invalid/expired
        // Dispatch a custom event to show "Session Expired" modal in AuthContext
        window.dispatchEvent(new CustomEvent("session-expired"));
      }
    }

    // Standardize error object for components to handle
    const customError = {
      message: error.response?.data?.detail || error.message || "An unexpected error occurred",
      status: error.response?.status,
      isNetworkError: !error.response,
      originalError: error,
    };

    return Promise.reject(customError);
  }
);

export default API;