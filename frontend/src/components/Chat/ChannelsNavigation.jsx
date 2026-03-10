import { Button, Nav, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectChannels, selectCurrentChannelId } from '../../slices/selectors'
import { setCurrentChannel } from '../../slices/slices/channelsSlice'
import { removeChannel, renameChannel } from '../../slices/thunks/channelThunk'
import ChannelActions from './ChannelActions'

/*
Реализуйте удаление канала (с подтверждением). Удаляться могут только вновь созданные каналы. При удалении канала должны удаляться и его сообщения, а пользователи, находящиеся в удаляемом канале, должны быть перемещены в дефолтный канал
Реализуйте переименование канала (внутри модального окна). Имена каналов не должны повторяться
*/

const ChannelsNavigation = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(selectChannels)
  const currentChannelId = useSelector(selectCurrentChannelId)

  const handleSelect = (id) => dispatch(setCurrentChannel(id))

  return (
    <Nav
      id='channels-box'
      className='flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
      variant='pills'
    >
      {channels.map((channel) => (
        <Nav.Item key={channel.id} className='w-100'>
          {channel.removable ? (
            <ChannelActions
              channel={channel}
              isActive={channel.id === currentChannelId}
              onSelect={handleSelect}
            />
          ) : (
            <Button
              variant={channel.id === currentChannelId ? 'secondary' : ''}
              className='w-100 rounded-0 text-start text-truncate'
              onClick={() => dispatch(setCurrentChannel(channel.id))}
            >
              <span className='me-1'>{t('channels.channelPrefix')}</span>
              {channel.name}
            </Button>
          )}
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default ChannelsNavigation
