import React, { Component } from 'react';
import Formulario from './Formulario';
import '../../../Login/login.css';
class Contraseña extends Component{
    state={
        creacion: true,
    }

    componentWillMount = () => {
        const { leerToken, match } = this.props;
        const token = match.params.token;

            leerToken(token);
    }

    actualizarContraseña = (data) => {
        const { recuperacionContraseña } = this.props;
        recuperacionContraseña (data);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { updateContraseña, loader, data} = this.props;
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
                            <Formulario 
                                onSubmit={this.actualizarContraseña} 
                                valores = {data ? data : []}
                            />
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default Contraseña;