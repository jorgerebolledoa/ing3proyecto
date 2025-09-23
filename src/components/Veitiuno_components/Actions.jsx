import React from "react";
import Button from "../Button/button";
export default function Actions({
  dealCardToPlayer,
  playerStand,
  resetGame,
  gameOver,
  newGame,
}) {
  return (
    <div className="flex justify-around gap-2 mt-4">
      {!newGame ? (
        <>
          <Button
            bg_color={"green"}
            onClick={dealCardToPlayer}
            disabled={gameOver}
          >
            Hit
          </Button>
          <Button bg_color={"red"} onClick={playerStand} className="ml-2">
            Stand
          </Button>
        </>
      ) : (
        <Button bg_color={"blue"} onClick={resetGame}>
          Deal
        </Button>
      )}
    </div>
  );
}

