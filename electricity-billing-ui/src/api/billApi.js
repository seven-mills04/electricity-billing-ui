import axios from "axios";

const API_URL = "http://localhost:8080/api/bills";

export const getBills = () => axios.get(API_URL);

export const getBillById = (id) =>
  axios.get(`${API_URL}/${id}`);