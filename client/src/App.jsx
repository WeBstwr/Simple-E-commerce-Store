import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/global.css'
import Home from './pages/Home/Home.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import About from './pages/About/About.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
