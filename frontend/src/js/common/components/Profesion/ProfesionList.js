import React, { Component } from 'react';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { Field, reduxForm } from 'redux-form';

import Select from 'react-select';

import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

import {renderField, renderFilePicker, SelectField, renderNumber} from '../Utils/renderField/renderField';

const genders = [
    {"label": "Masculino", "value": 0},
    {"label": "Femenino", "value": 1},
];


class ListadoProfesiones extends Component {
    componentWillMount() {
        const { listar } = this.props;
        listar();
    }

    render() {
        const { listar, data, loader, eliminar, onSortChange, onSearchChange } = this.props;

        return (
            <React.Fragment>
                <center><h3>Profesiones Registradas</h3></center>
                <div className='d-flex flex-row justify-content-between alig-items-center mb-2'>
                <a 
                    href='/#/profesion/crear'
                    className='btn btn-primary'
                    >
                        Crear Profesion
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
                            dataField='nombre_profesion'
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField='id'
                            dataAlign='center'
                            dataSort
                            dataFormat={standardActions({
                                editar: 'profesion',
                                ver: 'profesion', 
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

export default ListadoProfesiones;