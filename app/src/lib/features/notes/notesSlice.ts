import { createSlice } from "@reduxjs/toolkit";
import { editNote, getNotes, removeNote, storeNote } from "./notesActions";

export interface INote {
  id: string;
  content: string;
  color: string;
  createdAt: string;
}

interface NotesState {
  list: INote[];
  error: string | null | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  color: null | string;
  isFormOpen: boolean;
}

const initialState: NotesState = {
  list: [],
  status: "idle",
  error: null,
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
  },
  extraReducers(builder) {
    // Store
    builder.addCase(storeNote.pending, (state) => {
      state.error = null;
    });
    builder.addCase(storeNote.fulfilled, (state, { payload }) => {
      state.color = null;
      state.isFormOpen = false;
      state.list = [payload.data.note, ...state.list];
    });
    builder.addCase(storeNote.rejected, (state, { payload }) => {
      state.error = payload?.message;
    });
    // Get All
    builder.addCase(getNotes.pending, (state) => {
      state.status = "loading";
      state.list = [];
      state.error = null;
    });
    builder.addCase(getNotes.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.list = payload.data.notes;
    });
    builder.addCase(getNotes.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload?.message;
    });
    // Remove
    builder.addCase(removeNote.pending, (state) => {
      state.error = null;
    });
    builder.addCase(removeNote.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.list =
        state.list?.filter((note) => note.id !== payload.id) || state.list;
    });
    builder.addCase(removeNote.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload?.message;
    });
    // edit
    builder.addCase(editNote.pending, (state) => {
      state.error = null;
    });
    builder.addCase(editNote.fulfilled, (state, { payload }) => {
      const editedNote = payload.data.note;
      const existingNoteIndex = state.list?.findIndex(
        (note) => note.id === editedNote.id
      );
      state.list[existingNoteIndex] = editedNote;
      state.status = "succeeded";
    });
    builder.addCase(editNote.rejected, (state, { payload }) => {
      state.error = payload?.message;
    });
  },
});

export default notesSlice.reducer;
export const { selectColor, changeIsFormOpen } = notesSlice.actions;
