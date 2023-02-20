import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "./thunks";

const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
  signingUp: false,
  signingIn: false,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
    },
    resetProfile: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.signingUp = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
        state.signingIn = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
        state.token = null;
        state.loading = false;
      });
  },
});

export const { resetProfile } = authSlice.actions;
export default authSlice.reducer;
