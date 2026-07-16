import api from "./axiosConfig";

export const getMeterReadings = () => {
  return api.get("/api/meter-readings");
};

export const getMeterReadingById = (id) => {
  return api.get(`/api/meter-readings/${id}`);
};

export const addMeterReading = (reading) => {
  return api.post("/api/meter-readings", reading);
};

export const updateMeterReading = (id, reading) => {
  return api.put(`/api/meter-readings/${id}`, reading);
};

export const deleteMeterReading = (id) => {
  return api.delete(`/api/meter-readings/${id}`);
};