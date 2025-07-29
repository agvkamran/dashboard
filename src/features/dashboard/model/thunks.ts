import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsersThunk = createAsyncThunk(
  "dashboard/fetchUsers",
  async (page: number = 1 , thunkAPI) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`, {
        headers: {
          "x-api-key": "reqres-free-v1"
        }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка загрузки пользователей");
    }
  }
);
