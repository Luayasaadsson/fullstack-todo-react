import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./../store";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./../../api/todosApi";

interface Todo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  published: boolean;
}

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const loadTodos = createAsyncThunk<Todo[], string>(
  "todos/loadTodos",
  async (token: string) => {
    const response = await fetchTodos(token);
    return response;
  }
);

export const addTodo = createAsyncThunk<
  Todo,
  { todoData: Omit<Todo, "id">; token: string }
>("todos/addTodo", async ({ todoData, token }) => {
  const response = await createTodo(todoData, token);
  return response;
});

export const editTodo = createAsyncThunk<
  Todo,
  { id: number; todoData: Partial<Todo>; token: string }
>("todos/editTodo", async ({ id, todoData, token }) => {
  const response = await updateTodo(id, todoData, token);
  return response;
});

export const removeTodo = createAsyncThunk<
  number,
  { id: number; token: string }
>("todos/removeTodo", async ({ id, token }) => {
  await deleteTodo(id, token);
  return id;
});

export const toggleTodoCompleted = createAsyncThunk<
  Todo,
  { id: number; completed: boolean; token: string }
>("todos/toggleTodoCompleted", async ({ id, completed, token }) => {
  const response = await updateTodo(id, { completed }, token);
  return response;
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load todos";
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(
        toggleTodoCompleted.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
          );
          if (index !== -1) {
            state.todos[index].completed = action.payload.completed;
          }
        }
      );
  },
});

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectTodosLoading = (state: RootState) => state.todos.loading;
export const selectTodosError = (state: RootState) => state.todos.error;

export default todosSlice.reducer;
