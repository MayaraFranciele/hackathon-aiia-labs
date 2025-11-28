import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/statement';

export interface Transaction {
    id: string;
    title: string;
    date: string;
    amount: number;
    positive: boolean;
    category_type: string;
    description?: string;
}

export interface StatementResponse {
    transactions: Transaction[];
}

export const statementService = {
    /**
     * Retorna todas as transações
     * Filtros serão aplicados no frontend
     */
    async getTransactions(): Promise<StatementResponse> {
        const response = await axios.get<StatementResponse>(`${API_BASE_URL}/transactions`);
        return response.data;
    }
};
