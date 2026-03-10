import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { TbSquarePlus } from 'react-icons/tb'
import AddChannelModal from '../Modal/AddChannelModal'

const ChannelsNavigationHeader = () => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  return (
    <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
      <b>{t('channels.channels')}</b>
      <Button onClick={handleOpen} variant='link' className='p-0 text-primary btn-group-vertical'>
        <TbSquarePlus size={25} strokeWidth={1} />
      </Button>
      {showModal &&
        <AddChannelModal show={showModal} onHide={handleClose} />
      }
    </div>
  )
}

export default ChannelsNavigationHeader
