import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ user }) => {
    return (
        <div>
            {/* // card with user's username and email */}
            <Link to={`/profile/${user.id}`}>
                <div className="border p-4 my-4">
                    <h2 className="text-xl font-semibold">{user.username}</h2>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            </Link>
        </div>
    )
}

export default UserCard