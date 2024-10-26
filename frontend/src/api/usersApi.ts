import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/users",
});

// Registrerar en ny användare
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/register", { email, password });
    const data = response.data;
    if (data.token) {
      return data;
    }
  } catch (error) {
    console.error("Registration Error:");
    throw error;
  }
};

// Loggar in en användare
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login Error:");
    throw error;
  }
};

// Uppdaterar användardata
export const updateUser = async (
  email: string,
  password: string,
  token: string
) => {
  try {
    const response = await api.put(
      "/update",
      { email, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update Error:");
    throw error;
  }
};

// Hämtar en användare
export const getUser = async (id: number, token: string) => {
  try {
    const response = await api.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch User Error:");
    throw error;
  }
};

// Raderar en användare
export const deleteUser = async (token: string) => {
  try {
    const response = await api.delete("/delete", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Delete User Error:");
    throw error;
  }
};

// Exempel på en skyddad route
export const getProtectedData = async (token: string) => {
  try {
    const response = await api.get("/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Protected Route Error:");
    throw error;
  }
};
