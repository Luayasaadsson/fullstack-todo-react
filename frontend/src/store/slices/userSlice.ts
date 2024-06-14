import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: number | null;
  token: string | null;
}

const initialState: UserState = {
  userId: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ userId: number; token: string }>
    ) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
