import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListadoSecciones extends Component {
    componentWillMount() {
        const { listar } = this.props;
        listar();
    }

    render() {
        const { listar, data, loader, eliminar, onSortChange, onSearchChange } = this.props;
        return (
            <React.Fragment>
                <center><h3>Secciones Registradas</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/seccion/crear'
                    className='btn btn-primary'
                    >
                        Crear Seccion
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
                        onPageChange={listar}
                        onSortChange={onSortChange}
                    >
                        <TableHeaderColumn
                            isKey
                            dataField='nombre_seccion'
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                editar: 'seccion',
                                ver: 'seccion', 
                                eliminar: eliminar,
                            })}
                        >
                            Acciones
                        </TableHeaderColumn>
                    </Grid>
                }
            </React.Fragment>
        )
    }
}

export default ListadoSecciones;