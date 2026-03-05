import { useTranslation } from 'react-i18next'
import { Form, Button, Alert } from 'react-bootstrap'
import FormField from '../FormField'

const SignupForm = () => {
  const { t } = useTranslation()

  return (
    <Form className='w-50' onSubmit={handleSubmit}>
      <h1 className='text-center mb-4'>{t('signupPage.signup')}</h1>

      <FormField
        name='username'
        label={t('signupPage.username')}
        type='text'
        autoFocus
      />

      <FormField
        name='password'
        label={t('signupPage.password')}
        type='password'
      />

      <FormField
        name='confirmPassword'
        label={t('signupPage.passwordRepeat')}
        type='password'
      />

      {error && (
        <Alert variant='danger'>
          {t(error)}
        </Alert>
      )}

      <Button variant='outline-primary' type='submit' className='w-100'>
        {t('signupPage.signup')}
      </Button>
    </Form>
  )
}

export default SignupForm
