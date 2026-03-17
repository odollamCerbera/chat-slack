import { clearError } from '@slices/authSlice'
import { login } from '@thunks/authThunks'
import { getErrorMessage } from '@utils/errorMessage'
import { ROUTES } from '@utils/routes'
import { getLoginSchema } from '@utils/schema/loginSchema'
import { Formik } from 'formik'
import { useEffect } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormField from '../Ui/FormField'

const LoginForm = () => {
  const { t } = useTranslation()
  const { loading, error } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleLogin = async (values) => {
    const result = await dispatch(login(values))
    if (login.fulfilled.match(result)) navigate(ROUTES.HOME)
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={getLoginSchema(t)}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleLogin}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} autocomplete="off">
          <h1 className="text-center mb-4">{t('authorization.login')}</h1>

          <FormField
            name="username"
            label={t('loginPage.login')}
            type="text"
            autoFocus
          />

          <FormField
            name="password"
            label={t('loginPage.password')}
            type="password"
          />

          {error && (
            <Alert variant="danger">
              {t(getErrorMessage(error))}
            </Alert>
          )}

          <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={loading}>
            {t('authorization.login')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
