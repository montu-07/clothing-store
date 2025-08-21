// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// backend base url
const API = "http://localhost:5000/api/auth";

// login action
export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
});

// signup action
export const signupUser = createAsyncThunk("auth/signup", async (data) => {
  const res = await axios.post(`${API}/signup`, data);
  return res.data;
});

// forgot password action
export const forgotPassword = createAsyncThunk("auth/forgot-password", async (data) => {
  const res = await axios.post(`${API}/forgot-password`, data);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
