import { openModal } from '@slices/modalSlice'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { TbSquarePlus } from 'react-icons/tb'
import { useDispatch } from 'react-redux'

const ChannelsNavigationHeader = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleOpen = () => dispatch(openModal({ type: 'addChannel' }))

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('channels.channels')}</b>
      <Button onClick={handleOpen} variant="link" className="p-0 text-primary btn-group-vertical">
        <span>
          {t('channels.channelAdd')}
        </span>
        <TbSquarePlus size={25} strokeWidth={1} />
      </Button>
    </div>
  )
}

export default ChannelsNavigationHeader
