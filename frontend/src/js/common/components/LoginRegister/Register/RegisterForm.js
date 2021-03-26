import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
//import { renderField, SelectField } from '../../Utils/renderField';
import {renderField, renderFilePicker, SelectField, renderNumber} from '../../Utils/renderField/renderField';


const userOptions = [
    {
      label: 'Erika',
      value: '4e4cf51f-b406-413a-ae46-2cf06c7aabff',
    },
    {
      label: 'Julia',
      value: 'edad97c7-f2dc-4198-91a9-8f20c7bc67b2',
    },
    {
      label: 'Sarah',
      value: '57d3578a-3583-4290-8bae-596a4da81a8d',
    },
  ];
const genders = [
    {"label": "Perito Contador", "value": 0},
    {"label": "Administración de Empresas", "value": 1},
];

const profesiones = [];

const RegisterForm = (props) => {
    const { data, handleSubmit, pristine, reset, submitting } = props;

    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
            <div className="form-group has-feedback flex-1 mx-3">
            <div className="form-group has-feedback">
                <label htmlFor="first_name">Nombre</label>
                <Field name="first_name" label="Nombre" component={renderField} type="text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="last_name">Apellido</label>
                <Field name="last_name" label="Apellido" component={renderField} type="text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="username">Usuario</label>
                <Field name="username" label="Usuario" component={renderField} type="text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="email">Email</label>
                <Field name="email" label="Email" component={renderField} type="Text" className="form-control" />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="password">Contraseña</label>
                <Field
                    name="password"
                    label="Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <Field
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>

            </div>
                        <div className="form-group has-feedback flex-1 mx-3">
                            <div className="form-group has-feedback">
                                <label htmlFor="profile.phone">Teléfono</label>
                                <Field
                                    numberFormat={"+(502) ####-####"}
                                    name="profile.phone"
                                    placeholder="Teléfono"
                                    component={renderNumber}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="profile.gender">Género</label>
                                <Field name="profile.gender" placeholder="Género" component={SelectField} options={genders} className="form-control" />
                            </div>
                            <div className="form-group has-feedback">
                                <label htmlFor="profile.address">Dirección</label>
                                <Field name="profile.address" placeholder="Dirección" component={renderField} type="text" className="form-control" />
                            </div>

                            <div className="form-group has-feedback">
                                <label htmlFor="profile.profesion">Profesión</label>
                                <Field name="profile.profesion" placeholder="Profesión" component={SelectField} options={profesiones} />
                            </div>

                        
                            

                        </div>
                       
                    </div>
          

            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">Registrarse</button>
            </div>
        </form>
    );
};

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'register', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            username: validators.exists()('Este campo es requerido'),
            first_name: validators.exists()('Este campo es requerido'),
            last_name: validators.exists()('Este campo es requerido'),
            email: validators.exists()('Este campo es requerido'),
            password: validators.exists()('Este campo es requerido'),
        });
    },
})(RegisterForm);
