import React from 'react'

function Activities() {
  const activities = [
    {
      id: 1,
      category: "Deporte de equipo",
      level: "Intermedio",
      title: "Futbol Mayores",
      description: "Entrenamientos tácticos y físicos, torneo interno los sábados",
      days: "Lun / Mier / Vier",
      time: "20:00-22:00",
    },
    {
      id: 2,
      category: "Deporte de equipo",
      level: "Intermedio",
      title: "Futbol Mayores",
      description: "Entrenamientos tácticos y físicos, torneo interno los sábados",
      days: "Lun / Mier / Vier",
      time: "20:00-22:00",
    },
    {
      id: 3,
      category: "Deporte de equipo",
      level: "Intermedio",
      title: "Futbol Mayores",
      description: "Entrenamientos tácticos y físicos, torneo interno los sábados",
      days: "Lun / Mier / Vier",
      time: "20:00-22:00",
    },
    {
      id: 4,
      category: "Deporte de equipo",
      level: "Intermedio",
      title: "Futbol Mayores",
      description: "Entrenamientos tácticos y físicos, torneo interno los sábados",
      days: "Lun / Mier / Vier",
      time: "20:00-22:00",
    },
  ];




  return (
    <div className="activities-container">
      <h2 className="activities-title">
        Actividades y talleres
      </h2>
      <p className="activities-subtitle">
        Descubri todas nuestras actividades.
      </p>


      <div className="activities-flex">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <div className="card-header">
              <span className="category"> {activity.category} </span>
              <span className="leveel"> {activity.level} </span>
            </div>

            <h3 className="card-title"> {activity.title} </h3>
            <p className="card-description"> {activity.description} </p>

            <div className="card-info">
              <div className="card-box">
                <p>Dias</p>
                <span> {activity.days} </span>
              </div>

              <div className="info-box">
                <p>Horario</p>
                <span> {activity.time} </span>
              </div>
            </div>

            <button className='details-btn'>Ver detalles</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activities