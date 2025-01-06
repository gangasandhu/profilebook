import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import UserForm from '../components/UserForm'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../api/users'
import ImageUpload from '../components/ImageUpload'

const EditProfile = () => {
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    const [errors, setErrors] = useState({});


    useEffect(() => {

        if (!user) {
            navigate('/login')
        }
        console.log(user)
    }, [])


    const handleEdit = async (data) => {
        const tempErrors = {};
        if (!data.username) tempErrors.username = 'Username is required';
        if (!data.email) tempErrors.email = 'Email is required';
        if (!data.firstname) tempErrors.firstname = 'First Name is required';
        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0) {
            try {

                const updatedUser = await updateUser(user.id, data)
                setUser(updatedUser)
                navigate(`/profile/${user.id}`)
            } catch (error) {
                setErrors({ ...tempErrors, general: 'Update failed. Please try again.' });
            }
        }
    }

        return (
            <div className='container mx-auto p-8 lg:w-1/2'>
                <h1 className='text-3xl my-8'>Edit Profile</h1>
                <ImageUpload />
                <hr className='my-10' />
                {user && <UserForm formType='profile' onSubmit={handleEdit} initialData={user} errors={errors} />}

            </div>
        )
    }

    export default EditProfile