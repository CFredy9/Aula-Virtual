import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListadoCursos extends Component {
    componentWillMount() {
        const { listar } = this.props;
        listar();
    }

    render() {
        const { listar, data, loader, eliminar, onSortChange, onSearchChange } = this.props;
        console.log('props en lista: ', this.props);
        return (
            <React.Fragment>
                <center><h3>Cursos Registrados</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/curso/crear'
                    className='btn btn-primary'
                    >
                        Crear Curso
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
                            dataField='nombre_curso'
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                editar: 'curso',
                                ver: 'curso', 
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

export default ListadoCursos;