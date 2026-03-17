import { closeModal } from '@slices/modalSlice'
import { selectChannelsNames } from '@store/selectors'
import { createChannel } from '@thunks/channelThunk'
import leoProfanity from '@utils/profanity'
import { getChannelSchema } from '@utils/schema/channelSchema'
import { Formik } from 'formik'
import { Button, Form, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import FormField from '../Ui/FormField'

const AddChannelModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const existingChannels = useSelector(selectChannelsNames)

  const handleClose = () => dispatch(closeModal())

  const handleCreateChannel = async (values, { setSubmitting }) => {
    try {
      const cleanName = leoProfanity.clean(values.name.trim())
      await dispatch(createChannel(cleanName)).unwrap()
      handleClose()
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Modal.Header onHide={handleClose} closeButton>
        <Modal.Title>{t('channels.createChannel')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: '' }}
        validationSchema={getChannelSchema(t, existingChannels)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleCreateChannel}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} autocomplete="off">
            <Modal.Body>
              <Form.Group>
                <FormField
                  name="name"
                  label={t('channels.channel')}
                  type="text"
                  autoFocus
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
                {t('channels.cancel')}
              </Button>

              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {t('channels.send')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AddChannelModal
