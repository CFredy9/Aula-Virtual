import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
//import { renderField, SelectField } from '../../Utils/renderField';
import {renderField, renderFilePicker, SelectField, renderNumber} from '../Utils/renderField/renderField';
import { api } from "../../../utility/api";
import {
    AsyncSelectField,
} from "Utils/renderField/renderField";



class RegisterFormAsignEstudiante extends Component {
    render(){
    const {  handleSubmit, creacion, getEstudiante } = this.props;
    let titulo = 'Asignar Estudiante';
    

    return (
        <form className="form-validate mb-lg" onSubmit={handleSubmit}>
           
           <center><h3>{titulo}</h3></center>
           <div className="buttons-box">
                <div className="form-group w-25">
                        <Field
                            name="curso_asignado"
                            component={renderField}
                            className="form-control"
                            type='hidden'
                        /> 
                    <div className="form-group has-feedback">
                        <Field
                            name="estudiante"
                            placeholder="Estudiante"
                            loadOptions={getEstudiante}
                            component={AsyncSelectField}
                            className="form-control"
                        /> 
                    </div>
                </div>
                </div>
            <div className='buttons-box'>
                    <button
                        className='btn btn-sm btn-primary'
                        type="submit"
                        >
                            Registrar
                        </button>
            </div>
        </form>
    );
}

};

export default reduxForm({
    form: 'AsignacionEstudiante', // a unique identifier for this form
})(RegisterFormAsignEstudiante);