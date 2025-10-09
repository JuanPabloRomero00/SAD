const SERVER_URL = "http://localhost:3000";

const userService = {
    getAllUsers: async () => {
    const response = await fetch(`${SERVER_URL}/users`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener usuarios");
    }

    return response.json();
  },
}

export default userService;