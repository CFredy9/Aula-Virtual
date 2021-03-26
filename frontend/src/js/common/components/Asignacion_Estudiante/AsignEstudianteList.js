import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import { Field, reduxForm } from 'redux-form';
import {standardActions} from "../Utils/Grid/StandardActions";

import Formulario from './Formulario';

class ListadoAsignEstudiante extends Component {
    componentWillMount = () => {
        const  { listarEst, match } = this.props;
        const id = match.params.id;
        listarEst(id);
    }
    cambiarPagina = (page) => {
    const  { listarEst, match } = this.props;
    const id = match.params.id;
    listarEst(id, page);
    }

    getEstudiantes = (search) => {
    const { match, getEstudiante } = this.props;
    const id = match.params.idg;
    return getEstudiante(search, id);
    }

    render(){
        
        console.log("PROPS: ", this.props);
        const { data, loader, eliminar, crearAsignEstudiante, getEstudiante, listarEst } = this.props;
        
        return(
            <React.Fragment>

                <Formulario onSubmit={crearAsignEstudiante} getEstudiante={this.getEstudiantes} initialValues={{curso_asignado: this.props.match.params.id}} />
                <br></br>
                <center><h3>Estudiantes Asignados</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/miscursos'
                    className='btn btn-sm btn-primary'
                    >
                       <i className="material-icons">reply_all</i>
                    </a>

                
                </div>
                {data &&
                    <Grid 
                        hover
                        striped
                        data={data}
                        loading={loader}
                        onPageChange={this.cambiarPagina}
                    >
                        <TableHeaderColumn
                            isKey
                            dataField='curso_asignado'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.curso.nombre_curso;
                            }}
                        >
                            Curso
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='estudiante'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.profile.user.first_name + ' ' + cell.profile.user.last_name;
                            }}
                        >
                            Estudiante
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='curso_asignado'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.grado.nombre_grado;
                            }}
                        >
                            Grado
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='curso_asignado'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.seccion.nombre_seccion;
                            }}
                        >
                            Seccion
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                eliminar: eliminar,
                            })}
                        >
                            Acciones
                        </TableHeaderColumn>
                    </Grid>
                }
        </React.Fragment>
        );
    }
}
export default ListadoAsignEstudiante;