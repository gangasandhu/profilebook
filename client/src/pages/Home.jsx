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
        <div>
            <h1>ProfileBook</h1>
            {users && users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}

        </div>
    )
}

export default Home