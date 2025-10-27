const SERVER_URL = "http://localhost:3000";

const userService = {
  registerUser: async (userData) => {
    console.log(userData);

    const response = await fetch(`${SERVER_URL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.log(response);
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrar el usuario.");
    }

    return response.json();
  },

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