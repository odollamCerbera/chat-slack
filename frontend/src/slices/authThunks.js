import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const createThunk = (resourceName) => {
  return createAsyncThunk(
    `auth/${resourceName}`,
    async ({ username, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`/api/v1/${resourceName}`, {
          username: username.trim(),
          password: password.trim(),
        })
        return response.data
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )
}

export const login = createThunk('login')
export const register = createThunk('signup')
