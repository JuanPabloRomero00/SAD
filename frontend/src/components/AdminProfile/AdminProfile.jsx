import React, { useEffect, useState } from 'react';
//import { useAuth } from '../../context/useAuth';
import userService from '../../services/userService';
import UserReport from '../UserReport/UserReport.jsx';
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Tooltip from '@mui/material/Tooltip'

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
    <>
      <div className='admin-container'>
        <div className='admin-title'>
          <h2 className="activities-title">Panel de Administración</h2>
        </div>
        <div className="profile-page-admin">
          <aside className="side-menu-admin">
            <div className='side-menu-title'>
              <h3>Usuarios</h3>
            </div>
            <ul className="profile-user-list">
              {users.map((user) => (
                <li
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  style={{ cursor: 'pointer' }}
                  className={selectedUser?._id === user._id ? 'selected' : ''}
                >
                  {user.name} {user.surname} - {user.dni}
                </li>
              ))}
            </ul>
          </aside>
          <section className='menu-admin'>
            <ul className="profile-list-menu">
              <li>Perfil</li>
              <li>Actividades</li>
              <li>Historial de Pagos</li>
              <UserReport users={users} />
            </ul>
            <div className="profile-admin-container">
              {selectedUser ? (
                <div className="profile-admin-card">
                  <div className="avatar" id="avatar">
                    {selectedUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                  <Tooltip title="Editar usuario">
                    <CIcon too className="icon-edit" icon={icon.cilPen} onClick={() => ""} style={{ cursor: 'pointer' }} />
                  </Tooltip>
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
                        <li>Clase</li>
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
                        <li>{selectedUser.role}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="no-user-selected">Selecciona un usuario para ver su perfil.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;
