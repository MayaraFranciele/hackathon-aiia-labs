import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/pix';

export interface PixKey {
    type: string;
    value: string;
}

export interface RecentPixTransaction {
    id: string;
    name: string;
    time: string;
    amount: number;
    key_type: string;
}

export interface PixSendRequest {
    pix_key: string;
    amount: number;
    description?: string;
}

export interface PixSendResponse {
    success: boolean;
    transaction_id: string;
    message: string;
}

export interface PixQRCodeResponse {
    qr_code: string;
    qr_code_value: string;
}

export interface PixKeysResponse {
    keys: PixKey[];
}

export interface PixRecentResponse {
    transactions: RecentPixTransaction[];
}

export const pixService = {
    async getPixKeys(): Promise<PixKeysResponse> {
        const response = await axios.get<PixKeysResponse>(`${API_BASE_URL}/keys`);
        return response.data;
    },

    async getRecentTransactions(): Promise<PixRecentResponse> {
        const response = await axios.get<PixRecentResponse>(`${API_BASE_URL}/recent`);
        return response.data;
    },

    async sendPix(data: PixSendRequest): Promise<PixSendResponse> {
        const response = await axios.post<PixSendResponse>(`${API_BASE_URL}/send`, data);
        return response.data;
    },

    async generateQRCode(): Promise<PixQRCodeResponse> {
        const response = await axios.get<PixQRCodeResponse>(`${API_BASE_URL}/qrcode`);
        return response.data;
    },

    async pixCopyPaste(data: PixSendRequest): Promise<PixSendResponse> {
        const response = await axios.post<PixSendResponse>(`${API_BASE_URL}/copy-paste`, data);
        return response.data;
    }
};
