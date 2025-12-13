const mockData = {
  kpi: {
    turnAroundTime: {
      value: 6.27,
      unit: "days",
      change: -0.2, // Negative implies improvement for time
      history: "Was 0(min) 31 days ago"
    },
    conversionRate: {
      value: 1.06,
      unit: "%",
      change: 0.5,
      history: "Was 0% 31 days ago"
    },
    totalContactedLeads: {
      value: 17,
      change: 0,
      history: "No change from 31 days ago"
    },
    totalLeads: {
      value: 471,
      change: 0,
      history: "No change from 31 days ago"
    }
  },
  
  charts: {
    leadsByBranch: [
      { name: '1st', leads: 2000, conversion: 1500 },
      { name: '2nd', leads: 3500, conversion: 2200 },
      { name: '3rd', leads: 2800, conversion: 1800 },
      { name: '4th', leads: 4500, conversion: 3500 },
      { name: '5th', leads: 3200, conversion: 2400 },
      { name: '6th', leads: 4800, conversion: 3800 }
    ],
    revenueByBranch: [
      { name: '1st', target: 2000, achieved: 1200 },
      { name: '2nd', target: 3500, achieved: 2800 },
      { name: '3rd', target: 2800, achieved: 2100 },
      { name: '4th', target: 4500, achieved: 3900 },
      { name: '5th', target: 3200, achieved: 2700 },
      { name: '6th', target: 4800, achieved: 4100 }
    ],
    leadStatus: [
      { name: 'Open', value: 40, color: '#3b82f6' }, // Blue
      { name: 'Closed', value: 15, color: '#ef4444' }, // Red
      { name: 'Product/Service Sold', value: 5, color: '#eab308' }, // Yellow
      { name: 'To Callback Later', value: 1, color: '#22c55e' } // Green
    ],
    agentPerformance: [
      { name: 'Agent 1', value: 12000 },
      { name: 'Agent 2', value: 9000 },
      { name: 'Agent 3', value: 7000 },
      { name: 'Agent 4', value: 15000 },
      { name: 'Agent 5', value: 11000 },
      { name: 'Agent 6', value: 8000 },
      { name: 'Agent 7', value: 6000 },
      { name: 'Agent 8', value: 9500 },
      { name: 'Agent 9', value: 13000 },
      { name: 'Agent 10', value: 10000 },
      { name: 'Agent 11', value: 7500 },
      { name: 'Agent 12', value: 8500 }
    ]
  },

  tables: {
    branchAgentRanking: [
      { id: 1, name: 'Jane Doe', target: 4000, realised: 3500 },
      { id: 2, name: 'John Smith', target: 4000, realised: 3200 },
      { id: 3, name: 'Alice Johnson', target: 4000, realised: 3800 },
      { id: 4, name: 'Bob Wilson', target: 4000, realised: 3100 },
      { id: 5, name: 'Carol White', target: 4000, realised: 3900 },
      { id: 6, name: 'Dave Brown', target: 4000, realised: 3000 }
    ],
    topPerformingAgents: [
      { id: 1, name: 'Jane Doe', tat: '3.48 (days)', conversion: '1%', branch: 'Branch A' },
      { id: 2, name: 'John Smith', tat: '3.12 (days)', conversion: '2%', branch: 'Branch B' },
      { id: 3, name: 'Alice Johnson', tat: '2.90 (days)', conversion: '1.5%', branch: 'Branch A' },
      { id: 4, name: 'Bob Wilson', tat: '3.60 (days)', conversion: '1.2%', branch: 'Branch C' },
      { id: 5, name: 'Carol White', tat: '3.20 (days)', conversion: '1.8%', branch: 'Branch B' }
    ]
  },
  
  filters: {
    agents: ['Jane Doe', 'John Smith', 'Alice Johnson'],
    branches: ['Branch A', 'Branch B', 'Branch C'],
    products: ['Product X', 'Product Y'],
    segments: ['Segment 1', 'Segment 2'],
    campaigns: ['Campaign Q1', 'Campaign Q2']
  }
};

module.exports = { mockData };

