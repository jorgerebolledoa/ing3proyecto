import React, { useState, useEffect } from "react";
import { combinations } from "../../assets/CardDeck";
import Results from "./components/Results.jsx";
import Actions from "./components/Actions.jsx";
import Hands from "./components/Hands.jsx";
import { calculateHandValue } from "./utility/calculateHandValue";

function Game() {
  // TODO: Create game state
  const [gameDeck, setGameDeck] = useState(combinations);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState({ type: "", message: "" });
  const [newGame, setNewGame] = useState(false);
  const [score, setScore] = useState({ player: 0, dealer: 0 });

  // TODO: Get random card from deck
  const getRandomCardFromDeck = () => {
    const randomIndex = Math.floor(Math.random() * gameDeck.length);
    const card = gameDeck[randomIndex];
    const newDeck = gameDeck.filter((_, index) => index !== randomIndex);
    setGameDeck(newDeck);
    return card;
  };
  // TODO: Deal card to player
  const dealCardToPlayer = () => {
    const newHand = [...playerHand, getRandomCardFromDeck()];
    setPlayerHand(newHand);
    const playerValue = calculateHandValue(newHand);

    if (playerValue > 21) {
      handleGameOver({ type: "dealer", message: "Player busts! Dealer wins!" });
    } else if (playerValue === 21) {
      handleGameOver({ type: "player", message: "Player wins!" });
      setScore({ ...score, player: score.player + 1 });
    }
  };
  // TODO: Player stand
  const playerStand = () => {
    setGameOver(true);
    const newHand = [...dealerHand, getRandomCardFromDeck()];
    setDealerHand(newHand);

    const dealerValue = calculateHandValue(newHand);

    if (dealerValue > 21) {
      handleGameOver({ type: "player", message: "Dealer busts! Player wins!" });
      setScore({ ...score, player: score.player + 1 });
    }
  };
  // TODO: Reset game
  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameOver(false);
    setResult({ type: "", message: "" });
    setNewGame(false);
    setGameDeck(combinations);
  };
  // TODO: Handle game logic at Game start
  useEffect(() => {
    if (playerHand.length === 0 && dealerHand.length === 0) {
      setPlayerHand([getRandomCardFromDeck(), getRandomCardFromDeck()]);
      setDealerHand([getRandomCardFromDeck()]);
    }

    if (playerValue === 21) {
      handleGameOver({ type: "player", message: "Player wins!" });
    } else if (dealerValue === 21) {
      handleGameOver({ type: "dealer", message: "Dealer wins!" });
      setScore({ ...score, dealer: score.dealer + 1 });
    }

    if (gameOver && dealerHand.length <= 5) {
      switch (true) {
        case playerValue === 21:
          setResult({ type: "player", message: "Player wins!" });
          setScore({ ...score, player: score.player + 1 });
          break;
        case playerValue > 21:
          setResult({ type: "dealer", message: "Player busts! Dealer wins!" });
          setScore({ ...score, dealer: score.dealer + 1 });
          break;
        case dealerValue < playerValue:
          playerStand();
          break;
        case dealerValue === playerValue && dealerHand.length <= 5:
          setResult({ type: "", message: "Draw!" });
          setNewGame(true);
          break;
        case dealerValue > playerValue && dealerValue <= 21:
          setResult({ type: "dealer", message: "Dealer wins!" });
          setScore({ ...score, dealer: score.dealer + 1 });
          setNewGame(true);
          break;
        default:
          break;
      }
    }
  }, [playerHand, dealerHand, gameOver]);

  const handleGameOver = (result) => {
    setGameOver(true);
    setResult(result);
    setNewGame(true);
  };

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  return (
    <div className="bg-slate-900 container mx-auto p-4">
      <h1 className="text-4xl text-center mb-4">Blackjack</h1>

      {gameOver && <Results result={result} />}

      <Actions
        dealCardToPlayer={dealCardToPlayer}
        playerStand={playerStand}
        resetGame={resetGame}
        gameOver={gameOver}
        newGame={newGame}
      />
      <Hands
        playerHand={playerHand}
        dealerHand={dealerHand}
        playerValue={playerValue}
        dealerValue={dealerValue}
        score={score}
      />
    </div>
  );
}

export default Game;