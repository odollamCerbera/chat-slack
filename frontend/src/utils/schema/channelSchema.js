import * as yup from 'yup'

export const getChannelSchema = (t, channels, excludeId = null) => yup.object({
  name: yup
    .string()
    .trim()
    .min(3, t('errors.validation.invalidRange'))
    .max(20, t('errors.validation.invalidRange'))
    .notOneOf(channels, t('errors.validation.notUnique'))
    .test('unique', t('errors.validation.notUnique'), (value) => {
      if (!value) return false
      if (excludeId) {
        const excludedChannel = channels.find(ch => ch.id === excludeId)
        if (excludedChannel && excludedChannel.name === value) return true
      }
      return !channels.some(ch => ch.id !== excludeId && ch.name === value)
    })
    .required(t('errors.validation.requiredField'))
})
