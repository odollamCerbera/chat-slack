import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChannels, fetchMessages } from '../../slices/thunks/chatThunks'
import ChannelsNavigation from './ChannelsNavigation'
import ChannelsNavigationHeader from './ChannelsNavigationHeader'
import ChatForm from './ChatForm'
import ChatHeader from './ChatHeader'
import ChatHistory from './ChatHistory'

// В демо спиннер во время загрузки - нужно будет добавить
const ChatCard = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchChannels())
      dispatch(fetchMessages())
    }
  }, [dispatch, isAuthenticated])

  return (
    <Container className='h-100 my-4 overflow-hidden rounded shadow'>
      <Row className='h-100 bg-white flex-md-row'>
        <Col xs={4} md={2} className='border-end px-0 bg-light flex-column h-100 d-flex'>
          <ChannelsNavigationHeader />
          <ChannelsNavigation />
        </Col>

        <Col className='p-0 h-100'>
          <div className='d-flex flex-column h-100'>
            <ChatHeader />
            <ChatHistory />
            <ChatForm />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ChatCard
