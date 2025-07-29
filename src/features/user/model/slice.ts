import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/features/dashboard/model/slice";

interface UserInfoState {
  selectedUser: IUser | null;
}

const initialState: UserInfoState = {
  selectedUser: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<IUser>) {
      state.selectedUser = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
});

export const { setSelectedUser, clearSelectedUser } = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
