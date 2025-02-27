import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
