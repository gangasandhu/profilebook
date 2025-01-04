import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
