import axios from 'axios'


export const createPaciente = (paciente) => {
    const newPaciente = axios.post('/api/paciente', paciente);
    return newPaciente;
}

export const getAllPacientes = () => axios.get('/api/paciente');

export const deletePaciente = (id) => axios.delete(`/api/paciente/${id}`);

export const updatePaciente = (id, paciente) => axios.put(`/api/paciente/${id}`, paciente);

export const getPaciente = (id) => axios.get(`/api/paciente/${id}`);

export const addTratamientoToPaciente = (id, tratamiento) => axios.post(`/api/paciente/tratamiento/${id}`, tratamiento);

export const getTratamientosFP = (id) => axios.get(`/api/paciente/tratamiento/${id}`);