import api from "./axiosConfig";

export const getBills = () => api.get("/api/bills");

export const getBillById = (id) => api.get(`/api/bills/${id}`);