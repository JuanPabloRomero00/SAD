import React, { useEffect, useState } from 'react';
//import { useAuth } from '../../context/useAuth';
import userService from '../../services/userService';
import UserReport from '../UserReport/UserReport.jsx';

function AdminProfile() {
  //const { user } = useAuth;

  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const listaUsuarios = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response);
        console.log("Datos recibidos:", response);
      } catch (error) {
        console.log(error);
      }
    }
    listaUsuarios();
  }, []);

  return (
    <div className="profile-page">
      <aside className="side-menu side-menu-admin">
        <h3>Usuarios</h3>
        <ul className="profile-user-list">
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => setSelectedUser(user)}
              style={{ cursor: 'pointer' }}
              className={selectedUser?._id === user._id ? 'selected' : ''}
            >
              {user.name} - {user.dni} - {user.plan}
            </li>
          ))}
        </ul>

        <hr />

        <ul className="profile-list-menu">
          <li>Perfil</li>
          <li>Actividades</li>
          <li>Historial de Pagos</li>
          <li>Editar Perfil</li>
          <li>Eliminar Usuario</li>
          <UserReport users={users} />
        </ul>
      </aside>

      <div className="profile-container profile-admin-container">
        {selectedUser ? (
          <div className="profile-card profile-admin-card">
            <div className="avatar" id="avatar">
              {selectedUser.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div>
            <h2>{selectedUser.name}</h2>
            <p className="id-admin">ID: {selectedUser._id}</p>

            <h2>Información de Perfil</h2>
            <div className="profile-admin-info">
              <div className="info-title">
                <ul>
                  <li>Nombre y Apellido</li>
                  <li>DNI</li>
                  <li>Fecha de Nacimiento</li>
                  <li>Email</li>
                  <li>Teléfono</li>
                  <li>Plan</li>
                  <li>Activo</li>
                  <li>ID Usuario</li>
                </ul>
              </div>

              <div className="info-text">
                <ul>
                  <li>{selectedUser.name + " " + selectedUser.surname}</li>
                  <li>{selectedUser.dni}</li>
                  <li>{selectedUser.birthdate || "-"}</li>
                  <li>{selectedUser.email || "-"}</li>
                  <li>{selectedUser.phone || "-"}</li>
                  <li>{selectedUser.plan || "-"}</li>
                  <li>{selectedUser.active ? 'Sí' : 'No'}</li>
                  <li>{selectedUser._id}</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p className="no-user-selected">Selecciona un usuario para ver su perfil.</p>
        )}
      </div>
    </div>
  );
}

export default AdminProfile;
