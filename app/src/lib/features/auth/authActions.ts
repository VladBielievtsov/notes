import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInfo } from "./authSlice";
import axios, { AxiosError } from "axios";

export interface ErrorType {
  message: string | undefined;
  status: string | undefined;
}

export const user = createAsyncThunk<
  { data: { user: UserInfo } },
  void,
  { rejectValue: ErrorType }
>("/auth/user", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API}/api/user`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorType>;
    if (axiosError) {
      return rejectWithValue({
        message: axiosError.response?.data.message,
        status: axiosError.response?.data.status,
      });
    }
  }
});

export const logout = createAsyncThunk<
  { data: { status: string } },
  void,
  { rejectValue: ErrorType }
>("/auth/logout", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API}/api/auth/logout`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorType>;
    if (axiosError) {
      return rejectWithValue({
        message: axiosError.response?.data.message,
        status: axiosError.response?.data.status,
      });
    }
  }
});
