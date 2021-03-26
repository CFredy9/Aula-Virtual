import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
//import { renderField, SelectField } from '../../Utils/renderField';
import {renderField, renderFilePicker, SelectField, renderNumber} from '../Utils/renderField/renderField';
import { api } from "../../../utility/api";
import {
    AsyncSelectField,
} from "Utils/renderField/renderField";
import { string } from 'prop-types';
import { parse } from 'superagent';
import { isNull } from 'lodash';

const required = value => (value || typeof value === 'number' ? undefined : 'Este campo es requerido')
const validate = values => {
    const errors = {}
    if (!values.curso) {
      errors.curso = 'Campo requerido'
    } 
    if (!values.grado) {
        errors.grado = 'Campo requerido'
      } 
    if (!values.seccion) {
        errors.seccion = 'Campo requerido'
      } 
    if (!values.catedratico) {
        errors.catedratico = 'Campo requerido'
      } 
    if (!values.ciclo_escolar) {
        errors.ciclo_escolar = 'Campo requerido'
      } 
    return errors
  }

class RegisterFormAsignCurso extends Component {
    render(){
    const {  handleSubmit, creacion, getCurso, getGrado, getSeccion, getCatedratico, getCicloEscolar } = this.props;
    const editar = window.location.href.includes('editar');
    let titulo = editar ? 'Editar Asignacion de Curso' : 'Registrar Asignacion de Curso';
    let disabled = false;
    if(creacion ==  false && editar == false){
        disabled = true;
        titulo = 'Ver Asignacion de Curso';
    } 

    return (
        <form className="form-validate mb-lg" onSubmit={handleSubmit}>
           
           <center><h3>{titulo}</h3></center>
           <center><h6 className="h7">* Campos Requeridos</h6></center>
            <br></br>
           <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                <div className="form-group has-feedback flex-1 mx-3">
                    <div className="form-group has-feedback">
                        <label htmlFor="profesion">* Curso</label>
                        <Field
                            name="curso"
                            loadOptions={getCurso}
                            component={AsyncSelectField}
                            disabled={disabled}
                            validate={required}
                        /> 
                    </div>
                    <div className="form-group has-feedback">
                        <label htmlFor="profesion">* Grado</label>
                        <Field
                            name="grado"
                            loadOptions={getGrado}
                            component={AsyncSelectField}
                            className="form-control"
                            disabled={disabled}
                        /> 
                    </div>
                    <div className="form-group has-feedback">
                        <label htmlFor="profesion">* Seccion</label>
                        <Field
                            name="seccion"
                            loadOptions={getSeccion}
                            component={AsyncSelectField}
                            className="form-control"
                            disabled={disabled}
                        /> 
                    </div>
                </div>
                <div className="form-group has-feedback flex-1 mx-3">
                    <div className="form-group has-feedback">
                        <label htmlFor="profesion">* Catedrático</label>
                        <Field
                            name="catedratico"
                            loadOptions={getCatedratico}
                            component={AsyncSelectField}
                            className="form-control"
                            disabled={disabled}
                        /> 
                    </div>
                    <div className="form-group has-feedback">
                        <label htmlFor="profesion">* Ciclo Escolar</label>
                        <Field
                            name="ciclo_escolar"
                            loadOptions={getCicloEscolar}
                            component={AsyncSelectField}
                            className="form-control"
                            disabled={disabled}
                        /> 
                    </div>
                </div>
            </div>
            <div className='buttons-box'>
                <a 
                    href='/#/asignacion_curso'
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
        </form>
    );
}

};

export default reduxForm({
    form: 'AsignacionCursoForm', // a unique identifier for this form
    validate,
})(RegisterFormAsignCurso);