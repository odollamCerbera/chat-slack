import * as yup from 'yup'

export const getSignupSchema = t => yup.object({
  username: yup
    .string()
    .trim()
    .min(3, t('errors.validation.invalidRange'))
    .max(20, t('errors.validation.invalidRange'))
    .required(t('errors.validation.requiredField')),
  password: yup
    .string()
    .min(6, t('errors.validation.minLength'))
    .required(t('errors.validation.requiredField')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], t('errors.validation.passwordMismatch'))
    .required(t('errors.validation.requiredField')),
})
