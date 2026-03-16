import { selectMessagesByCurrentChannel } from '@store/selectors'
import { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const ChatHistory = () => {
  const { t } = useTranslation()
  const messages = useSelector(selectMessagesByCurrentChannel)
  const messagesRef = useRef(null)

  useEffect(() => {
    messagesRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <Container ref={messagesRef} id="messages-box" className="chat-messages overflow-auto px-5">
      {messages.map(message => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>
          <span className="me-1">
            {t('messages.messagePrefix')}
          </span>
          {message.body}
        </div>
      ))}
    </Container>
  )
}

export default ChatHistory
