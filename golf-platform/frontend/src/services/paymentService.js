import api from './api';

export const paymentService = {
    createCheckoutSession: async (planType) => {
        const response = await api.post('/payment/create-checkout-session', { planType });
        return response.data;
    }
};
