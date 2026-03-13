import { createAsyncThunk } from '@reduxjs/toolkit'
import { ROUTES } from '@utils/routes'
import axios from 'axios'
import { toast } from 'react-toastify'
import i18n from '../../i18n'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token
    try {
      const response = await axios.get(ROUTES.MESSAGES(), {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    }
    catch (error) {
      console.log(error)
      toast.error(i18n.t('errors.notifications.fetchMessages'))
      return rejectWithValue(error.response?.status)
    }
  },
)

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ body, channelId, username }, { getState, rejectWithValue }) => {
    const token = getState().auth.token
    try {
      await axios.post(
        ROUTES.MESSAGES(),
        { body, channelId, username },
        { headers: { Authorization: `Bearer ${token}` } },
      )
    }
    catch (error) {
      toast.error(i18n.t('errors.notifications.addMessage'))
      return rejectWithValue(error.response?.status)
    }
  },
)
