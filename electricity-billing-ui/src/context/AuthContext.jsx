import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axiosConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole") || null);
  const [consumerName, setConsumerName] = useState(() => localStorage.getItem("consumerName") || "");
  const [consumerNumber, setConsumerNumber] = useState(() => localStorage.getItem("consumerNumber") || "");
  const [loadingProfile, setLoadingProfile] = useState(false);

  const fetchConsumerProfile = useCallback(async () => {
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("authToken");

    if (role === "CONSUMER" && token) {
      setLoadingProfile(true);
      try {
        const res = await api.get("/api/consumer/profile");
        if (res.data) {
          const data = res.data;
          if (data.consumerNumber) {
            setConsumerNumber(data.consumerNumber);
            localStorage.setItem("consumerNumber", data.consumerNumber);
          }
          if (data.firstName) {
            const fullName = `${data.firstName} ${data.lastName || ""}`.trim();
            setConsumerName(fullName);
            localStorage.setItem("consumerName", fullName);
          }
        }
      } catch (err) {
        console.error("Error loading consumer profile in AuthContext:", err);
      } finally {
        setLoadingProfile(false);
      }
    } else {
      setLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    if (token && role === "CONSUMER" && !consumerNumber) {
      fetchConsumerProfile();
    }
  }, [fetchConsumerProfile, consumerNumber]);

  const updateConsumerNumber = useCallback((num) => {
    if (num && num !== consumerNumber) {
      setConsumerNumber(num);
      localStorage.setItem("consumerNumber", num);
    }
  }, [consumerNumber]);

  const loginSuccess = useCallback((authData) => {
    const { token, role, consumerName: name, consumerNumber: num, consumerId } = authData;
    if (token) localStorage.setItem("authToken", token);
    if (role) {
      localStorage.setItem("userRole", role);
      setUserRole(role);
    }
    if (name) {
      localStorage.setItem("consumerName", name);
      setConsumerName(name);
    }
    if (consumerId) {
      localStorage.setItem("consumerId", consumerId);
    }
    if (num) {
      localStorage.setItem("consumerNumber", num);
      setConsumerNumber(num);
    } else if (role === "CONSUMER") {
      fetchConsumerProfile();
    }
  }, [fetchConsumerProfile]);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("consumerName");
    localStorage.removeItem("consumerNumber");
    localStorage.removeItem("consumerId");
    localStorage.removeItem("consumerConnections");
    setUserRole(null);
    setConsumerName("");
    setConsumerNumber("");
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
    window.addEventListener("unauthorized_access", handleUnauthorized);
    return () => {
      window.removeEventListener("unauthorized_access", handleUnauthorized);
    };
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        userRole,
        consumerName,
        consumerNumber,
        loadingProfile,
        fetchConsumerProfile,
        updateConsumerNumber,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      userRole: localStorage.getItem("userRole") || "ADMIN",
      consumerName: localStorage.getItem("consumerName") || "",
      consumerNumber: localStorage.getItem("consumerNumber") || "",
      loadingProfile: false,
      fetchConsumerProfile: async () => {},
      updateConsumerNumber: () => {},
      loginSuccess: () => {},
      logout: () => { localStorage.clear(); },
    };
  }
  return context;
};
