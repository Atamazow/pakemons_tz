import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
  signingUp: false,
  signingIn: false,
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async ({ login, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ login, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      localStorage.setItem("token", data.token);

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
    },
    //
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
      //===
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
    // ===
  },
});

export const { resetProfile } = authSlice.actions;

export default authSlice.reducer;
