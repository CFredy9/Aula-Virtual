import React, { Component } from 'react';
import {renderField, renderFilePicker, SelectField, renderNumber, renderTextArea} from '../Utils/renderField/renderField';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class Inicio extends Component {
    
    render() {
        const { valores, id } = this.props;
        console.log("PROPS: ", this.props);
        return (
            <React.Fragment>

            <form className="form-validate mb-lg"  >
            <div className="page-header py-4 no-gutters row">
                <div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12 col-sm-4">
                    <span
                        className="text-uppercase page-subtitle">Escritorio Curso
                    </span>
                    <h3 className="page-title">{valores.curso_asignado ? valores.curso_asignado.curso.nombre_curso : ''}</h3>
                </div>
                
            </div>
            <div > <img src={valores.portada} width="100%" height="250px" /> </div>

            <div className="form-group has-feedback flex-1 mx-3">
            <h5>Descripción</h5>
            </div>
            <div className="form-group has-feedback flex-1 mx-3">
            <label name="descripcion" placeholder={valores.descripcion} />
            <label >{valores.descripcion} </label>
            </div>
            
            <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>

            <a 
                href={`/#/miscursosest`}
                className='btn btn-sm btn-primary'
                > 
                   <center>Regresar </center><i className="material-icons">reply</i>
                </a>

            <a 
                href={`/#/curso_asignado/${valores.id}/tarea/`}
                className='btn btn-sm btn-primary'
                >
                   <center>Ver Tareas </center><i className="material-icons">assignment</i>
                </a>

                <a 
                href={`/#/curso_asignado/${valores.id}/evento/`}
                className='btn btn-sm btn-primary'
                >
                   <center>Ver Eventos </center><i className="material-icons">assignment</i>
                </a>

            
            </div>
            {/*
            <div>
            <a 
                href={`/#/curso/${valores.id}/evento/`}
                className='btn btn-sm btn-primary'
                >
                   Gestionar Eventos
                </a>

            
            </div> */}

            </form>
            </React.Fragment>
        );
    }
}

export default Inicio;