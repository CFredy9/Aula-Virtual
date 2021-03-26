import React, { Component } from 'react';
import Formulario from './Formulario';

class Ciclo_Escolar extends Component{
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

    actualizarCicloEscolar = (data) => {
        const { editar } = this.props;
        const id = data.id;
        editar (id, data);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { crear, editar } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? crear : this.actualizarCicloEscolar;

        return (
            <React.Fragment>
                <Formulario
                    crear={creacion}
                    onSubmit={funcionEnvio}
                />
            </React.Fragment>
        )
    }
}

export default Ciclo_Escolar;