import React from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

const TopNav = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10">
      
      {/* Navigation Links - Centered/Left */}
      <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-500">
        <a href="#" className="text-blue-600 border-b-2 border-blue-600 py-5 px-1">Lead Management</a>
        <a href="#" className="hover:text-gray-900 py-5 px-1 border-b-2 border-transparent hover:border-gray-200 transition-colors">Marketing Automation</a>
        <a href="#" className="hover:text-gray-900 py-5 px-1 border-b-2 border-transparent hover:border-gray-200 transition-colors">Campaigns</a>
        <a href="#" className="hover:text-gray-900 py-5 px-1 border-b-2 border-transparent hover:border-gray-200 transition-colors">Studio</a>
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6 flex-1 justify-end">
        {/* Extended Search Bar */}
        <div className="relative hidden md:block w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search ..." 
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all shadow-sm"
          />
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-100 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
               <User size={18} className="text-gray-500" />
            </div>
            <div className="hidden md:block text-sm text-right">
              <span className="block font-semibold text-gray-700 leading-tight">John Doe</span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
