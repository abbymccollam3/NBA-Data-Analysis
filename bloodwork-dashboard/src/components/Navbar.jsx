import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="flex space-x-4">
        <Link to="/" className="text-white hover:text-gray-200">
          All Results
        </Link>
        <Link to="/concerns" className="text-white hover:text-gray-200">
          Primary Concerns
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 