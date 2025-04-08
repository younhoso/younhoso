export interface Purchase {
  id: string;
  email: string;
  amount: number;
  created_at: Date;
  status: "completed" | "cancelled";
  user_id: string;
  user_name: string;
}

export interface MonthlyStat {
  month: string;
  revenue: number;
}

export interface DashboardStats {
  totalRevenue: number;
  recentPurchases: Purchase[];
  monthlyStats: MonthlyStat[];
  monthlyAverage: number;
}
