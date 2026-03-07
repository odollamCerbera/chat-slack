import { Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

const LoginFooter = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleNavigation = (e) => {
    e.preventDefault()
    navigate(ROUTES.SIGNUP)
  }

  return (
    <Card.Footer className='p-4'>
      <div className='text-center'>
        <span className='me-1'>{t('loginPage.noAccount')}</span>
        <Link onMouseDown={handleNavigation}>{t('authorization.signup')}</Link>
      </div>
    </Card.Footer>
  )
}

export default LoginFooter
