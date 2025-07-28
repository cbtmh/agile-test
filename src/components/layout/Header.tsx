import { useState, useEffect } from 'react';
import '../../assets/css/header.css';
import logo from '../../assets/images/3.png';
import { useNavigate } from 'react-router';
import { authService } from '../../services/authService';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const isAuth = authService.isAuthenticated();
            setIsLoggedIn(isAuth);
            setUsername(authService.getUsername());
        };

        checkAuth();

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        authService.logout();
        setIsLoggedIn(false);
        setUsername(null);
        navigate('/');
    };

    const handleProfileClick = () => {
        navigate('/profile'); 
    };

    const handleSigninClick = () => {
        navigate('/login');
    };

    return (
        <section className='header-section'>
            <header className="site-header" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="1200">
                <div className="container mx-auto">
                    <div className="header-layout">
                        <div className="header-left">
                            <div className="logo-container">
                                <a href="/">
                                    <img src={logo} alt="Logo" />
                                </a>
                            </div>
                            <nav className="desktop-nav">
                                <ul>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Help</a></li>
                                    <li><a href="#">Features</a></li>
                                    {!isLoggedIn && <li><a href="#">Signup</a></li>}
                                </ul>
                            </nav>
                        </div>

                        <div className="header-center">
                            {isLoggedIn ? (
                                <div className="auth-buttons-container">
                                     <button className="auth-btn" onClick={handleProfileClick}>Profile</button>
                                    <button className="auth-btn" onClick={handleLogout}>Logout</button>
                                </div>
                            ) : (
                                <button className="request-demo-btn" onClick={handleSigninClick}>
                                    Sign in
                                    <span className="arrow">→</span>
                                </button>
                            )}
                        </div>

                        <div className="header-right">
                            <button
                                className="hamburger-button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12H21" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 6H21" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 18H21" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <nav>
                            <ul>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Help</a></li>
                                <li><a href="#">Features</a></li>
                                {!isLoggedIn && <li><a href="#">Signup</a></li>}
                                {isLoggedIn ? (
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                ) : (
                                    <li><a href="/login">Sign in</a></li>
                                )}
                            </ul>
                        </nav>
                    </div>
                )}
            </header>
        </section>
    );
};

export default Header;