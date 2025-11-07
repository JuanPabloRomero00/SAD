import React, { useEffect, useState } from 'react';
import userService from '../../services/userService';
import UserReport from '../UserReport/UserReport.jsx';
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Tooltip from '@mui/material/Tooltip';
import EditUserModal from '../Modal/EditUserModal.jsx';
import activitiesService from '../../services/activitiesService.js';
import { DAYS_WEEK } from '../../constants/eDays.js';

function AdminProfile() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [view, setView] = useState('profile');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      console.log("Usuario seleccionado:", selectedUser);
      const fetchUserActivities = async () => {
        try {
          const activities = await activitiesService.getActivitiesByUserId(selectedUser._id);
          console.log("Actividades recibidas:", activities);
          setUserActivities(activities);
        } catch (error) {
          console.error("Error fetching user activities:", error);
        }
      };
      fetchUserActivities();
    }
  }, [selectedUser]);

  const handleUserUpdate = (updatedUser) => {
    const updatedUsers = users.map(user =>
      user._id === updatedUser._id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(updatedUser);
  };

  const handleProfileClick = () => {
    setView('profile');
  };

  const handleActivitiesClick = () => {
    setView('activities');
  };

  return (
    <>
      <div className='admin-container'>
        <div className='admin-title'>
          <h2>Panel de Administración</h2>
        </div>
        <div className="profile-page-admin">
          <aside className="side-menu-admin">
            <div className='side-menu-title'>
              <h4>Usuarios</h4>
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
              <li onClick={handleProfileClick} style={{ cursor: 'pointer' }}>Perfil</li>
              <li onClick={handleActivitiesClick} style={{ cursor: 'pointer' }}>Actividades</li>
              <UserReport users={users} />
            </ul>
            <div className="admin-content-view">
              {selectedUser ? (
                view === 'profile' ? (
                  <div className="profile-admin-card">
                    <div className="profile-admin-header">
                      <div className="avatar" id="avatar">
                        {selectedUser.name.charAt(0).toUpperCase()}
                        {selectedUser.surname.charAt(0).toUpperCase()}
                      </div>
                      <div className='header-info'>
                        <h2>{selectedUser.name} {selectedUser.surname}</h2>
                        <p className="id-admin">ID: {selectedUser._id}</p>
                      </div>
                      <Tooltip title="Editar usuario" placement="top">
                        <CIcon className="icon-edit" icon={icon.cilPen} onClick={() => setIsEditModalOpen(true)} style={{ cursor: 'pointer' }} />
                      </Tooltip>
                    </div>
                    <h3 className='profile-subtitle'>Información de Perfil</h3>
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
                          <li>Rol</li>
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
                  <div className='user-activities-admin'>
                    <h3>Actividades de {selectedUser.name}</h3>
                    <div className="cont-act-card-adm">

                      {userActivities.length > 0 ? (
                        userActivities.map((act) => (
                          <div key={act._id} className="activity-card-admin">
                            <div>
                              <h4>{act.title}</h4>
                              {act.description && <p style={{ margin: "0 0 6px 0" }}>{act.description}</p>}
                              <div>
                                <div>Horario: {act.time || "No especificado"} hs</div>
                                <div>
                                  Días:{" "}
                                  {Array.isArray(act.days) && act.days.length > 0
                                    ? act.days.map((d) => DAYS_WEEK[d] || d).join(", ")
                                    : "No especificado"}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>El usuario no está inscripto en ninguna actividad.</p>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <div className="no-user-selected">
                  <p>Selecciona un usuario de la lista para ver su información.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      {isEditModalOpen && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onUserUpdate={handleUserUpdate}
        />
      )}
    </>
  );
}

export default AdminProfile;
