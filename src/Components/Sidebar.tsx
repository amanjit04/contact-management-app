import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <nav className="w-1/4 h-screen bg-gray-200 p-4 border border-gray-400 rounded-lg">
      <ul>
        <li className="mb-2 border-b border-gray-400 pb-2">
          <Link to="/contacts" className="block p-2 text-lg text-gray-800 hover:bg-gray-300 rounded">
            Create Contact
          </Link>
        </li>
        <li className="border-b border-gray-400 pb-2">
          <Link to="/charts-and-maps" className="block p-2 text-lg text-gray-800 hover:bg-gray-300 rounded">
            Charts and Maps
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;