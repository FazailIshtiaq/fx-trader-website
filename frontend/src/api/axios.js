import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim();

if (!configuredBaseUrl && !import.meta.env.DEV) {
  // Fails loudly in production instead of silently pointing at the wrong place.
  console.error(
    "VITE_API_URL is not set! The site cannot reach the backend. " +
    "Set it in Vercel → Project → Settings → Environment Variables, then redeploy."
  );
}

const apiHost = configuredBaseUrl || (import.meta.env.DEV ? "/api" : "");
const BASE_URL = apiHost.replace(/\/+$/, "").replace(/\/api$/, "") + "/api";

// The backend's root URL with no /api suffix — used to build links to static
// files it serves directly, like /uploads/... (payment screenshots).
export const BACKEND_ORIGIN = BASE_URL.replace(/\/api$/, "");

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