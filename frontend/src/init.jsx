import MaintenancePage from '@components/Ui/MaintenancePage'
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react'
import { store } from '@store/index'
import '@utils/profanity'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import App from './App'
import i18n from './i18n'
import { rollbar } from './rollbar'

// Здесь инициализируем приложение
const init = async () => {
  if (!rollbar) {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    )
  }

  return (
    <RollbarProvider instance={rollbar}>
      <ErrorBoundary fallbackUI={<MaintenancePage />}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}

export default init
