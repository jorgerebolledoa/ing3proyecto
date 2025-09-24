import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HorseRace.css";

const TRACK_LENGTH = 40;
const DEFAULT_HORSES = 5;
const TICK_MS = 200;

function HorseRace({ initialHorses = DEFAULT_HORSES }) {
  const [numHorses, setNumHorses] = useState(initialHorses);
  const [positions, setPositions] = useState(() => Array(initialHorses).fill(0));
  const [finished, setFinished] = useState(() => Array(initialHorses).fill(false));
  const [ranks, setRanks] = useState(() => Array(initialHorses).fill(null));
  const [running, setRunning] = useState(false);
  const [nextRank, setNextRank] = useState(1);
  const timerRef = useRef(null);
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);
  // refs to hold the mutable race state to avoid stale closures inside the interval
  const positionsRef = useRef(Array(initialHorses).fill(0));
  const finishedRef = useRef(Array(initialHorses).fill(false));
  const ranksRef = useRef(Array(initialHorses).fill(null));
  const nextRankRef = useRef(1);
  const navigate = useNavigate();

  useEffect(() => {
    // reset arrays when number of horses changes
    const zeros = Array(numHorses).fill(0);
    const falses = Array(numHorses).fill(false);
    const nulls = Array(numHorses).fill(null);
    // update refs
    positionsRef.current = zeros.slice();
    finishedRef.current = falses.slice();
    ranksRef.current = nulls.slice();
    nextRankRef.current = 1;
    // update states for render
    setPositions(zeros);
    setFinished(falses);
    setRanks(nulls);
    setNextRank(1);
    setRunning(false);
    setResultMessage(null);
  }, [numHorses]);

  useEffect(() => {
    if (!running) {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      // work with refs to avoid stale closure issues
      const next = [...positionsRef.current];
      const nextFinished = [...finishedRef.current];
      const nextRanks = [...ranksRef.current];
      let rankCursor = nextRankRef.current;

      for (let i = 0; i < numHorses; i++) {
        if (nextFinished[i]) continue;
        const r = Math.random();
        const step = r < 0.1 ? 2 + Math.floor(Math.random() * 2) : r < 0.6 ? 1 : 0;
        next[i] = Math.min(TRACK_LENGTH, next[i] + step);

        if (next[i] >= TRACK_LENGTH && !nextFinished[i]) {
          nextFinished[i] = true;
          if (nextRanks[i] === null) nextRanks[i] = rankCursor++;
        }
      }

      // persist back to refs
      positionsRef.current = next;
      finishedRef.current = nextFinished;
      ranksRef.current = nextRanks;
      nextRankRef.current = rankCursor;

      // push to state to re-render
      setPositions(next);
      setFinished(nextFinished);
      setRanks(nextRanks);
      setNextRank(rankCursor);

      if (nextFinished.every(Boolean)) {
        const winnerIndex = nextRanks.findIndex((r) => r === 1);
        if (winnerIndex >= 0) {
          if (selectedHorse !== null) {
            if (selectedHorse === winnerIndex) setResultMessage("¡Ganaste! Elegiste al ganador.");
            else setResultMessage(`Perdiste. Ganador: Caballo ${winnerIndex + 1}`);
          } else {
            setResultMessage(`Ganador: Caballo ${winnerIndex + 1}`);
          }
          // redirigir a /graph después de un pequeño delay
          setTimeout(() => navigate("/graph"), 1500);
        } else {
          setResultMessage("Carrera terminada.");
          setTimeout(() => navigate("/graph"), 1500);
        }
        setRunning(false);
      }
    }, TICK_MS);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // We intentionally include finished/ranks/nextRank/selectedHorse so the interval logic sees latest values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, numHorses, nextRank, finished, ranks, selectedHorse]);

  const start = () => {
    const zeros = Array(numHorses).fill(0);
    const falses = Array(numHorses).fill(false);
    const nulls = Array(numHorses).fill(null);
    // init refs
    positionsRef.current = zeros.slice();
    finishedRef.current = falses.slice();
    ranksRef.current = nulls.slice();
    nextRankRef.current = 1;
    // init states
    setPositions(zeros);
    setFinished(falses);
    setRanks(nulls);
    setNextRank(1);
    setResultMessage(null);
    setRunning(true);
  };

  const stop = () => setRunning(false);

  const reset = () => {
    const zeros = Array(numHorses).fill(0);
    const falses = Array(numHorses).fill(false);
    const nulls = Array(numHorses).fill(null);
    setRunning(false);
    positionsRef.current = zeros.slice();
    finishedRef.current = falses.slice();
    ranksRef.current = nulls.slice();
    nextRankRef.current = 1;
    setPositions(zeros);
    setFinished(falses);
    setRanks(nulls);
    setNextRank(1);
    setResultMessage(null);
  };

  return (
    <div style={{ maxWidth: 900, margin: "1rem auto", fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Carrera de Caballos</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
        <label>
          Participantes:
          <select
            value={numHorses}
            onChange={(e) => setNumHorses(Math.max(1, Math.min(9, Number(e.target.value))))}
            disabled={running}
            style={{ marginLeft: 6 }}
          >
            {[...Array(9)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 12 }}>
          Tu apuesta:
          <select value={selectedHorse ?? ""} onChange={(e) => setSelectedHorse(e.target.value === "" ? null : Number(e.target.value))} disabled={running} style={{ marginLeft: 6 }}>
            <option value="">(elige)</option>
            {Array.from({ length: numHorses }).map((_, i) => (
              <option key={i} value={i}>{`Caballo ${i + 1}`}</option>
            ))}
          </select>
        </label>

        {!running && <button onClick={start}>Iniciar</button>}
        {running && <button onClick={stop}>Pausar</button>}
        <button onClick={reset}>Reiniciar</button>
      </div>

      <div className="track">
        {Array.from({ length: numHorses }).map((_, i) => {
          const pos = Math.floor(positions[i] ?? 0);
          const left = "·".repeat(Math.max(0, Math.min(pos, TRACK_LENGTH)));
          const right = "·".repeat(Math.max(0, TRACK_LENGTH - pos));
          const finishedLabel = finished[i] ? ` - ${ranks[i]}º` : "";
          const name = `Caballo ${i + 1}`;
          const rowClass = `horse-row ${selectedHorse === i ? "selected" : ""} ${ranks[i] === 1 ? "winner" : ""}`;
          return (
            <div key={i} className={rowClass}>
              <div className={`horse-name ${finished[i] ? "finished" : ""}`}>{name}</div>
              <div className="track-box">
                {left}
                <span className="horse-emoji">🏇</span>
                {right}
              </div>
              <div style={{ width: 60, textAlign: "left" }}>{finishedLabel}</div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Resultados parciales:</strong>
        <div>
          {ranks.map((r, idx) => (r ? `${r}º: Caballo ${idx + 1}` : null)).filter(Boolean).join(" • ") || " — "}
        </div>
        {resultMessage && (
          <div style={{ marginTop: 8, padding: 8, background: "#f3f4f6", borderRadius: 6 }}>
            <strong>{resultMessage}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default HorseRace;
