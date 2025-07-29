import { createSlice } from "@reduxjs/toolkit";
import { loadAuthFromStorage, loginUser } from "./thunks";

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  authIsReady: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  authIsReady: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.isLoading = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.token;
        state.refreshToken = Math.random().toString();
        state.user = {
          id: "1",
          email: "eve.holt@reqres.in",
          name: "Demo User",
        };
        localStorage.setItem("accessToken", action.payload.token);
        localStorage.setItem("refreshToken", state.refreshToken!);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loadAuthFromStorage.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.authIsReady = true;
      })
      .addCase(loadAuthFromStorage.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.authIsReady = true;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;