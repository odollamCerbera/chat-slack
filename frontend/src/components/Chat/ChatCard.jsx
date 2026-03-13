import { selectChannelsLoading, selectMessagesLoading } from '@store/selectors'
import { fetchChannels } from '@thunks/channelThunk'
import { fetchMessages } from '@thunks/messageThunk'
import { useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ChannelsNavigation from './ChannelsNavigation'
import ChannelsNavigationHeader from './ChannelsNavigationHeader'
import ChatForm from './ChatForm'
import ChatHeader from './ChatHeader'
import ChatHistory from './ChatHistory'

const ChatCard = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const channelsLoading = useSelector(selectChannelsLoading)
  const messagesLoading = useSelector(selectMessagesLoading)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchChannels())
      dispatch(fetchMessages())
    }
  }, [dispatch, isAuthenticated])

  const isLoading = channelsLoading === 'pending' || messagesLoading === 'pending'

  if (isLoading) {
    return (
      <Container className="h-100 my-4 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelsNavigationHeader />
          <ChannelsNavigation />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
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
