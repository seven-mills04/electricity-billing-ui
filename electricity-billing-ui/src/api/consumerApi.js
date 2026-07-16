import api from "./axiosConfig";

export const getConsumers = () => {
    return api.get("/api/consumers");
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