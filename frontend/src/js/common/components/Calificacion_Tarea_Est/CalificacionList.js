import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import { Field, reduxForm } from 'redux-form';
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoCalificacion extends Component {
    componentWillMount = () => {
        const  { listarCalificacionEst, listarCalificacionEstCalificada, listarPunteo, match } = this.props;
        const idp = match.params.idp;
        listarCalificacionEst(idp);
        listarCalificacionEstCalificada(idp);
        listarPunteo(idp);
    }
    cambiarPagina = (page) => {
        const  { listarCalificacionEst, match } = this.props;
        const idp = match.params.idp;
        listarCalificacionEst(idp, page);
    } 

    cambiarPagina2 = (page2) => {
        const  { listarCalificacionEstCalificada, match } = this.props;
        const idp = match.params.idp;
        listarCalificacionEstCalificada(idp, page2);
    }


    render(){
        
        console.log("PROPS: ", this.props);
        const { data, data2, loader, eliminar, punteo } = this.props;
        
        return(
            <React.Fragment>

                <br></br>
                <center><h3>Tareas Enviadas</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                    <a 
                    href={`/#/curso_asignado/${this.props.match.params.idp}/tarea/`}
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
                    >
                        <TableHeaderColumn
                            isKey
                            dataField='tarea'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.titulo;
                            }}
                        >
                            Tarea
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='tarea'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.valor_tarea;
                            }}
                        >
                            Punteo Tarea
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='nota'
                            dataSort
                        >
                            Nota
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                editar: `/curso_asignado/${this.props.match.params.idp}/tarea/${data.tarea}/calificacion`,
                            })}
                        >
                            Editar
                        </TableHeaderColumn>
                        
                    </Grid>
                }


                <center><h3>Tareas Calificadas</h3></center>

                {data2 &&
                    <Grid 
                        hover
                        striped
                        data={data2}
                        loading={loader}
                        onPageChange={this.cambiarPagina2}
                    >
                        <TableHeaderColumn
                            isKey
                            dataField='tarea'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.titulo;
                            }}
                        >
                            Tarea
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='tarea'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.valor_tarea;
                            }}
                        >
                            Punteo Tarea
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='nota'
                            dataSort
                        >
                            Nota
                        </TableHeaderColumn>
                        
                        
                        
                    </Grid>
                }
            <center><h5><label>PUNTEO TOTAL: </label></h5></center>
            <center><h4><label> {punteo ? punteo.nota__sum : []} / {punteo ? punteo.tarea__valor_tarea__sum : []}</label></h4></center>
        </React.Fragment>
        );
    }
}
export default ListadoCalificacion;