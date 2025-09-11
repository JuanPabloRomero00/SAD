import React from 'react'
import "./Header.css";

function Header() {
  return (
    <>
      <nav className='navbar'>
        <h1 className="logoContainer">
          <a className='logoLink' href="/">
            <img alt="AD" className="logoImg" src="/img/ad.ico" />
            Asociación Deportiva
          </a>
        </h1>
        <ul className='navList'>
          <li>Inicio</li>
          <li>Actividades</li>
          <li>Historia</li>
          <li>Contácto</li>
        </ul>
        <div className='authButtons'>
          <button className='loginButton'>
            Ingresar
          </button>
          <button className='signButton'>
            Asociate
          </button>
        </div>
      </nav>
    </>
  )
}

export default Header