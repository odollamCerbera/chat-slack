import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client'
import './index.css'
import init from './init'

// Здесь запускаем приложение, точка входа
const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  document.body.classList.add('bg-light')
  root.render(await init())
}

app()
