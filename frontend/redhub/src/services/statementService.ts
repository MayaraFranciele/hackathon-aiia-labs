import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/statement';

export const statementService = {
    /**
     * Retorna todas as transações
     * Filtros serão aplicados no frontend
     */
    async getTransactions() {
        const response = await axios.get(`${API_BASE_URL}/transactions`);
        return response.data;
    }
};
