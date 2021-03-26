import React, { Component } from 'react';
import Formulario from './Formulario';

class RegistroEstudiante extends Component{
    state={
        creacion: true,
    }

    componentWillMount = () => {
        const { leer, match } = this.props;
        const id = match.params.id;

        if(id){
            this.setState({creacion:false});
            leer(id);
        }
    }

    actualizarEstudiante = (data) => {
        const { editar } = this.props;
        const id = data.id;
        editar (id, data);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { crear, getRoles, getGrados } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? crear : this.actualizarEstudiante;

        return (
            <React.Fragment>
                <Formulario
                    creacion={creacion}
                    getRoles={getRoles}
                    getGrados={getGrados}
                    onSubmit={funcionEnvio}
                    initialValues={{rol: 2}}
                />
            </React.Fragment>
        )
    }
}

export default RegistroEstudiante;