import { createSlice } from '@reduxjs/toolkit'
import { fetchChannels } from './chatThunks'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    entities: [], // массив каналов
    currentChannelId: null, // Для переключения между каналами (менять класс активного канала)
    loading: 'idle', // 'idle' - при инициализации -'pending', 'succeeded', 'failed' - как обычно
    error: null,
  },
  reducers: {
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload
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
        state.entities = action.payload;
        // Если текущий канал ещё не выбран и есть каналы, выбираем первый
        if (!state.currentChannelId && action.payload.length > 0) {
          state.currentChannelId = action.payload[0].id
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
  },
})

export const { setCurrentChannel } = channelsSlice.actions

export default channelsSlice.reducer
