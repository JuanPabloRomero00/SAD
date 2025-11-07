import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import activitiesService from "../../services/activitiesService";
import CustomAlert from "../CustomAlert/CustomAlert";
import Modal from "../Modal/Modal";

const dayNames = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

const API_BASE = "http://localhost:3000";

function UserActivities() {
  const { user, token } = useAuth();
  const userId = user?._id || user?.id || user?.dni;
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityToLeave, setActivityToLeave] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchUserActivities() {
      setLoading(true);
      setError(null);

      const url = `${API_BASE}/activities?userId=${userId}`;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal,
        });
        const data = await res.json();
        setActivities(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("[UserActivities] fetch error:", err);
          setError(err.message || "Error al cargar actividades");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserActivities();
    return () => controller.abort();
  }, [userId, token]);

  const handleLeaveActivity = async () => {
    if (!activityToLeave) return;

    try {
      await activitiesService.leaveActivity(activityToLeave, userId);
      showAlert("Te has dado de baja correctamente", "success");

      setActivities(prevActivities =>
        prevActivities.filter(activity => activity._id !== activityToLeave._id)
      );

      setTimeout(() => {
        closeModal();
      }, 1500);

    } catch (err) {
      console.error("Error al dar de baja la ctividad:", err);
      showAlert(err.message || "No se pudo dar de baja la actividad.", "error");
    }
  };

  const openConfirmationModal = (activity) => {
    setActivityToLeave(activity);
    setIsModalOpen(true);
    setAlert({ show: false, message: "", type: "" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActivityToLeave(null);
  };

  if (!userId) return <div>No se encontró información del usuario.</div>;
  if (loading) return <div>Cargando actividades...</div>;
  if (error && !isModalOpen) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="user-activities">
      {activities.length === 0 ? (
        <p>No tenés actividades asignadas.</p>
      ) : (
        <div className="cont-act-card">
          {activities.map((act) => (
            <div key={act._id} className="activity-card">
              <div>
                <h4>{act.title}</h4>
                {act.description && <p style={{ margin: "0 0 6px 0" }}>{act.description}</p>}
                <div>
                  <div>Horario: {act.time || "No especificado"} hs</div>
                  <div>
                    Días:{" "}
                    {Array.isArray(act.days) && act.days.length > 0
                      ? act.days.map((d) => dayNames[d] || d).join(", ")
                      : "No especificado"}
                  </div>
                  {act.location && <div>Sede: {act.location}</div>}
                </div>
              </div>
              <div className="buttonCancel">
                <button className="cancelActivity" onClick={() => openConfirmationModal(act)}>Darse de baja</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p>¿Está seguro que desea darse de baja de <strong>{activityToLeave?.title}</strong>?</p>
        <CustomAlert show={alert.show} message={alert.message} type={alert.type} />
        <div className="modal-buttons">
          <button className="modal-confirm" onClick={handleLeaveActivity}>Confirmar</button>
          <button className="modal-return" onClick={closeModal}>Cancelar</button>
        </div>
      </Modal>
    </div>
  );
}

export default UserActivities;