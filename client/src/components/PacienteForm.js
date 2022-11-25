import React, { useState, useEffect } from "react";
import { createPaciente, getPaciente, updatePaciente } from "../services/paciente-service"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

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

    const addPaciente = async (values) => {
        console.log("🚀 ~ file: PackageForm.js ~ line 51 ~ addTravel ~ values", values)
        try {
            const createPacienteInService = !id ? await createPaciente(values) : await updatePaciente(id, values);
            
            alert(createPacienteInService.data.message)
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
            .max(8, "El nombre del destino no puede superar los 8 caracteres")
            .required("Este campo es obligatorio"),

        rut: Yup.string()
            .max(8, "El nombre del destino no puede superar los 8 caracteres")
            .required("Este campo es obligatorio"),

        telefono: Yup.string()
            .max(8, "El nombre del destino no puede superar los 8 caracteres")
            .required("Este campo es obligatorio"),

        telefonoEm: Yup.string()
            .max(8, "El nombre del destino no puede superar los 8 caracteres")
            .required("Este campo es obligatorio"),

        edad: Yup.number()
            .min(1, "El valir debe superar 1 caracter de largo")
            .required("Este campo es obligatorio"),

        antecedentesEnfermedades: Yup.string()
            .max(8, "El nombre del destino no puede superar los 8 caracteres")
            .required("Este campo es obligatorio"),
        
        tratamientoMedico: Yup.string()
            .max(8, "El nombre del destino no puede superar los 8 caracteres")
            .required("Este campo es obligatorio"),

        alergias: Yup.string()
            .max(8, "El nombre del destino no puede superar los 8 caracteres")
            .required("Este campo es obligatorio"),

        diagnostico: Yup.string()
            .max(8, "El nombre del destino no puede superar los 8 caracteres")
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
                    <Form>
                        <div>
                            <label htmlFor='name'>Nombre del paciente </label>
                            <Field type='text' name='name' />
                            {errors.name && touched.name ? <p>{errors.name}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='apellidos'>Apellidos </label>
                            <Field type='text' name='apellidos' />
                            {errors.apellidos && touched.apellidos ? <p>{errors.apellidos}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='direccion'>Direccion </label>
                            <Field type='text' name='direccion' />
                            {errors.direccion && touched.direccion ? <p>{errors.direccion}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='rut'>Rut </label>
                            <Field type='text' name='rut' />
                            {errors.rut && touched.rut ? <p>{errors.rut}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='telefono'>telefono </label>
                            <Field type='text' name='telefono' />
                            {errors.telefono && touched.telefono ? <p>{errors.telefono}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='telefonoEm'>telefonoEm </label>
                            <Field type='text' name='telefonoEm' />
                            {errors.telefonoEm && touched.telefonoEm ? <p>{errors.telefonoEm}</p> : null}
                        </div>


                        <div>
                            <label htmlFor='edad'>Edad </label>
                            <Field type='number' name='edad' />
                            {errors.edad && touched.edad ? <p>{errors.edad}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='antecedentesEnfermedades'>antecedentesEnfermedades </label>
                            <Field type='text' name='antecedentesEnfermedades' />
                            {errors.antecedentesEnfermedades && touched.antecedentesEnfermedades ? <p>{errors.antecedentesEnfermedades}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='tratamientoMedico'>tratamientoMedico </label>
                            <Field type='text' name='tratamientoMedico' />
                            {errors.tratamientoMedico && touched.tratamientoMedico ? <p>{errors.tratamientoMedico}</p> : null}
                        </div>


                        <div>
                            <label htmlFor='alergias'>alergias </label>
                            <Field type='text' name='alergias' />
                            {errors.alergias && touched.alergias ? <p>{errors.alergias}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='diagnostico'>diagnostico </label>
                            <Field type='text' name='diagnostico' />
                            {errors.diagnostico && touched.diagnostico ? <p>{errors.diagnostico}</p> : null}
                        </div>

                        <div>
                            <button type='submit' >Agregar</button>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default PacienteForm;