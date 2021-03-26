import React, { Component } from 'react';
import Formulario from './Formulario';

class Calificacion extends Component{
    state={
        creacion: true,
    }

    componentWillMount = () => {
        const { leerCalificacion, match } = this.props;
        const id = match.params.id;

        if(id){
            this.setState({creacion:false});
            leerCalificacion(id);
        }
    }

    actualizarCalificacion = (data) => {
        const { editarCalificacion } = this.props;
        const id = data.id;
        editarCalificacion(id, data);
    }


    render(){
        console.log("PROPS: ", this.props);
        const { crearCalificacion, getEstudiante, data } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? crearCalificacion : this.actualizarCalificacion;

        return (
            <React.Fragment>
                <Formulario
                    crear={creacion}
                    onSubmit={funcionEnvio}
                    getEstudiante={getEstudiante}
                    initialValues={{tarea:this.props.match.params.idt, 
                                    curso_tarea:this.props.match.params.idp}}
                    idp = {this.props.match.params.idp}
                    idt = {this.props.match.params.idt}
                />
            </React.Fragment>
        )
    }
}

export default Calificacion;