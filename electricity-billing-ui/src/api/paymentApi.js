import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

export const getPayments = () =>
  API.get("/payment/all");

export const payBill = (billId, payment) =>
  API.post(`/payment/pay/${billId}`, payment);