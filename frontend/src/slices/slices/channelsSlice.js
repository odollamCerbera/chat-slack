import { createSlice } from '@reduxjs/toolkit'
import {
  createChannel,
  fetchChannels,
  removeChannel as removeChannelThunk,
  renameChannel as renameChannelThunk,
} from '../thunks/channelThunk'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    entities: [],
    currentChannelId: null,
    loading: 'idle',
    error: null,
    creating: false,
    renaming: false,
    removing: false,
    operationError: null,
  },
  reducers: {
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload
    },
    addChannel(state, action) {
      state.entities.push(action.payload)
      state.currentChannelId = action.payload.id
    },
    removeChannel(state, action) {
      const id = action.payload
      state.entities = state.entities.filter(ch => ch.id !== id)
      // Если удалили текущий канал – переключаемся на дефолтный general
      if (state.currentChannelId === id) {
        state.currentChannelId = state.entities[0]?.id || null
      }
    },
    renameChannel(state, action) {
      const updated = action.payload;
      const index = state.entities.findIndex(ch => ch.id === updated.id)
      if (index !== -1) {
        state.entities[index] = updated
      }
    },
    clearOperationError(state) {
      state.operationError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities = action.payload
        // Если текущий канал ещё не выбран и есть каналы, выбираем дефолтный
        if (!state.currentChannelId && action.payload.length > 0) {
          state.currentChannelId = action.payload[0].id
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      .addCase(createChannel.pending, (state) => {
        state.creating = true
        state.operationError = null
      })
      .addCase(createChannel.fulfilled, (state) => {
        state.creating = false
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.creating = false
        state.operationError = action.payload
      })
      .addCase(renameChannelThunk.pending, (state) => {
        state.renaming = true
        state.operationError = null
      })
      .addCase(renameChannelThunk.fulfilled, (state) => {
        state.renaming = false
      })
      .addCase(renameChannelThunk.rejected, (state, action) => {
        state.renaming = false
        state.operationError = action.payload
      })
      .addCase(removeChannelThunk.pending, (state) => {
        state.removing = true
        state.operationError = null
      })
      .addCase(removeChannelThunk.fulfilled, (state) => {
        state.removing = false
      })
      .addCase(removeChannelThunk.rejected, (state, action) => {
        state.removing = false
        state.operationError = action.payload
      })
  },
})

export const {
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
  clearOperationError
} = channelsSlice.actions
export default channelsSlice.reducer
