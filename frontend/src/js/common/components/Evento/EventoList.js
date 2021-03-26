import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import  moment  from 'moment';


class ListadoEventos extends Component {
    componentWillMount() {
        const { listarEvento, match } = this.props;
        const id = match.params.idp;
        listarEvento(id);
    }

    cambiarPagina = (page) => {
        const  { listarEvento, match } = this.props;
        const id = match.params.idp;
        listarEvento(id, page);
    }

    render() {
        console.log("PROPS ", this.props);        
        const { listarEvento, data, loader, eliminar, onSortChange, onSearchChange } = this.props;

        return (
            <React.Fragment>
                <center><h3>Eventos Registrados</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href={`/#/curso/${this.props.match.params.idp}/evento/crear`}
                    className='btn btn-primary'
                    >
                        Crear Evento
                    </a>

                    <a 
                    href={`/#/detalle_curso/${this.props.match.params.idp}/`}
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
                        onSortChange={onSortChange}
                    >
                        <TableHeaderColumn
                            isKey
                            dataField='nombre'
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='descripcion'
                            dataSort
                        >
                            Descripcion
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='fecha'
                            dataSort
                            dataFormat={(cell,row)=>{
                                return (moment(cell, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm'))
                                }}
                        >
                            Fecha de realización
                        </TableHeaderColumn>


                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                ver: `/curso/${this.props.match.params.idp}/evento`, 
                                editar: `/curso/${this.props.match.params.idp}/evento`, 
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

export default ListadoEventos;