import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Assuming your server is running on localhost:3000
});

export default api;
