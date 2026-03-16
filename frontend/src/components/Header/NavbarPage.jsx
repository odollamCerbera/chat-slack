import { ROUTES } from '@utils/routes'
import { Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const NavbarPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleLogoClick = () => navigate(ROUTES.HOME)

  return (
    <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          {t('logo')}
        </Navbar.Brand>
        <LogoutButton />
      </div>
    </Navbar>
  )
}

export default NavbarPage
