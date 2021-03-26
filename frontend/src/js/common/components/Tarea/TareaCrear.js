import React, { Component } from 'react';
import Formulario from './Formulario';

class Tarea extends Component{
    state={
        creacion: true,
        archivo: null,
    }

    componentWillMount = () => {
        const { leerTarea, leerPunteoTareas, match } = this.props;
        const id = match.params.id;
        
        leerPunteoTareas(match.params.idp);

        if(id){
            this.setState({creacion:false});
            leerTarea(id);
        }
    }

    setArchivo = (archivo) => {
        console.log("archivo: ", archivo);
        this.setState({ archivo });
    };

    registroTarea = (data) => {
        const {crearTarea, archivo} = this.props;
        crearTarea({...data, archivo:null}, [{ file: this.state.archivo, name: 'archivo' },])
    }

    actualizarTarea = (data) => {
        const { editarTarea, archivo } = this.props;
        const id = data.id;
        editarTarea({...data, archivo:null}, [{ file: this.state.archivo, name: 'archivo' },]);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { archivo, clearFile} = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? this.registroTarea : this.actualizarTarea;

        return (
            <React.Fragment>
                <Formulario
                    crear={creacion}
                    onSubmit={funcionEnvio}
                    setArchivo={this.setArchivo}
                    archivo={archivo}
                    clearFile={clearFile}
                    initialValues={{detalle_curso:this.props.match.params.idp}}
                    valor={this.props.match.params.idp}
                />
            </React.Fragment>
        )
    }
}

export default Tarea;