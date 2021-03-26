import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import { renderField } from '../../../Utils/renderField/renderField';

const RecuperacionForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="password">Ingrese su Correo Electrónico</label>
                <Field
                    name="email"
                    label="Correo Electrónico"
                    component={renderField}
                    type="email"
                    className="form-control"
                />
            </div>
            <div className="buttons-box">
            <a 
                    href='/#/login'
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Regresar
                    </a>
                <button type="submit" className="btn btn-primary m-1 align-self-center">Enviar Enlace</button>
            </div>
        </form>
    );
};

export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'recuperacion', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            correo: validators.exists()('Este campo es requerido'),
            
        });
    },
})(RecuperacionForm);