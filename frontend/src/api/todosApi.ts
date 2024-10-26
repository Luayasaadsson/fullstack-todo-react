import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/todos",
});

// Registrerar en ny todo
export const createTodo = async (
  todoData: {
    title: string;
    content: string;
    completed?: boolean;
    published?: boolean;
  },
  token: string
) => {
  try {
    const response = await api.post("/", todoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Create Todo Error:", error);
    throw error;
  }
};

// Hämtar alla todos för den inloggade användaren
export const fetchTodos = async (token: string) => {
  try {
    const response = await api.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch Todos Error:", error);
    throw error;
  }
};

// Hämtar en specifik todo
export const fetchTodo = async (id: number, token: string) => {
  try {
    const response = await api.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch Todo Error:", error);
    throw error;
  }
};

// Uppdaterar en specifik todo
export const updateTodo = async (
  id: number,
  todoData: {
    title?: string;
    content?: string;
    completed?: boolean;
    published?: boolean;
  },
  token: string
) => {
  try {
    const response = await api.put(`/${id}`, todoData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update Todo Error:", error);
    throw error;
  }
};

// Tar bort en specifik todo
export const deleteTodo = async (id: number, token: string) => {
  try {
    const response = await api.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Delete Todo Error:", error);
    throw error;
  }
};

// Tar bort alla todos för den inloggade användaren
export const deleteAllTodos = async (token: string) => {
  try {
    const response = await api.delete("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Delete All Todos Error:", error);
    throw error;
  }
};
