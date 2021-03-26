import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
//import { renderField, SelectField } from '../../Utils/renderField';
import {renderField, renderFilePicker, SelectField, renderNumber} from '../Utils/renderField/renderField';
import { api } from "../../../utility/api";
import {
    AsyncSelectField,
} from "Utils/renderField/renderField";
import { string } from 'prop-types';
import { parse } from 'superagent';

const required = value => (value || typeof value === 'number' ? undefined : 'Este campo es requerido')

class RegisterFormGrado extends Component {
    render(){
    const {  handleSubmit, creacion, getNivel } = this.props;
    const editar = window.location.href.includes('editar');
    let titulo = editar ? 'Editar Grado' : 'Registrar Grado';
    let disabled = false;
    if(creacion ==  false && editar == false){
        disabled = true;
        titulo = 'Ver Grado';
    } 

    return (
        <form className="formulario2" onSubmit={handleSubmit}>
           
           <center><h3>{titulo}</h3>
           <center><h6 className="h7">* Campos Requeridos</h6></center>
            <br></br>
            <label>* Nombre</label>
            <Field name='nombre_grado' component={renderField} disabled={disabled} validate={required} />
            
            <br></br>
            
            <div className="form-group has-feedback">
                                <label htmlFor="profesion">* Ciclo Escolar</label>
                                <Field
                                name="nivel"
                                loadOptions={getNivel}
                                component={AsyncSelectField}
                                className="form-control"
                                disabled={disabled}
                                validate={required}
                                /> 
                                </div>

            <div className=''>
                <a 
                    href='/#/grado'
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>

                {disabled == false && 
                    <button
                        className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                        type="submit"
                        >
                            {editar ? 'Actualizar' : 'Registrar'}
                        </button>
                            
                }
            </div>
            </center>
        </form>
    );
}

};

export default reduxForm({
    form: 'GradoForm', // a unique identifier for this form
})(RegisterFormGrado);