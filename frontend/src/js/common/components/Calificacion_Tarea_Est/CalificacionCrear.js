import React, { Component } from 'react';
import Formulario from './Formulario';

class Calificacion extends Component{
    state={
        creacion: true,
        documento: null,
    }

    componentWillMount = () => {
        const { leerCalificacionEst, leerTarea, match } = this.props;
        const id = match.params.id;

        

        if(id){
            this.setState({creacion:false});
            leerCalificacionEst(id);
        }
        else {
            leerTarea(match.params.idt)
        }
    }

    setDocumento = (documento) => {
        console.log("documento: ", documento);
        this.setState({ documento });
    };

    registroCalificacion = (data) => {
        const {crearCalificacionEst, documento} = this.props;
        crearCalificacionEst({...data, documento:null}, [{ file: this.state.documento, name: 'documento' },])
    }

    actualizarCalificacion = (data) => {
        const { editarCalificacionEst, documento } = this.props;
        const id = data.id;
        editarCalificacionEst({...data, documento:null}, [{ file: this.state.documento, name: 'documento' },]);
    }

    /*actualizarCalificacion = (data) => {
        const { editarCalificacion } = this.props;
        const id = data.id;
        editarCalificacion(id, data);
    } */


    render(){
        console.log("DATAAAS: ", this.props);
        const { documento, getEstudiante, clearFile, data, registro } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? this.registroCalificacion : this.actualizarCalificacion;

        return (
            <React.Fragment>
                <Formulario
                    crear={creacion}
                    onSubmit={funcionEnvio}
                    getEstudiante={getEstudiante}
                    setDocumento={this.setDocumento}
                    documento={documento}
                    clearFile={clearFile}
                    initialValues={{tarea:this.props.match.params.idt, 
                                    curso_tarea:this.props.match.params.idp, 
                                    nota:0}}
                    idp = {this.props.match.params.idp}
                    idt = {this.props.match.params.idt}
                    valores = {registro}
                />
            </React.Fragment>
        )
    }
}

export default Calificacion;