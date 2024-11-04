import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState(''); // Changed from username to email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', { username: email, password }); // Send email as username
            setSuccess(response.data.message);
            setError('');

            // Navigate to the home page on successful login
            navigate('/home');
        } catch (err) {
            setError('Login failed');
        }
    };

    return (
        <div className="container min-h-screen bg-black flex items-center justify-center p-4">
            <form onSubmit={handleLogin} className="max-w-md w-full space-y-8">
                <h2 className="text-center text-3xl font-extrabold text-white">Log in to Spotify</h2>
                <div>
                    <label className="sr-only">Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="sr-only">Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>
                {error && <p className="error text-red-500">{error}</p>}
                {success && <p className="success text-green-500">{success}</p>}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Login
                </button>
            </form>

            <div className="nav-container text-center text-white mt-4">
                <span>Don't have an account? </span>
                <a href="/signup" className="text-green-400">Sign Up</a>
            </div>
        </div>
    );
};

export default Login;
