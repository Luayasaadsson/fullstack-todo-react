import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  userId: number | null;
  email: string | null;
  token: string | null;
}

const initialState: UserState = {
  userId: localStorage.getItem("userId")
    ? Number(localStorage.getItem("userId"))
    : null,
  email: localStorage.getItem("email"),
  token: localStorage.getItem("token"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ userId: number; email: string; token: string }>
    ) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.token = action.payload.token;
      localStorage.setItem("userId", action.payload.userId.toString());
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("token", action.payload.token);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logoutUser: (state) => {
      state.userId = null;
      state.email = null;
      state.token = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setToken, logoutUser } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectEmail = (state: RootState) => state.user.email;
export const selectUserId = (state: RootState) => state.user.userId;

export default userSlice.reducer;
