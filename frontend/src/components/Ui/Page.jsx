import NavbarPage from '../Header/NavbarPage'

const Page = ({ children }) => (
  <div className="d-flex flex-column h-100">
    <NavbarPage />
    {children}
  </div>
)

export default Page
