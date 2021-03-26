import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../../../Utils/renderField/renderField';
import moment from 'moment';

const ContraseñaForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, valores } = props;
    console.log('PROPIEDADES', props)
    console.log('hora', moment().subtract(15, 'minutes').format('YYYY-MM-DD HH:mm'))
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            {moment().subtract(15, 'minutes').format('YYYY-MM-DD HH:mm') <= (valores.fecha ? valores.fecha : [])  &&
            <div >
            <div className="form-group has-feedback">
                <label htmlFor="password">Usuario</label>
                <Field
                    name="username"
                    component={renderField}
                    type="text"
                    className="form-control"
                    disabled={true}
                />
            </div> 

            <div className="form-group has-feedback">
                <label htmlFor="password">Correo Electrónico</label>
                <Field
                    name="email"
                    component={renderField}
                    type="text"
                    className="form-control"
                    disabled={true}
                />
            </div>
            
            <div className="form-group has-feedback">
                <label htmlFor="password">Contraseña Nueva</label>
                <Field
                    name="password"
                    label="Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="password">Confirmar Contraseña</label>
                <Field
                    name="confirmpassword"
                    label="Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">Guardar Cambios</button>
            </div>
            </div>
            }
            {moment().subtract(15, 'minutes').format('YYYY-MM-DD HH:mm') > (valores.fecha ? valores.fecha : [])  &&
            <h1 className="text-center">El link ya expiró</h1> }
        </form>
    );
};

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'contraseñacambioForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmpassword: combine(
                validators.exists()('Este campo es requerido'),
                matchPassword(data.password, data.confirmpassword)()('Las contraseñas no coinciden')
             ),
            
        });
    },
})(ContraseñaForm);