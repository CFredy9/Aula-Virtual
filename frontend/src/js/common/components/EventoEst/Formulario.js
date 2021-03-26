import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderTextArea, renderDatePicker } from '../Utils/renderField/renderField';
import  moment  from 'moment';



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
            <label>Nombre</label>
            <Field name='nombre' component={renderField} disabled={disabled} />

            <label>Descripción</label>
            <Field name='descripcion' component={renderTextArea} disabled={disabled} />

            <label>Fecha de realización</label>
            <Field name='fecha' component={renderDatePicker} minDate={new Date(moment().format())} disabled={disabled} />
            <Field
                            name="detalle_curso"
                            component={renderField}
                            className="form-control"
                            type='hidden'
                        /> 
            <br></br>
            <label>Hora</label>
            <Field name='hora' component={renderField} type="time" disabled={disabled} />
            <br></br>
            <div className=''>
                <a 
                    href={`/#/curso_asignado/${valor}/evento/`}
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>

               
            </div>
            </center>
        </form>
    )
    }
}

export default reduxForm({
    form: 'EventoForm',
})(Formulario)