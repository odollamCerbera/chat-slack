import { ROUTES } from '@utils/routes'
import { Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const LoginFooter = () => {
  const { t } = useTranslation()

  return (
    <Card.Footer className="p-4">
      <div className="text-center">
        <span className="me-1">{t('loginPage.noAccount')}</span>
        <Link to={ROUTES.SIGNUP}>
          {t('authorization.signup')}
        </Link>
      </div>
    </Card.Footer>
  )
}

export default LoginFooter
