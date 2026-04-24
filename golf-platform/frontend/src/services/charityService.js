import api from './api';

export const charityService = {
    getAllCharities: async () => {
        const response = await api.get('/charities');
        return response.data;
    },
    addCharity: async (charityData) => {
        const response = await api.post('/charities', charityData);
        return response.data;
    },
    deleteCharity: async (id) => {
        const response = await api.delete(`/charities/${id}`);
        return response.data;
    }
};
