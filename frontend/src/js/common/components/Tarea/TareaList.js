import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';
import { setPunteo } from '../../../redux/modules/calificacion_tarea/calificacion';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import moment from 'moment';


class ListadoTareas extends Component {
    componentWillMount() {
        const { listarTarea, listarPunteoTareas, match } = this.props;
        const id = match.params.idp;
        listarTarea(id);
        listarPunteoTareas(id);
    }

cambiarPagina = (page) => {
    const  { listarTarea, match } = this.props;
    const id = match.params.idp;
    listarTarea(id, page);
}
    

    render() {
        const { listarTarea, data, loader, eliminar, onSortChange, onSearchChange, punteo } = this.props;
        console.log("PROPS ", this.props);
        return (
            <React.Fragment>
                <center><h3>Tareas Registradas</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href={`/#/curso/${this.props.match.params.idp}/tarea/crear`}
                    className='btn btn-primary'
                    >
                        Crear Tarea
                    </a>

                    <a 
                    href={`/#/detalle_curso/${this.props.match.params.idp}/`}
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
                            dataFormat={(cell,row)=>{
                                return <a className="px-2" style={{cursor: "pointer", color: "#5979F4"}}  href={`/#/curso/${this.props.match.params.idp}/tarea/${cell}/calificacion/`}><i className="material-icons">content_paste</i></a>
                                }} 
                        >
                            
                            Calificacion
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                ver: `/curso/${this.props.match.params.idp}/tarea`, 
                                editar: `/curso/${this.props.match.params.idp}/tarea`, 
                            })}
                            
                        >
                            Acciones
                        </TableHeaderColumn>
                    </Grid>
                }
                <center><h5><label>PUNTEO TOTAL: </label></h5></center>
            <center><h4><label> {punteo ? punteo.valor_tarea__sum : [] } puntos </label></h4></center>
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