import React, { Component } from 'react';
import Formulario from './Formulario';
import  moment  from 'moment';

class Evento extends Component{
    state={
        creacion: true,
    }

    componentWillMount = () => {
        const { leerEvento, match } = this.props;
        const id = match.params.id;
        console.log("Hora ", moment().format('llll')) 
        if(id){
            this.setState({creacion:false});
            leerEvento(id);
        }
    }

    actualizarEvento = (data) => {
        const { editarEvento } = this.props;
        const id = data.id;
        editarEvento(id, data);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { crearEvento } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? crearEvento : this.actualizarEvento;

        return (
            <React.Fragment>
                <Formulario
                    crear={creacion}
                    onSubmit={funcionEnvio}
                    initialValues={{detalle_curso:this.props.match.params.idp}}
                    valor={this.props.match.params.idp}
                />
            </React.Fragment>
        )
    }
}

export default Evento;