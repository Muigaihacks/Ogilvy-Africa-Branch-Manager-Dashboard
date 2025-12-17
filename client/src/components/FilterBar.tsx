import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronDown, X } from 'lucide-react';
import { FilterState, Filters } from '@/types';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  availableFilters?: Filters; // Make optional to prevent breaking initial render
}

const FilterBar = ({ onFilterChange, availableFilters }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: new Date().toISOString().split('T')[0],
    agent: '',
    branch: '',
    product: '',
    segment: '',
    campaign: ''
  });

  // Debounce filter application to avoid too many requests or apply only on button click
  // The requirement says "Apply Filter" button triggers fetching.

  const handleChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleClear = () => {
    const reset = {
      dateRange: new Date().toISOString().split('T')[0],
      agent: '',
      branch: '',
      product: '',
      segment: '',
      campaign: ''
    };
    setFilters(reset);
    onFilterChange(reset);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-3 mb-6 animate-fade-in">
      
      {/* Date Picker */}
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <CalendarIcon size={16} />
        </div>
        <input 
          type="date" 
          value={filters.dateRange}
          onChange={(e) => handleChange('dateRange', e.target.value)}
          className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 hover:bg-gray-100 transition-colors cursor-pointer"
        />
      </div>

      <FilterDropdown 
        label="Agent" 
        value={filters.agent} 
        onChange={(v: string) => handleChange('agent', v)} 
        options={availableFilters?.agents || []}
      />
      <FilterDropdown 
        label="Branch" 
        value={filters.branch} 
        onChange={(v: string) => handleChange('branch', v)} 
        options={availableFilters?.branches || []}
      />
      <FilterDropdown 
        label="Product" 
        value={filters.product} 
        onChange={(v: string) => handleChange('product', v)} 
        options={availableFilters?.products || []}
      />
      <FilterDropdown 
        label="Segment" 
        value={filters.segment} 
        onChange={(v: string) => handleChange('segment', v)} 
        options={availableFilters?.segments || []}
      />
      <FilterDropdown 
        label="Campaign" 
        value={filters.campaign} 
        onChange={(v: string) => handleChange('campaign', v)} 
        options={availableFilters?.campaigns || []}
      />

      <div className="ml-auto flex items-center gap-2">
        <button 
          onClick={handleClear}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          title="Clear Filters"
        >
          <X size={18} />
        </button>
        <button 
          onClick={handleApply}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all active:scale-95"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, value, onChange, options }: any) => (
  <div className="relative group">
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer hover:bg-gray-100 transition-colors min-w-[130px]"
    >
      <option value="">{label}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
  </div>
);

export default FilterBar;
