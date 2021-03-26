import React, { Component } from 'react';
import '../../../../assets/styles/Demo.css'


class Demo extends Component {
    
    render() {
        const { me } = this.props;
        console.log('USUARIO', this.props)
        return (
            <React.Fragment>
                {/*<div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12 col-sm-4">
                    <span
                        className="text-uppercase page-subtitle">Escritorio ejemplo
                    </span>
                    <h3 className="page-title">Titulo secundario</h3>
        </div> 
       
            <img 
            src="https://png.pngtree.com/thumb_back/fw800/background/20200907/pngtree-graduation-cap-school-supplies-blackboard-education-background-image_397993.jpg" 
            width="100%" 
            height="510px"
           />   */}

        <div class="contenedor">
            <a href="#">
                <figure>
                    <img src="https://png.pngtree.com/thumb_back/fw800/background/20200907/pngtree-graduation-cap-school-supplies-blackboard-education-background-image_397993.jpg"/>
                    <div class="capa">
                    <h3>BIENVENIDO AL SISTEMA</h3>
                    <br></br>
                    <h2>{me.first_name ? me.first_name : []} {me.last_name ? me.last_name : []}</h2>
                </div>
            </figure>
        </a>
    </div>
       
       </React.Fragment>
        );
    }
}

export default Demo;
