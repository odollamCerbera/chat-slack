import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import App from './App'
import i18n from './i18n'
import { store } from './slices/index'

// Здесь инициализируем приложение
const init = async () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
)

export default init
