"use client"

import React, { useEffect, useRef, useState } from "react"

type Horse = {
  name: string
  pos: number
  finished: boolean
  rank: number | null
}

const TRACK_LENGTH = 60
const MAX_LANES = 9
const DEFAULT_LANES = 5
const TICK_MS = 200

export default function HorseRacing(): JSX.Element {
  const [lanes, setLanes] = useState<number>(DEFAULT_LANES)
  const [horses, setHorses] = useState<Horse[]>(() =>
    Array(DEFAULT_LANES)
      .fill(0)
      .map((_, i) => ({ name: `Caballo ${i + 1}`, pos: 0, finished: false, rank: null })),
  )
  const [running, setRunning] = useState(false)
  const [nextRank, setNextRank] = useState(1)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    // Ajustar arrays cuando cambia el número de carriles
    setHorses(
      Array(lanes)
        .fill(0)
        .map((_, i) => ({ name: `Caballo ${i + 1}`, pos: 0, finished: false, rank: null })),
    )
    setRunning(false)
    setNextRank(1)
  }, [lanes])

  useEffect(() => {
    if (!running) {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = window.setInterval(() => {
      setHorses((prev: Horse[]) => {
        const next = prev.map((h: Horse) => ({ ...h }))
        let rankCursor = nextRank

        for (let i = 0; i < next.length; i++) {
          if (next[i].finished) continue

          // movimiento basado en probabilidad + pequeño sprint aleatorio
          const roll = Math.random()
          let step = 0
          if (roll < 0.12) step = 2
          else if (roll < 0.6) step = 1
          else step = 0

          // 5% probabilidad de sprint extra
          if (Math.random() < 0.05) step += 1

          next[i].pos = Math.min(TRACK_LENGTH, next[i].pos + step)

          if (next[i].pos >= TRACK_LENGTH && !next[i].finished) {
            next[i].finished = true
            next[i].rank = rankCursor++
          }
        }

        // si todos terminaron paramos la carrera
        if (next.every((h: Horse) => h.finished)) {
          setRunning(false)
        }

        // actualizar cursor si cambió
        if (rankCursor !== nextRank) setNextRank(rankCursor)

        return next
      })
    }, TICK_MS)

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const startRace = () => {
  setHorses((prev: Horse[]) => prev.map((h: Horse) => ({ ...h, pos: 0, finished: false, rank: null })))
    setNextRank(1)
    setRunning(true)
  }

  const pauseRace = () => setRunning(false)

  const resetRace = () => {
    setRunning(false)
  setHorses((prev: Horse[]) => prev.map((h: Horse, i: number) => ({ ...h, pos: 0, finished: false, rank: null, name: `Caballo ${i + 1}` })))
    setNextRank(1)
  }

  return (
    <div style={{ maxWidth: 900, margin: "1rem auto", fontFamily: "Inter, system-ui, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Carrera de Caballos</h1>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 12 }}>
        <label>
          Participantes:
          <select value={lanes} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLanes(Math.max(1, Math.min(MAX_LANES, Number(e.target.value))))} disabled={running} style={{ marginLeft: 6 }}>
            {Array.from({ length: MAX_LANES }).map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>

        {!running ? (
          <button onClick={startRace}>Iniciar</button>
        ) : (
          <button onClick={pauseRace}>Pausar</button>
        )}
        <button onClick={resetRace}>Reiniciar</button>
      </div>

      <div style={{ fontFamily: "monospace", lineHeight: 1.6 }}>
        {horses.map((h, i) => {
          const pos = Math.floor(h.pos)
          const left = "·".repeat(Math.max(0, Math.min(pos, TRACK_LENGTH)))
          const right = "·".repeat(Math.max(0, TRACK_LENGTH - pos))
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 120, textAlign: "right", fontWeight: h.finished ? 700 : 500 }}>{h.name}</div>
              <div style={{ whiteSpace: "pre", background: "#fafafa", padding: "6px 8px", borderRadius: 6, flex: 1 }}>
                {left}
                <span style={{ fontWeight: 700 }}>{"🏇"}</span>
                {right}
              </div>
              <div style={{ width: 80, textAlign: "left" }}>{h.finished ? `${h.rank}º` : "-"}</div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Clasificación parcial:</strong>
        <div>
          {horses
            .filter((x) => x.rank !== null)
            .sort((a, b) => (a.rank || 0) - (b.rank || 0))
            .map((r) => `${r.rank}º ${r.name}`)
            .join(" • ") || " — "}
        </div>
      </div>
    </div>
  )
}
