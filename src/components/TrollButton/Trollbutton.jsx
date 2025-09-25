import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TrollButton = (props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const [isCaught, setIsCaught] = useState(false);
  const [message, setMessage] = useState('¡Intenta hacer clic en el botón!');
  const [redirecting, setRedirecting] = useState(false);
  const [escapesNeeded, setEscapesNeeded] = useState(0);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Inicializar al montar el componente
  useEffect(() => {
    randomizePosition();
    // Establecer un número aleatorio de escapes necesarios (entre 3 y 8)
    setEscapesNeeded(Math.floor(Math.random() * 6) + 3);
  }, []);

  const randomizePosition = () => {
    if (!containerRef.current || !buttonRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();
    
    // Usar toda la pantalla menos un margen de seguridad
    const maxX = container.width - button.width - 50;
    const maxY = container.height - button.height - 50;
    
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseEnter = () => {
    if (isCaught || redirecting) return;
    
    if (escapeCount < escapesNeeded) {
      setEscapeCount(prev => prev + 1);
      randomizePosition();
      setMessage(`¡Casi! Se escapó ${escapeCount + 1} de ${escapesNeeded} veces necesarias. ¡Sigue intentando!`);
    } else {
      // Después de escapar las veces necesarias, el botón se deja atrapar
      setIsCaught(true);
      setMessage(`¡Increíble! Finalmente lo atrapaste después de ${escapeCount} intentos. Redirigiendo...`);
      
      // Centrar el botón cuando es atrapado
      setPosition({ 
        x: window.innerWidth / 2 - 75, 
        y: window.innerHeight / 2 - 25 
      });
      
      // Iniciar redirección después de 2 segundos
      setRedirecting(true);
      setTimeout(() => {
        navigate('/graph');
      }, 2000);
    }
  };

  const handleClick = () => {
    if (isCaught && !redirecting) {
      // Redirigir inmediatamente si ya está atrapado
      setRedirecting(true);
      navigate('/graph');
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-screen h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 overflow-hidden " 
    >
      {/* Fondo con elementos decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl">🎯</div>
        <div className="absolute top-20 right-20 text-5xl">🏃</div>
        <div className="absolute bottom-32 left-1/4 text-4xl">😈</div>
        <div className="absolute bottom-20 right-1/3 text-6xl">⚡</div>
      </div>

      {/* Contenido principal centrado */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
        <div className="bg-black bg-opacity-50 rounded-2xl p-6 backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-white text-center mb-2">
            🎮 Botón Imposible
          </h1>
          <p className="text-gray-200 text-center mb-4 text-lg">
            ¿Tienes lo que se necesita para atraparlo?
          </p>
          
          <div className="bg-yellow-500 bg-opacity-20 border-l-4 border-yellow-400 p-4 rounded mb-4">
            <p className="text-yellow-100 font-medium text-center text-lg">
              {message}
            </p>
          </div>
          
          <div className="flex justify-between text-white text-sm mb-2">
            <span className="bg-blue-600 bg-opacity-50 px-3 py-1 rounded-full">
              Escapadas: {escapeCount}/{escapesNeeded}
            </span>
            <span className="bg-green-600 bg-opacity-50 px-3 py-1 rounded-full">
              Estado: {redirecting ? '🎉 Redirigiendo...' : isCaught ? '✅ Atrapado' : '🏃 Escapando'}
            </span>
          </div>
        </div>
      </div>

      {/* El botón troll */}
      <button
        ref={buttonRef}
        className={`absolute text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-2xl ${
          redirecting 
            ? 'bg-gradient-to-r from-green-400 to-blue-500 animate-pulse text-2xl' 
            : isCaught 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 scale-125 text-xl' 
              : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-lg'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isCaught ? 'scale(1.25)' : 'scale(1)',
          transition: redirecting ? 'all 0.5s' : 'left 0.4s, top 0.4s, transform 0.3s',
          minWidth: '150px'
        }}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        disabled={redirecting}
      >
        {redirecting ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin mr-2">⏳</span>
            Redirigiendo...
          </span>
        ) : isCaught ? (
          <span className="flex items-center justify-center">
            <span className="mr-2">🎉</span>
            ¡Me Atrapaste!
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <span className="mr-2">👻</span>
            ¡Atrápame!
          </span>
        )}
      </button>

      {/* Barra de progreso cuando está redirigiendo */}
      {redirecting && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-80">
          <div className="bg-black bg-opacity-50 rounded-full p-1">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full animate-pulse w-full"></div>
          </div>
          <p className="text-white text-center mt-2 text-sm">
            Preparando tu recompensa...
          </p>
        </div>
      )}

      {/* Instrucciones en la parte inferior */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-300 text-sm bg-black bg-opacity-30 px-4 py-2 rounded-full">
          💡 Pista: El botón se escapará {escapesNeeded} veces antes de dejarse atrapar
        </p>
      </div>
    </div>
  );
};

export default TrollButton;