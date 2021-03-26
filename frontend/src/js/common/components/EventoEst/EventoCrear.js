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
        if(id){
            this.setState({creacion:false});
            leerEvento(id);
        }
    }


    render(){
        console.log("PROPS: ", this.props);
        const { creacion } = this.state;


        return (
            <React.Fragment>
                <Formulario
                    crear={creacion}
                    valor={this.props.match.params.idp}
                />
            </React.Fragment>
        )
    }
}

export default Evento;