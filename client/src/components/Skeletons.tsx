import React from 'react';

const KPISkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    ))}
  </div>
);

const ChartSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full animate-pulse">
    <div className="flex justify-between items-center mb-6">
      <div className="h-6 bg-gray-200 rounded w-40"></div>
      <div className="h-6 bg-gray-200 rounded w-20"></div>
    </div>
    <div className="h-[280px] bg-gray-100 rounded-lg w-full"></div>
  </div>
);

const TableSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 bg-gray-100 rounded w-full"></div>
      ))}
    </div>
  </div>
);

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 pb-10">
      <KPISkeleton />
      
      {/* Banner Skeleton */}
      <div className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div>
          <ChartSkeleton />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div>
           <TableSkeleton />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <ChartSkeleton />
        </div>
        <div>
          <TableSkeleton />
        </div>
      </div>
    </div>
  );
};

