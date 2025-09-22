import React from 'react'

function Profile() {

  const reservas = [
     {nombre: "Entrenamiento Funcional",
      fecha: "24 de septiembre de 2025 - 16:00hs - Sede   Central",
      estado: "Confirmado"
     },
     {
      nombre: "Yoga principiante",
      fecha: "26 de septiembre de 2025 - 11:00hs - Sede Central",
      estado: "Pendiente"
     },
     {
      nombre: "Basquet Formativo",
      fecha: "Martes / Jueves - 18:00-20:0",
      estado: "Confirmado"
     }
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div id="avatar">NN</div>
          <h2>Nombre Apellido</h2>
          <p className='socio'>Socio N-1234567</p>


          <div className="profile-info">
            <div><span>DNI</span><span>12345678</span></div>
            <div><span>Plan</span><span>Standard</span></div>
            <div><span>Vencimiento</span><span>28 de Septiembre de 2026</span></div>
            <div><span>Telefono</span><span>1155551234</span></div>
            <div><span>Email</span><span>nombreapellido@gmail.com</span></div>
          </div>

          <button className="btn-info btn-edit">Editar perfil</button>
          <button className="btn-info btn-primary">Cambiar contraseña</button>
          <button className="btn-info btn-link">Descargar carnet digital</button>

        </div>


        <div className="reservas">
          <h3>Tus proximas reservas</h3>
          <p>Vas a ver las clases y turnos que reservaste</p>
          {reservas.map((reserva, i) => (
            <div key={i} className="reserva">
              <div>
                <strong>{reserva.nombre}</strong>
                <p>{reserva.fecha}</p>
              </div>
              <span className={reserva.estado === "Confirmado" ? "estado-confirmado" : "estado-pendiente"}>
                {reserva.estado}
              </span>
            </div>
          ))}
        </div>



        <div className="membresia">
          <h3>Estado de tu membresia</h3>
          <p>Tu proxima renovacion vence el 28 de septiembre de 2025</p>
          <button className='btn-edit'>
            Ver historial de pagos
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile