import { selectCurrentChannelName, selectMessagesCount } from '@store/selectors'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const ChatHeader = () => {
  const { t } = useTranslation()
  const channelName = useSelector(selectCurrentChannelName)
  const messagesCount = useSelector(selectMessagesCount)

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          {t('channels.channelPrefix')}
          {channelName}
        </b>
      </p>
      <span className="text-muted">
        {t('messages.count', { count: messagesCount })}
      </span>
    </div>
  )
}

export default ChatHeader
