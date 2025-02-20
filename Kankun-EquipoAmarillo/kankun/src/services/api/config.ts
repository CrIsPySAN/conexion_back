import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Necesario para CORS
});

// Interceptor para agregar el token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Cambiamos para usar el formato correcto de JWT
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores y refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si es error 401 y no es test-connection ni intento de refresh
        if (
            error.response?.status === 401 && 
            !originalRequest.url?.includes('test-connection') &&
            !originalRequest.url?.includes('token/refresh')
        ) {
            // Intentar refresh token
            const refreshToken = localStorage.getItem('refresh');
            
            if (refreshToken) {
                try {
                    const response = await axios.post(`${API_URL}/token/refresh/`, {
                        refresh: refreshToken
                    });

                    if (response.data.access) {
                        localStorage.setItem('token', response.data.access);
                        
                        // Actualizar el token en la petición original y reintentar
                        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                        return axios(originalRequest);
                    }
                } catch (refreshError) {
                    // Si falla el refresh, logout
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
            } else {
                // No hay refresh token, logout directo
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;