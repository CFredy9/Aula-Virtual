import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
//import { renderField, SelectField } from '../../Utils/renderField';
import {renderField, renderFilePicker, SelectField, renderNumber} from '../Utils/renderField/renderField';
import { api } from "../../../utility/api";
import {
    AsyncSelectField,
} from "Utils/renderField/renderField";
import { string } from 'prop-types';

const genders = [
    {"label": "Masculino", "value": 0},
    {"label": "Femenino", "value": 1},
];

/*const validate = values => {
    const errors = {}
    if (!values.curso) {
      errors.curso = 'Campo requerido'
    } 
    return errors
  } */

const getProfesiones = (search) => {
    let profesiones = [];
    return api
        .get("profesion", { search })
        .then((response) => {
	    profesiones = response.results.map((profesion) => ({
                value: parseInt(profesion.id),
                label: (profesion.nombre_profesion),
            }));
            return profesiones;
        })
        .catch((err) => {
            return profesiones;
        });
};

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Correo Electrónico Inválido'
    : undefined

const RegisterForm = (props) => {
    const { data, handleSubmit, creacion, pristine, reset, submitting } = props;
    const editar = window.location.href.includes('editar');
    let titulo = editar ? 'Editar Catedratico' : 'Registrar Catedratico';
    let disabled = false;
    let contra = false;
    if(creacion ==  false && editar == false){
        disabled = true;
        contra = true;
        titulo = 'Ver Catedratico';
    }
    else if(editar==true){
        contra=true;
    }
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <center><h3>{titulo}</h3></center>
            <center><h6 className="h7">* Campos Requeridos</h6></center>
            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
            <div className="form-group has-feedback flex-1 mx-3">
            <div >
                <label htmlFor="first_name">* Nombre</label>
                <Field name="profile.user.first_name" label="Nombre" component={renderField} type="text" className="form-control" placeholder="Nombres Completos" disabled={disabled}/>
            </div>
            <div >
                <label htmlFor="last_name">* Apellido</label>
                <Field name="profile.user.last_name" label="Apellido" component={renderField} type="text" className="form-control" placeholder="Apellidos Completos" disabled={disabled}/>
            </div>
            <div >
                <label htmlFor="username">* Usuario</label>
                <Field name="profile.user.username" label="Usuario" component={renderField} type="text" className="form-control" placeholder="Usuario" disabled={disabled}/>
            </div>
            <div >
                <label htmlFor="email">* Email</label>
                <Field name="profile.user.email" label="Email" component={renderField} type="email" className="form-control" placeholder="Correo Electrónico"  disabled={disabled} validate={email}/>
            </div> 
            <div >
                {contra == false && 
                <label htmlFor="password">* Contraseña</label> 
                }
                {contra == false && 
                <Field
                    name="password"
                    label="Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                    placeholder="Contraseña" 
                />
            }
            </div>
            <div >
                {contra == false && 
                <label htmlFor="confirmPassword">* Confirmar Contraseña</label> 
                }
                {contra == false && 
                <Field
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                    placeholder="confirmar contraseña" 
                />
            }
            </div>
        
            </div>
                        <div className="form-group has-feedback flex-1 mx-3">
                            <div >
                                <label htmlFor="profile.phone">Teléfono</label>
                                <Field
                                    numberFormat={"+(502) ####-####"}
                                    name="profile.phone"
                                    placeholder="Teléfono"
                                    component={renderNumber}
                                    className="form-control"
                                    disabled={disabled}
                                />
                            </div>
                            <div >
                                <label htmlFor="gender">Género</label>
                                <Field name="profile.gender" 
                                placeholder="Género" 
                                component={SelectField} 
                                options={genders} 
                                className="form-control" 
                                disabled={disabled}/>
                            </div>
                            <div >
                                <label htmlFor="profile.address">Dirección</label>
                                <Field name="profile.address" placeholder="Dirección" component={renderField} type="text" className="form-control" disabled={disabled}/>
                            </div>

                            <div >
                                <label htmlFor="profesion">* Profesión</label>
                                <Field
                                placeholder="Profesión" 
                                name="profesion"
                                loadOptions={getProfesiones}
                                component={AsyncSelectField}
                                className="form-control"
                                disabled={disabled}
                                /> 
                                </div>
                                 <Field
                                    name="rol"
                                    component={renderField}
                                    className="form-control"
                                    type="hidden"
                                />

                            

                        </div>
                       
                    </div>
          

            <div className="buttons-box">
            <a 
                    href='/#/catedratico'
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>
            {disabled == false &&         
                <button type="submit" className="btn btn-primary m-1 align-self-center">
                    {editar ? 'Actualizar' : 'Registrar'}
                    </button>
            }
            </div>
        </form>
    );
};

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'CatedraticoForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            profile:{user:{username: validators.exists()('Este campo es requerido'),
            first_name: validators.exists()('Este campo es requerido'),
            last_name: validators.exists()('Este campo es requerido'),
            email: validators.exists()('Este campo es requerido')}},
            password: validators.exists()('Este campo es requerido'),
            profesion: validators.exists()('Este campo es requerido'),
        });
    },
})(RegisterForm);