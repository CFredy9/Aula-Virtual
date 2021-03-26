import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderTextArea, renderDatePicker } from '../Utils/renderField/renderField';
import  moment  from 'moment';

const validate = values => {
    const errors = {}
    if (!values.nombre) {
        errors.nombre = 'Campo requerido'
      }
    if (!values.descripcion) {
        errors.descripcion = 'Campo requerido'
      }
    if (!values.fecha) {
      errors.fecha = 'Campo requerido'
    } 
    if (!values.hora) {
        errors.hora = 'Campo requerido'
    }
    return errors
  }

class Formulario extends Component {
    render(){

        const { handleSubmit, crear, valor } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Evento' : 'Crear Evento';
        let disabled = false;
        if(crear ==  false && editar == false){
            disabled = true;
            titulo = 'Ver Evento';
        } 
    
    return(
        <form onSubmit={handleSubmit} className='formulario3'>
            <center><h3>{titulo}</h3>
            <center><h6 className="h7">* Campos Requeridos</h6></center>
            <label>* Nombre</label>
            <Field name='nombre' component={renderField} disabled={disabled} />

            <label>* Descripción</label>
            <Field name='descripcion' component={renderTextArea} disabled={disabled} />

            <label>* Fecha de realización</label>
            <Field name='fecha' component={renderDatePicker} minDate={new Date(moment().format())} disabled={disabled} />
            
            <label>* Hora</label>
            <Field name='hora' component={renderField} type="time" disabled={disabled} />
            
            <Field
                            name="detalle_curso"
                            component={renderField}
                            className="form-control"
                            type='hidden'
                        /> 
            <br></br>

            <div className=''>
                <a 
                    href={`/#/curso/${valor}/evento/`}
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
    )
    }
}

export default reduxForm({
    form: 'EventoForm',
    validate,
})(Formulario)