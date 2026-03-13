import avatarLoginPage from '@assets/avatarLoginPage.jpg'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import LoginFooter from './LoginFooter'
import LoginForm from './LoginForm'

const LoginCard = () => {
  const { t } = useTranslation()

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <Image src={avatarLoginPage} className="rounded-circle" alt={t('authorization.login')} />
              </Col>
              <Col md={6} className="mt-3 mt-md-0">
                <LoginForm />
              </Col>
            </Card.Body>
            <LoginFooter />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginCard
