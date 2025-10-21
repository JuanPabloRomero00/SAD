import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Footer from "../components/Footer/Footer";

function Home() {
  const { user } = useAuth();

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
            {!user ? (<Link to={"/signup"} className="btn-outline">
              Asociate ahora
            </Link>) : (<Link to={"/profile"} className="btn-outline">
              Ver perfil
            </Link>)}
          </div>
        </div>
      </div>
      <footer className="footerContainer">
        <Footer></Footer>
      </footer>
    </>
  );
}

export default Home;
