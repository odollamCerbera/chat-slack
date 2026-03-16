import { useRollbar } from '@rollbar/react'

const TestRollbar = () => {
  const rollbar = useRollbar()

  const handleSendTestMessage = () => rollbar.info('Test message from React')

  const handleTriggerError = () => {
    throw new Error('Test error from React ErrorBoundary')
  }

  return (
    <div>
      <button onClick={handleSendTestMessage}>
        Send Test Message
      </button>
      <button onClick={handleTriggerError}>
        Trigger Test Error
      </button>
    </div>
  )
}

export default TestRollbar
