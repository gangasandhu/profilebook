// src/components/UserForm.jsx
import React, { useState } from 'react';

const UserForm = ({ formType, onSubmit, initialData = {}, errors = {} }) => {
    const [formData, setFormData] = useState(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        onSubmit(formData);
        setIsSubmitting(false);
    };

    const renderField = (label, type, name, placeholder) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
        </div>
    );

    return (
        <form onSubmit={handleSubmit}>
            {(formType === 'register' || formType === 'profile') && renderField('Username', 'text', 'username', 'Enter your username')}
            {renderField('Email', 'email', 'email', 'Enter your email')}
            {(formType === 'register' || formType === 'profile') && renderField('First Name', 'text', 'firstname', 'Enter your first name')}
            {(formType === 'register' || formType === 'profile')  && renderField('Last Name', 'text', 'lastname', 'Enter your last name')}
            {formType === 'profile'  && renderField('Bio', 'text', 'bio', 'Enter your bio')}
            {formType !== 'profile' && renderField('Password', 'password', 'password', 'Enter your password')}

            <button
                type="submit"
                className={`w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
};

export default UserForm;
