import { useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { TbSquareArrowRight } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentChannelId, selectUsername } from '../../slices/selectors'
import { sendMessage } from '../../slices/thunks/messageThunk'

const ChatForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentChannelId = useSelector(selectCurrentChannelId)
  const username = useSelector(selectUsername)
  const inputRef = useRef(null)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentChannelId, sending])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim() || sending) return

    setSending(true)
    try {
      await dispatch(sendMessage({ body: message.trim(), channelId: currentChannelId, username })).unwrap()
      setMessage('')
      inputRef.current?.focus()
    } catch (error) {

    } finally {
      setSending(false)
    }
  }

  return (
    < div className='mt-auto px-5 py-3' >
      <Form onSubmit={handleSubmit} noValidate className='py-1 border rounded-2'>
        <InputGroup hasValidation>
          <Form.Control
            ref={inputRef}
            name='body'
            aria-label={t('messages.newMessage')}
            placeholder={t('messages.newMessage')}
            className='border-0 p-0 ps-2'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={sending}
          />

          <Button type='submit' variant='outline-secondary' className='btn-group-vertical' disabled={sending}>
            <TbSquareArrowRight size={25} strokeWidth={1} />
          </Button>
        </InputGroup>
      </Form>
    </div >
  )
}

export default ChatForm
