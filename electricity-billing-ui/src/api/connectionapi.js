import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/api/connections`;

export const getConnections = () => {
  return axios.get(API_URL);
};

export const addConnection = (connection) => {
  return axios.post(API_URL, connection);
};

export const updateConnection = (id, connection) => {
  return axios.put(`${API_URL}/${id}`, connection);
};

export const deleteConnection = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getConnectionById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};