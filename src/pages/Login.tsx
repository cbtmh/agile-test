import React, { useState } from 'react';
import '../assets/css/Login.css';
import logo from '../assets/images/3.png';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setMessage('');

        if (!username) {
            setError('Username is required');
            return;
        }

        try {
            // Check if it's a refresh token test account
            if (username.startsWith('adminRefresh') && !isNaN(Number(username.slice(11)))) {
                setMessage('This is a refresh token test account. Your token will expire in 2 minutes.');
            }

            await authService.login(username);
            navigate('/profile'); // Redirect to profile page after successful login
        } catch (err) {
            if (err instanceof Error) {
                if (err.message === 'Invalid username') {
                    setError('Invalid username. Use admin/admin1/admin2 for regular testing or adminRefresh[0-10] for refresh token testing.');
                } else {
                    setError('Login failed. Please try again.');
                }
            }
        }
    };

    return (
        <div className="login-page">
            <header>
                <img src={logo} alt="Company Logo" className="logo" />
            </header>

            <main className="login-container">
                <h1>Sign In</h1>
                <form onSubmit={handleSignIn} className="login-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="info-message">{message}</div>}
                    <button type="submit">Sign In</button>
                </form>
            </main>
        </div>
    );
};

export default LoginPage;