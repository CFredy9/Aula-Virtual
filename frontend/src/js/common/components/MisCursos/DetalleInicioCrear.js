import React, { Component } from 'react';
import Formulario from './DetalleInicio';

class RegistroDetalle extends Component{

    componentWillMount = () => {
        const { listarDetalle, match } = this.props;
        const id = match.params.id;
        listarDetalle(id);

    }
    /*actualizarAsignCurso = (data) => {
        const { editarAsignCurso } = this.props;
        const id = data.id;
        editarAsignCurso(id, data);
    } */

    render(){
        console.log("PROPS: ", this.props);
        const { crearDetalle, editarDetalle, data } = this.props;

        return (
            <React.Fragment>
                <Formulario
                    onSubmit={editarDetalle}
                    //initialValues={{curso_asignado: this.props.match.params.id}}
                    // valores={data[0]}
                    valores = {data ? data[0] : []}
                    
                    id = {this.props.match.params.id}
                />
            </React.Fragment>
        );
    }
}

export default RegistroDetalle;