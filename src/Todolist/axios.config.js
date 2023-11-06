import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Assuming your server is running on localhost:3000
});

api.interceptors.request.use(
  (config) => {
    const authToken = "your-access-token"; // Replace with your actual access token
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
