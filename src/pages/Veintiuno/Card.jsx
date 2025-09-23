import React from "react";

const Card = ({ card }) => {
  // Si no hay carta, mostrar el reverso
  if (!card) {
    return (
      <div className="w-20 h-28 bg-blue-800 border-2 border-white rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
        ?
      </div>
    );
  }

  // Determinar el color basado en el palo
  const isRed = card.suit === '♥' || card.suit === '♦';
  const textColor = isRed ? 'text-red-600' : 'text-black';

  return (
    <div className="w-20 h-28 bg-white border-2 border-gray-300 rounded-lg flex flex-col items-center justify-between p-2 shadow-lg">
      {/* Valor en la esquina superior izquierda */}
      <div className={`text-sm font-bold ${textColor} self-start`}>
        {card.rank}
      </div>
      
      {/* Palo en el centro */}
      <div className={`text-3xl ${textColor}`}>
        {card.suit}
      </div>
      
      {/* Valor en la esquina inferior derecha (rotado) */}
      <div className={`text-sm font-bold ${textColor} self-end transform rotate-180`}>
        {card.rank}
      </div>
    </div>
  );
};

export default Card;
