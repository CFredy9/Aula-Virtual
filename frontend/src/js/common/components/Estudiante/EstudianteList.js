import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoEstudiantes extends Component {
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render(){
        const { listar, data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Estudiantes Registrados</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/estudiante/crear'
                    className='btn btn-primary'
                    >
                        Crear Estudiante
                    </a>

                
                </div>
                {data &&
                    <Grid 
                        hover
                        striped
                        data={data}
                        loading={loader}
                    >
                        <TableHeaderColumn
                            isKey
                            dataField='profile'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.user.first_name;
                            }}
                        >
                            Nombre
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='profile'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.user.last_name;
                            }}
                        >
                            Apellido
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='profile'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.phone;
                            }}
                        >
                            Telefono
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='profile'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.user.email;
                            }}
                        >
                            Correo Electronico
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='grado'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell ? cell.nombre_grado : '';
                            }}
                        >
                            Grado
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                ver: 'estudiante', 
                                editar: 'estudiante',
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
export default ListadoEstudiantes;