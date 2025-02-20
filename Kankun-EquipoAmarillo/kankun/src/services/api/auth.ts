import api from './config';

interface LoginData {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    refresh: string;
    message: string;
}

export const authService = {
    async login(data: LoginData) {
        try {
            const response = await api.post<LoginResponse>('/token/', data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refresh', response.data.refresh);
            return response.data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};