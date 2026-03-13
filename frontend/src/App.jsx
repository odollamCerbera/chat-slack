import ModalRoot from '@components/Modal/ModalRoot'
import { addChannel, removeChannel, renameChannel } from '@slices/channelsSlice'
import { addMessage } from '@slices/messagesSlice'
import { selectIsAuthenticated } from '@store/selectors'
import { ROUTES } from '@utils/routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/SignupPage'
import socket from './socket'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} />
}

const App = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      socket.disconnect()
      return
    }

    socket.connect()

    const handleNewMessage = message => dispatch(addMessage(message))
    const handleNewChannel = channel => dispatch(addChannel(channel))
    const handleRemoveChannel = ({ id }) => dispatch(removeChannel(id))
    const handleRenameChannel = channel => dispatch(renameChannel(channel))

    socket.on('newMessage', handleNewMessage)
    socket.on('newChannel', handleNewChannel)
    socket.on('removeChannel', handleRemoveChannel)
    socket.on('renameChannel', handleRenameChannel)

    return () => {
      socket.off('newMessage', handleNewMessage)
      socket.off('newChannel', handleNewChannel)
      socket.off('removeChannel', handleRemoveChannel)
      socket.off('renameChannel', handleRenameChannel)
      socket.disconnect()
    }
  }, [isAuthenticated, dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
      <ModalRoot />
      <ToastContainer position="top-right" autoClose={5000} closeOnClick />
    </BrowserRouter>
  )
}

export default App
