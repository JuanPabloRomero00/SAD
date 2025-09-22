import React from "react";
import Header from "../components/Header/Header";

function Home() {
  return (
    <>
      <div className="home-section">
        <div className="home-content">
          <h2>Deporte, comunidad y bienestar</h2>
          <h2 className="home-title-green">en un mismo club.</h2>

          <p>Descubrí actividades para todas las edades y niveles.</p>
          <p>Asociate online y empezá hoy a entrenar con nosotros.</p>

          <div className="home-buttons">
            <button className="btn-primary">Ver actividades</button>
            <button className="btn-outline">Asociate ahora</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
