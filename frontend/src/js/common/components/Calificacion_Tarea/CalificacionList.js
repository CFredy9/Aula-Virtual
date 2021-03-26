import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import { Field, reduxForm } from 'redux-form';
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoCalificacion extends Component {
    componentWillMount = () => {
        const  { listarCalificacion, match } = this.props;
        const id = match.params.idt;
        listarCalificacion(id);
    }
    cambiarPagina = (page) => {
        const  { listarCalificacion, match } = this.props;
        const id = match.params.idt;
        listarCalificacion(id, page);
    }

    render(){
        
        console.log("PROPS: ", this.props);
        const { data, loader, eliminar } = this.props;
        
        return(
            <React.Fragment>

                <br></br>
                <center><h3>Calificaciones</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href={`/#/curso/${this.props.match.params.idp}/tarea/${this.props.match.params.idt}/calificacion/crear`}
                    className='btn btn-primary'
                    >
                        Agregar Calificación
                    </a>

                    <a 
                    href={`/#/curso/${this.props.match.params.idp}/tarea/`}
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
                            dataField='estudiante'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.profile.user.first_name + ' ' + cell.profile.user.last_name;
                            }}
                        >
                            Estudiante
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
                                ver: `/curso_asignado/${this.props.match.params.idp}/tarea/${this.props.match.params.idt}/calificacion`,
                            })}
                        >
                            Visualizar
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                editar: `/curso/${this.props.match.params.idp}/tarea/${this.props.match.params.idt}/calificacion`,
                            })}
                        >
                            Calificar
                        </TableHeaderColumn>
                    </Grid>
                }
        </React.Fragment>
        );
    }
}
export default ListadoCalificacion;