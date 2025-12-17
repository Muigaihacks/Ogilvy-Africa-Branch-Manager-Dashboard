'use client';

import React, { useMemo, useState } from 'react';
import { MoreVertical, ArrowUpRight, TrendingDown } from 'lucide-react';
import { AgentRanking, TopAgent } from '@/types';

// Icons based on design: 
// Target often shows a Green Up Arrow (Progressing well)
// Realised might show Red Down Arrow (Falling short) or vice-versa depending on data.
// Based on user request: "increase or decrease next to the target and realised amounts"

export const AgentRankingTable = ({ data }: { data: AgentRanking[] }) => {
  const [highlighted, setHighlighted] = useState<Set<number>>(() => new Set());
  const [openMenuRowId, setOpenMenuRowId] = useState<number | null>(null);

  const toggleHighlighted = (id: number) => {
    setHighlighted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyAgent = async (agent: AgentRanking) => {
    const text = `Agent: ${agent.name}\nTarget: KES ${agent.target.toLocaleString()}\nRealised: KES ${agent.realised.toLocaleString()}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback that still lets the user copy manually.
      window.prompt('Copy agent summary:', text);
    }
  };

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
              <tr
                key={agent.id}
                className={[
                  "border-b border-gray-50 last:border-0 transition-colors group",
                  highlighted.has(agent.id) ? "bg-amber-50" : "hover:bg-gray-50",
                ].join(" ")}
              >
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
                  <div className="relative inline-block">
                    <button
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                      aria-label="Row actions"
                      aria-haspopup="menu"
                      aria-expanded={openMenuRowId === agent.id}
                      onClick={() => setOpenMenuRowId(openMenuRowId === agent.id ? null : agent.id)}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openMenuRowId === agent.id && (
                      <div
                        role="menu"
                        className="absolute right-0 top-8 w-44 bg-white border border-gray-100 shadow-lg rounded-lg py-1 z-50"
                      >
                        <button
                          role="menuitem"
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            toggleHighlighted(agent.id);
                            setOpenMenuRowId(null);
                          }}
                        >
                          {highlighted.has(agent.id) ? "Remove highlight" : "Highlight row"}
                        </button>
                        <button
                          role="menuitem"
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            void copyAgent(agent);
                            setOpenMenuRowId(null);
                          }}
                        >
                          Copy summary
                        </button>
                      </div>
                    )}
                  </div>
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
  const [highlighted, setHighlighted] = useState<Set<number>>(() => new Set());
  const [openMenuRowId, setOpenMenuRowId] = useState<number | null>(null);

  const toggleHighlighted = (id: number) => {
    setHighlighted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyAgent = async (agent: TopAgent) => {
    const text = `Agent: ${agent.name}\nTAT: ${agent.tat}\nConversion: ${agent.conversion}\nBranch: ${agent.branch}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt('Copy agent summary:', text);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full min-w-[600px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 font-semibold text-lg">Top Performing Agents</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <tbody>
            {data.map((agent) => (
              <tr
                key={agent.id}
                className={[
                  "border-b border-gray-50 last:border-0 transition-colors",
                  highlighted.has(agent.id) ? "bg-amber-50" : "hover:bg-gray-50",
                ].join(" ")}
              >
                <td className="py-4 font-medium text-gray-700 pl-2 w-1/4">{agent.name}</td>
                <td className="py-4 text-gray-500 w-1/4">{agent.tat} TAT</td>
                <td className="py-4 text-gray-500 w-1/4">{agent.conversion} Conversion Rate</td>
                <td className="py-4 text-gray-500 w-1/6 text-right">{agent.branch}</td>
                <td className="py-4 text-right pr-2 w-1/12">
                  <div className="relative inline-block">
                    <button
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                      aria-label="Row actions"
                      aria-haspopup="menu"
                      aria-expanded={openMenuRowId === agent.id}
                      onClick={() => setOpenMenuRowId(openMenuRowId === agent.id ? null : agent.id)}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openMenuRowId === agent.id && (
                      <div
                        role="menu"
                        className="absolute right-0 top-8 w-44 bg-white border border-gray-100 shadow-lg rounded-lg py-1 z-50"
                      >
                        <button
                          role="menuitem"
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            toggleHighlighted(agent.id);
                            setOpenMenuRowId(null);
                          }}
                        >
                          {highlighted.has(agent.id) ? "Remove highlight" : "Highlight row"}
                        </button>
                        <button
                          role="menuitem"
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            void copyAgent(agent);
                            setOpenMenuRowId(null);
                          }}
                        >
                          Copy summary
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
