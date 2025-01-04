import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import { getUsers } from '../api/users.js'

const Home = () => {
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