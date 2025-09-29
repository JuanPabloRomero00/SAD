import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // redirige a inicio o donde quieras
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
            <button className="logoutButton" onClick={handleLogout}>
              Cerrar Sesión
            </button>
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