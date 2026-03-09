import * as yup from 'yup'

export const getChannelSchema = (t, channels) => yup.object({
  name: yup
    .string()
    .trim()
    .min(3, t('errors.validation.invalidRange'))
    .max(20, t('errors.validation.invalidRange'))
    .notOneOf(channels, t('errors.validation.notUnique'))
    .required(t('errors.validation.requiredField'))
})
