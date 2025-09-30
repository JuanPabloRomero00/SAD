import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className='navbar'>
        <h1 className="logoContainer">
          <Link className='logoLink' to={"/"}>
            <img alt="AD" className="logoImg" src="/img/ad.ico" />
            Asociación Deportiva
          </Link>
        </h1>
        <ul className='navList'>
          <li><Link to={"/"}>Inicio </Link></li>
          <li><Link to={"/activities"}> Actividades</Link></li>
          <li>Historia</li>
          <li>Contácto</li>
        </ul>

        <div className="authButtons">
          {user ? (
            <>
              <Link className="profileButton" to="/profile">
                Perfil
              </Link>
              <button className="logoutButton" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link className="loginButton" to="/login">
                Ingresar
              </Link>
              <Link className="signButton" to="/signup">
                Asociate
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;