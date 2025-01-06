import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ user }) => {
  
    return (
        <div>
            {/* // card with user's username and email */}
            <Link to={`/profile/${user.id}`}>
                <div className="flex items-center justify-center bg-white shadow-lg rounded-lg">
                    <img src={user.image} alt={user.username} className="rounded-full w-[64px] h-[64px] object-cover" />

                    <div className="text-left py-4 px-8 my-4">
                        <h2 className="text-xl font-semibold">{user.username}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default UserCard