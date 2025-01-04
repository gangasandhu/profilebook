import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../api/users.js'

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(id);
            setUser(user);
        }
        fetchUser();
    }
        , [id]);

    return (
        <div>

            <div className='container mx-auto'>
                {user ? (
                    <div className="border p-4 my-4">
                        <h2 className="text-xl font-semibold">{user.username}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        <p>{user.firstname} {user.lastname}</p>
                        <p>{user.bio ? user.bio : 'No bio available'}</p>
                    </div>
                ) : (
                    <div>User not found</div>
                )}
            </div>
        </div>
    )
}

export default Profile