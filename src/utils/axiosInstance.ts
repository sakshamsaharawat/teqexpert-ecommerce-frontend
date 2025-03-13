import axios from "axios";
import { API_BASE_URL } from "../config/api.config";
import { store } from "../store";
import { logout } from "../State/Auth/Action";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token found, sending request without authentication");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized request detected. Logging out...");
        store.dispatch(logout());
        return Promise.reject({ isAuthError: true, message: "Session expired. Please log in again." });
      }

      return Promise.reject(error.response);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;