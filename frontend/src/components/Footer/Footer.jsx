import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h4>Club Atlético Chacarita Juniors</h4>
        <p>Dirección: Gutiérrez 351, B1650 Villa Maipú, Provincia de Buenos Aires</p>
        <div className="footer-links">
          <a href="https://www.facebook.com/chacaoficial/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
            Facebook
          </a>
          <a href="https://www.instagram.com/chacaoficial/?hl=es" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
            Instagram
          </a>
          <a href="https://www.chacaritajuniors.com.ar/" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe"></i>
            Sitio Web
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
