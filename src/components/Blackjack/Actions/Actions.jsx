import React from "react";
import { Blackjack } from "../../index.jsx";

const Actions = ({
  dealCardToPlayer,
  playerStand,
  resetGame,
  gameOver,
  newGame,
}) => {
  return (
    <div className="flex justify-center gap-4 mb-4">
      {!gameOver && (
        <>
          <Blackjack.BlackjackButton color="green" onClick={dealCardToPlayer}>
            Hit
          </Blackjack.BlackjackButton>
          <Blackjack.BlackjackButton color="red" onClick={playerStand}>
            Stand
          </Blackjack.BlackjackButton>
        </>
      )}
      {newGame && (
        <Blackjack.BlackjackButton color="blue" onClick={resetGame}>
          New Game
        </Blackjack.BlackjackButton>
      )}
    </div>
  );
};

export default Actions;
