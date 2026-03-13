import Rollbar from 'rollbar'

const hasToken = import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN
  && import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN.length > 0

export const rollbar = hasToken
  ? new Rollbar({
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: import.meta.env.MODE,
    captureUncaught: true,
    captureUnhandledRejections: true,
  })
  : null
