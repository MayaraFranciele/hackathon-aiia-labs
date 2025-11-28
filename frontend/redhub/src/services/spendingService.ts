import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/spending';

export interface BudgetSummary {
    total_spent: number;
    budget_limit: number;
    percentage_used: number;
    remaining: number;
    is_over_budget: boolean;
}

export interface DailyStats {
    spent_today: number;
    today_change: number;
    daily_average: number;
    average_change: number;
    highest_category: string;
    highest_amount: number;
}

export interface CategorySummaryItem {
    type: string;
    label: string;
    amount: number;
    percentage: number;
    color: string;
}

export interface SpendingOverview {
    budget: BudgetSummary;
    daily_stats: DailyStats;
    categories: CategorySummaryItem[];
}

export const spendingService = {
    async getBudgetSummary(): Promise<SpendingOverview> {
        const response = await axios.get<SpendingOverview>(`${API_BASE_URL}/summary`);
        return response.data;
    }
};
