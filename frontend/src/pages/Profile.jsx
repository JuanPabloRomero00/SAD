
import React, { useState } from "react";
import { Box } from "@mui/material";
import { useAuth } from "../context/useAuth";
import UserProfile from "../components/UserProfile/UserProfile";
import AdminProfile from "../components/AdminProfile/AdminProfile";
const Profile = () => {
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
  const reservas = [
    { nombre: "Entrenamiento Funcional", fecha: "24 de septiembre de 2025 - 16:00hs - Sede Central", estado: "Confirmado" },
    { nombre: "Yoga Principiante", fecha: "26 de septiembre de 2025 - 11:00hs - Sede Central", estado: "Pendiente" },
    { nombre: "Basquet Formativo", fecha: "Martes / Jueves - 18:00-20:00", estado: "Confirmado" }
  ];
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
  return (
    <>
      {user.role === "user" ? (<><UserProfile /></>) : (<><AdminProfile /></>)}
    </>
  );
};
export default Profile;
