import React, { Component } from 'react';
import '../../Login/login.css';

class Enviado extends Component{
    state={
        creacion: true,
    }

    render(){

        return (
            <React.Fragment>
                <center>
                <div className="card card-login col-lg-10 col-md-10 ">
               <div className="">
                <div className="d-flex flex-column align-items-center pt-5 bienvenida">
                    <h1 className="text-center">El enlace de recuperacion de contraseña 
                    ha sido enviado exitosamente, revise su Correo Electrónico </h1>
                </div>
                <br />
                <div className="buttons-box">
                <a 
                    href='/#/login'
                    className='btn btn-success m-1 align-self-center'
                    >
                        Regresar Login
                    </a>
                  </div>
                
            </div>
            </div>
            </center>
            </React.Fragment>
        )
    }
}

export default Enviado;