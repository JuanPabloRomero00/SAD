import React from "react";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";

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
            <Link to={"/activities"} className="btn-primary">
              Ver actividades
            </Link>
            <Link to={"/signup"} className="btn-outline">
              Asociate ahora
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
