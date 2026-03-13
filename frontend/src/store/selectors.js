import { createSelector } from '@reduxjs/toolkit'

export const selectToken = state => state.auth.token
export const selectUsername = state => state.auth.username
export const selectIsAuthenticated = state => state.auth.isAuthenticated

export const selectChannels = state => state.channels.entities
export const selectCurrentChannelId = state => state.channels.currentChannelId
export const selectChannelsLoading = state => state.channels.loading
export const selectChannelsError = state => state.channels.error

export const selectMessages = state => state.messages.entities
export const selectMessagesLoading = state => state.messages.loading
export const selectMessagesError = state => state.messages.error

// Возвращает объект текущего канала
export const selectCurrentChannel = createSelector(
  [selectChannels, selectCurrentChannelId],
  (channels, currentId) => {
    if (!currentId || !channels.length) return null
    return channels.find(channel => channel.id === currentId)
  },
)

//  Возвращает название текущего канала
export const selectCurrentChannelName = createSelector(
  [selectCurrentChannel],
  channel => channel?.name,
)

// Возвращает массив названий каналов
export const selectChannelsNames = createSelector(
  [selectChannels],
  channels => channels.map(channel => channel.name),
)

// Возвращает массив сообщений текущего канала
export const selectMessagesByCurrentChannel = createSelector(
  [selectMessages, selectCurrentChannelId],
  (messages, currentId) => {
    if (!currentId || !messages.length) return []
    return messages.filter(message => message.channelId === currentId)
  },
)

// Возвращает кол-во сообщений текущего канала
export const selectMessagesCount = createSelector(
  [selectMessagesByCurrentChannel],
  messages => messages.length,
)
