import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

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

                    <li>
                        <Link to="/add" className="text-gray-900">Register</Link>
                    </li>
                </ul>
                <div>

                    {
                        user ? (
                            <div>
                                {user.username}
                                {/* <button onClick={() => setUser(null)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button> */}
                            </div>
                        ) : (
                            <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</Link>
                        )
                    }
                </div>


            </div>
        </nav>
    )
}

export default Navbar