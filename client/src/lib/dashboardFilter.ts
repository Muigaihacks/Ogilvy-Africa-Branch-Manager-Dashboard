import { mockData } from "@/lib/mockData";

type Dashboard = (typeof mockData);

export type DashboardFilters = Partial<{
  branch: string;
  agent: string;
  dateRange: string;
  product: string;
  segment: string;
  campaign: string;
}>;

// Ported from the original Express server (server/server.js).
export function filterDashboardData(data: Dashboard, filters: DashboardFilters) {
  const filtered: any = JSON.parse(JSON.stringify(data)); // Deep clone for simple mutation
  const { branch, agent } = filters;

  // 1. KPI Adjustment based on Branch
  if (branch && branch !== "All") {
    // Branch A = 40%, Branch B = 35%, Branch C = 25% distribution simulation
    let factor = 0.33;
    if (branch === "Branch A") factor = 0.4;
    if (branch === "Branch B") factor = 0.35;
    if (branch === "Branch C") factor = 0.25;

    filtered.kpi.totalLeads.value = Math.floor(data.kpi.totalLeads.value * factor);
    filtered.kpi.totalContactedLeads.value = Math.floor(data.kpi.totalContactedLeads.value * factor);

    // Adjust lead status to sum up closer to the new total leads
    filtered.charts.leadStatus = filtered.charts.leadStatus.map((s: any) => ({
      ...s,
      value: Math.floor(s.value * factor),
    }));

    // Adjust Turn Around Time and Conversion Rate slightly to simulate different branch performance
    filtered.kpi.turnAroundTime.value = Number(
      (filtered.kpi.turnAroundTime.value * (1 + (factor - 0.33))).toFixed(2)
    );
    filtered.kpi.conversionRate.value = Number(
      (filtered.kpi.conversionRate.value * (1 - (factor - 0.33))).toFixed(2)
    );
  }

  // 2. Chart Trend Logic (Fixing "Straight Lines")
  if (branch && branch !== "All") {
    filtered.charts.leadsByBranch = filtered.charts.leadsByBranch.filter((item: any) => item.branch === branch);
    filtered.charts.revenueByBranch = filtered.charts.revenueByBranch.filter((item: any) => item.branch === branch);
  } else {
    // Aggregate to avoid 18 points in general view
    const aggregatedLeads: Record<string, any> = {};
    const aggregatedRevenue: Record<string, any> = {};

    data.charts.leadsByBranch.forEach((item: any) => {
      if (!aggregatedLeads[item.name]) aggregatedLeads[item.name] = { name: item.name, leads: 0, conversion: 0 };
      aggregatedLeads[item.name].leads += item.leads;
      aggregatedLeads[item.name].conversion += item.conversion;
    });

    data.charts.revenueByBranch.forEach((item: any) => {
      if (!aggregatedRevenue[item.name]) aggregatedRevenue[item.name] = { name: item.name, target: 0, achieved: 0 };
      aggregatedRevenue[item.name].target += item.target;
      aggregatedRevenue[item.name].achieved += item.achieved;
    });

    filtered.charts.leadsByBranch = Object.values(aggregatedLeads);
    filtered.charts.revenueByBranch = Object.values(aggregatedRevenue);
  }

  // 3. Agent Filtering Logic
  if (branch && branch !== "All") {
    filtered.tables.branchAgentRanking = filtered.tables.branchAgentRanking.filter((a: any) => a.branch === branch);
    filtered.tables.topPerformingAgents = filtered.tables.topPerformingAgents.filter((a: any) => a.branch === branch);
    filtered.charts.agentPerformance = filtered.charts.agentPerformance.filter((a: any) => a.branch === branch);
  }

  if (agent && agent !== "All") {
    filtered.tables.branchAgentRanking = filtered.tables.branchAgentRanking.filter((a: any) => a.name === agent);
    filtered.tables.topPerformingAgents = filtered.tables.topPerformingAgents.filter((a: any) => a.name === agent);
    filtered.charts.agentPerformance = filtered.charts.agentPerformance.filter((a: any) => a.name === agent);
  }

  return filtered as Dashboard;
}


