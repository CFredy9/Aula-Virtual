import React, { Component } from 'react';
import Formulario from './DetalleCurso';

class RegistroDetalle extends Component{

    componentWillMount = () => {
        const { listarDetalle, match } = this.props;
        const id = match.params.id;
        listarDetalle(id);

    }

    render(){
        console.log("PROPS: ", this.props);
        const { data } = this.props;

        return (
            <React.Fragment>
                <Formulario
                    
                    valores = {data ? data[0] : []}
                    
                    id = {this.props.match.params.id}
                />
            </React.Fragment>
        );
    }
}

export default RegistroDetalle;