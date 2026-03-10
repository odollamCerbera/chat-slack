import { Formik } from 'formik'
import { Button, Form, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectChannelsNames } from '../../slices/selectors'
import { createChannel } from '../../slices/thunks/channelThunk'
import { getChannelSchema } from '../../utils/schema/channelSchema'
import FormField from '../FormField'
import leoProfanity from '../../utils/profanity'

const AddChannelModal = ({ show, onHide }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const existingChannels = useSelector(selectChannelsNames)

  return (
    <Modal show={show} onHide={onHide} restoreFocus={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.createChannel')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: '' }}
        validationSchema={getChannelSchema(t, existingChannels)}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const cleanName = leoProfanity.clean(values.name.trim())
            await dispatch(createChannel(cleanName)).unwrap()
            onHide()
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group>
                <FormField
                  name='name'
                  label={t('channels.channel')}
                  type='text'
                  autoFocus
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={onHide} disabled={isSubmitting}>
                {t('channels.cancel')}
              </Button>

              <Button type='submit' variant='primary' disabled={isSubmitting}>
                {t('channels.send')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal >
  )
}

export default AddChannelModal
