import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 inline-block px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
