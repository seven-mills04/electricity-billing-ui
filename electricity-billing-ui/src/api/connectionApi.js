import api from "./axiosConfig";

export const getConnections = () => {
  return api.get("/api/connections");
};

export const addConnection = (connection) => {
  return api.post("/api/connections", connection);
};

export const updateConnection = (id, connection) => {
  return api.put(`/api/connections/${id}`, connection);
};

export const deleteConnection = (id) => {
  return api.delete(`/api/connections/${id}`);
};

export const getConnectionById = (id) => {
  return api.get(`/api/connections/${id}`);
};