import { createSlice } from '@reduxjs/toolkit'
import { fetchMessages } from '../thunks/chatThunks'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    entities: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
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
  },
})

export default messagesSlice.reducer
