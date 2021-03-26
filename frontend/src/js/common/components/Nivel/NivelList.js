import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoNiveles extends Component {
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render(){
        const { listar, data, loader, eliminar, editar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Niveles Registrados</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/nivel/crear'
                    className='btn btn-primary'
                    >
                        Crear Nivel
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
                            dataField='nombre_nivel'
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>
                        
                        
                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                ver: 'nivel', 
                                editar: 'nivel',
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
export default ListadoNiveles;