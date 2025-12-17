export interface KPI {
  value: number;
  unit?: string;
  change: number;
  history: string;
}

export interface KPISection {
  turnAroundTime: KPI;
  conversionRate: KPI;
  totalContactedLeads: KPI;
  totalLeads: KPI;
}

export interface ChartData {
  name: string;
  [key: string]: string | number;
}

export interface LeadStatus {
  name: string;
  value: number;
  color: string;
}

export interface AgentRanking {
  id: number;
  name: string;
  target: number;
  realised: number;
}

export interface TopAgent {
  id: number;
  name: string;
  tat: string;
  conversion: string;
  branch: string;
}

export interface Filters {
  agents: string[];
  branches: string[];
  products: string[];
  segments: string[];
  campaigns: string[];
}

export interface DashboardData {
  kpi: KPISection;
  charts: {
    leadsByBranch: ChartData[];
    revenueByBranch: ChartData[];
    leadStatus: LeadStatus[];
    agentPerformance: ChartData[];
  };
  tables: {
    branchAgentRanking: AgentRanking[];
    topPerformingAgents: TopAgent[];
  };
  filters: Filters;
}

export interface FilterState {
  dateRange: string;
  agent: string;
  branch: string;
  product: string;
  segment: string;
  campaign: string;
}

