import axios from 'axios'


export const createPaciente = (paciente) => {
    const newPaciente = axios.post('http://localhost:8000/api/paciente', paciente);
    return newPaciente;
}

export const getAllPacientes = () => axios.get('http://localhost:8000/api/paciente');

export const deletePaciente = (id) => axios.delete(`http://localhost:8000/api/paciente/${id}`);

export const updatePaciente = (id, paciente) => axios.put(`http://localhost:8000/api/paciente/${id}`, paciente);

export const getPaciente = (id) => axios.get(`http://localhost:8000/api/paciente/${id}`);

export const addTratamientoToPaciente = (id, tratamiento) => axios.post(`http://localhost:8000/api/paciente/tratamiento/${id}`, tratamiento);

export const getTratamientosFP = (id) => axios.get(`http://localhost:8000/api/paciente/tratamiento/${id}`);