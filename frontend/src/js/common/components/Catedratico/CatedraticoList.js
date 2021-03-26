import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoCatedraticos extends Component {
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render(){
        const { listar, data, loader, eliminar } = this.props;
        console.log('PROPS en list12: ', this.props);
        return(
            <React.Fragment>
                <center><h3>Catedraticos Registrados</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/catedratico/crear'
                    className='btn btn-primary'
                    >
                        Crear Catedratico
                    </a>

                
                </div>
                {data &&
                    <Grid 
                        hover
                        striped
                        data={data}
                        loading={loader}
                        onPageChange={listar}
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
                            dataField='profesion'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.nombre_profesion;
                            }}
                        >
                            Profesión
                        </TableHeaderColumn>


                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                ver: 'catedratico', 
                                editar: 'catedratico',
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
export default ListadoCatedraticos;