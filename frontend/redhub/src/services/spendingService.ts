import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/spending';

export const spendingService = {
    async getBudgetSummary() {
        const response = await axios.get(`${API_BASE_URL}/summary`);
        return response.data;
    }
};
