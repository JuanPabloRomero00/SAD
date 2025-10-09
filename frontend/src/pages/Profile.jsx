import React, { useState } from "react";
import { Box } from "@mui/material";
import { useAuth } from "../context/useAuth";

const Profile = () => {
  const { user } = useAuth();

  const [usuario, setUsuario] = useState({
    nombre: user.name,
    dni: user.dni,
    // plan: "Standard",
    // vencimiento: "28 de Septiembre de 2026",
    // telefono: "1155551234",
    // email: "nombreapellido@gmail.com",
  });

  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [showPayments, setShowPayments] = useState(false);

  const reservas = [
    {
      nombre: "Entrenamiento Funcional",
      fecha: "24 de septiembre de 2025 - 16:00hs - Sede Central",
      estado: "Confirmado",
    },
    {
      nombre: "Yoga Principiante",
      fecha: "26 de septiembre de 2025 - 11:00hs - Sede Central",
      estado: "Pendiente",
    },
    {
      nombre: "Basquet Formativo",
      fecha: "Martes / Jueves - 18:00-20:00",
      estado: "Confirmado",
    },
  ];

  const pagos = [
    {
      fechaPago: "01/08/2025",
      vencimiento: "31/08/2025",
      monto: "$5000",
      plan: "Standard",
    },
    {
      fechaPago: "01/07/2025",
      vencimiento: "31/07/2025",
      monto: "$5000",
      plan: "Standard",
    },
    {
      fechaPago: "01/06/2025",
      vencimiento: "30/06/2025",
      monto: "$5000",
      plan: "Standard",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSave = () => {
    setEditMode(false);
    console.log("Datos guardados:", usuario);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSavePassword = () => {
    if (passwords.newPassword !== passwords.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Contraseña cambiada:", passwords);
    setChangePasswordMode(false);
    setPasswords({ current: "", newPassword: "", confirm: "" });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="avatar">NN</div>
          <h2>{usuario.nombre}</h2>
          <p className="socio">Socio N-1234567</p>

          <div className="profile-info">
            <div>
              <span>DNI</span>
              {editMode ? (
                <input
                  type="text"
                  name="dni"
                  value={usuario.dni}
                  onChange={handleChange}
                />
              ) : (
                <span>{usuario.dni}</span>
              )}
            </div>
            <div>
              <span>Plan</span>
              {editMode ? (
                <input
                  type="text"
                  name="plan"
                  value={usuario.plan}
                  onChange={handleChange}
                />
              ) : (
                <span>{usuario.plan}</span>
              )}
            </div>
            <div>
              <span>Vencimiento</span>
              {editMode ? (
                <input
                  type="text"
                  name="vencimiento"
                  value={usuario.vencimiento}
                  onChange={handleChange}
                />
              ) : (
                <span>{usuario.vencimiento}</span>
              )}
            </div>
            <div>
              <span>Telefono</span>
              {editMode ? (
                <input
                  type="text"
                  name="telefono"
                  value={usuario.telefono}
                  onChange={handleChange}
                />
              ) : (
                <span>{usuario.telefono}</span>
              )}
            </div>
            <div>
              <span>Email</span>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={usuario.email}
                  onChange={handleChange}
                />
              ) : (
                <span>{usuario.email}</span>
              )}
            </div>
          </div>

          <Box sx={{ mt: 2 }}>
            {editMode ? (
              <>
                <button className="btn-info btn-primary" onClick={handleSave}>
                  Guardar
                </button>
                <button
                  className="btn-info btn-link"
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                className="btn-info btn-edit"
                onClick={() => setEditMode(true)}
              >
                Editar perfil
              </button>
            )}

            {!changePasswordMode && (
              <button
                className="btn-info btn-primary btn-pass"
                onClick={() => setChangePasswordMode(true)}
              >
                Cambiar contraseña
              </button>
            )}

            {changePasswordMode && (
              <div
                className="change-password-form"
                style={{ marginTop: "10px" }}
              >
                <div>
                  <span>Contraseña actual</span>
                  <input
                    type="password"
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <span>Nueva contraseña</span>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <span>Confirmar nueva contraseña</span>
                  <input
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                  />
                </div>
                <Box sx={{ mt: 1 }}>
                  <button
                    className="btn-info btn-primary"
                    onClick={handleSavePassword}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn-info btn-link"
                    onClick={() => setChangePasswordMode(false)}
                  >
                    Cancelar
                  </button>
                </Box>
              </div>
            )}

            <button className="btn-info btn-link">
              Descargar carnet digital
            </button>
          </Box>
        </div>

        <div className="reservas">
          <h3>Tus próximas reservas</h3>
          <p>Vas a ver las clases y turnos que reservaste</p>
          {reservas.map((reserva, i) => (
            <div key={i} className="reserva">
              <div>
                <strong>{reserva.nombre}</strong>
                <p>{reserva.fecha}</p>
              </div>
              <span
                className={
                  reserva.estado === "Confirmado"
                    ? "estado-confirmado"
                    : "estado-pendiente"
                }
              >
                {reserva.estado}
              </span>
            </div>
          ))}
        </div>

        <div className="membresia">
          <h3>Estado de tu membresía</h3>
          <p>Tu próxima renovación vence el 28 de septiembre de 2025</p>
          <button
            className="btn-edit"
            onClick={() => setShowPayments(!showPayments)}
          >
            Ver historial de pagos
          </button>

          {showPayments && (
            <div className="historial-pagos" style={{ marginTop: "10px" }}>
              {pagos.map((pago, index) => (
                <div
                  key={index}
                  className="pago-item"
                  style={{ borderBottom: "1px solid #eee", padding: "5px 0" }}
                >
                  <strong>Pago {index + 1}</strong>
                  <p>Fecha de pago: {pago.fechaPago}</p>
                  <p>Vencimiento: {pago.vencimiento}</p>
                  <p>Monto: {pago.monto}</p>
                  <p>Plan: {pago.plan}</p>
                </div>
              ))}
            </div>
          )}

          <button className="btn-edit btn-delete">Darse de baja</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
