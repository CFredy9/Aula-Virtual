import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { Field, reduxForm  } from 'redux-form';
//import { renderField } from '../Utils/renderField/renderField';

import Grid from "../../Utils/Grid";
//import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoCurso extends Component {
    componentWillMount = () => {
        const { listarCursosEst } = this.props;
        listarCursosEst();
    }

    render(){
        console.log("PROPS: ", this.props);
        const { data, loader, onSortChange, onSearchChange, listarCursosEst} = this.props;
        
        return(
            <React.Fragment>
                
                <center><h3>Control de Notas</h3></center>
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
                        onPageChange={listarCursosEst}
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
                                return cell.catedratico.profile.user.first_name + ' '+ cell.catedratico.profile.user.last_name;
                            }}
                        >
                            Catedratico
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
                            dataField='punteo'
                            dataSort
                           
                        >
                            Nota
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