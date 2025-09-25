import React from "react";
import { useNavigate } from "react-router-dom";

export default function GamesMenu() {
  const navigate = useNavigate();

  return (
    <div  style={{ maxWidth: 720, margin: "2rem auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: 16 }}>Selecciona un juego</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* <button onClick={() => navigate("/")} style={{ padding: 12 }}>Home</button> */}
        <button onClick={() => navigate("/horse")} style={{ padding: 12 }}>Carrera de caballos</button>
        <button onClick={() => navigate("/21")} style={{ padding: 12 }}>Veintiuno</button>
        {/* <button onClick={() => navigate("/graph")} style={{ padding: 12 }}>Graph</button> */}
      </div>
    </div>
  );
}
// Hay que cambiar luego las rutas para el de pokemon y el boton loco