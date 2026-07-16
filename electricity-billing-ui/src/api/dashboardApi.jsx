import api from "./axiosConfig";

export const getDashboard = () =>
  api.get("/api/dashboard");