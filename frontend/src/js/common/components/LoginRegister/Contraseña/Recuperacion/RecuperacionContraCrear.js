import React, { Component } from 'react';
import Formulario from './Formulario';
import '../../Login/login.css';
import {Link, Redirect} from 'react-router-dom';

class Recuperacion extends Component{
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
        const { verificarCorreo } = this.props;
        const { creacion } = this.state;

        return (
            <React.Fragment>
               <div className="">
                <div className="d-flex flex-column align-items-center pt-5 bienvenida">
                    <h1 className="text-center">Verificacion de Correo</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                            <Formulario onSubmit={verificarCorreo} />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default Recuperacion;