import React, { useState, useEffect, useRef } from "react";

const style = `
body {
  margin: 0;
  background-color: #000;
  color: #fff;
}
main {
  position: relative;
  width: 575px;
  background-image: url('https://res.cloudinary.com/dzynqn10l/image/upload/v1633196203/Msc/pokemon-bg_ig4uv3.jpg');
  background-size: 110%;
  background-repeat: no-repeat;
}
#pokemon-container { height: 355px; }
#answer { display: none; }
#bg-overlay {
  color: #fff;
  position: absolute;
  background-color: #dd1716;
  right: 25px;
  width: 170px;
  height: 170px;
  top: 60px;
  border-radius: 50%;
}
#text-overlay {
  position: absolute;
  right: 20px;
  top: 100px;
  background-color: #ffcb02;
  border: solid 7px #2c70ae;
  padding: 20px;
  min-width: 130px;
  font-family: 'Bangers', Arial, sans-serif;
  font-size: 36px;
  letter-spacing: 1.2px;
  color: #3ea2fe;
  text-shadow: 2px 2px #1d366c;
  border-radius: 20px;
  text-align: center;
}
#controls { position: relative; padding: 20px 40px; }
button {
  background: #fff;
  border: none;
  color: #3e7ae7;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 36px;
  border-radius: 8px;
  text-transform: uppercase;
  box-shadow: 0px 4px 10px 1px;
  cursor: pointer;
  transition: all .2s ease-out;
}
button:hover {
  box-shadow: 0px 4px 10px 4px;
  background-color: #fff6d1;
}
button.correct,
button.incorrect {
  color: #d9fcd9;
  box-shadow: none;
}
button.correct { background: #0dff0d; }
button.incorrect { background: #ea2e25; }
#play { position: absolute; top: -56px; left: 39px; }
#pokeball {
  width: 78px;
  margin: 144px 0 0 144px;
  position: absolute;
  visibility: hidden;
  animation: wiggle 1.35s infinite;
}
#pokemon-image {
  margin: 135px 0 0 140px;
  transform: scale(2.5);
  filter: brightness(0);
  transition: filter .5s ease-out;
  position: absolute;
  left: 0;
}
main.fetching #pokeball { visibility: visible; }
main.fetching #pokemon-image { visibility: hidden; display: none; }
main.fetching #choices { display: none; }
main.revealed #pokemon-image { filter: none; }
main.revealed #answer { display: block; }
#choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
}
@keyframes wiggle {
  0% { transform: rotate(0deg); }
  80% { transform: rotate(0deg); }
  85% { transform: rotate(6deg); }
  95% { transform: rotate(-6deg); }
  100% { transform: rotate(0deg); }
}
`;

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function getNumber(url) {
  const numberRegEx = /(\d+)\/$/;
  return (url.match(numberRegEx) || [])[1];
}

function getPokemonImage({ url }) {
  const number = getNumber(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
}

async function getPokeData() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const pokemon = await res.json();
  const randomPokemon = shuffle(pokemon.results);
  const pokemonChoices = randomPokemon.slice(0, 4);
  const [firstPokemon] = pokemonChoices;
  const image = getPokemonImage(firstPokemon);

  return {
    pokemonChoices: shuffle(pokemonChoices),
    correct: {
      image,
      name: firstPokemon.name,
    }
  };
}

export default function PokemonGame() {
  const [gameData, setGameData] = useState(null);
  const [mainClass, setMainClass] = useState("fetching");
  const [selected, setSelected] = useState(null);
  const [voice, setVoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D');
  const choicesRef = useRef();

  // Cargar voz femenina
  useEffect(() => {
    const loadVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      setVoice(voices[4] || voices[0]);
    };
    window.speechSynthesis.onvoiceschanged = loadVoice;
    loadVoice();
  }, []);

  // Mostrar silueta cuando hay datos
  useEffect(() => {
    if (gameData) {
      setMainClass("fetching");
      setImgSrc('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D');
      setSelected(null);
      setTimeout(() => {
        setMainClass("");
        setImgSrc(gameData.correct.image);
      }, 500);
    }
  }, [gameData]);

  // Hablar respuesta
  useEffect(() => {
    if (mainClass === "revealed" && gameData && voice) {
      const utterance = new window.SpeechSynthesisUtterance(gameData.correct.name);
      utterance.voice = voice;
      utterance.pitch = 0.9;
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }, [mainClass, gameData, voice]);

  const handlePlay = async () => {
    setLoading(true);
    const data = await getPokeData();
    setGameData(data);
    setLoading(false);
  };

  const handleChoice = (name, idx) => {
    setSelected(idx);
    if (name !== gameData.correct.name) {
      setTimeout(() => {
        handlePlay();
        setSelected(null); // Opcional: limpia la selección
      }, 3000);
    }
    // ...Aqui se podria enrutar al graficou
  };

  return (
    <>
      <style>{style}</style>
      <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet" />
      <main className={mainClass + (loading ? " fetching" : "")}>
        <div id="pokemon-container">
          <img
            id="pokeball"
            src="https://res.cloudinary.com/dzynqn10l/image/upload/v1633196610/Msc/pokeball_zeoqii.webp"
            style={{ visibility: loading ? "visible" : "hidden" }}
            alt="pokeball"
          />
          <img
            id="pokemon-image"
            src={imgSrc}
            style={{
              visibility: mainClass === "fetching" ? "hidden" : "visible",
              filter: mainClass === "revealed" ? "none" : "brightness(0)"
            }}
            alt="pokemon"
          />
        </div>

        <div id="answer" style={{ display: mainClass === "revealed" ? "block" : "none" }}>
          <div id="bg-overlay"></div>
          <div id="text-overlay">{gameData && mainClass === "revealed" ? `${gameData.correct.name}!` : ""}</div>
        </div>

        <section id="controls">
          <button id="play" onClick={handlePlay} disabled={loading}>
            Play
          </button>
          <div id="choices" ref={choicesRef}>
            {gameData &&
              gameData.pokemonChoices.map((poke, idx) => {
                let btnClass = "";
                if (selected !== null) {
                  btnClass =
                    poke.name === gameData.correct.name
                      ? "correct"
                      : idx === selected
                      ? "incorrect"
                      : "";
                }
                return (
                  <button
                    key={poke.name}
                    data-name={poke.name}
                    className={btnClass}
                    onClick={() => handleChoice(poke.name, idx)}
                    disabled={selected !== null}
                  >
                    {poke.name}
                  </button>
                );
              })}
          </div>
        </section>
      </main>
    </>
  );
}