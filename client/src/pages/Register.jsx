// src/components/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import { register } from '../api/auth';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';

const Register = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {

        if (user) {
            navigate('/');
        }

    }, [user]);

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (formData) => {
        // Validate form data
        const tempErrors = {};
        if (!formData.username) tempErrors.username = 'Username is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        if (!formData.password) tempErrors.password = 'Password is required';
        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0) {
            try {
                const userRegistered = await register(formData);
                setUser(userRegistered);
                setSuccessMessage('Registration successful');
            } catch (error) {
                setErrors({ ...tempErrors, general: 'Registration failed. Please try again.' });
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
            {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
            {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}
            <UserForm formType="register" onSubmit={handleRegister} errors={errors} initialData={{ username: '', email: '', firstname: '', lastname: '', password: '' }} />
        </div>
    );
};

export default Register;
