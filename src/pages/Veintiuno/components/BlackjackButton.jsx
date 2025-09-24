import React from "react";
import "../Blackjack.css";

const BlackjackButton = ({ disabled, color = "blue", onClick, children }) => {
  const colorClass = `blackjack-button blackjack-button-${color}`;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={colorClass}
    >
      {children}
    </button>
  );
};

export default BlackjackButton;
