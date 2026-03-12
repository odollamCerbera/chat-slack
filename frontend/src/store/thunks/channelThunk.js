import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import i18n from '../../i18n'

// Получение всех каналов (GET)
export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token
    try {
      const response = await axios.get('/api/v1/channels', {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    } catch (error) {
      toast.error(i18n.t('errors.notifications.fetchChannels'))
      return rejectWithValue(error.response?.status)
    }
  }
)

// Создание канала (POST)
export const createChannel = createAsyncThunk(
  'channels/createChannel',
  async (name, { getState, rejectWithValue }) => {
    const token = getState().auth.token
    try {
      const response = await axios.post(
        '/api/v1/channels',
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success(i18n.t('channels.channelCreated'))
      return response.data
    } catch (error) {
      toast.error(i18n.t('errors.notifications.addChannel'))
      return rejectWithValue(error.response?.status)
    }
  }
)

// Переименование канала (PATCH)
export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { getState, rejectWithValue }) => {
    const token = getState().auth.token
    try {
      await axios.patch(
        `/api/v1/channels/${id}`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success(i18n.t('channels.channelRenamed'))
    } catch (error) {
      toast.error(i18n.t('errors.notifications.renameChannel'))
      return rejectWithValue(error.response?.status)
    }
  }
)

// Удаление канала (DELETE)
export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.token
    try {
      await axios.delete(`/api/v1/channels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success(i18n.t('channels.channelRemoved'))
      return id
    } catch (error) {
      toast.error(i18n.t('errors.notifications.removeChannel'))
      console.log(error)
      return rejectWithValue(error.response?.status)
    }
  }
)
