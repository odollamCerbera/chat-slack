import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const createThunk = (resourceName, actionName) => {
  return createAsyncThunk(
    `${resourceName}/${actionName}`,
    async (_, { getState, rejectWithValue }) => {
      const token = getState().auth.token
      try {
        const response = await axios.get(`/api/v1/${resourceName}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        return response.data
      } catch (error) {
        return rejectWithValue(error.response?.status)
      }
    }
  )
}

export const fetchChannels = createThunk('channels', 'fetchChannels')
export const fetchMessages = createThunk('messages', 'fetchMessages')
