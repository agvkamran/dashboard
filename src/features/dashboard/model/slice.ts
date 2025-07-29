import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersThunk } from "./thunks";

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface DashboardState {
  users: IUser[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: DashboardState = {
  users: [],
  isLoading: false,
  error: null,
  totalPages: 0,
  currentPage: 1
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.totalPages = action.payload.total_pages;
        state.currentPage = action.payload.page
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const dashboardReducer = dashboardSlice.reducer;
