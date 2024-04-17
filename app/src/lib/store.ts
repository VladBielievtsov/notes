import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import notesReducer from "./features/notes/notesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      notes: notesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
