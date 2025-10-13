import React from "react";

function UserReport({ users }) {
  const handlePrintReport = () => {
    if (!users || users.length === 0) {
      alert("No hay usuarios para generar el reporte");
      return;
    }

    // Agrupar usuarios por plan
    const report = users.reduce((acc, user) => {
      const plan = user.plan || "Sin plan";
      if (!acc[plan]) acc[plan] = [];
      acc[plan].push({
        id: user._id,
        name: user.name + " " + (user.surname || ""),
        dni: user.dni,
      });
      return acc;
    }, {});

    const newWindow = window.open("", "_blank");

    newWindow.document.write(`
      <html>
        <head>
          <title>Reporte de Usuarios</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; }
            h1 { color: #333; text-align: center; }
            h2 { color: #555; margin-top: 30px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { padding: 8px 12px; border: 1px solid #ccc; text-align: left; }
            th { background-color: #eee; }
            tr:nth-child(even) { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Reporte de Usuarios por Plan</h1>
          ${Object.keys(report).map(plan => `
            <h2>${plan} (Cantidad: ${report[plan].length})</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>DNI</th>
                </tr>
              </thead>
              <tbody>
                ${report[plan].map(u => `
                  <tr>
                    <td>${u.id}</td>
                    <td>${u.name}</td>
                    <td>${u.dni}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `).join('')}
        </body>
      </html>
    `);

    newWindow.document.close();
  };

  return (
    <li onClick={handlePrintReport} style={{ cursor: 'pointer'}}>
      Imprimir reporte
    </li>
  );
}

export default UserReport;