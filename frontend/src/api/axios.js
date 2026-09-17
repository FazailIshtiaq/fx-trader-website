import axios from "axios";

// Used by the admin panel (src/admin/*) — attaches the admin's JWT.
const api = axios.create({ baseURL: "/api" });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Used by the public site (homepage, login/register, subscribe modal) — attaches the visitor's JWT.
export const publicApi = axios.create({ baseURL: "/api" });
publicApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;