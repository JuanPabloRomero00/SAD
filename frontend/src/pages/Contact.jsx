import React from 'react'

function Contact() {
  return (
    <div className="contact-page" role="region">
      <section className="contact-card" aria-labelledby="contact-title">
        <h2 id="contact-title" className="contact-title">Contacto</h2>
        <p className="contact-description">
Podés visitar nuestra sede y hacer tus consultas en persona, o llamarnos de lunes a sábados de 08:30hs a 20:30hs. También podés escribirnos por correo electrónico y te responderemos a la brevedad.
</p>

        <div className="contact-list" role="list">
          <div className="contact-item" role="listitem">
            <span className="label">Dirección</span>
            <span className="value direccion">Av. Siempreviva 742, CABA</span>
          </div>

          <div className="contact-item" role="listitem">
            <span className="label">Teléfono</span>
            <a className="value link" href="#">(011) 1234-5678</a>
          </div>

          <div className="contact-item" role="listitem">
            <span className="label">Email</span>
            <a className="value link" href="#">
              hola@asodeportiva.com.ar
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact