import { createSlice } from "@reduxjs/toolkit";
import { logout, user } from "./authActions";

export interface UserInfo {
  id: number;
  email: string;
  fullname: string;
  picture: string;
  createdAt: string;
}

export interface AuthState {
  userInfo: null | UserInfo;
  error: string | null | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
  userInfo: null,
  error: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(user.pending, (state) => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(user.fulfilled, (state, { payload }) => {
      state.userInfo = payload.data.user;
      state.status = "succeeded";
    });
    builder.addCase(user.rejected, (state, { payload }) => {
      state.error = payload?.message;
      state.status = "failed";
    });
    //Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.userInfo = null;
      state.status = "idle";
    });
  },
});

// export const { logout } = authSlice.actions;
export default authSlice.reducer;
