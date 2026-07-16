import api from "./axiosConfig";

export const getDashboard = () =>
  api.get("/api/dashboard");

export const getPredictions = (connectionNumber) => {
  const url = connectionNumber 
    ? `/api/dashboard/predictions?connectionNumber=${connectionNumber}` 
    : "/api/dashboard/predictions";
  return api.get(url);
};