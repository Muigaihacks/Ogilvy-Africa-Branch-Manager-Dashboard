import React from 'react';
import { MoreVertical, ArrowUpRight, TrendingDown } from 'lucide-react';
import { AgentRanking, TopAgent } from '@/types';

// Icons based on design: 
// Target often shows a Green Up Arrow (Progressing well)
// Realised might show Red Down Arrow (Falling short) or vice-versa depending on data.
// Based on user request: "increase or decrease next to the target and realised amounts"

export const AgentRankingTable = ({ data }: { data: AgentRanking[] }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full min-w-[600px] overflow-x-auto">
      <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-4">
        <div className="relative">
          <h3 className="text-gray-800 font-semibold text-base border-b-2 border-blue-600 pb-4 -mb-4 inline-block px-2">Branch Agent Ranking</h3>
        </div>
        <div className="text-gray-400 font-semibold text-base px-2">Country Ranking</div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <tbody className="space-y-4">
            {data.map((agent) => (
              <tr key={agent.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
                <td className="py-4 font-medium text-gray-700 pl-2">{agent.name}</td>
                
                <td className="py-4 text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>Target</span>
                    <span className="font-bold text-gray-900">KES {agent.target.toLocaleString()}</span>
                    <span className="p-0.5 bg-green-50 rounded-full text-green-500">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </td>
                
                <td className="py-4 text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>Realised</span>
                    <span className="font-bold text-gray-900">KES {agent.realised.toLocaleString()}</span>
                    {/* Visual logic: If realised < target, show red down, else green up */}
                    {agent.realised < agent.target ? (
                      <span className="p-0.5 bg-red-50 rounded-full text-red-500">
                        <TrendingDown size={14} />
                      </span>
                    ) : (
                      <span className="p-0.5 bg-green-50 rounded-full text-green-500">
                        <ArrowUpRight size={14} />
                      </span>
                    )}
                  </div>
                </td>
                
                <td className="py-4 text-right pr-2">
                   <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const TopAgentsTable = ({ data }: { data: TopAgent[] }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full min-w-[600px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 font-semibold text-lg">Top Performing Agents</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <tbody>
            {data.map((agent) => (
              <tr key={agent.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-4 font-medium text-gray-700 pl-2 w-1/4">{agent.name}</td>
                <td className="py-4 text-gray-500 w-1/4">{agent.tat} TAT</td>
                <td className="py-4 text-gray-500 w-1/4">{agent.conversion} Conversion Rate</td>
                <td className="py-4 text-gray-500 w-1/6 text-right">{agent.branch}</td>
                <td className="py-4 text-right pr-2 w-1/12">
                   <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
