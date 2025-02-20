import api from './config';

export interface Encuesta {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_creacion: string;
    creador: number;
    experiencia?: number;
    preguntas: Pregunta[];
}

export interface Pregunta {
    id: number;
    texto: string;
    orden: number;
    opciones: OpcionRespuesta[];
}

export interface OpcionRespuesta {
    id: number;
    texto: string;
    orden: number;
}

export const encuestasService = {
    async getAll() {
        const response = await api.get<Encuesta[]>('/encuestas/');
        return response.data;
    },

    async getById(id: number) {
        const response = await api.get<Encuesta>(`/encuestas/${id}/`);
        return response.data;
    },

    async create(data: Omit<Encuesta, 'id' | 'fecha_creacion' | 'creador'>) {
        const response = await api.post<Encuesta>('/encuestas/', data);
        return response.data;
    },

    async responder(preguntaId: number, opcionId: number) {
        const response = await api.post('/respuestas/', {
            pregunta: preguntaId,
            opcion: opcionId,
        });
        return response.data;
    },
};