const SERVER_URL = "http://localhost:3000";

const activitiesService = {
    getActivities: async () => {
    const response = await fetch(`${SERVER_URL}/activities`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al recuperar Actividades.");
    }

    return response.json();
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
}

export default activitiesService;