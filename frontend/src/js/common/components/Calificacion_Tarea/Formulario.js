import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validatorFromFunction, validators, combine } from 'validate-redux-form';
//import { renderField, SelectField } from '../../Utils/renderField';
import {renderField, renderFilePicker, SelectField, renderNumber} from '../Utils/renderField/renderField';
import { api } from "../../../utility/api";
import {
    AsyncSelectField,
} from "Utils/renderField/renderField";

/*const required = value => (value || typeof value === 'number' ? undefined : 'Este campo es requerido')
const number = value =>
  value && isNaN(Number(value)) ? 'Tiene que ser un número' : undefined
const MaxNota = value =>
  value && value > 10
    ? 'Nota invalida'
    : undefined */

const validate = values => {
  const errors = {}
  if (!values.nota) {
    errors.nota = 'Campo requerido'
  } else if (values.nota > values.tarea.valor_tarea) {
    errors.nota = 'La nota no debe ser mayor al valor de la tarea'
  }
  else if (isNaN(Number(values.nota))) {
    errors.nota = 'Tiene que ser un número' 
  }
  return errors
}

class RegisterCalificacion extends Component {

    getEstudiantes = (search) => {
        const { idp, getEstudiante } = this.props;
        return getEstudiante(search, idp);
    }

    render(){
    const {  handleSubmit, crear, getEstudiante, idp, idt } = this.props;
    const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Calificación' : 'Agregar Calificación';
        let disabled = false;
        let est = false;
        if(crear ==  false && editar == false){
            disabled = true;
            est = true;
            titulo = 'Ver Calificación';
        } 
        if(editar == true){
            est = true;
        }

    return (
        <form className="formulario2" onSubmit={handleSubmit}>
           
           <center><h3>{titulo}</h3>
           <center><h6 className="h7">* Campos Requeridos</h6></center>
           <div className="">
                <div className="">
                        <Field
                            name="tarea"
                            component={renderField}
                            className="form-control"
                            type='hidden'
                        /> 
                         <Field
                            name="curso_tarea"
                            component={renderField}
                            className="form-control"
                            type='hidden'
                        /> 
                    <div className="form-group has-feedback">
                    <label>* Estudiante</label>
                        <Field
                            name="estudiante"
                            placeholder="Estudiante"
                            loadOptions={this.getEstudiantes}
                            component={AsyncSelectField}
                            className="form-control"
                            disabled={est}
                        /> 
                    </div>
                    <div className="form-group has-feedback">
                    <label>* Nota</label>
                        <Field
                                name="nota"
                                component={renderField}
                                className="form-control"
                                placeholder="Nota"
                                disabled={disabled}
                                //validate={[required, number, MaxNota]} 
                            /> 
                    </div>
                    <Field
                            name="tarea.valor_tarea"
                            component={renderField}
                            className="form-control"
                            type='hidden'
                        /> 
                </div>
                </div>
            <div className=''>
            <a 
                    href={`/#/curso/${idp}/tarea/${idt}/calificacion/`}
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>

                {disabled == false && 
                    <button
                        className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                        type="submit"
                        >
                            {editar ? 'Actualizar' : 'Agregar'}
                        </button>
                            
                }
            </div>
            </center>
        </form>
    );
}

};

export default reduxForm({
    form: 'calificacionForm', // a unique identifier for this form
    validate,
})(RegisterCalificacion);