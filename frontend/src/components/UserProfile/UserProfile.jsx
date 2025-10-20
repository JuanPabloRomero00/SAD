
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAuth } from "../../context/useAuth";
import UserActivities from "../UserActivities/UserActivities";
const UserProfile = () => {
  const { user } = useAuth();
  const [usuario, setUsuario] = useState({
    nombre: user.name,
    dni: user.dni,
    plan: "Standar",
    telefono: user.phone,
    email: user.email
  });
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", newPassword: "", confirm: "" });
  const [showPayments, setShowPayments] = useState(false);

  const pagos = [
    { fechaPago: "01/08/2025", vencimiento: "31/08/2025", monto: "$5000", plan: "Standard" },
    { fechaPago: "01/07/2025", vencimiento: "31/07/2025", monto: "$5000", plan: "Standard" },
    { fechaPago: "01/06/2025", vencimiento: "30/06/2025", monto: "$5000", plan: "Standard" }
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

  const [profileSection, setProfileSection] = useState("profile");

  const changeSection = (section) => {
    setProfileSection(section)
  }

  return (
    <>
      <div className="profile-page">
        <aside className="side-menu">
          <ul className="profile-list-menu">
            <li onClick={() => changeSection("profile")} className={profileSection === "profile" ? "active" : ""}>Perfil</li>
            <li onClick={() => changeSection("profile-activities")} className={profileSection === "profile-activities" ? "active" : ""}>Actividades</li>
            <li onClick={() => changeSection("user-plan")} className={profileSection === "user-plan" ? "active" : ""}>Plan</li>
          </ul>
        </aside>
        <div className="profile-container">
          {profileSection == "profile" ? (
            <div className="profile-card">
              <div className="avatar">NN</div>
              <h2>{usuario.nombre}</h2>
              <p className="socio">Socio N-1234567</p>
              <div className="profile-info">
                <div>
                  <span>DNI</span>
                  {editMode ? (<input type="text" name="dni" value={usuario.dni} onChange={handleChange} className="formInput" />) : (<span>{usuario.dni}</span>)}
                </div>
                <div>
                  <span>Plan</span>
                  {editMode ? (<input type="text" name="plan" value={usuario.plan} onChange={handleChange} className="formInput" />) : (<span>{usuario.plan}</span>)}
                </div>
                <div>
                  <span>Vencimiento</span>
                  <span>{usuario.vencimiento}</span>
                </div>
                <div>
                  <span>Telefono</span>
                  {editMode ? (<input type="text" name="telefono" value={usuario.telefono} onChange={handleChange} className="formInput" />) : (<span>{usuario.telefono}</span>)}
                </div>
                <div>
                  <span>Email</span>
                  {editMode ? (<input type="email" name="email" value={usuario.email} onChange={handleChange} className="formInput" />) : (<span>{usuario.email}</span>)}
                </div>
              </div>
              <Box sx={{ mt: 2 }}>
                {editMode ? (
                  <>
                    <button className="btn-info btn-primary" onClick={handleSave}>Guardar</button>
                    <button className="btn-info btn-cancel" onClick={() => setEditMode(false)}>Cancelar</button>
                  </>
                ) : (
                  <button className="btn-info btn-edit" onClick={() => setEditMode(true)}>Editar perfil</button>
                )}
                {!changePasswordMode && (
                  <button className="btn-info btn-primary btn-pass" onClick={() => setChangePasswordMode(true)}>Cambiar contraseña</button>
                )}
                {changePasswordMode && (
                  <div className="change-password-form" style={{ marginTop: "10px" }}>
                    <div className="password-field">
                      <span>Contraseña actual</span>
                      <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} className="formInput" />
                    </div>
                    <div className="password-field">
                      <span>Nueva contraseña</span>
                      <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} className="formInput" />
                    </div>
                    <div className="password-field">
                      <span>Confirmar nueva contraseña</span>
                      <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} className="formInput" />
                    </div>
                    <Box sx={{ mt: 1 }}>
                      <button className="btn-info btn-primary" onClick={handleSavePassword}>Guardar</button>
                      <button className="btn-info btn-cancel" onClick={() => setChangePasswordMode(false)}>Cancelar</button>
                    </Box>
                  </div>
                )}
                <button className="btn-info btn-link">Descargar carnet digital</button>
              </Box>
            </div>
          ) : (profileSection == "profile-activities") ? (
            <div className="reservas">
              <UserActivities />
            </div>
          ) : (
            <div className="membresia">
              <h3>Estado de tu membresía</h3>
              <p>Tu próxima renovación vence el 28 de septiembre de 2025</p>
              <button className="btn-edit" onClick={() => setShowPayments(!showPayments)}>Ver historial de pagos</button>
              {showPayments && (
                <div className="historial-pagos" style={{ marginTop: "10px" }}>
                  {pagos.map((pago, index) => (
                    <div key={index} className="pago-item" style={{ borderBottom: "1px solid #eee", padding: "5px 0" }}>
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
          )}
        </div>
      </div>
    </>
  );
};
export default UserProfile;
