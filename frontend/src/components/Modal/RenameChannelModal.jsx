import { closeModal } from '@slices/modalSlice'
import { selectChannelsNames } from '@store/selectors'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import FormInModal from './FormInModal'

const RenameChannelModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const existingChannels = useSelector(selectChannelsNames)

  const handleClose = () => dispatch(closeModal())

  return (
    <>
      <Modal.Header onHide={handleClose} closeButton>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>
      <FormInModal />
    </>
  )
}

export default RenameChannelModal
