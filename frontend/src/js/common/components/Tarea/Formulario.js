import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderTextArea, renderFilePicker, renderDatePicker } from '../Utils/renderField/renderField';
import  moment  from 'moment';

const validate = values => {
    const errors = {}
    if (!values.titulo) {
        errors.titulo = 'Campo requerido'
      }
    if (!values.descripcion) {
        errors.descripcion = 'Campo requerido'
      }
    if (!values.valor_tarea) {
      errors.valor_tarea = 'Campo requerido'
    } else if (isNaN(Number(values.valor_tarea))) {
      errors.valor_tarea = 'Tiene que ser un número' 
    }
      /*else if((values.valor_tarea + values.punteo_tareas) > 100) {
        errors.valor_tarea = 'Ya se alcanzó la nota máxima que es 100' 
    } */
    if (!values.fecha) {
        errors.fecha = 'Campo requerido'
    }
    if (!values.hora) {
        errors.hora = 'Campo requerido'
    }
    return errors
  }

class Formulario extends Component {
    componentWillUnmount = () => {
        const {clearFile} = this.props;
        clearFile();
    }

    render(){
        console.log("PROPS: ", this.props);
        const { handleSubmit, crear, valor, setArchivo, archivo } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Tarea' : 'Crear Tarea';
        let disabled = false;
        if(crear ==  false && editar == false){
            disabled = true;
            titulo = 'Ver Tarea';
        } 
    
    return(
        <form onSubmit={handleSubmit} className='form-validate mb-lg'>
            <center><h3>{titulo}</h3></center>
            <center><h6 className="h7">* Campos Requeridos</h6></center>
            <div className="p-0 pt-3 d-flex flex-column flex-md-row">
            <div className="form-group has-feedback flex-1 mx-3">
            <label>Archivo</label>
                <Field
                    accept="image/*,.pdf,document/*"
                    setFile={setArchivo}
                    name="archivo"
                    photo={archivo}
                    component={renderFilePicker}                    
                />
                <a href={archivo} target="_blank" >Adjunto</a>
                
                <br /><br />
            </div>

            <div className="form-group has-feedback flex-1 mx-3">

            <label>* Titulo</label>
            <Field name='titulo' component={renderField} disabled={disabled} />

            <label>* Descripción</label>
            <Field name='descripcion' component={renderTextArea} disabled={disabled} />

            <label>* Valor de Tarea</label>
            <Field name='valor_tarea' component={renderField} disabled={disabled} />
            <Field
                            name="detalle_curso"
                            component={renderField}
                            className="form-control"
                            type='hidden'
                        /> 
            <label>* Fecha de entrega</label>
            {disabled==false && <Field name='fecha' component={renderDatePicker} minDate={new Date(moment().format())} disabled={disabled} /> }
            {disabled==true && <Field name='fecha' component={renderDatePicker} disabled={disabled} /> }
            
            <label>* Hora</label>
            <Field name='hora' component={renderField} type="time" disabled={disabled} />

            <Field name='punteo_tareas' component={renderField} type="hidden" disabled={disabled} />
            </div>
            <br></br>

            </div>
            <div className='buttons-box'>
                <a 
                    href={`/#/curso/${valor}/tarea/`}
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
    )
    }
}

export default reduxForm({
    form: 'TareaForm', 
    validate,
})(Formulario)