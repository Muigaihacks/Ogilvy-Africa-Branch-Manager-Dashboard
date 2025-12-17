import React from 'react';

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full border-r border-white/20 pr-6">
        <div>
          <h3 className="text-lg font-bold mb-1">Improve Your Turn Around Time</h3>
          <p className="text-sm text-blue-100 opacity-90 leading-relaxed">
            increase your turn around time by 2% by calling your clients between 8:30 am - 12:00 pm.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">Increase Conversion Rate</h3>
           <p className="text-sm text-blue-100 opacity-90 leading-relaxed">
            increase your conversion rate 2% by calling your clients between 8:30 am - 12:00 pm.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8 shrink-0">
        <div className="text-center">
          <div className="text-3xl font-bold">93</div>
          <div className="text-xs text-blue-100 mb-3">Branch Ranking</div>
          <button className="px-6 py-1.5 bg-white text-blue-600 text-xs font-bold rounded-full hover:bg-gray-100 transition-colors">
            View All
          </button>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">493</div>
           <div className="text-xs text-blue-100 mb-3">Country Ranking</div>
          <button className="px-6 py-1.5 bg-white text-purple-600 text-xs font-bold rounded-full hover:bg-gray-100 transition-colors">
            View All
          </button>
        </div>
      </div>

    </div>
  );
};

export default Banner;

