import { closeModal } from '@slices/modalSlice'
import { selectChannelsNames } from '@store/selectors'
import { renameChannel } from '@thunks/channelThunk'
import leoProfanity from '@utils/profanity'
import { getChannelSchema } from '@utils/schema/channelSchema'
import { Formik } from 'formik'
import { useEffect, useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import FormField from '../Ui/FormField'

const RenameChannelModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const existingChannels = useSelector(selectChannelsNames)
  const extraData = useSelector(state => state.modal.extraData)
  const modalRef = useRef(null)

  useEffect(() => {
    modalRef.current?.focus()
    modalRef.current?.select()
  }, [])

  const handleClose = () => dispatch(closeModal())

  const handleRenameChannel = async (values, { setSubmitting }) => {
    try {
      const cleanName = leoProfanity.clean(values.name.trim())
      await dispatch(renameChannel({ id: extraData.id, name: cleanName })).unwrap()
      handleClose()
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Modal.Header onHide={handleClose} closeButton>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: extraData.name }}
        validationSchema={getChannelSchema(t, existingChannels, extraData.id)}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleRenameChannel}
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
                  ref={modalRef}
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

export default RenameChannelModal
