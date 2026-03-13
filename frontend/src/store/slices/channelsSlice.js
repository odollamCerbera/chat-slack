import { createSlice } from '@reduxjs/toolkit'
import {
  createChannel,
  fetchChannels,
  removeChannel as removeChannelThunk,
  renameChannel as renameChannelThunk,
} from '@thunks/channelThunk'

// Если канал с таким id уже добавлен, то не добавляем его. Если его нет - добавляем
const handleAddChannel = (state, newChannel) => {
  if (!state.entities.some(ch => ch.id === newChannel.id)) {
    state.entities.push(newChannel)
  }
}

// Находим канал по id в массиве. Если он существует, то обновляем
const handleRenameChannel = (state, updatedChannel) => {
  const index = state.entities.findIndex(ch => ch.id === updatedChannel.id)
  if (index !== -1) {
    state.entities[index] = updatedChannel
  }
}

// Фильтруем массив каналов, удаляя канал по id. Если он активный, то перемещаем всех в дефолтный
const handleRemoveChannel = (state, idChannel) => {
  state.entities = state.entities.filter(ch => ch.id !== idChannel)
  if (state.currentChannelId === idChannel) {
    state.currentChannelId = state.entities[0]?.id || null
  }
}

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
      handleAddChannel(state, action.payload)
    },
    renameChannel(state, action) {
      handleRenameChannel(state, action.payload)
    },
    removeChannel(state, action) {
      handleRemoveChannel(state, action.payload)
    },
    clearOperationError(state) {
      state.operationError = null
    },
  },

  extraReducers: (builder) => {
    builder
      // *** Получение каналов ***
      .addCase(fetchChannels.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities = action.payload
        // Если нет активного канала, то выбираем первый (дефолтный)
        if (!state.currentChannelId && action.payload.length > 0) {
          state.currentChannelId = action.payload[0].id
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      // *** Создание канала ***
      .addCase(createChannel.pending, (state) => {
        state.creating = true
        state.operationError = null
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.creating = false
        handleAddChannel(state, action.payload)
        state.currentChannelId = action.payload.id
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.creating = false
        state.operationError = action.payload
      })
      // *** Переименование канала ***
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
      // *** Удаление канала ***
      .addCase(removeChannelThunk.pending, (state) => {
        state.removing = true
        state.operationError = null
      })
      .addCase(removeChannelThunk.fulfilled, (state, action) => {
        state.removing = false
        handleRemoveChannel(state, action)
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
  clearOperationError,
} = channelsSlice.actions

export default channelsSlice.reducer
