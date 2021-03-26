import React, { Component } from 'react';
import Formulario from './Formulario';

class RegistroAsignCurso extends Component{
    state={
        creacion: true,
    }

    componentWillMount = () => {
        const { leerAsignCurso, match } = this.props;
        const id = match.params.id;

        if(id){
            this.setState({creacion:false});
            leerAsignCurso(id);
        }
    }

    actualizarAsignCurso = (data) => {
        const { editarAsignCurso } = this.props;
        const id = data.id;
        editarAsignCurso(id, data);
    }

    render(){
        console.log("PROPS: ", this.props);
        const { crearAsignCurso, getCurso, getGrado, getSeccion, getCatedratico, getCicloEscolar } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? crearAsignCurso : this.actualizarAsignCurso;

        return (
            <React.Fragment>
                <Formulario
                    creacion={creacion}
                    getCurso={getCurso}
                    getGrado={getGrado}
                    getSeccion={getSeccion}
                    getCatedratico={getCatedratico}
                    getCicloEscolar={getCicloEscolar}
                    onSubmit={funcionEnvio}
                />
            </React.Fragment>
        )
    }
}

export default RegistroAsignCurso;