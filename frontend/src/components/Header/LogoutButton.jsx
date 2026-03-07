import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../slices/authSlice'
import { ROUTES } from '../../utils/routes'

const LogoutButton = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.LOGIN)
  }
  return !isAuthenticated ? null : (
    <Button className='btn btn-primary' onClick={handleLogout}>
      {t('authorization.logout')}
    </Button>
  )
}

export default LogoutButton
