// src/components/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { login } from '../api/auth';  // Replace with your login API call
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';

const Login = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {

        if (user) {
            navigate('/');
        }

    }, [user]);

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async (formData) => {
        // Validate form data
        const tempErrors = {};
        if (!formData.email) tempErrors.email = 'Email is required';
        if (!formData.password) tempErrors.password = 'Password is required';
        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0) {
            try {
                const userLoggedIn = await login(formData);  // Assuming login API call
                setUser(userLoggedIn);
                setSuccessMessage('Login successful');
            } catch (error) {
                setErrors({ ...tempErrors, general: 'Login failed. Please check your credentials.' });
            }
        }
    };



    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
            {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
            {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}
            <UserForm formType="login" onSubmit={handleLogin} errors={errors} initialData={{ email: '', password: '' }} />
            <p>Don't have an account ?
                <Link to="/register" className="text-blue-500"> Register</Link>
            </p>
        </div>
    );
};

export default Login;
