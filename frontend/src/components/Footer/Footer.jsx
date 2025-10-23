import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="contenedor-footer">
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <div className="logoContainer">
                <img alt="AD" className="logoImg" src="/img/ad.ico" />
                Asociación Deportiva
              </div>
            </div>
            <p className="footer-text">
              Promovemos el deporte y la vida <br /> saludable desde 1985.
              Actividades para <br /> todas las edades.
            </p>
          </div>
          <div className="footer-col footer-nav">
            <h3 className="footer-heading">Secciones</h3>
            <ul className="footer-list">
              <li>Inicio</li> <li>Actividades</li> <li>Asociate</li>
              <li>Historia</li> <li>Contacto</li>
            </ul>
          </div>
          <div className="footer-col footer-contact">
            <h3 className="footer-heading">Contacto</h3>
            <address className="contacto-info">
              <div>Av. Siempreviva 742, CABA</div> <div>(011) 1234-5678</div>
              <div>hola@asodeportiva.com.ar</div>
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Asociación Deportiva — Todos los derechos reservados.
        </div>
      </footer>
    </>
  );
}

export default Footer;
