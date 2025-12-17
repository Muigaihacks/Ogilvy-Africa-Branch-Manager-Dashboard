import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8 py-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
      <div className="flex items-center gap-1">
        <span>© optimus 2020. All Right Reserved</span>
      </div>
      
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">privacy policy</a>
        <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">t&c</a>
        <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">help</a>
      </div>
    </footer>
  );
};

export default Footer;

