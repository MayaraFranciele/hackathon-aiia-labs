import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/dashboard';

export const dashboardService = {
	async getSummary() {
		const response = await axios.get(`${API_BASE_URL}/summary`);
		return response.data;
	},

	async getTransactions() {
		const response = await axios.get(`${API_BASE_URL}/transactions`);
		return response.data;
	},

	async getCategorySummary() {
		const response = await axios.get(`${API_BASE_URL}/category-summary`);
		return response.data;
	}
};
