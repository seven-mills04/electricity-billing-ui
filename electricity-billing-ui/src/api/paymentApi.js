import api from "./axiosConfig";

export const getPayments = () =>
  api.get("/payment/all");

export const payBill = (billId, payment) =>
  api.post(`/payment/pay/${billId}`, payment);