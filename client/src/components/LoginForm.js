import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import Button from 'react-bootstrap/Button';
import * as Yup from "yup";


const LoginForm = (props) => {

    const {onSubmitProp}=props;

    return (
        <div >
          <Formik
          initialValues={{
          email:'',
          password:'',
        }}
        validationSchema={Yup.object().shape({
            email: Yup.string()
            .email("Correo no valido")
            .min(3, "Este correo electrónico es incorrecto")
            .required("Por favor, ingresa un correo electrónico válido"),
            
            password: Yup.string()
            .min(8, "La clave debe contener más de 8 caractes")
            .required("Por favor ingrese una contraseña")
        })}

        onSubmit={(values, {setSubmitting}) =>{
            onSubmitProp(values);
        }}
        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                //isSubmitting,
                //validating,
                valid,
            }) =>{
        return (
            <div className='container1'>
                <h1>Login</h1>
                <Form className= "form-login" method= "post" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="col-form-label">Correo Electrónico</label>
                    <Field id='email' type="text" placeholder="Email" className={`form-control`} name='email'/>
                    {errors.email && touched.email && <p>{errors.email}</p>}

                    <label htmlFor="password" className="col-sm-2 col-form-label">Contraseña</label>
                    <Field  id='password' type="password" placeholder="Contraseña" className={`form-control`} name='password'/>
                    {errors.password && touched.password && <p>{errors.password}</p>}
                    <br></br>
                    <Button className='btn-log1' type="submit" disabled={Object.values(errors).length > 0}>Login</Button>
                </Form>
                </div>
        );
        }}
        </Formik>
        </div>
    );
}

export default LoginForm;
