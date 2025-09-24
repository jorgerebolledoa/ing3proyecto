import React, { useState, useRef, useEffect } from 'react';

const TrollButton = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const [isCaught, setIsCaught] = useState(false);
  const [message, setMessage] = useState('¡Intenta hacer clic en el botón!');
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  // Inicializar posición aleatoria al montar el componente
  useEffect(() => {
    randomizePosition();
  }, []);

  const randomizePosition = () => {
    if (!containerRef.current || !buttonRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseEnter = () => {
    if (isCaught) return;
    
    // El botón se escapa un número aleatorio de veces (entre 5 y 10)
    const escapesNeeded = Math.floor(Math.random() * 10) + 5;
    
    if (escapeCount < escapesNeeded) {
      setEscapeCount(prev => prev + 1);
      randomizePosition();
      setMessage(`¡Casi! Se escapó ${escapeCount + 1} vez(es)`);
    } else {
      // Después de escapar varias veces, el botón se deja atrapar
      setIsCaught(true);
      setMessage('¡Finalmente lo atrapaste! ¡Eres un genio!');
    }
  };

  const handleClick = () => {
    if (isCaught) {
      // Reiniciar el juego
      setEscapeCount(0);
      setIsCaught(false);
      setMessage('¡Intenta hacer clic en el botón!');
      randomizePosition();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Botón Troll</h1>
        <p className="text-gray-600 mb-6">¿Podrás hacer clic en el botón?</p>
        
        <div 
          ref={containerRef}
          className="relative bg-gray-100 rounded-xl h-64 w-full mb-6 overflow-hidden border-2 border-dashed border-gray-300"
        >
          <button
            ref={buttonRef}
            className={`absolute text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ${
              isCaught 
                ? 'bg-green-500 hover:bg-green-600 scale-110' 
                : 'bg-red-500 hover:bg-red-600'
            }`}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: isCaught ? 'scale(1.1)' : 'scale(1)',
              transition: 'left 0.3s, top 0.3s, transform 0.3s'
            }}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            {isCaught ? '¡Me Atrapaste!' : '¡Atrápame!'}
          </button>
        </div>
        
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded mb-4">
          <p className="text-yellow-700 font-medium">{message}</p>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Escapadas: {escapeCount}</span>
          <span>Estado: {isCaught ? 'Atrapado' : 'Escapando'}</span>
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          <p>Pista: El botón se escapará entre 5 y 10 veces antes de dejarse atrapar</p>
        </div>
      </div>
    </div>
  );
};

export default TrollButton;