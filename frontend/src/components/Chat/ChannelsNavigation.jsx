import { Button, Nav } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectChannels, selectCurrentChannelId } from '../../slices/selectors'
import { setCurrentChannel } from '../../slices/slices/channelsSlice'

// Здесь нужно будет отображать новые каналы с кнопкой для выпадающего меню
const ChannelsNavigation = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(selectChannels)
  const currentChannelId = useSelector(selectCurrentChannelId)

  // Структура канала { id: '3', name: 'new channel', removable: true }

  return (
    <Nav
      id='channels-box'
      className='flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
      variant='pills'
    >
      {channels.map((channel) => (
        <Nav.Item key={channel.id} className='w-100'>
          <Button
            variant={channel.id === currentChannelId ? 'secondary' : ''}
            className='w-100 rounded-0 text-start'
            onClick={() => dispatch(setCurrentChannel(channel.id))}
          >
            <span className='me-1'>{t('channels.channelPrefix')}</span>
            {channel.name}
          </Button>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default ChannelsNavigation
