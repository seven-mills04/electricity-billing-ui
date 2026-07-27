import api from "./axiosConfig";

export const getConsumers = () => {
    return api.get("/api/consumers?size=100");
};

export const getPublicConsumers = () => {
    return api.get("/api/auth/consumers");
};

export const addConsumer = (consumer) => {
    return api.post("/api/consumers", consumer);
};

export const updateConsumer = (id, consumer) => {
    return api.put(`/api/consumers/${id}`, consumer);
};

export const deleteConsumer = (id) => {
    return api.delete(`/api/consumers/${id}`);
};

export const getConsumerProfile = () => api.get("/api/consumer/profile");
export const getConsumerDashboard = () => api.get("/api/consumer/dashboard");
export const getConsumerBills = () => api.get("/api/consumer/bills");
export const getConsumerPayments = () => api.get("/api/consumer/payments");
export const getConsumerMeterReadings = () => api.get("/api/consumer/meter-readings");