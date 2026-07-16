import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/api/meter-readings`;

export const getMeterReadings = () => {
  return axios.get(API_URL);
};

export const getMeterReadingById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const addMeterReading = (reading) => {
  return axios.post(API_URL, reading);
};

export const updateMeterReading = (id, reading) => {
  return axios.put(`${API_URL}/${id}`, reading);
};

export const deleteMeterReading = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};