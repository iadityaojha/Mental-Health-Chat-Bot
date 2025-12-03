import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const chatService = {
    sendMessage: async (userId, message) => {
        const response = await api.post('/chat/', { user_id: userId, message });
        return response.data;
    },
};

export const helplineService = {
    getNearby: async (lat, lon, radius = 50) => {
        const response = await api.get(`/helplines/?lat=${lat}&lon=${lon}&radius_km=${radius}`);
        return response.data;
    },
};

export const appointmentService = {
    request: async (data) => {
        const response = await api.post('/appointments/', data);
        return response.data;
    }
};

export default api;
