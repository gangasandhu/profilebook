import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import Logout from './Logout'
import UserNav from './UserNav'

const Navbar = () => {
    const { user, setUser } = useUser()

    return (
        // navbar in tailwind css
        <nav className="bg-gray-100 p-4">
            <div className="mx-auto flex justify-between items-center">
                <Link to="/" className="text-gray-900 text-2xl">ProfileBook</Link>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-gray-900">Home</Link>
                    </li>
                </ul>
                <div>

                    {
                        user ? (
                            <UserNav user={user} />
                        ) : (
                            <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Link>
                        )
                    }
                </div>


            </div>
        </nav>
    )
}

export default Navbar