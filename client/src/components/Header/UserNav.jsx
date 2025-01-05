import React, { useState } from 'react'
import Logout from './Logout';
import { Link } from 'react-router-dom';

const UserNav = ({user}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div>
        <div>
                <div className="flex items-center space-x-4 cursor-pointer">
                  <div  onClick={() => setIsDropdownOpen((prev) => !prev)}> {user.username} </div>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute text-left right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <ul className="py-1">
                      <li>
                        <Link
                          to={`/profile/${user.id}`}
                          className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                       
                      <li>
                        <Logout />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
    </div>
  )
}

export default UserNav