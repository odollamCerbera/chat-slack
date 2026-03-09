import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './locales/index'

const i18n = i18next.createInstance()

i18n.use(initReactI18next).init({
  debug: true,
  resources,
  fallbackLng: 'ru',
})

export default i18n
