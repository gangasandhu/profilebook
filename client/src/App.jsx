import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Header/Navbar'
import Profile from './pages/Profile'
import { useUser } from './context/UserContext'
import { useEffect } from 'react'
import { getAuthUser } from './api/auth'
import Register from './pages/Register'
import Login from './pages/Login'
import EditProfile from './pages/EditProfile'


function App() {
  const { user, setUser } = useUser()

  useEffect(() => {
    const fetchAuthUser = async () => {
      const data = await getAuthUser()
      setUser(data)
    }
    fetchAuthUser()
  }, [])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/edit/:id" element={<EditProfile />} />

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />


        </Routes>
      </Router>
    </>
  )
}

export default App
