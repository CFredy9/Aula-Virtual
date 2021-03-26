import React, { Component } from 'react';
import Formulario from './Formulario';

class RegistroCatedratico extends Component{
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

    actualizarCatedratico = (data) => {
        const { editar } = this.props;
        const id = data.id;
        editar(id, data);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { crear, getProfesiones, getRoles } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? crear : this.actualizarCatedratico;

        return (
            <React.Fragment>
                <Formulario
                    creacion={creacion}
                    getProfesiones={getProfesiones}
                    getRoles={getRoles}
                    onSubmit={funcionEnvio}
                    initialValues={{rol: 1}}
                />
            </React.Fragment>
        )
    }
}

export default RegistroCatedratico;