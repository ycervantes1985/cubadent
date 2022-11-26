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

    
    return (
        <div>
            <div>
               {paciente &&
                <div className='detail-top'>
                    <div>
                        <h2>{paciente.name} {paciente.apellidos}</h2>
                    </div>
                    <div>
                        <h2 className='emergencia'>{paciente.telefonoEm}</h2>
                        
                    </div>  
                </div>                          
                }
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tratamientos?.map((tratamiento)=>
                    <tr key= {tratamiento._id}>
                        <th scope="row">{moment(tratamiento.createAd).format('DD-MM-YYYY')}</th>
                        <td> {tratamiento.descripcion} </td>
                        <td> 
                        {tratamiento.estatus}
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table> 
            <Button onClick={goToBack}>Volver</Button> 
        </div>
    );
}

export default Detail;
