import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import {renderField, renderFilePicker, SelectField, renderNumber, renderTextArea} from '../Utils/renderField/renderField';



class DetalleCurso extends Component {
    /*componentWillMount = () => {
        const { listarDetalle, match } = this.props;
        const id = match.params.id;
        listarDetalle(id);
    }  */
    componentWillUnmount = () => {
        const {clearFile} = this.props;
        clearFile();
    }  
    render(){
    const { handleSubmit, setPortada, portada, data, valores } = this.props;
    console.log("PROPS: ", this.props);
    return (
            <form className="form-validate mb-lg" onSubmit={handleSubmit}>
                <h2>Curso {valores.curso_asignado ? valores.curso_asignado.curso.nombre_curso : ''} </h2>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href={`/#/detalle_curso/${valores ? valores.id : ''}/`}
                    className='btn btn-sm btn-primary'
                    >
                       <i className="material-icons">reply_all</i>
                    </a>

                
                </div>
                <div className="mb-4 card card-small">
                    <div className="border-bottom card-header">{valores.curso_asignado ? valores.curso_asignado.curso.nombre_curso : ''} <h6 className="m-0"></h6></div>
                    <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                        <div className="form-group has-feedback flex-1 mx-3">
                        
                            <label>Portada</label>
                            <Field
                            accept="image/*,.pdf,document/*"
                            setFile={setPortada}
                            name="portada"
                            photo={valores.portada}
                            component={renderFilePicker}                    
                />
                <a href={portada} target="_blank" >Adjunto</a>
                        </div>
                    </div>
                    <div className="form-group has-feedback flex-1 mx-3">
                            <label name="descripcion">Descripción</label>
                            <Field  name="descripcion" component={renderTextArea} />
                        </div>
                        <Field
                            name="curso_asignado.id"
                            component={renderField}
                            className="form-control"
                            type='hidden'
                        />  
                        
                    <div className="d-flex">
                        <button className="btn btn-primary mx-auto mb-3" type="submit">Guardar</button>
                    </div>
                </div>
            </form>
        );
    }    
};

export default reduxForm({
    form: 'detalleForm', // a unique identifier for this form
})(DetalleCurso);