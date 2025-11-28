import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/payments';

export interface UpcomingBill {
    id: string;
    name: string;
    due_date: string;
    amount: number;
    status: string;
    barcode?: string;
}

export interface PaidBill {
    id: string;
    name: string;
    paid_date: string;
    amount: number;
    payment_method: string;
}

export interface UpcomingBillsResponse {
    bills: UpcomingBill[];
    total_amount: number;
    count: number;
}

export interface PaidBillsResponse {
    bills: PaidBill[];
    total_amount: number;
    count: number;
}

export interface PaymentsSummary {
    total_pending: number;
    total_paid: number;
    pending_count: number;
    paid_count: number;
    next_due_date: string;
}

export const paymentsService = {
    async getUpcomingBills(): Promise<UpcomingBillsResponse> {
        const response = await axios.get<UpcomingBillsResponse>(`${API_BASE_URL}/upcoming`);
        return response.data;
    },

    async getPaidBills(): Promise<PaidBillsResponse> {
        const response = await axios.get<PaidBillsResponse>(`${API_BASE_URL}/paid`);
        return response.data;
    },

    async getSummary(): Promise<PaymentsSummary> {
        const response = await axios.get<PaymentsSummary>(`${API_BASE_URL}/summary`);
        return response.data;
    }
};
