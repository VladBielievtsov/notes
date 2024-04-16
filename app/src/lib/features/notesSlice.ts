import { createSlice } from "@reduxjs/toolkit";

export interface INote {
  id: string;
  content: string;
  color: string;
  createdAt: string;
}

interface NotesState {
  list: INote[];
  color: null | string;
  isFormOpen: boolean;
}

const initialState: NotesState = {
  list: [
    {
      id: "0",
      content:
        "The passage is attributed to an unknown typesetter in the 15th century",
      color: "yellow",
      createdAt: "Apr 16, 2024",
    },
    {
      id: "1",
      content: "The passage experienced a surge in popularity during the 1960s",
      color: "orange",
      createdAt: "Apr 16, 2024",
    },
    {
      id: "2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      color: "blue",
      createdAt: "Apr 16, 2024",
    },
  ],
  color: null,
  isFormOpen: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    selectColor: (state, { payload }) => {
      state.color = payload;
    },
    changeIsFormOpen: (state, { payload }) => {
      state.isFormOpen = payload;
    },
    addNote: (state, { payload }) => {
      state.list = [payload, ...(state.list || [])];
      state.color = null;
      state.isFormOpen = false;
    },
  },
});

export default notesSlice.reducer;
export const { selectColor, changeIsFormOpen, addNote } = notesSlice.actions;
