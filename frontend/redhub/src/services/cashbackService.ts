import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/cashback';

export const cashbackService = {
  // Obter dados do cashback do usuário
  async getCashbackData() {
    const response = await axios.get(`${API_BASE_URL}/summary`);
    return response.data;
  },

  // Obter ofertas disponíveis
  async getOffers() {
    const response = await axios.get(`${API_BASE_URL}/offers`);
    return response.data;
  },

  // Obter histórico de cashback
  async getHistory() {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  },

  // Resgatar cashback
  async redeemCashback(amount: number) {
    const response = await axios.post(`${API_BASE_URL}/redeem`, { amount });
    return response.data;
  }
};
