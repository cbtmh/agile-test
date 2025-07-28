import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
    exp: number;
    username: string;
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            const token = authService.getToken();
            if (!token || token === 'null' || token === 'undefined') {
                authService.logout();
                setIsAuthenticated(false);
                setLoading(false); 
                return;
            }

            try {
                const payload = jwtDecode<JWTPayload>(token);
                const timeUntilExpiry = payload.exp * 1000 - Date.now();
                const username = authService.getUsername();

                if (username?.startsWith('adminRefresh') && timeUntilExpiry < 60000) {
                    console.log('Token sắp hết hạn, đang làm mới...');
                    const newToken = await authService.refreshToken();
                    if (!newToken) {
                        authService.logout();
                        setIsAuthenticated(false);
                    } else {
                        setIsAuthenticated(true);
                        console.log('Token đã được làm mới thành công.');
                    }
                } else if (timeUntilExpiry < 0) {
                    authService.logout();
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.log('Token không hợp lệ, đang đăng xuất.', error);
                authService.logout();
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAndRefreshToken();

    }, []); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;