import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

import CalificacionListEst from '../Calificacion_Tarea_Est/CalificacionList';
import moment from 'moment';


class ListadoTareas extends Component {
    componentWillMount() {
        const { listarTarea, match } = this.props;
        const id = match.params.idp;
        listarTarea(id);
    }

cambiarPagina = (page) => {
    const  { listarTarea, match } = this.props;
    const id = match.params.idp;
    listarTarea(id, page);
}
    

    render() {
        const { listarTarea, data, loader, eliminar, onSortChange, onSearchChange } = this.props;
        console.log("PROPS ", this.props);
        return (
            <React.Fragment>
                <center><h3>Tareas Asignadas</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                    <a 
                    href={`/#/curso_asignado/${this.props.match.params.idp}/`}
                    className='btn btn-primary'
                    >
                        Regresar
                    </a>


                <input 
                    className='form-control w-25'
                    placeholder='Buscar...'
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                </div>
                {data &&
                    <Grid 
                        hover
                        striped
                        data={data}
                        loading={loader}
                        onPageChange={this.cambiarPagina}
                        onSortChange={onSortChange}
                    >
                        <TableHeaderColumn
                            isKey
                            dataField='titulo'
                            dataSort
                        >
                            Titulo
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='descripcion'
                            dataSort
                        >
                            Descripcion
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='valor_tarea'
                            dataSort
                        >
                            Punteo
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='fecha'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return (moment(cell, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm'))
                                }}
                        >
                            Fecha Entrega
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                ver: `/curso_asignado/${this.props.match.params.idp}/tarea`, 
                            })}
                            
                        >
                            Ver
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return <a className="px-2" style={{cursor: "pointer", color: "#5979F4"}}  href={`/#/curso_asignado/${this.props.match.params.idp}/tarea/${cell}/calificacion/crear`}><i className="material-icons">file_upload</i></a>
                                }} 
                        >
                            
                            Subir Tarea
                        </TableHeaderColumn>

                    </Grid>
                }
                <a 
                    href={`/#/curso_asignado/${this.props.match.params.idp}/calificacion/`}
                    className='btn btn-primary'
                    >
                        Ver Tareas Enviadas
                    </a>

                {/*<CalificacionListEst  />*/}
            </React.Fragment>
        )
    }
}

export default ListadoTareas;

                                {/*dataFormat={(cell,row)=>{
                                return <React.Fragment>
                                    <Link to={`${cell}/`} className="px-2" ><i className="material-icons">remove_red_eye</i></Link>
                                    <Link className="text-warning" to={`${cell}/editar`} ><i className="material-icons">edit</i></Link>
                                    <a className="px-2" style={{cursor: "pointer", color: "#c4183c"}} ><i className="material-icons">delete</i></a>
                                    </React.Fragment>
                                }} */}