import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://fx-trader-website-production.up.railway.app";

// Used by the admin panel
const api = axios.create({ baseURL: BASE_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Used by the public site
export const publicApi = axios.create({ baseURL: BASE_URL });
publicApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;