import React, { Component } from 'react';
import Formulario from './Formulario';
import '../Login/login.css';
import LoadMask from "Utils/LoadMask/LoadMask";
import {Link, Redirect} from 'react-router-dom';

class Contraseña extends Component{
    state={
        creacion: true,
    }

    actualizarContraseña = (data) => {
        const { updateContraseña, match } = this.props;
        const id = match.params.id;
        updateContraseña (id, data);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { updateContraseña, loader} = this.props;
        const { creacion } = this.state;

        return (
            <React.Fragment>
               <div className="">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center">Cambio de Contraseña</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                            <Formulario onSubmit={this.actualizarContraseña} />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default Contraseña;