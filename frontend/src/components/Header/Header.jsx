import { Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import LogoutButton from './LogoutButton'

const Header = () => {
  const { t } = useTranslation()

  return (
    <Navbar bg='white' variant='light' expand='lg' className='shadow-sm'>
      <div className='container'>
        <Navbar.Brand as={Link} to={ROUTES.HOME}>{t('logo')}</Navbar.Brand>
        <LogoutButton />
      </div>
    </Navbar>
  )
}

export default Header
