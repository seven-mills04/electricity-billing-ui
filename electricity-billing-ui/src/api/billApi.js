import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = `${BASE_URL}/api/bills`;

export const getBills = () => axios.get(API_URL);

export const getBillById = (id) =>
  axios.get(`${API_URL}/${id}`);