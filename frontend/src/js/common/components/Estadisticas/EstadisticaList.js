import React, { Component } from 'react';

class ListadoCalificacion extends Component {
    componentWillMount = () => {
        const  { totalUsuarios, totalCatedraticos, totalEstudiantes, totalCiclos, totalGrados, totalSecciones, totalNiveles, totalCursos } = this.props;
        totalUsuarios();
        totalCatedraticos();
        totalEstudiantes();
        totalCiclos();
        totalGrados();
        totalSecciones();
        totalNiveles();
        totalCursos();
    }
    render(){
        
        console.log("PROPS: ", this.props);
        const { usuario, catedratico, estudiante, ciclo_escolar, grado, seccion, nivel, curso } = this.props;
        
        return(
            <React.Fragment>
                <br></br>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="form-group has-feedback flex-1 mx-3">
                        <center><h5><label>Total Usuarios Registrados: </label></h5></center>
                        <center><h4><label> {usuario ? usuario.total: [] }  </label></h4></center>

                        <center><h5><label>Total Catedraticos Registrados: </label></h5></center>
                        <center><h4><label> {catedratico ? catedratico.total: [] }  </label></h4></center>

                        <center><h5><label>Total Estudiantes Registrados: </label></h5></center>
                        <center><h4><label> {estudiante ? estudiante.total: [] }  </label></h4></center>

                        <center><h5><label>Total Ciclos Escolares Registrados: </label></h5></center>
                        <center><h4><label> {ciclo_escolar ? ciclo_escolar.total: [] }  </label></h4></center>
                    </div>

                    <div className="form-group has-feedback flex-1 mx-3">
                        <center><h5><label>Total Grados Registrados: </label></h5></center>
                        <center><h4><label> {grado ? grado.total: [] }  </label></h4></center>

                        <center><h5><label>Total Secciones Registradas: </label></h5></center>
                        <center><h4><label> {seccion ? seccion.total: [] }  </label></h4></center>

                        <center><h5><label>Total Niveles Registrados: </label></h5></center>
                        <center><h4><label> {nivel ? nivel.total: [] }  </label></h4></center>

                        <center><h5><label>Total Cursos Registrados: </label></h5></center>
                        <center><h4><label> {curso ? curso.total: [] }  </label></h4></center>
                    </div>
                </div>
        </React.Fragment>
        );
    }
}
export default ListadoCalificacion;