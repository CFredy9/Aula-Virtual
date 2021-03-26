import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../../Utils/Grid";
import { Field, reduxForm } from 'redux-form';
import {standardActions} from "../../Utils/Grid/StandardActions";
//import Formulario from './FormularioCursos';

class ListadoCalificacion extends Component {
    componentWillMount = () => {
        const  { listarCalificacionCalificada, listarCalificacionCalificadaCurso,listarCalificadas, match } = this.props;
        listarCalificacionCalificada();
        listarCalificacionCalificadaCurso()
        listarCalificadas();
    }
    render(){
        
        console.log("PROPS: ", this.props);
        const { data, data2, loader, eliminar, punteo, listarCalificacionCalificada, listarCalificacionCalificadaCurso } = this.props;
        
        return(
            <React.Fragment>
                {/*<Formulario onSubmit={listarCalificacionPendienteCurso} getCursos={getCursos} />*/}

                <br></br>
                <center><h3>Tareas Calificadas Por Curso</h3></center>
               
                {data &&
                    <Grid 
                        hover
                        striped
                        data={data2}
                        loading={loader}
                        onPageChange={listarCalificacionCalificadaCurso}
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
                            dataField='tareas'
                            dataSort
                        >
                            Total Tareas Calificadas
                        </TableHeaderColumn>
                        
                        
                        
                        {/*<TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                editar: `/curso_asignado/${this.props.match.params.idp}/tarea/${data.tarea}/calificacion`,
                            })}
                        >
                            Editar
                        </TableHeaderColumn> */}
                        
                    </Grid>
                }

                <br></br>
                <center><h3>Tareas Calificadas</h3></center>
               
                {data &&
                    <Grid 
                        hover
                        striped
                        data={data}
                        loading={loader}
                        onPageChange={listarCalificacionCalificada}
                    >

                    <TableHeaderColumn
                            isKey
                            dataField='estudiante'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.profile.user.first_name + ' ' + cell.profile.user.last_name;
                            }}
                        >
                            Estudiante
                    </TableHeaderColumn>

                    <TableHeaderColumn
                            dataField='tarea'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.detalle_curso.curso_asignado.curso.nombre_curso;
                            }}
                        >
                            Curso
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='tarea'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.titulo;
                            }}
                        >
                            Tarea
                        </TableHeaderColumn>
                        
                       


                        
                        
                        {/*<TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                editar: `/curso_asignado/${this.props.match.params.idp}/tarea/${data.tarea}/calificacion`,
                            })}
                        >
                            Editar
                        </TableHeaderColumn> */}
                        
                    </Grid>
                }
                <center><h5><label>TOTAL TAREAS CALIFICADAS: </label></h5></center>
                <center><h4><label> {punteo ? punteo.id: [] }  </label></h4></center>
        </React.Fragment>
        );
    }
}
export default ListadoCalificacion;