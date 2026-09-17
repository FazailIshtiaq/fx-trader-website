import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    localStorage.setItem("userToken", userData.token);
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  // Call after approval-related actions to refresh approvedPlan from the server
  const refreshUser = async () => {
    try {
      const { data } = await api.get("/users/me");
      const updated = { ...user, ...data };
      localStorage.setItem("userInfo", JSON.stringify(updated));
      setUser(updated);
    } catch {
      // token likely expired — log them out
      logout();
    }
  };

  return (
    <UserAuthContext.Provider
      value={{ user, login, logout, refreshUser, isAuthenticated: !!user }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);