import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUser } from '../api/users.js'
import { useUser } from '../context/UserContext.jsx';
import { FaEdit } from "react-icons/fa";


const Profile = () => {
    const { id } = useParams();

    const { user } = useUser();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {

            const profile = await getUser(id);
            setProfile(profile);
        }
        fetchProfile();
    }
        , [id]);

    return (
        <div>

            <div className='container mx-auto'>
                {profile ? (
                    <div className="border p-4 my-4">
                        <img src={profile.image} alt={profile.username} className="rounded-full w-[300px] h-[300px] object-cover mx-auto" />
                        <h2 className="text-xl font-semibold">{profile.username}</h2>
                        <p className="text-gray-500">{profile.email}</p>
                        {user?.id === parseInt(id) && (
                            <Link to={`/profile/edit/${id}`}>
                                <button className="button flex items-center gap-x-2 mx-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 my-2 rounded">
                                    <FaEdit size={16} /> Edit Profile
                                </button>
                            </Link>
                        )}
                        <div id='info' className='my-4'>
                            <h1 className='text-3xl '>{profile.firstname} {profile.lastname}</h1>
                            <p>{profile.bio ? profile.bio : 'No bio available'}</p>
                        </div>
                    </div>
                ) : (
                    <div>profile not found</div>
                )}
            </div>
        </div>
    )
}

export default Profile