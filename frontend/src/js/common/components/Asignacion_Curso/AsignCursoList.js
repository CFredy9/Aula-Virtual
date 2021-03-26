import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoAsignCurso extends Component {
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render(){
        const { listar, data, loader, eliminar, onSortChange } = this.props;
        console.log("PROPS: ", this.props);
        return(
            <React.Fragment>
                <center><h3>Asignaciones de Cursos Registrados</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/asignacion_curso/crear'
                    className='btn btn-primary'
                    >
                        Crear Asignacion de Curso
                    </a>

                
                </div>
                {data &&
                    <Grid 
                        hover
                        striped
                        data={data}
                        loading={loader}
                        onPageChange={listar}
                        onSortChange={onSortChange}
                    >
                        <TableHeaderColumn
                            isKey
                            dataField='curso'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.nombre_curso;
                            }}
                        >
                            Curso
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='grado'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.nombre_grado;
                            }}
                        >
                            Grado
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='seccion'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.nombre_seccion;
                            }}
                        >
                            Seccion
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='catedratico'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.profile.user.first_name + ' ' + cell.profile.user.last_name;
                            }}
                        >
                            Catedratico
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='ciclo_escolar'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.nombre_ciclo_escolar;
                            }}
                        >
                            Ciclo Escolar
                        </TableHeaderColumn>

                        
                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                ver: '/asignacion_curso', 
                                editar: '/asignacion_curso',
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
export default ListadoAsignCurso;