import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

export default function GamesMenu() {
  const navigate = useNavigate();

  return (
    <div className="p-8" style={{ maxWidth: 720, margin: "2rem auto", textAlign: "center" }}>
      <h1 className="text-3xl pb-10">Selecciona un juego</h1>
      <div className="flex flex-col items-center justify-center gap-10">
        <Button type="submit" text="Carrera de caballos" navigate="/horse"></Button>
        <Button type="submit" text="Veintiuno" navigate="/21"></Button>
        <Button type="submit" text="Pokemon" navigate="/pokemon"></Button>
        <Button type="submit" text="Boton" navigate="/buttonGame"></Button>
      </div>
    </div>
  );
}