import React from "react";

const Error = ({ message }) => {
  return (
    <div
      className="flex items-center gap-2 p-4 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg"
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-red-700"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-9-4a1 1 0 112 0v3a1 1 0 01-2 0V6zm1 7a1 1 0 100 2 1 1 0 000-2z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default Error;
