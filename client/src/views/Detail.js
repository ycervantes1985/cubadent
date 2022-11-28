import React from 'react';
import { useEffect, useState } from 'react';
import {useParams,useNavigate,Link} from "react-router-dom"
import { simpleGet } from '../services/simpleGet';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import Button from 'react-bootstrap/Button';



const Detail = () => {

    const {id} = useParams()
    const [tratamientos, setTratamientos] = useState()
    const [paciente, setPaciente] = useState()
    const navigate = useNavigate()


    const getPaciente = async() => {
        const response = await simpleGet("http://localhost:8000/api/paciente/" + id)
        setPaciente(response.data.paciente)        
    }


    const getPacienteT = async() => {
        const response = await simpleGet("http://localhost:8000/api/paciente/tratamiento/" + id)
        setTratamientos(response.data.tratamientos)        
    }

    useEffect(() => {
        getPacienteT()
        getPaciente() 
          
    }, []);

    const goToBack = () =>{navigate(`/home`)}

    const addTratamiento = id =>{  navigate(`/add-tratamiento/${id}`)  }

    function sortByDate(a, b) {
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        return 0;
    }


    tratamientos?.sort(sortByDate)

    console.log("Tratamientos ordenados",tratamientos)
    


    return (
        <div>
            <div>
               {paciente &&
               <div>
                <div className='detail-top'>
                    <div>
                        <h2>{paciente.name} {paciente.apellidos}</h2>
                    </div>
                    <div>
                        <h2 className='emergencia'>{paciente.telefonoEm}</h2>
                        
                    </div>                     
                </div> 
                <div className='preexistencias-top'>
                    <div>
                        <h5>Antecendentes: {paciente.antecedentesEnfermedades}</h5>
                    </div> 
                    <div>
                        <h5>Tratamiento Medico: {paciente.tratamientoMedico}</h5>
                    </div>                   
                    <div>                      
                        <h5>Alergias: {paciente.alergias}</h5>
                    </div>
                </div>  
            </div>                       
                }
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tratamientos?.map((tratamiento)=>
                    <tr key= {tratamiento._id}>
                        <th scope="row">{moment(tratamiento.createdAt).format('DD-MM-YYYY')}</th>
                        <td> {tratamiento.descripcion} </td>
                        <td> 
                        {tratamiento.estatus}
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table> 
            <Button onClick={goToBack}>Volver</Button> 
            <Button variant='success' onClick={() => addTratamiento(paciente._id)}>Adicionar</Button>
        </div>
    );
}

export default Detail;
