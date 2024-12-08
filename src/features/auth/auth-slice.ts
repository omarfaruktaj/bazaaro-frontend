import { RootState } from "@/redux/store";
import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: null | string;
  user: null | User;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("token") || null,
  user: null,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;

      localStorage.setItem("token", action.payload.accessToken);
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    logOut: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setUser, logOut } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
