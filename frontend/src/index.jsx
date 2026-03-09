import ReactDOM from 'react-dom/client'
import init from './init'

// Здесь запускаем приложение, точка входа
const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(await init())
}

app()
