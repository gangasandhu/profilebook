import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    // navbar in tailwind css
    <nav className="bg-gray-100 p-4">
      <div className="mx-auto flex justify-between items-center">
        <h1 className="text-gray-900 text-2xl">ProfileBook</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-900">Home</Link>
          </li>
          <li>
            <Link to="/add" className="text-gray-900">Add</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar