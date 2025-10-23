import React, { useState, useEffect } from "react";
import activitiesService from "../services/activitiesService";
import { DAYS_WEEK } from "../constants/eDays";
import { useAuth } from '../context/useAuth';
import CustomAlert from "../components/CustomAlert/CustomAlert";
import { Link } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Footer from "../components/Footer/Footer";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { user } = useAuth();
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


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

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.title === selectedCategory;
    return matchesCategory;
  });

  const activityNames = [...new Set(activities.map(activity => activity.title))];

  return (
    <>
      <div className="activities-container">
      <div className="activities-main">
        <div className="activities-top">
          <h2 className="activities-title">Actividades y talleres</h2>
          <p className="activities-subtitle">
            Descubrí todas nuestras actividades.
          </p>
        </div>
        <div className="activities-content">
          <div className="filter-container">
            <div className="activities-filter">
              <span>Filtrar por actividad:</span>
              <CIcon className="icon-filter" icon={icon.cilFilter} onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ cursor: 'pointer' }} />
            </div>
            {isDropdownOpen && (
              <div className="filter-dropdown">
                <div className="filter-option" onClick={() => { setSelectedCategory('all'); setIsDropdownOpen(false); }}>Todas</div>
                {activityNames.map(name => (
                  <div key={name} className="filter-option" onClick={() => { setSelectedCategory(name); setIsDropdownOpen(false); }}>{name}</div>
                ))}
              </div>
            )}
          </div>
          <div className="activities-flex" style={{ marginBottom: 28 }}>
            {filteredActivities.map((activity) => {
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
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedActivity && (
            <>
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
            </>
          )}
        </Modal>
      </div>
    </div>

    <Footer />
    </>
  );
}

export default Activities;