import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
//import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
//import { renderField, SelectField } from '../../Utils/renderField';
import {renderField, renderFilePicker, SelectField, renderNumber} from '../../Utils/renderField/renderField';
//import { api } from "../../../utility/api";
import {
    AsyncSelectField,
} from "../../Utils/renderField/renderField";



class FilterCurso extends Component {
    render(){
    const {  handleSubmit, creacion, getCursos } = this.props;
    let titulo = 'Filtrar por Curso';
    

    return (
        <form className="form-validate mb-lg" onSubmit={handleSubmit}>
           
           <center><h3>{titulo}</h3></center>
           <div className="buttons-box">
                <div className="form-group w-25">
                        
                    <div className="form-group has-feedback">
                        <Field
                            name="id"
                            placeholder="Curso"
                            loadOptions={getCursos}
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
                            Filtrar
                        </button>
            </div>
        </form>
    );
}

};

export default reduxForm({
    form: 'FilterCurso', // a unique identifier for this form
})(FilterCurso);