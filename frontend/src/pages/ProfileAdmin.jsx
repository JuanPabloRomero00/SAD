import React, { useState } from 'react';

function ProfileAdmin() {
//esto es solo como modo de prueba
  const users = [
    {
      id: "1234",
      nombre: "Juan Pérez",
      dni: "12345678",
      nacimiento: "1990-01-01",
      email: "juan@example.com",
      telefono: "+5491112345678",
      plan: "Premium",
      activo: true
    },
    {
      id: "5678",
      nombre: "María López",
      dni: "87654321",
      nacimiento: "1985-05-10",
      email: "maria@example.com",
      telefono: "+5491198765432",
      plan: "Básico",
      activo: false
    },
    {
      id: "9012",
      nombre: "Carlos Gómez",
      dni: "45678912",
      nacimiento: "1992-03-14",
      email: "carlos@example.com",
      telefono: "+5491145678912",
      plan: "Estándar",
      activo: true
    },
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="profile-page">
      <aside className="side-menu side-menu-admin">
        <h3>Usuarios</h3>
        <ul className="profile-user-list">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedUser(user)}
              style={{ cursor: 'pointer' }}
              className={selectedUser?.id === user.id ? 'selected' : ''}
            >
              {user.nombre} - {user.dni} - {user.id}
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
        </ul>
      </aside>

      <div className="profile-container profile-admin-container">
        {selectedUser ? (
          <div className="profile-card profile-admin-card">
            <div className="avatar" id="avatar">
              {selectedUser.nombre
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div>
            <h2>{selectedUser.nombre}</h2>
            <p className="id-admin">ID: {selectedUser.id}</p>

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
                  <li>{selectedUser.nombre}</li>
                  <li>{selectedUser.dni}</li>
                  <li>{selectedUser.nacimiento}</li>
                  <li>{selectedUser.email}</li>
                  <li>{selectedUser.telefono}</li>
                  <li>{selectedUser.plan}</li>
                  <li>{selectedUser.activo ? 'Sí' : 'No'}</li>
                  <li>{selectedUser.id}</li>
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

export default ProfileAdmin;
