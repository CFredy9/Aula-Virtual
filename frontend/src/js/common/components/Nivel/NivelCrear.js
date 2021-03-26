import React, { Component } from 'react';
import Formulario from './Formulario';

class RegistroNivel extends Component{
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

    actualizarNivel = (data) => {
        const { editar } = this.props;
        const id = data.id;
        editar(id, data);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { crear } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? crear : this.actualizarNivel;

        return (
            <React.Fragment>
                <Formulario
                    creacion={creacion}
                    onSubmit={funcionEnvio}
                />
            </React.Fragment>
        )
    }
}

export default RegistroNivel;


/*
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import RegisterForm from './Formulario';
//import LoadMask from "../../Utils/LoadMask/LoadMask";

class Registro extends Component {
    state = {
        creacion:true,
    }

    componentWillMount = () => {
        const { leer, match } = this.props;
        const id = match.params.id;
        if(id) {
            this.setState({creacion: false})
            leer(id);
        } 
    }

    render() {
        const { crear } = this.props;
        const { creacion } = this.state;

        return (
            <React.Fragment>
                <RegisterForm 
                creacion={creacion}
                onSubmit={crear}/>
            </React.Fragment>
        );
    }
}
export default Registro;*/