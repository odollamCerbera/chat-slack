import { logout } from '@slices/authSlice'
import { ROUTES } from '@utils/routes'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  if (!isAuthenticated) return null

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.LOGIN)
  }

  return (
    <Button variant="primary" onClick={handleLogout}>
      {t('authorization.logout')}
    </Button>
  )
}

export default LogoutButton
