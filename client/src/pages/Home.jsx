import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import { getUsers } from '../api/users.js'
import { useUser } from '../context/UserContext.jsx'

const Home = () => {
    const { user } = useUser();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsers(users);
        }
        fetchUsers();
    }, []);

    return (
        <div className='container mx-auto p-8'>
            <h1 className='text-3xl font-extrabold'>ProfileBook</h1>
            <div className='container mx-auto flex flex-wrap gap-4 justify-center'>
            {users && users.map(user => (
                
                <UserCard key={user.id} user={user} />
                
            ))}
            </div>

        </div>
    )
}

export default Home