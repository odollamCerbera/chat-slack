import Header from './Header/Header'

const Page = ({ children }) => (
  <div className='d-flex flex-column h-100'>
    <Header />
    {children}
  </div>
)

export default Page
