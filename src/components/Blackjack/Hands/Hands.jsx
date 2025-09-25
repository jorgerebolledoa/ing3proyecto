import React from "react";
import { Blackjack } from "../../index.jsx";

const Hands = ({ playerHand, dealerHand, playerValue, dealerValue, score }) => {
  return (
    <div className="text-white">
      {/* Score */}
      <div className="text-center mb-4">
        <h3 className="text-xl mb-2">Score</h3>
        <div className="flex justify-center gap-8">
          <div>Player: {score.player}</div>
          <div>Dealer: {score.dealer}</div>
        </div>
      </div>

      {/* Player Hand */}
      <div className="mb-6">
        <h3 className="text-xl mb-2">Your Hand (Value: {playerValue})</h3>
        <div className="flex justify-center gap-2">
          {playerHand.map((card, index) => (
            <Blackjack.Card key={index} card={card} />
          ))}
        </div>
      </div>

      {/* Dealer Hand */}
      <div>
        <h3 className="text-xl mb-2">Dealer's Hand (Value: {dealerValue})</h3>
        <div className="flex justify-center gap-2">
          {dealerHand.map((card, index) => (
            <Blackjack.Card key={index} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hands;
