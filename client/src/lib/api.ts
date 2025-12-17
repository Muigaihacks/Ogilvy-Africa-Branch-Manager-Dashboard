import axios from "axios";
import type { DashboardData, FilterState } from "@/types";

// Use same-origin API so the app works on Vercel without a separate Express server.
const API_URL = "/api";

export const fetchDashboardData = async (filters?: FilterState): Promise<DashboardData> => {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
  }

  const response = await axios.get<{ success: boolean; data: DashboardData }>(`${API_URL}/dashboard`, { params });
  return response.data.data;
};

