import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Auth from './pages/Auth'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path='/register' element={<Auth />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
