import { createSlice } from '@reduxjs/toolkit'
import { login, register } from '../thunks/authThunks'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
}

const handlePending = (state) => {
  state.loading = true
  state.error = null
}

const handleFulfilled = (state, action) => {
  state.loading = false
  state.token = action.payload.token
  state.user = action.payload.user || null
  state.isAuthenticated = true
  localStorage.setItem('token', action.payload.token)
  if (action.payload.user) {
    localStorage.setItem('user', JSON.stringify(action.payload.user))
  }
}

const handleRejected = (state, action) => {
  state.loading = false
  state.error = action.payload
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(login.rejected, handleRejected)
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleFulfilled)
      .addCase(register.rejected, handleRejected)
  },
})

export const { logout, clearError } = authSlice.actions

export default authSlice.reducer
