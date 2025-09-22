import React from 'react'
import "./Header.css";
import { Link } from 'react-router-dom';

function Header() {
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
        <div className='authButtons'>
          <button className='loginButton'>
            <Link to="/login">
            Ingresar
            </Link>
            
          </button>
          <button className='signButton'>
            <Link to="/signup">
              Asociate
            </Link>
          </button>
        </div>
      </nav>
    </>
  )
}

export default Header