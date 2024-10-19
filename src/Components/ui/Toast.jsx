import React from "react";
import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

const TOAST_CONFIGS = {
  [TOAST_TYPES.SUCCESS]: { icon: FiCheckCircle, bgColor: "bg-green-500" },
  [TOAST_TYPES.ERROR]: { icon: FiXCircle, bgColor: "bg-red-500" },
  [TOAST_TYPES.INFO]: { icon: FiCheckCircle, bgColor: "bg-blue-500" },
  [TOAST_TYPES.WARNING]: { icon: FiXCircle, bgColor: "bg-yellow-500" },
};

const Toast = ({ message, type, onClose }) => {
  const { icon: Icon, bgColor } =
    TOAST_CONFIGS[type] || TOAST_CONFIGS[TOAST_TYPES.INFO];

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 ${bgColor} text-white p-4 rounded-md shadow-lg flex items-center space-x-2 animate-fade-in-up`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-sans text-sm flex-grow">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        <FiX className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;
export { TOAST_TYPES, TOAST_CONFIGS };
