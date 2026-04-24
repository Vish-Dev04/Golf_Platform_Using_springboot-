import api from './api';

export const scoreService = {
    getUserScores: async (userId) => {
        const response = await api.get(`/scores/user/${userId}`);
        return response.data;
    },
    addScore: async (scoreData) => {
        const response = await api.post('/scores', scoreData);
        return response.data;
    }
};
