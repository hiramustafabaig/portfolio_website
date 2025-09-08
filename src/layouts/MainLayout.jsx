// src/layouts/MainLayout.jsx
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout