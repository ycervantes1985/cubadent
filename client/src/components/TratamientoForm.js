import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { addTratamientoToPaciente } from '../services/paciente-service';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import ImageUpload from './ImageUpload';
import { imgUpload } from '../services/imgUpload';


const TratamientoForm = () => {

    const [images, setImages] = useState([]);
    const [urlImage, setUrlImage] = useState()
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const [tratamiento, setTratamiento] = useState({
        nombre: '',
        descripcion: '',
        estatus: '',
        foto:'',
    })

    const { id } = useParams();

    const onUpload = async () => {
        setLoading(true);
        const url = await imgUpload(images[0].file);
        setLoading(false);
        console.log("URL",url)

        if (url) setUrlImage(url);
        else alert('Error, trate nuevamente más tarde. ❌')
    }

    const goToBack = () =>{navigate(`/paciente/tratamiento/${id}`)}
    
    const tratamientoSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, "El nombre del tratamiento no puede tener menos de 2 caracteres")
            .required("Este campo es obligatorio"),

        descripcion: Yup.string()
        .min(3, "La descripcion no puede tener menos de 2 caracteres")
        .required("Este campo es obligatorio"),

        estatus: Yup.string()
        .required("Este campo es obligatorio"),



    });

    const addTratamiento = async (values) => {
        try {      
            values.foto = urlImage    
            const updatePaciente = await addTratamientoToPaciente(id, values)
            console.log("datos de actualizar tratamiento", updatePaciente)
            Swal.fire('Se ha realizado un tratamiento')            
            navigate(`/paciente/tratamiento/${id}`)
        } catch(err) {
            console.log("🚀 ~ file: CommentsForm.js ~ line 30 ~ addComment ~ err", err)
            
        }
    }

    return (
        <div className="card">
            <Formik
                enableReinitialize
                initialValues={tratamiento}
                validationSchema={tratamientoSchema}
                onSubmit={(values) => addTratamiento(values)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor='nombre' className="col-form-label">Nombre del Tratamiento</label>
                            <Field type='text' name='nombre' className={`form-control`}/>
                            {errors.nombre && touched.nombre ? <p>{errors.nombre}</p> : null}
                        </div>
                        <div>
                            <label htmlFor='descripcion' className="col-form-label">Descripcion del Tratamiento</label>
                            <Field type='text' name='descripcion' className={`form-control`}/>
                            {errors.descripcion && touched.descripcion ? <p>{errors.descripcion}</p> : null}
                        </div>
                        <div>
                            <label htmlFor='estatus' className="col-form-label">Estatus</label>
                            <Field type='text' name='estatus' className={`form-control`}/>
                            {errors.estatus && touched.estatus ? <p>{errors.estatus}</p> : null}
                        </div>
                        <ImageUpload 
                        onUpload={onUpload}
                        images={images}
                        setImages={setImages}
                        urlImage= {urlImage}
                        setUrlImage={setUrlImage}
                        loading={loading}
                        />
                        <div className='btn-detail'>
                            <Button onClick={goToBack} variant="secondary">Volver</Button>
                            <Button type='submit' >Agregar</Button>                            
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default TratamientoForm;