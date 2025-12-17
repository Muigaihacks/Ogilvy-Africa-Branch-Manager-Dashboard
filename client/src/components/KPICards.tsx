import React from 'react';
import { TrendingUp, TrendingDown, Minus, ArrowUp } from 'lucide-react';
import { KPISection } from '@/types';

interface KPICardsProps {
  data: KPISection;
}

const KPICards = ({ data }: KPICardsProps) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card 
        label="Turn Around Time" 
        value={data.turnAroundTime.value} 
        unit={data.turnAroundTime.unit}
        change={data.turnAroundTime.change}
        history={data.turnAroundTime.history}
        color="bg-indigo-500"
        iconColor="bg-indigo-100 text-indigo-500"
      />
      <Card 
        label="Conversion Rate" 
        value={data.conversionRate.value}
        unit={data.conversionRate.unit} 
        change={data.conversionRate.change}
        history={data.conversionRate.history}
        color="bg-pink-500"
        iconColor="bg-pink-100 text-pink-500"
      />
      <Card 
        label="Total Contacted Leads" 
        value={data.totalContactedLeads.value} 
        change={data.totalContactedLeads.change}
        history={data.totalContactedLeads.history}
        color="bg-orange-500"
        iconColor="bg-orange-100 text-orange-500"
        showArrow // Explicitly requested green arrows
      />
      <Card 
        label="Total Leads" 
        value={data.totalLeads.value} 
        change={data.totalLeads.change}
        history={data.totalLeads.history}
        color="bg-teal-500"
        iconColor="bg-teal-100 text-teal-500"
        showArrow // Explicitly requested green arrows
      />
    </div>
  );
};

const Card = ({ label, value, unit, change, history, color, iconColor, showArrow }: any) => {
  // Logic: If showArrow is true, force green arrow regardless of value (visual requirement)
  // Otherwise use real trend
  const isPositive = change > 0;
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconColor}`}>
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-end gap-2 mb-1">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-lg text-gray-500 font-medium mb-1">{unit}</span>}
          
          {(change !== 0 || showArrow) && (
            <span className={`text-xs mb-1.5 flex items-center ${isPositive || showArrow ? 'text-green-500' : 'text-red-500'}`}>
              {(isPositive || showArrow) ? <ArrowUp size={14} strokeWidth={3} /> : <TrendingDown size={14} />}
            </span>
          )}
          {change === 0 && !showArrow && <span className="text-blue-400 mb-1.5"><Minus size={12} /></span>}
        </div>
        <div className="text-sm font-medium text-gray-500 mb-2">{label}</div>
        <div className="text-xs text-gray-400">{history}</div>
      </div>
    </div>
  );
};

export default KPICards;
