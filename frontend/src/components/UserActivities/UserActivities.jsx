import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";

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
  const { user, token } = useAuth(); // token opcional si usás auth
  const userId = user?._id || user?.id || user?.dni;
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchUserActivities() {
      setLoading(true);
      setError(null);

      const url = `${API_BASE}/users/${userId}/activities`;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal,
        });

        const ct = res.headers.get("content-type") || "";

        if (!res.ok) {
          // leer texto para ver posible HTML de error
          const text = await res.text();
          console.error("[UserActivities] response not OK:", res.status, ct, text.slice(0, 1000));
          throw new Error(`Server responded ${res.status}`);
        }

        if (!ct.includes("application/json")) {
          const text = await res.text();
          console.error("[UserActivities] Expected JSON but got:", ct, text.slice(0, 1000));
          throw new Error("Respuesta del servidor no es JSON (posible ruta equivocada)");
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
          console.warn("[UserActivities] El backend devolvió algo diferente a un array:", data);
        }

        setActivities(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("[UserActivities] fetch aborted");
          return;
        }
        console.error("[UserActivities] fetch error:", err);
        setError(err.message || "Error al cargar actividades");
      } finally {
        setLoading(false);
      }
    }

    fetchUserActivities();
    return () => controller.abort();
  }, [userId, token]);

  if (!userId) return <div>No se encontró información del usuario.</div>;
  if (loading) return <div>Cargando actividades...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="user-activities">
      {activities.length === 0 ? (
        <p>No tenés actividades asignadas.</p>
      ) : (
        <div className="cont-act-card">
          {activities.map((act) => (
            <div
              key={act._id}
              className="activity-card"
            >
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
                <button className="cancelActivity">Darse de baja</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserActivities;
