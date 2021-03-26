import React, { Component } from 'react';
import Formulario from './Detalle';

class RegistroDetalleC extends Component{

    state={
        portada: null,
    }

    componentWillMount = () => {
        const { leerDetalle, match } = this.props;
        const id = match.params.id;
        leerDetalle(id);
    }

    setPortada = (portada) => {
        console.log("portada: ", portada);
        this.setState({ portada });
    };

    actualizarDetalle = (data) => {
        const { editarDetalle, portada } = this.props;
        const id = data.id;
        editarDetalle({...data, portada:null}, [{ file: this.state.portada, name: 'portada' },]);
    }

    /*actualizarAsignCurso = (data) => {
        const { editarAsignCurso } = this.props;
        const id = data.id;
        editarAsignCurso(id, data);
    } */

    render(){
        console.log("DATOS: ", this.props);
        const { portada, clearFile, data } = this.props;

        return (
            <React.Fragment>
                <Formulario
                    onSubmit={this.actualizarDetalle}   
                    setPortada={this.setPortada}
                    portada={portada}
                    clearFile={clearFile}
                    //valores={data[0]}
                    valores = {data ? data[0] : []}
                />
            </React.Fragment>
        );
    }
}

export default RegistroDetalleC;