import React, { useState, useEffect } from "react";
import { createPaciente, getPaciente, updatePaciente } from "../services/paciente-service"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'



const PacienteForm = () => {
    const [paciente, setPaciente] = useState({
        name: '',
        apellidos: '',
        direccion: '',
        rut: '',
        telefono: '',
        telefonoEm: '',
        edad: 0,
        antecedentesEnfermedades: '',
        tratamientoMedico: '',
        alergias: '',
        diagnostico: '',
        
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const getOnePaciente = async () => {
        try {
            const pacienteFromService = await getPaciente(id);
            
            setPaciente(pacienteFromService.data.paciente);
        } catch(err) {
            console.log("Error", err);
        }
    }

    useEffect(() => {
        
        id && getOnePaciente();
    }, [id])

    useEffect(() => {
        console.log( paciente)

    }, [paciente])

    const goToBack = () =>{navigate(`/home`)}
    
    const addPaciente = async (values) => {
        console.log("🚀 ~ file: PackageForm.js ~ line 51 ~ addTravel ~ values", values)
        try {
            const createPacienteInService = !id ? await createPaciente(values) : await updatePaciente(id, values);
            Swal.fire('Se ha creado un paciente')            
            navigate('/home')
            return createPacienteInService;
        } catch(err) {
            console.log("Error", err);
        }
    }

    const pacienteSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "El nombre del paquete turí­stico no puede tener menos de 2 caracteres")
            .required("Este campo es obligatorio"),

        apellidos: Yup.string()
            .required("Este campo es obligatorio"),

        direccion: Yup.string()
            .required("Este campo es obligatorio"),

        rut: Yup.string()
            .required("Este campo es obligatorio"),

        telefono: Yup.string()
            .required("Este campo es obligatorio"),

        telefonoEm: Yup.string()
            .required("Este campo es obligatorio"),

        edad: Yup.number()
            .min(1, "El valir debe superar 1 caracter de largo")
            .required("Este campo es obligatorio"),

        antecedentesEnfermedades: Yup.string()
            .required("Este campo es obligatorio"),
        
        tratamientoMedico: Yup.string()
            .required("Este campo es obligatorio"),

        alergias: Yup.string()
            .required("Este campo es obligatorio"),

        diagnostico: Yup.string()
            .required("Este campo es obligatorio"),

});

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={paciente}
                validationSchema={pacienteSchema}
                onSubmit={(values) => addPaciente(values)}
            >
                {({ errors, touched }) => (
                    <Form className= "form-paciente">
                        <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div>
                                            <label htmlFor='name' className="col-form-label">Nombre</label>
                                            <Field type='text' name='name' className={`form-control`}/>
                                            {errors.name && touched.name ? <p>{errors.name}</p> : null}
                                        </div>
                                        <div>
                                            <label htmlFor='apellidos' className="col-form-label">Apellidos</label>
                                            <Field type='text' name='apellidos' className={`form-control`}/>
                                            {errors.apellidos && touched.apellidos ? <p>{errors.apellidos}</p> : null}
                                        </div>

                                        <div>
                                            <label htmlFor='direccion'className="col-form-label">Direccion</label>
                                            <Field type='text' name='direccion' className={`form-control`} />
                                            {errors.direccion && touched.direccion ? <p>{errors.direccion}</p> : null}
                                        </div>

                                        <div>
                                            <label htmlFor='rut' className="col-form-label">Rut</label>
                                            <Field type='text' name='rut' className={`form-control`} />
                                            {errors.rut && touched.rut ? <p>{errors.rut}</p> : null}
                                        </div>
                                        <div>
                                                <label htmlFor='telefono' className="col-form-label">Telefono </label>
                                                <Field type='text' name='telefono' className={`form-control`}/>
                                                {errors.telefono && touched.telefono ? <p>{errors.telefono}</p> : null}
                                            </div>  

                                            <div>
                                                <label htmlFor='telefonoEm' className="col-form-label">Telefono Em.</label>
                                                <Field type='text' name='telefonoEm' className={`form-control`}/>
                                                {errors.telefonoEm && touched.telefonoEm ? <p>{errors.telefonoEm}</p> : null}
                                            </div>
                                            
                                </div>
                                    <div class="col-md-6">
                                        <div>                                           
                                        <div>
                                                <label htmlFor='edad' className="col-form-label">Edad </label>
                                                <Field type='number' name='edad' className={`form-control`}/>
                                                {errors.edad && touched.edad ? <p>{errors.edad}</p> : null}
                                            </div>
                                            <div>
                                                <label htmlFor='antecedentesEnfermedades' className="col-form-label">Enfermedades</label>
                                                <Field type='text' name='antecedentesEnfermedades' className={`form-control`}/>
                                                {errors.antecedentesEnfermedades && touched.antecedentesEnfermedades ? <p>{errors.antecedentesEnfermedades}</p> : null}
                                            </div>

                                            <div>
                                                <label htmlFor='tratamientoMedico' className="col-form-label">Tratamiento Medico </label>
                                                <Field type='text' name='tratamientoMedico' className={`form-control`} />
                                                {errors.tratamientoMedico && touched.tratamientoMedico ? <p>{errors.tratamientoMedico}</p> : null}
                                            </div>


                                            <div>
                                                <label htmlFor='alergias' className="col-form-label">Alergias </label>
                                                <Field type='text' name='alergias' className={`form-control`}/>
                                                {errors.alergias && touched.alergias ? <p>{errors.alergias}</p> : null}
                                            </div>

                                            <div>
                                                <label htmlFor='diagnostico' className="col-form-label">Diagnostico </label>
                                                <Field type='text' name='diagnostico' className={`form-control`}/>
                                                {errors.diagnostico && touched.diagnostico ? <p>{errors.diagnostico}</p> : null}
                                            </div>
                                        </div>                                  
                                        
                                    </div>
                                    
                                </div>
                        </div> 
                    <div>
                            <Button type='submit' variant="secondary" onClick={goToBack} >Volver</Button>
                            <Button type='submit' >Agregar</Button>
                    </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default PacienteForm;