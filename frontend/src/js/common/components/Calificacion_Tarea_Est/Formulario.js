import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
//import { renderField, SelectField } from '../../Utils/renderField';
import {renderField, renderFilePicker, renderTextArea, SelectField, renderNumber} from '../Utils/renderField/renderField';
import { api } from "../../../utility/api";
import {
    AsyncSelectField,
} from "Utils/renderField/renderField";
import moment from 'moment';


const validate = values => {
    const errors = {}
    if (!values.descripcion) {
      errors.descripcion = 'Campo requerido'
    } 
    if (!values.documento) {
        errors.documento = 'Campo requerido'
      } 
    return errors
  }

class RegisterCalificacion extends Component {
    componentWillUnmount = () => {
        const {clearFile} = this.props;
        clearFile();
    } 
    
    getEstudiantes = (search) => {
        const { idp, getEstudiante } = this.props;
        return getEstudiante(search, idp);
    }

    render(){
    const {  handleSubmit, crear, getEstudiante, idp, idt, setDocumento, documento, valores, registro } = this.props;
    console.log("PROPS", this.props)
    const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Tarea' : 'Agregar Tarea';
        let disabled = false;
        let est = false;
        if(crear ==  false && editar == false){
            disabled = true;
            titulo = 'Ver Tarea';
        } 
        if(editar == true){
            est = true;
        }

    return (
        <form className="formulario4" onSubmit={handleSubmit}>
           
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
                    <label>Documento</label>
                        <Field
                            accept="image/*,.pdf,document/*"
                            setFile={setDocumento}
                            name="documento"
                            photo={documento}
                            component={renderFilePicker}                    
                        />
                    <a href={documento} target="_blank" >Adjunto</a>
                    
                    <br /><br />
                    <label>* Descripción</label>
                        <Field name='descripcion' component={renderTextArea} disabled={disabled} />
                    <div className="form-group has-feedback">
                    
                        <Field
                                name="nota"
                                component={renderField}
                                className="form-control"
                                placeholder="Nota"
                                type='hidden'
                                disabled={disabled}
                            /> 

                        
                        <Field
                                name="fecha"
                                component={renderField}
                                className="form-control"
                                placeholder=""
                                type='hidden'
                                disabled={disabled}
                            /> 
                    </div>
                </div>
                </div>
            <div className=''>
            {est == false && disabled == true  && 
            <a 
                 href={`/#/curso/${idp}/tarea/${idt}/calificacion`} 
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>
                }
            {est == false && disabled == false  && 
            <a 
                 href={`/#/curso_asignado/${idp}/tarea/`} 
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>
                }
            {est == true  && 
            <a 
                 href={`/#/curso_asignado/${idp}/calificacion/`} 
                    className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>
                }
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
    form: 'calificacionEstForm', // a unique identifier for this form
    validate,
})(RegisterCalificacion);