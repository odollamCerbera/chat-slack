import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectMessagesByCurrentChannel } from '../../slices/selectors'

// Здесь нужно реализовать отображение сообщений в каналах и скролл
const ChatHistory = () => {
  const { t } = useTranslation()
  const messages = useSelector(selectMessagesByCurrentChannel)

  // Структура сообщения { id: '1', body: 'text message', channelId: '1', username: 'admin' }

  return (
    <Container id='messages-box' className='chat-messages overflow-auto px-5'>
      {messages.map((message) => (
        <div className='text-break mb-2' key={message.id}>
          <b>{message.username}</b>
          <span className='me-1'>{t('messages.messagePrefix')}</span>
          {message.body}
        </div>
      ))
      }
    </Container>
  )
}

export default ChatHistory
