import React from "react";
import Hand from "../../pages/Veintiuno/Hand";
export default function Hands({
  playerHand,
  dealerHand,
  playerValue,
  dealerValue,
  score,
}) {
  return (
    <div className="flex justify-around">
      <Hand
        cards={playerHand}
        title="Player's Hand"
        handValue={playerValue}
        score={score.player}
      />
      <Hand
        cards={dealerHand}
        title="Dealer's Hand"
        handValue={dealerValue}
        score={score.dealer}
      />
    </div>
  );
}
