import { createSlice } from '@reduxjs/toolkit'
import { removeChannel } from '@thunks/channelThunk'
import { fetchMessages, sendMessage } from '@thunks/messageThunk'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    entities: [],
    loading: 'idle',
    error: null,
    sending: false,
    sendError: null,
  },
  reducers: {
    addMessage(state, action) {
      state.entities.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities = action.payload
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true
        state.sendError = null
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.sending = false
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false
        state.sendError = action.payload
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.entities = state.entities.filter(msg => msg.channelId !== action.payload)
      })
  },
})

export const { addMessage } = messagesSlice.actions

export default messagesSlice.reducer
