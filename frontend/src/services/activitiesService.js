const SERVER_URL = "http://localhost:3000";

const activitiesService = {
  getActivities: async () => {
    const response = await fetch(`${SERVER_URL}/activities`, {
      method: "GET",
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al recuperar Actividades.");
      } else {
        throw new Error("Error de conexión con el servidor de actividades.");
      }
    }

    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      throw new Error("Respuesta inesperada del servidor.");
    }
  },

  joinActivity: async (activity, user) => {
    const response = await fetch(`${SERVER_URL}/activities/${activity._id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al recuperar Actividades.");
    }

    return response.json();
  },

  leaveActivity: async (activity, userId) => {
    console.log(userId);


    const response = await fetch(`${SERVER_URL}/activities/${activity._id}/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al darse de baja de la Actividad.");
    }

    return response.json();
  },

  getUserActivities: async (userId) => {
    const response = await fetch(`${SERVER_URL}/activities?userId=${userId}`, {
      method: "GET",
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al recuperar Actividades del usuario.");
      } else {
        throw new Error("Error de conexión con el servidor de actividades.");
      }
    }

    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      throw new Error("Respuesta inesperada del servidor.");
    }
  },

  getActivitiesByUserId: async (userId) => {
    const response = await fetch(`${SERVER_URL}/users/${userId}/activities`, {
      method: "GET",
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al recuperar las actividades del usuario.");
      } else {
        throw new Error("Error de conexión con el servidor.");
      }
    }

    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      throw new Error("Respuesta inesperada del servidor.");
    }
  },
};

export default activitiesService;