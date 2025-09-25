import React from "react";
import BlackjackButton from "./BlackjackButton.jsx";

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
          <BlackjackButton color="green" onClick={dealCardToPlayer}>
            Hit
          </BlackjackButton>
          <BlackjackButton color="red" onClick={playerStand}>
            Stand
          </BlackjackButton>
        </>
      )}
      {newGame && (
        <BlackjackButton color="blue" onClick={resetGame}>
          New Game
        </BlackjackButton>
      )}
    </div>
  );
};

export default Actions;
