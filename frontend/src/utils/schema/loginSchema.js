import * as yup from 'yup'

export const getLoginSchema = t => yup.object({
  username: yup
    .string()
    .trim()
    .required(t('errors.validation.requiredField')),
  password: yup
    .string()
    .required(t('errors.validation.requiredField')),
})
