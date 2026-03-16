import { ROUTES } from '@utils/routes'
import { Button, Container } from 'react-bootstrap'
import { GearWideConnected } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'

const MaintenancePage = () => {
  const { t } = useTranslation()

  const handleReload = () => window.location.reload()

  return (
    <Container className="text-center mt-5">
      <div className="mb-4">
        <GearWideConnected size={140} className="text-primary animate-spin" />
      </div>

      <h1 className="h4 text-muted">{t('errorPage.maintenance')}</h1>

      <p className="text-muted">{t('errorPage.description')}</p>

      <div className="d-flex justify-content-center gap-2">
        <Button variant="primary" onClick={handleReload}>
          {t('errorPage.retryAction')}
        </Button>
        <Button variant="outline-secondary" href={ROUTES.HOME}>
          {t('errorPage.mainPage')}
        </Button>
      </div>
    </Container>
  )
}

export default MaintenancePage
