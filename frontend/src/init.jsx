import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import App from './App'
import resources from './locales/index'
import { store } from './slices/index'

// Здесь инициализируем приложение
const init = async () => {
  const i18n = i18next.createInstance()

  await i18n
    .use(initReactI18next)
    .init({
      debug: true,
      resources,
      fallbackLng: 'ru',
    })

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  )
}

export default init
