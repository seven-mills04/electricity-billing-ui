import axios from "axios";

const API_URL = "http://localhost:8080/api/consumers";

export const getConsumers = () => {
    return axios.get(API_URL);
};

export const addConsumer = (consumer) => {
    return axios.post(API_URL, consumer);
};

export const updateConsumer = (id, consumer) => {
    return axios.put(`${API_URL}/${id}`, consumer);
};

export const deleteConsumer = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};