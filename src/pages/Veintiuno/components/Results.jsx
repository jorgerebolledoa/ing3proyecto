import React from "react";

const Results = ({ result }) => {
  const getResultColor = () => {
    switch (result.type) {
      case "player":
        return "text-green-400";
      case "dealer":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  return (
    <div className="text-center mb-4">
      <h2 className={`text-2xl font-bold ${getResultColor()}`}>
        {result.message}
      </h2>
    </div>
  );
};

export default Results;
