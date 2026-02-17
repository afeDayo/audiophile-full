import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <p className="text-lg text-gray-600 mb-6">Page not found</p>
        <Link
          to="/"
          className="bg-[#D87D4A] text-white px-6 py-3 rounded hover:bg-[#FBAF85] transition-colors text-sm"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
