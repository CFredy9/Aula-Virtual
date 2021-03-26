import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoGrados extends Component {
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render(){
        const { listar, data, loader, eliminar, editar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Grados Registrados</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/grado/crear'
                    className='btn btn-primary'
                    >
                        Crear Grado
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
                            dataField='nombre_grado'
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='nivel'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return cell.nombre_nivel;
                            }}
                        >
                            Nivel
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                ver: 'grado', 
                                editar: 'grado',
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
export default ListadoGrados;