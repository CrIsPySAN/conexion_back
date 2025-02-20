import axios from 'axios';
import api from './config';

export const testConnection = async () => {
    try {
        const response = await api.get('/test-connection/');
        console.log('Conexión exitosa:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error de conexión:', error);
        if (axios.isAxiosError(error)) {
            throw {
                message: error.response?.data?.message || 'Error de conexión con el servidor',
                status: error.response?.status
            };
        }
        throw error;
    }
};