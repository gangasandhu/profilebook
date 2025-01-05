// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { register } from '../api/auth';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const { user, setUser } = useUser();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.username) tempErrors.username = 'Username is required';
        if (!formData.email) tempErrors.email = 'Email is required';
        if (!formData.password) tempErrors.password = 'Password is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validate()) {
            // You can send formData to your server here
            const userRegistered = await register(formData);
            setUser(userRegistered);
            setSuccessMessage('Registration successful');
        } else {
            setSuccessMessage('Form validation failed');
        }
        setFormData({
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            password: '',
        });
        setIsSubmitting(false);

        setTimeout(() => {
            navigate('/');
        }, 1000);

    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
            <form onSubmit={handleSubmit}>
                {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your first name"
                    />
                    {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your last name"
                    />
                    {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Auth;
