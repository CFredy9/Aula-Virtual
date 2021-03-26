import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../Utils/renderField/renderField';

const required = value => (value || typeof value === 'number' ? undefined : 'Este campo es requerido')
const validate = values => {
    const errors = {}
    if (!values.nombre_ciclo_escolar) {
      errors.nombre_ciclo_escolar = 'Campo requerido'
    } 
    return errors
  }

class Formulario extends Component {
    render(){
        console.log("PROPS: ", this.props);

        const { handleSubmit, crear } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Ciclo Escolar' : 'Registrar Ciclo Escolar';
        let disabled = false;
        if(crear ==  false && editar == false){
            disabled = true;
            titulo = 'Ver Ciclo Escolar';
        } 
    
    return(
        <form onSubmit={handleSubmit} className='formulario' >
            <center><h3>{titulo}</h3>
            <center><h6 className="h7">* Campos Requeridos</h6></center>
            <br></br>
            <label>* Nombre</label>
            <Field 
            name='nombre_ciclo_escolar' 
            component={renderField} 
            disabled={disabled}
            validate={required} />
            

            <br></br>
                <a 
                    href='/#/ciclo_escolar'
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
                </center>
        </form>
    )
    }
}

export default reduxForm({
    form: 'CicloEscolarForm',
    validate,
})(Formulario)