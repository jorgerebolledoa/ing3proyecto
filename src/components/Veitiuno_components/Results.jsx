import React from "react";

export default function Result({ result }) {
  return (
    <div
      className={`text-white font-bold rounded-md text-center mt-4 py-2 ${
        result.type === "player" ? "bg-green-600" : "bg-red-700"
      }`}
    >
      <h2 className="text-2xl ">{result.message}</h2>
    </div>
  );
}