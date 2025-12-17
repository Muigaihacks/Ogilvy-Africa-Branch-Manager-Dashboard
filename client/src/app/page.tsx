'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopNav from '@/components/TopNav';
import FilterBar from '@/components/FilterBar';
import KPICards from '@/components/KPICards';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import { 
  LeadsByBranchChart, 
  LeadStatusChart, 
  RevenueByBranchChart,
  AgentPerformanceChart 
} from '@/components/Charts';
import { AgentRankingTable, TopAgentsTable } from '@/components/Tables';
import { fetchDashboardData } from '@/lib/api';
import { DashboardData, FilterState } from '@/types';
import { DashboardSkeleton } from '@/components/Skeletons';

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    dateRange: new Date().toISOString().split('T')[0],
    agent: '',
    branch: '',
    product: '',
    segment: '',
    campaign: ''
  });

  const loadData = async (filters?: FilterState) => {
    try {
      setLoading(true);
      setError(null);
      // Simulate network delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 800)); 
      const dashboardData = await fetchDashboardData(filters);
      setData(dashboardData);
    } catch (err) {
      setError('Unable to load dashboard data. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    setCurrentFilters(filters);
    loadData(filters);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <FilterBar 
            onFilterChange={handleFilterChange} 
            availableFilters={data?.filters} 
          />

          {error && (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl mb-6 text-center border border-red-100 flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-lg font-semibold mb-2">Oops! Something went wrong</div>
              <p className="text-sm text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => loadData(currentFilters)}
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-sm"
              >
                Retry Connection
              </button>
            </div>
          )}

          {loading ? (
            <DashboardSkeleton />
          ) : (
            data && (
              <div className="space-y-8 animate-fade-in pb-10">
                <KPICards data={data.kpi} />
                
                <Banner />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <LeadsByBranchChart 
                      data={data.charts.leadsByBranch} 
                      filters={{ 
                        ...data.filters, 
                        currentBranch: currentFilters.branch 
                      }} 
                    />
                  </div>
                  <div>
                    <LeadStatusChart data={data.charts.leadStatus} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <RevenueByBranchChart 
                      data={data.charts.revenueByBranch} 
                      filters={{ 
                        ...data.filters, 
                        currentBranch: currentFilters.branch 
                      }} 
                    />
                  </div>
                  <div>
                     <AgentRankingTable data={data.tables.branchAgentRanking} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                     <AgentPerformanceChart data={data.charts.agentPerformance} />
                  </div>
                  <div>
                    <TopAgentsTable data={data.tables.topPerformingAgents} />
                  </div>
                </div>

                <Footer />
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
}
