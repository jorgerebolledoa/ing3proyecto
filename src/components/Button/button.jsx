
import React from "react";

const Button = ({ disabled, bg_color = "blue", onClick, children }) => {
  // Mapeo de colores para evitar problemas con clases dinámicas de Tailwind
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-700",
    green: "bg-green-500 hover:bg-green-700",
    red: "bg-red-500 hover:bg-red-700",
    yellow: "bg-yellow-500 hover:bg-yellow-700",
    gray: "bg-gray-500 hover:bg-gray-700"
  };

  const colorClass = colorClasses[bg_color] || colorClasses.blue;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${colorClass} disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg shadow-md transition duration-200`}
    >
      {children}
    </button>
  );
};

export default Button;