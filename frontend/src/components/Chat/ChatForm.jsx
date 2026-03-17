import { selectCurrentChannelId, selectUsername } from '@store/selectors'
import { sendMessage } from '@thunks/messageThunk'
import leoProfanity from '@utils/profanity'
import { useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { TbSquareArrowRight } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'

const ChatForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentChannelId = useSelector(selectCurrentChannelId)
  const username = useSelector(selectUsername)
  const isModalOpen = useSelector(state => state.modal.isOpen)
  const inputRef = useRef(null)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (currentChannelId && !isModalOpen) inputRef.current?.focus()
  }, [currentChannelId, sending, isModalOpen])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim() || sending) return

    setSending(true)
    try {
      await dispatch(sendMessage({
        body: leoProfanity.clean(message.trim()),
        channelId: currentChannelId,
        username,
      })).unwrap()
      setMessage('')
      inputRef.current?.focus()
    }
    finally {
      setSending(false)
    }
  }

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSendMessage} autocomplete="off" noValidate className="py-1 border rounded-2">
        <InputGroup hasValidation>
          <Form.Control
            ref={inputRef}
            name="body"
            aria-label={t('messages.newMessage')}
            placeholder={t('messages.newMessage')}
            className="border-0 p-0 ps-2"
            value={message}
            onChange={e => setMessage(e.target.value)}
            disabled={sending}
          />

          <Button type="submit" variant="outline-secondary" className="btn-group-vertical" disabled={sending}>
            <TbSquareArrowRight size={25} strokeWidth={1} />
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default ChatForm
