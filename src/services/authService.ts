const API_URL = import.meta.env.VITE_AUTH_API_URL;

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

interface RefreshResponse {
    accessToken: string;
}

export const authService = {
    async login(username: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        const data: AuthResponse = await response.json();

        if (!response.ok) {
            const errorData = data as any;
            throw new Error(errorData.message || 'Login failed');
        }

        if (data.accessToken) {
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('username', username);
        } else {
            throw new Error('Login response did not include a token.');
        }

        return data;
    },

    async logout(): Promise<void> {
        const token = this.getToken();

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');

        if (token) {
            try {

                await fetch(`${API_URL}/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            } catch (error) {
                console.error("Failed to call logout API, but user is logged out locally.", error);
            }
        }
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    async refreshToken(): Promise<string | null> {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            return null;
        }

        try {

            const response = await fetch(`${API_URL}/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data: RefreshResponse = await response.json();

            localStorage.setItem('token', data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error(error);
            await this.logout();
            return null;
        }
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    },

    getUsername(): string | null {
        return localStorage.getItem('username');
    }
};