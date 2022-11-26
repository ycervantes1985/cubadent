import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useUser } from "../contexts/userContext";
import { simpleGet } from '../services/simpleGet'

function Home() {

    const {user,setUser} = useUser();
    const [pacientes, setPaciente] = useState();
    

    useEffect(() => {
        traerPacientes()
}, []);   

const traerPacientes = async() =>{
    const response = await simpleGet("http://localhost:8000/api/paciente")
    console.log(response)
    setPaciente(response.data.pacientes)
}



console.log(user)
    
  return (
    <div>
     {user && 
      <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes?.map((paciente)=>
                    <tr key= {paciente._id}>
                        <th scope="row">{paciente.name}  {paciente.apellidos} </th>
                        <td> {paciente.telefono} </td>
                        <td> 
                            <Link to={`/paciente/tratamiento/${paciente._id}`}>Tratamientos</Link>
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table>        
            
}  
    </div>
  )
}

export default Home