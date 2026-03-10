import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ChannelActions = ({ channel, isActive, onSelect }) => {
  const { t } = useTranslation()

  return (
    <ButtonGroup className='w-100'>
      <Button
        variant={isActive ? 'secondary' : ''}
        className='w-100 rounded-0 text-start text-truncate flex-grow-0'
        onClick={() => onSelect(channel.id)}
      >
        <span className='me-1'>{t('channels.channelPrefix')}</span>
        {channel.name}
      </Button>

      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle split variant={isActive ? 'secondary' : ''} id={`dropdown-${channel.id}`}>
          <span className='visually-hidden'>{t('channels.controlChannel')}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            {t('channels.removeChannel')}
          </Dropdown.Item>
          <Dropdown.Item>
            {t('channels.renameChannel')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  )
}

export default ChannelActions
