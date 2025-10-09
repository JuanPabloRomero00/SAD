import React, { useMemo, useState } from "react";

import futbol from "../assets/activities/futbol.jpg";
import pingpong from "../assets/activities/pingpong.jpg";
import volley from "../assets/activities/volley.jpg";
import yoga from "../assets/activities/yoga.jpg";
import placeholderImg from "../assets/activities/gray-gradient.jpg";

const DAY_NAME_TO_JS = {
  Dom: 0,
  Lun: 1,
  Mar: 2,
  Mie: 3,
  Mier: 3,
  Jue: 4,
  Vie: 5,
  Sab: 6,
};

function generateNextDays(n = 14) {
  const today = new Date();
  const arr = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    arr.push(d);
  }
  return arr;
}

function Activities() {
  const activities = [
    {
      id: 1,
      category: "Deporte en equipo",
      level: "Intermedio",
      title: "Futbol mayores",
      description:
        "Entrenamientos tácticos y físicos, torneo interno los sábados.",
      // CORREGIDO: availableDays (antes 'avalibleDays')
      availableDays: ["Lun", "Mie", "Vie"],
      times: ["20:00-22:00"],
      image: futbol,
    },
    {
      id: 2,
      category: "Deporte individual",
      level: "Principiante",
      title: "Ping-Pong",
      description: "Entrenamientos técnicos y partidos amistosos.",
      availableDays: ["Mar", "Vie"],
      times: ["16:30-17:30"],
      image: pingpong,
    },
    {
      id: 3,
      category: "Deporte en equipo",
      level: "Principiante",
      title: "Volleyball",
      description:
        "Entrenamientos tácticos y físicos, torneo interno los sábados.",
      availableDays: ["Lun", "Vie"],
      times: ["18:00-19:30"],
      image: volley,
    },
    {
      id: 4,
      category: "Taller",
      level: "Todos los niveles",
      title: "Yoga",
      description: "Posturas físicas, técnicas de respiración y meditación.",
      availableDays: ["Jue"],
      times: ["19:30-20:30"],
      image: yoga,
    },
  ];

  // UI state
  const [selectedActivity, setSelectedActivity] = useState(null); // objeto actividad
  const [selectedDate, setSelectedDate] = useState(null); // Date
  const [selectedTime, setSelectedTime] = useState(null); // string "20:00-22:00"

  // Fechas a mostrar en calendario (próximos 14 días)
  const calendarDays = useMemo(() => generateNextDays(14), []);

  // obtiene array seguro de días (soporta availableDays o avalibleDays)
  const getActivityDaysArray = (activity) => {
    if (!activity) return [];
    return activity.availableDays ?? activity.avalibleDays ?? [];
  };

  // Convierte availableDays (["Lun","Mie"]) a Set de números JS {1,3}
  const activityWeekdaySet = (activity) => {
    const arr = getActivityDaysArray(activity);
    return new Set(
      arr.map((d) => DAY_NAME_TO_JS[d] ?? null).filter((n) => n !== null),
    );
  };

  const onSelectActivity = (activity) => {
    setSelectedActivity(activity);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const onSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const onSelectTime = (time) => {
    setSelectedTime(time);
  };

  // Formatea fecha bonita
  const formatDateReadable = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("es-AR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="activities-container">
      <h2 className="activities-title">Actividades y talleres</h2>
      <p className="activities-subtitle">
        Descubrí todas nuestras actividades.
      </p>

      {/* LISTADO DE ACTIVIDADES */}
      <div className="activities-flex" style={{ marginBottom: 28 }}>
        {activities.map((activity) => {
          const daysArray = getActivityDaysArray(activity);
          return (
            <div
              key={activity.id}
              className="activity-card"
              style={{
                cursor: "pointer",
                border:
                  selectedActivity?.id === activity.id
                    ? "2px solid #555"
                    : "none",
              }}
              onClick={() => onSelectActivity(activity)}
              role="button"
              aria-pressed={selectedActivity?.id === activity.id}
            >
              <div className="image-wrapper">
                <img
                  src={activity.image || placeholderImg}
                  alt={activity.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholderImg;
                  }}
                />
              </div>

              <div className="card-header">
                <span className="category">{activity.category}</span>
                <span className="level">{activity.level}</span>
              </div>

              <h3 className="card-title">{activity.title}</h3>
              <p className="card-description">{activity.description}</p>

              <div className="card-info">
                <div className="card-box info-box">
                  <p>Días</p>
                  <span>{daysArray.length ? daysArray.join(" / ") : "—"}</span>
                </div>

                <div className="info-box">
                  <p>Horarios</p>
                  <span>{(activity.times || []).join(" • ")}</span>
                </div>
              </div>

              <button className="details-btn">Seleccionar</button>
            </div>
          );
        })}
      </div>

      {/* SI HAY ACTIVIDAD SELECCIONADA -> MOSTRAR CALENDARIO */}
      {selectedActivity && (
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ marginTop: 0 }}>Calendario: {selectedActivity.title}</h3>
          <p style={{ marginTop: 4, marginBottom: 12, color: "#ccc" }}>
            Seleccioná un día disponible para ver horarios.
          </p>

          <div
            className="calendar-grid"
            style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
          >
            {calendarDays.map((d) => {
              const weekday = d.getDay(); // 0-6
              const allowed = activityWeekdaySet(selectedActivity).has(weekday);
              const isSelected =
                selectedDate &&
                d.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={d.toISOString()}
                  className={`calendar-day-btn ${allowed ? "available" : "unavailable"} ${isSelected ? "selected" : ""}`}
                  onClick={() => allowed && onSelectDate(d)}
                  disabled={!allowed}
                  aria-pressed={isSelected}
                >
                  <div
                    style={{ fontSize: 12, color: allowed ? "#fff" : "#777" }}
                  >
                    {d.toLocaleDateString("es-AR", { weekday: "short" })}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>
                    {d.getDate()}
                  </div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>
                    {d.toLocaleDateString("es-AR", { month: "short" })}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SI HAY FECHA SELECCIONADA -> MOSTRAR HORARIOS */}
      {selectedDate && (
        <div style={{ marginBottom: 28 }}>
          <h4 style={{ marginTop: 0 }}>
            Horarios para {formatDateReadable(selectedDate)}
          </h4>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {(selectedActivity.times || []).map((t) => {
              const active = selectedTime === t;
              return (
                <button
                  key={t}
                  className={`time-btn ${active ? "active" : ""}`}
                  onClick={() => onSelectTime(t)}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SI HAY HORARIO SELECCIONADO -> MOSTRAR TARJETA DETALLE (puede ser modal) */}
      {selectedTime && (
        <aside
          className="detail-panel"
          role="dialog"
          aria-label="Detalle de actividad"
        >
          <div className="detail-left">
            <div className="image-wrapper" style={{ height: 220 }}>
              <img
                src={selectedActivity.image || placeholderImg}
                alt={selectedActivity.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = placeholderImg;
                }}
              />
            </div>
          </div>

          <div className="detail-right">
            <div className="card-header" style={{ marginBottom: 8 }}>
              <span className="category">{selectedActivity.category}</span>
              <span className="level">{selectedActivity.level}</span>
            </div>

            <h3 className="card-title">{selectedActivity.title}</h3>
            <p className="card-description">{selectedActivity.description}</p>

            <div className="card-info" style={{ marginTop: 12 }}>
              <div className="card-box info-box">
                <p>Fecha</p>
                <span>{formatDateReadable(selectedDate)}</span>
              </div>

              <div className="info-box">
                <p>Horario</p>
                <span>{selectedTime}</span>
              </div>
            </div>

            <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
              <button className="details-btn">Reservar</button>
              <button
                className="details-btn"
                onClick={() => setSelectedTime(null)}
                style={{ background: "#444" }}
              >
                Volver
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Botón para limpiar selección */}
      {(selectedActivity || selectedDate || selectedTime) && (
        <div style={{ marginTop: 18 }}>
          <button
            className="details-btn"
            onClick={() => {
              setSelectedActivity(null);
              setSelectedDate(null);
              setSelectedTime(null);
            }}
            style={{ background: "#2b2b2b" }}
          >
            Limpiar selección
          </button>
        </div>
      )}
    </div>
  );
}

export default Activities;
