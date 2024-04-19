import { createAsyncThunk } from "@reduxjs/toolkit";
import { INote } from "./notesSlice";
import axios, { AxiosError } from "axios";

export interface ErrorType {
  message: string | undefined;
  status: string | undefined;
}

interface AddNoteRequest {
  content: string;
  color: string;
}

export const storeNote = createAsyncThunk<
  { data: { note: INote } },
  AddNoteRequest,
  { rejectValue: ErrorType }
>("/note/storeNote", async ({ content, color }, { rejectWithValue }) => {
  try {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:8080/api/notes",
      headers: {},
      data: { content, color },
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

export const getNotes = createAsyncThunk<
  { data: { notes: INote[] } },
  void,
  { rejectValue: ErrorType }
>("/note/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/notes", {
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

export const removeNote = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: ErrorType }
>("/note/remove", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:8080/api/notes/${id}`,
      { withCredentials: true }
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

interface EditProductRequest extends AddNoteRequest {
  id: string;
}

export const editNote = createAsyncThunk<
  { data: { note: INote } },
  EditProductRequest,
  { rejectValue: ErrorType }
>("/note/edit", async ({ id, color, content }, { rejectWithValue }) => {
  try {
    const { data } = await axios({
      method: "put",
      url: `http://localhost:8080/api/notes/${id}`,
      withCredentials: true,
      headers: {},
      data: { color, content },
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
