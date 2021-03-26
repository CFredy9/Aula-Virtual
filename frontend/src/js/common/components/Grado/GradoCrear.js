import React, { Component } from 'react';
import Formulario from './Formulario';

class RegistroGrado extends Component{
    state={
        creacion: true,
    }

    componentWillMount = () => {
        const { leerGrado, match } = this.props;
        const id = match.params.id;

        if(id){
            this.setState({creacion:false});
            leerGrado(id);
        }
    }

    actualizarGrado = (data) => {
        const { editarGrado } = this.props;
        const id = data.id;
        editarGrado (id, data);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { crearGrado, getNivel } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? crearGrado : this.actualizarGrado;

        return (
            <React.Fragment>
                <Formulario
                    creacion={creacion}
                    getNivel={getNivel}
                    onSubmit={funcionEnvio}
                />
            </React.Fragment>
        )
    }
}

export default RegistroGrado;