import { closeModal } from '@slices/modalSlice'
import { removeChannel } from '@thunks/channelThunk'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

const RemoveChannelModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const extraData = useSelector(state => state.modal.extraData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => dispatch(closeModal())

  const handleRemoveChannel = async () => {
    setIsSubmitting(true)
    try {
      await dispatch(removeChannel(extraData.id)).unwrap()
      handleClose()
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Modal.Header onHide={handleClose} closeButton>
        <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('channels.removeChannelWarning')}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
          {t('channels.cancel')}
        </Button>

        <Button variant="danger" onClick={handleRemoveChannel} disabled={isSubmitting}>
          {t('channels.removeChannel')}
        </Button>
      </Modal.Footer>
    </>
  )
}

export default RemoveChannelModal
