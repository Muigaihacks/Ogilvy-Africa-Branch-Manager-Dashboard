import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { ChartData, LeadStatus, Filters } from '@/types';
import { Download, ChevronDown, FileSpreadsheet, FileImage } from 'lucide-react';

/* --- Reusable Components for Headers --- */

const DownloadMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
      >
        <Download size={18} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-8 bg-white border border-gray-100 shadow-lg rounded-lg w-40 py-1 z-50">
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <FileImage size={14} /> Download JPEG
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <FileSpreadsheet size={14} /> Download XLS
          </button>
        </div>
      )}
    </div>
  );
};

const ChartDropdown = ({ label, options, onChange }: { label: string, options: string[], onChange?: (val: string) => void }) => (
  <div className="relative group">
    <select 
      className="appearance-none pl-3 pr-8 py-1 bg-white border border-gray-200 rounded-md text-xs text-gray-600 focus:outline-none cursor-pointer"
      onChange={(e) => onChange && onChange(e.target.value)}
    >
      <option>{label}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

/* --- Charts --- */

export const LeadsByBranchChart = ({ data, filters }: { data: ChartData[], filters?: Filters & { currentBranch?: string } }) => {
  const branches = filters?.branches || ['Branch A', 'Branch B', 'Branch C'];
  const currentBranch = filters?.currentBranch || 'Branch';
  const [timeFilter, setTimeFilter] = useState('Month'); // Default filter

  // Simulate Visual Change on Time Filter
  // We use different slicing/transformation to make the change obvious
  let displayData = data;
  if (timeFilter === 'Quarter') {
     // Show only every 2nd point to simulate quarterly view
     displayData = data.filter((_, i) => i % 2 === 0);
  } else if (timeFilter === 'Year') {
     // Reverse to show a drastically different view
     displayData = [...data].reverse();
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-gray-700 font-semibold text-sm sm:text-base">Leads By Branch</h3>
          <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-500">
             <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Leads</div>
             <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-400"></span> Conversion rate</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 ml-auto">
          {/* Dropdown now reflects the global filter state if provided */}
          <ChartDropdown label={currentBranch !== 'Branch' ? currentBranch : 'Branch'} options={branches} />
          <ChartDropdown 
            label="Filter By" 
            options={['Month', 'Quarter', 'Year']} 
            onChange={(val) => setTimeFilter(val)}
          />
          <DownloadMenu />
        </div>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
            <Area type="monotone" dataKey="conversion" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorConv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const LeadStatusChart = ({ data }: { data: LeadStatus[] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
       <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-700 font-semibold text-sm sm:text-base">Lead Status</h3>
        <DownloadMenu />
      </div>
      
      <div className="text-right text-xs font-bold text-gray-700 mb-2">TOTAL LEADS {total}</div>

      <div className="flex-1 flex items-center justify-center relative min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="45%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
               verticalAlign="middle" 
               align="right" 
               layout="vertical"
               iconType="circle"
               iconSize={8}
               width={120}
               wrapperStyle={{ fontSize: '12px', color: '#6b7280', lineHeight: '24px', right: 0 }}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const RevenueByBranchChart = ({ data, filters }: { data: ChartData[], filters?: Filters & { currentBranch?: string } }) => {
  const currentBranch = filters?.currentBranch || 'Branch';
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 font-semibold text-sm sm:text-base">Revenue By Branch</h3>
        <div className="flex items-center gap-3">
          <ChartDropdown label={currentBranch !== 'Branch' ? currentBranch : 'Branch'} options={filters?.branches || []} />
          <DownloadMenu />
        </div>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
             <defs>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAchieved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
            <Area type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTarget)" name="Target" />
            <Area type="monotone" dataKey="achieved" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorAchieved)" name="Achieved" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const AgentPerformanceChart = ({ data }: { data: ChartData[] }) => {
   return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 font-semibold text-sm sm:text-base">Agent Performance</h3>
         <DownloadMenu />
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={8}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} dy={10} interval={0} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
            <Bar dataKey="value" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
