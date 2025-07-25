import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://reqres.in/api/login",
        credentials,
        {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка входа");
    }
  }
);

export const loadAuthFromStorage = createAsyncThunk(
  "auth/loadAuthFromStorage",
  async (_, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      throw new Error("Tokens missing");
    }

    return { accessToken, refreshToken };
  }
);
