import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-900 text-white p-4">
      <h1 className="text-lg">
        <center>
          <Link to="/" className="text-white">
            Contact Management App
          </Link>
        </center>
      </h1>
    </nav>
  );
};

export default Navbar;