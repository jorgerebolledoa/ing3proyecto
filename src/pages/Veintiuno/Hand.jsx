import React from "react";
import Card from "./Card";

const Hand = ({ cards, title, handValue, score }) => {
  return (
    <div className="p-4">
      <h4 className="font-medium mb-1">Wins: {score}</h4>
      <h2 className="text-2xl mb-2 bg-white text-slate-900 font-medium px-3 py-2 rounded-md">
        {title}: <b>{handValue}</b>
      </h2>
      <div className="flex flex-col items-center sm:flex-row gap-1">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Hand;