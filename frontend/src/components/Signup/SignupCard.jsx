import avatarSignupPage from '@assets/avatarSignupPage.jpg'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import SignupForm from './SignupForm'

const SignupCard = () => {
  const { t } = useTranslation()

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src={avatarSignupPage} className="rounded-circle" alt={t('signupPage.signup')} />
              <SignupForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupCard
