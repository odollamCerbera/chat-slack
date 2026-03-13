import * as yup from 'yup'

export const getChannelSchema = (t, channels, excludeId = null) => yup.object({
  name: yup
    .string()
    .trim()
    .min(3, t('errors.validation.invalidRange'))
    .max(20, t('errors.validation.invalidRange'))
    .notOneOf(channels, t('errors.validation.notUnique'))
    .test('unique', t('errors.validation.notUnique'), (newName) => {
      // При переименовании исключаем из проверки имя переданного канала, чтобы можно было оставить как есть
      if (excludeId) {
        const excludedChannel = channels.find(channel => channel.id === excludeId)
        if (excludedChannel && excludedChannel.name === newName) return true
      }
      // Проверяем есть ли среди остальных каналов канал с таким именем
      const isNameUniqueAmongChannels = !channels.some((channel) => {
        return channel.id !== excludeId && channel.name === newName
      })
      return isNameUniqueAmongChannels
    })
    .required(t('errors.validation.requiredField')),
})
