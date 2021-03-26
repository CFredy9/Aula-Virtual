import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { Field, reduxForm  } from 'redux-form';
import { renderField } from '../Utils/renderField/renderField';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoCurso extends Component {
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render(){
        console.log("PROPS: ", this.props);
        const { data, loader, onSortChange, onSearchChange, listar} = this.props;
        return(
            <React.Fragment>
                
                <center><h3>Cursos Asignados</h3></center>
                {/*<div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/miscursos'
                    className='btn btn-primary'
                    >
                        Regresar
                    </a>
                </div> */}
                
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
                            dataField='curso_asignado'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.curso.nombre_curso;
                            }}
                        >
                            Curso
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
                            dataField='curso_asignado'
                            dataAlign='center'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return <a className="px-2" style={{cursor: "pointer", color: "#008AE5"}} href={`/#/curso/${cell.id}/grado/${cell.grado.id}/asignacion_estudiante`}><i className="material-icons">add_circle</i></a>
                                
                                }} 
                        >
                            
                            Asignar Estudiante
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return <a className="px-2" style={{cursor: "pointer", color: "#00A7FF"}} href={`/#/detalle_curso/${cell}`} ><i className="material-icons">home_work</i></a>         
                                }} 
                                
                        >
                            
                            Detalle
                        </TableHeaderColumn>
                        
                    </Grid>
                }
                
            </React.Fragment>
        );
    }
}

{/*dataFormat={standardActions({
                                add: 'asignacion_estudiante'
                                
                            })} */}

{/* dataFormat={(cell,row)=>{
return <React.Fragment>
<form onSubmit={filtro} className="w-25" >
<Field name='id' placeholder={cell} component={renderField} type="hidden" input={cell}/>
<button type="submit"> <i className="material-icons">add_circle</i> </button>
</form>
</React.Fragment>
}}    */}

export default ListadoCurso;