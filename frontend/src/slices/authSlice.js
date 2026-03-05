import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Отправляем данные на сервер, получаем data (токен внутри) при успехе или ошибку 
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/login', {
        username: username.trim(),
        password: password.trim(),
      })
      return response.data
    } catch (error) {
      let errorMessage = 'errors.system.unknown'
      switch (error.response?.status) {
        case 401:
          errorMessage = 'errors.system.invalidData'
          break
        case 500:
          errorMessage = 'errors.system.serverError'
          break
        case 0:
          errorMessage = 'errors.system.connection'
          break
        default:
          errorMessage = 'errors.system.unknown'
      }
      return rejectWithValue(errorMessage) // Передает это сообщение как payload в rejected-действие
    }
  }
)

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Объект с data user
  token: localStorage.getItem('token') || null, // Токен
  isAuthenticated: !!localStorage.getItem('token'), // Булево значение: есть или нет токен, беру для приватного роута
  loading: false, // Флаг загрузки для блокировки кнопки и спиннера
  error: null, // Сообщение об ошибке
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user || null
        state.isAuthenticated = true
        localStorage.setItem('token', action.payload.token)
        if (action.payload.user) {
          localStorage.setItem('user', JSON.stringify(action.payload.user))
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
