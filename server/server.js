const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { mockData } = require('./data');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Helper function to simulate data filtering
const filterData = (data, filters) => {
  let filtered = JSON.parse(JSON.stringify(data)); // Deep clone
  const { branch, agent, product, segment, campaign } = filters;

  // --- Logic Fixes based on User Feedback ---

  // 1. KPI Adjustment based on Branch
  // If no branch filter, use default totals. If branch selected, reduce totals to simulate "subset".
  if (branch && branch !== 'All') {
    // Reduce totals by ~60% for a specific branch view (just simulation)
    // Branch A = 40%, Branch B = 35%, Branch C = 25% distribution simulation
    let factor = 0.33; 
    if (branch === 'Branch A') factor = 0.40;
    if (branch === 'Branch B') factor = 0.35;
    if (branch === 'Branch C') factor = 0.25;

    filtered.kpi.totalLeads.value = Math.floor(data.kpi.totalLeads.value * factor);
    filtered.kpi.totalContactedLeads.value = Math.floor(data.kpi.totalContactedLeads.value * factor);
    
    // Also adjust lead status to sum up closer to the new total leads
    filtered.charts.leadStatus = filtered.charts.leadStatus.map(s => ({
      ...s,
      value: Math.floor(s.value * factor)
    }));

    // Adjust Turn Around Time and Conversion Rate slightly to simulate different branch performance
    filtered.kpi.turnAroundTime.value = Number((filtered.kpi.turnAroundTime.value * (1 + (factor - 0.33))).toFixed(2));
    filtered.kpi.conversionRate.value = Number((filtered.kpi.conversionRate.value * (1 - (factor - 0.33))).toFixed(2));
  }

  // 2. Chart Trend Logic (Fixing "Straight Lines")
  // The issue was we only had 1 or 2 data points per branch in the original mock data.
  // Now mockData has 6 points per branch.
  if (branch && branch !== 'All') {
    // Filter to keep ONLY the 6 points for this specific branch
    filtered.charts.leadsByBranch = filtered.charts.leadsByBranch.filter(item => item.branch === branch);
    filtered.charts.revenueByBranch = filtered.charts.revenueByBranch.filter(item => item.branch === branch);
  } else {
    // If NO branch selected (General View), we need to AGGREGATE data so we don't show 18 points.
    // We will sum up leads/revenue for "1st", "2nd"... regardless of branch
    const aggregatedLeads = {};
    const aggregatedRevenue = {};

    data.charts.leadsByBranch.forEach(item => {
      if (!aggregatedLeads[item.name]) aggregatedLeads[item.name] = { name: item.name, leads: 0, conversion: 0 };
      aggregatedLeads[item.name].leads += item.leads;
      aggregatedLeads[item.name].conversion += item.conversion;
    });

    data.charts.revenueByBranch.forEach(item => {
      if (!aggregatedRevenue[item.name]) aggregatedRevenue[item.name] = { name: item.name, target: 0, achieved: 0 };
      aggregatedRevenue[item.name].target += item.target;
      aggregatedRevenue[item.name].achieved += item.achieved;
    });

    filtered.charts.leadsByBranch = Object.values(aggregatedLeads);
    filtered.charts.revenueByBranch = Object.values(aggregatedRevenue);
  }

  // 3. Agent Filtering Logic
  if (branch && branch !== 'All') {
    // Filter Tables - Ensure we don't accidentally filter out valid agents due to mismatch
    // The mock data has 'Branch A', 'Branch B', 'Branch C'. Ensure frontend sends exact string.
    filtered.tables.branchAgentRanking = filtered.tables.branchAgentRanking.filter(a => a.branch === branch);
    filtered.tables.topPerformingAgents = filtered.tables.topPerformingAgents.filter(a => a.branch === branch);
    filtered.charts.agentPerformance = filtered.charts.agentPerformance.filter(a => a.branch === branch);
  }

  if (agent && agent !== 'All') {
    filtered.tables.branchAgentRanking = filtered.tables.branchAgentRanking.filter(a => a.name === agent);
    filtered.tables.topPerformingAgents = filtered.tables.topPerformingAgents.filter(a => a.name === agent);
    filtered.charts.agentPerformance = filtered.charts.agentPerformance.filter(a => a.name === agent);
  }

  return filtered;
};

app.get('/api/dashboard', (req, res) => {
  const { branch, agent, dateRange, product, segment, campaign } = req.query;
  
  const filters = { branch, agent, dateRange, product, segment, campaign };
  const responseData = filterData(mockData, filters);
  
  res.json({
    success: true,
    data: responseData,
    filtersApplied: filters
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
