import React, { useState, useEffect } from "react";
import activitiesService from "../services/activitiesService";
import { DAYS_WEEK } from "../constants/eDays";
import "./Activities.css";
import { useAuth } from '../context/useAuth';
import CustomAlert from "../components/CustomAlert/CustomAlert";
import { Link } from "react-router-dom";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { user } = useAuth();
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });


  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await activitiesService.getActivities();
        setActivities(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  const handleConfirm = async () => {
    // Lógica para confirmar la inscripción
    console.log("Inscripción confirmada para:", selectedActivity);

    try {
      await activitiesService.joinActivity(selectedActivity, user);
      showAlert("Inscripción confirmada", "success");
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      showAlert(error.message, "error");
    }

  };

  return (
    <div className="activities-container">
      <aside className="activities-aside">
        <h4>Filtros</h4>
        <div className="filter-group">
          <label htmlFor="category">Categoría:</label>
          <select id="category">
            <option value="all">Todas</option>
            <option value="events">Natación</option>
            <option value="events">Vóley</option>
            <option value="events">Yóga</option>
          </select>
        </div>
      </aside>
      <div className="activities-main">
        <h2 className="activities-title">Actividades y talleres</h2>
        <p className="activities-subtitle">
          Descubrí todas nuestras actividades.
        </p>
        <div className="activities-flex" style={{ marginBottom: 28 }}>
          {activities.map((activity) => {
            return (
              <div key={activity._id} className="activity-card" style={{ cursor: "pointer" }}
                onClick={() => handleActivityClick(activity)}>
                <div className="image-wrapper">
                  <img src={`/img/activities/${activity.img}`} alt={activity.title} loading="lazy" />
                </div>
                <div className="card-header">
                  <h3 className="card-title">{activity.title}</h3>
                </div>
                <p className="card-description">{activity.description}</p>
                <div className="card-info">
                  <div className="card-box info-box">
                    <p>Días</p>
                    <span>{activity.days.map(dayNumber => DAYS_WEEK[dayNumber]).join(", ")}</span>
                  </div>
                  <div className="info-box">
                    <p>Horario</p>
                    <span>{(activity.time)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isModalOpen && selectedActivity && (
          <div className="modal-overlay">
            <div className="modal-content">
              {!user ? (
                <>
                  <span>Por favor, inicie sesión para inscribirse en una actividad.</span>
                  <div className="modal-buttons">
                    <Link className="modal-login" to={"/login"}>Confirmar</Link>
                    <button className="modal-return" onClick={handleCloseModal}>Volver</button>
                  </div>
                </>
              ) : (
                <>
                  <span className="modal-req">Usted se está inscribiendo a:</span>
                  <p>
                    {selectedActivity.description} <br /><br /> Horario: {selectedActivity.time}hs
                  </p>
                  <CustomAlert message={alert.message} type={alert.type} />
                  <div className="modal-buttons">
                    <button className="modal-confirm" onClick={handleConfirm}>Confirmar</button>
                    <button className="modal-return" onClick={handleCloseModal}>Volver</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;