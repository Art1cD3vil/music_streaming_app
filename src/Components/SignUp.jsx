import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css'; // Link to the CSS file for styling
import axios from 'axios'; // Ensure you have axios installed

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        dob: '',
        password: ''
    });

    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/register', formData);
            setMessage({ text: response.data.message, type: 'success' });

            // Redirect to Home.jsx on success
            navigate('/home'); // Navigate to home page
        } catch (error) {
            setMessage({ text: error.response.data.message || 'Error creating user.', type: 'error' });
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h2 className="title">Sign Up</h2>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                </div>

                <button type="submit">Sign Up</button>

                {message.text && (
                    <p className={message.type === 'error' ? 'error' : 'success'}>{message.text}</p>
                )}

                <nav className="nav-container">
                    <a href="/login">Already have an account? Log in</a>
                </nav>
            </form>
        </div>
    );
};

export default Signup;
