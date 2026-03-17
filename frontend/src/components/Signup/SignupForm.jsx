import { clearError } from '@slices/authSlice'
import { register } from '@thunks/authThunks'
import { getErrorMessage } from '@utils/errorMessage'
import { ROUTES } from '@utils/routes'
import { getSignupSchema } from '@utils/schema/signupSchema'
import { Formik } from 'formik'
import { useEffect } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormField from '../Ui/FormField.jsx'

const SignupForm = () => {
  const { t } = useTranslation()
  const { loading, error } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleSignup = async (values) => {
    const result = await dispatch(register({
      username: values.username,
      password: values.password,
    }))
    if (register.fulfilled.match(result)) navigate(ROUTES.HOME)
  }

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={getSignupSchema(t)}
      onSubmit={handleSignup}
    >
      {({ handleSubmit }) => (
        <Form className="w-50" onSubmit={handleSubmit} autocomplete="off">
          <h1 className="text-center mb-4">{t('signupPage.signup')}</h1>

          <FormField
            name="username"
            label={t('signupPage.username')}
            type="text"
            autoFocus
          />

          <FormField
            name="password"
            label={t('signupPage.password')}
            type="password"
          />

          <FormField
            name="confirmPassword"
            label={t('signupPage.passwordRepeat')}
            type="password"
          />

          {error && (
            <Alert variant="danger">
              {t(getErrorMessage(error))}
            </Alert>
          )}

          <Button variant="outline-primary" type="submit" className="w-100" disabled={loading}>
            {t('signupPage.signup')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm
