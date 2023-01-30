import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import { setMessage } from "./messages";
import authService from "../helper/auth.helper";

const storedUser = localStorage.getItem('user');
const user = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt = localStorage.getItem('jwt');
const jwt = !!storedJwt ? JSON.parse(storedJwt) : null;

// Reducer initial state
const initialState = {
  user: user,
  jwt: jwt,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const response = await authService.register(user);
      return response
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue('Unable to register!');
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (user, thunkAPI) => {
    try {
      const response = await authService.login(user);
      thunkAPI.dispatch(setMessage(response.user?.message))
      return response
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue('Unable to login');
    }
  }
);
export const google = createAsyncThunk(
  'auth/google',
  async (thunkAPI) => {
    try {
      return authService.googleLogin()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue('Unable to login');
    }
  }
);

// User logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

//Jwt Verification
export const verifyJwt = createAsyncThunk(
  'auth/verify-jwt',
  async (jwt, thunkAPI) => {
    try {
      return await authService.verifyJwt(jwt);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to verify');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(google.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(google.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(google.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.jwt = action.payload.jwt;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      // REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = null;
        state.jwt = null;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      // LOGIN
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = action.payload.jwt;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(signin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
      })
      // VERIFY JWT
      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;