import React from 'react';
import { LayoutDashboard, Users, Upload, FileText, UserPlus } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white flex flex-col h-screen shadow-xl z-20">
      {/* Logo Section */}
      <div className="h-20 bg-blue-600 flex items-center px-6 gap-4 shrink-0 shadow-sm">
        <div className="relative w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shrink-0 border-[3px] border-white">
          {/* Inner Blue Circle */}
          <div className="w-5 h-5 bg-[#5BB5E8] rounded-full relative flex items-center justify-center">
             {/* Small White Dot */}
             <div className="w-1.5 h-1.5 bg-white rounded-full ml-2"></div>
          </div>
        </div>
        <span className="font-bold text-2xl text-white tracking-wide">optimus</span>
      </div>

      {/* Navigation Items */}
      <div className="py-6 px-4 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <NavItem 
            icon={<Users size={18} />} 
            label="Assigned Leads" 
            badge="200" 
            badgeColor="bg-teal-400"
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Leads Assigned By Me" 
            badge="20" 
            badgeColor="bg-blue-400"
          />
          <NavItem icon={<Upload size={18} />} label="Upload Leads" />
          <NavItem icon={<FileText size={18} />} label="Leads Follow up" />
          <NavItem icon={<UserPlus size={18} />} label="Add Leads" />
        </div>
      </div>

      {/* Decorative Bottom Circles */}
      <div className="p-8 relative h-64 overflow-hidden mt-auto">
        {/* Abstract shapes matching the design */}
        <div className="absolute bottom-32 right-12 w-6 h-6 rounded-full border-4 border-orange-400"></div>
        {/* Raised the yellow circle as requested */}
        <div className="absolute bottom-28 right-24 w-8 h-8 rounded-full border-4 border-yellow-400"></div> 
        <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full border-[6px] border-blue-500"></div>
        
        {/* Subtle background curve */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-50 rounded-full opacity-50 pointer-events-none"></div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, badge, badgeColor, active }: any) => (
  <button 
    className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium transition-all duration-200 group rounded-lg ${
      active 
        ? 'text-blue-600 bg-blue-50/80' 
        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
    }`}
  >
    <div className="flex items-center gap-3">
      <span className={active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}>
        {icon}
      </span>
      <span>{label}</span>
    </div>
    {badge && (
      <span className={`${badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm`}>
        {badge}
      </span>
    )}
  </button>
);

export default Sidebar;
