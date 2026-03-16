import { setCurrentChannel } from '@slices/channelsSlice'
import { selectChannels, selectCurrentChannelId } from '@store/selectors'
import { Button, Nav } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import ChannelActions from './ChannelActions'

const ChannelsNavigation = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(selectChannels)
  const currentChannelId = useSelector(selectCurrentChannelId)

  const handleSelect = id => dispatch(setCurrentChannel(id))

  return (
    <Nav
      id="channels-box"
      className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      variant="pills"
    >
      {channels.map(channel => (
        <Nav.Item key={channel.id} className="w-100">
          {channel.removable
            ? (
                <ChannelActions
                  channel={channel}
                  isActive={channel.id === currentChannelId}
                  onSelect={() => handleSelect(channel.id)}
                />
              )
            : (
                <Button
                  variant={channel.id === currentChannelId ? 'secondary' : ''}
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={() => handleSelect(channel.id)}
                >
                  <span className="me-1">
                    {t('channels.channelPrefix')}
                  </span>
                  {channel.name}
                </Button>
              )}
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default ChannelsNavigation
