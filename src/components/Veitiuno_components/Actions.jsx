import React from "react";
import BlackjackButton from "../../pages/Veintiuno/components/BlackjackButton";

export default function Actions({
  dealCardToPlayer,
  playerStand,
  resetGame,
  gameOver,
  newGame,
}) {
  return (
    <div className="blackjack-actions">
      {!newGame ? (
        <>
          <BlackjackButton
            color="green"
            onClick={dealCardToPlayer}
            disabled={gameOver}
          >
            Hit
          </BlackjackButton>
          <BlackjackButton color="red" onClick={playerStand}>
            Stand
          </BlackjackButton>
        </>
      ) : (
        <BlackjackButton color="blue" onClick={resetGame}>
          Deal
        </BlackjackButton>
      )}
    </div>
  );
}

