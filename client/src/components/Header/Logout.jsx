import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Logout = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('AuthenticatedUser');
        setUser(null);
        // Redirect to the login page
        navigate('/login');
    }
  return (
    <p onClick={handleLogout } className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100">
        Logout
    </p>
  )
}

export default Logout