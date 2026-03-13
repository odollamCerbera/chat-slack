import { ROUTES } from '@utils/routes'
import { Col, Image, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import NotFoundImage from '@assets/404NotFoundPage.svg'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <Row className="justify-content-center align-items-center h-100">
      <Col className="text-center">
        <Image
          src={NotFoundImage}
          alt={t('errorPage.pageNotFound')}
          className="img-fluid w-25"
        />
        <h1 className="display-3 mb-3">
          {t('errorPage.pageNotFound')}
        </h1>
        <p className="lead mb-4">
          {t('errorPage.suggestAction')}
          &nbsp;
          <Link to={ROUTES.HOME}>
            {t('errorPage.goToMainPage')}
          </Link>
        </p>
      </Col>
    </Row>
  )
}

export default NotFoundPage
