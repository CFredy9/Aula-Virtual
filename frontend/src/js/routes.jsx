import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro } from './common/components/LoginRegister';
import Contraseña from './common/components/LoginRegister/Contraseña/ContraseñaCrearContainer'
import RecuperacionContra from './common/components/LoginRegister/Contraseña/Recuperacion/RecuperacionContraContainer';
import CorreoEnviado from './common/components/LoginRegister/Contraseña/Recuperacion/CorreoEnviado';
import ContraseñaCambio from './common/components/LoginRegister/Contraseña/Recuperacion/CambioContraseña/ContraseñaCambioContainer';
import Demo from './common/components/Demo/DemoContainer';
import Demo2 from './common/components/Demo/Demo2';
import ProtectedRoute from './ProtectedRoute';
import CatedraticoRoute from './CatedraticoRoute';
import EstudianteRoute from './EstudianteRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';

import ProfesionCrearContainer from './common/components/Profesion/ProfesionCrearContainer';
import ProfesionListContainer from './common/components/Profesion/ProfesionListContainer';

import CursoCrearContainer from './common/components/Curso/CursoCrearContainer';
import CursoListContainer from './common/components/Curso/CursoListContainer';

import CicloEscolarCrearContainer from './common/components/Ciclo_Escolar/Ciclo_EscolarCrearContainer';
import CicloEscolarListContainer from './common/components/Ciclo_Escolar/Ciclo_EscolarListContainer'; 

import CatedraticoCrearContainer from './common/components/Catedratico/CatedraticoCrearContainer';
import CatedraticoListContainer from './common/components/Catedratico/CatedraticoListContainer';

import EstudianteCrearContainer from './common/components/Estudiante/EstudianteCrearContainer';
import EstudianteListContainer from './common/components/Estudiante/EstudianteListContainer';

import NivelCrearContainer from './common/components/Nivel/NivelCrearContainer';
import NivelListContainer from './common/components/Nivel/NivelListContainer';

import SeccionCrearContainer from './common/components/Seccion/SeccionCrearContainer';
import SeccionListContainer from './common/components/Seccion/SeccionListContainer';

import RolCrearContainer from './common/components/Rol/RolCrearContainer';
import RolListContainer from './common/components/Rol/RolListContainer';

import GradoCrearContainer from './common/components/Grado/GradoCrearContainer';
import GradoListContainer from './common/components/Grado/GradoListContainer';

import AsignCursoCrearContainer from './common/components/Asignacion_Curso/AsignCursoCrearContainer';
import AsignCursoListContainer from './common/components/Asignacion_Curso/AsignCursoListContainer';

import AsignEstudianteListContainer from './common/components/Asignacion_Estudiante/AsignEstudianteListContainer';

import CursosList from './common/components/Asignacion_Estudiante/CursosListContainer';
import CursosListEstContainer from './common/components/MisCursosEst/CursosListEstcontainer';

import DetalleInicio from './common/components/MisCursos/DetalleInicioContainer';
import Detalle from './common/components/MisCursos/DetalleCrearContainer';
import DetalleCursoEst from './common/components/MisCursosEst/DetalleCursoContainer';

import TareaCrearContainer from './common/components/Tarea/TareaCrearContainer';
import TareaListContainer from './common/components/Tarea/TareaListContainer';

import TareaCrearEstContainer from './common/components/Tarea_Est/TareaCrearContainer';
import TareaListEstContainer from './common/components/Tarea_Est/TareaListContainer';

import EventoCrearContainer from './common/components/Evento/EventoCrearContainer';
import EventoListContainer from './common/components/Evento/EventoListContainer';

import EventoCrearEstContainer from './common/components/EventoEst/EventoCrearContainer';
import EventoListEstContainer from './common/components/EventoEst/EventoListContainer';

import CalificacionCrearContainer from './common/components/Calificacion_Tarea/CalificacionCrearContainer';
import CalificacionListContainer from './common/components/Calificacion_Tarea/CalificacionListContainer';

import CalificacionCrearEstContainer from './common/components/Calificacion_Tarea_Est/CalificacionCrearContainer';
import CalificacionListEstContainer from './common/components/Calificacion_Tarea_Est/CalificacionListContainer';

import CalificacionPendienteListContainer from './common/components/Calificacion_Tarea/CalificacionPendiente/CalificacionListContainer';
import CalificacionCalificadaCursoListContainer from './common/components/Calificacion_Tarea/CalificacionCalificada/CalificacionListContainer';

import ControlNotasListEstContainer from './common/components/MisCursosEst/ControlNotas/CursosListEstcontainer';
import ControlNotasListContainer from './common/components/MisCursos/ControlNotas/CursosListNotascontainer';

import EstadisticaListContainer from './common/components/Estadisticas/EstadisticaListContainer';

import Ejemplos from '../js/Ejemplo 2';

require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/Contraseña" component={Contraseña} />
                <Route exact path="/recuperacioncontraseña" component={RecuperacionContra} />
                <Route exact path="/correoenviado" component={CorreoEnviado} />
                <Route exact path="/cambiocontraseña/:token" component={ContraseñaCambio} />
                <ProtectedRoute exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/contraseña/:id" component={Contraseña} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path="/profesion/crear" component={ProfesionCrearContainer} />
                <ProtectedRoute exact path="/profesion/:id" component={ProfesionCrearContainer} />
                <ProtectedRoute exact path="/profesion/:id/editar" component={ProfesionCrearContainer} />
                <ProtectedRoute exact path="/profesion" component={ProfesionListContainer} />

                <ProtectedRoute exact path="/curso/crear" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/curso/:id" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/curso/:id/editar" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/curso" component={CursoListContainer} />

                <ProtectedRoute exact path="/ciclo_escolar/crear" component={CicloEscolarCrearContainer} />
                <ProtectedRoute exact path="/ciclo_escolar/:id" component={CicloEscolarCrearContainer} />
                <ProtectedRoute exact path="/ciclo_escolar/:id/editar" component={CicloEscolarCrearContainer} />
                <ProtectedRoute exact path="/ciclo_escolar" component={CicloEscolarListContainer} />

                <ProtectedRoute exact path="/catedratico/crear" component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path="/catedratico/:id" component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path="/catedratico/:id/editar" component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path="/catedratico" component={CatedraticoListContainer} />

                <ProtectedRoute exact path="/estudiante/crear" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiante/:id" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiante/:id/editar" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiante" component={EstudianteListContainer} />

                <ProtectedRoute exact path="/nivel/crear" component={NivelCrearContainer} />
                <ProtectedRoute exact path="/nivel/:id" component={NivelCrearContainer} />
                <ProtectedRoute exact path="/nivel/:id/editar" component={NivelCrearContainer} />
                <ProtectedRoute exact path="/nivel" component={NivelListContainer} />

                <ProtectedRoute exact path="/seccion/crear" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/seccion/:id" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/seccion/:id/editar" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/seccion" component={SeccionListContainer} />

                <ProtectedRoute exact path="/rol/crear" component={RolCrearContainer} />
                <ProtectedRoute exact path="/rol/:id" component={RolCrearContainer} />
                <ProtectedRoute exact path="/rol/:id/editar" component={RolCrearContainer} />
                <ProtectedRoute exact path="/rol" component={RolListContainer} />

                <ProtectedRoute exact path="/grado/crear" component={GradoCrearContainer} />
                <ProtectedRoute exact path="/grado/:id" component={GradoCrearContainer} />
                <ProtectedRoute exact path="/grado/:id/editar" component={GradoCrearContainer} />
                <ProtectedRoute exact path="/grado" component={GradoListContainer} />

                <ProtectedRoute exact path="/asignacion_curso/crear" component={AsignCursoCrearContainer} />
                <ProtectedRoute exact path="/asignacion_curso/:id" component={AsignCursoCrearContainer} />
                <ProtectedRoute exact path="/asignacion_curso/:id/editar" component={AsignCursoCrearContainer} />
                <ProtectedRoute exact path="/asignacion_curso" component={AsignCursoListContainer} />

                {/*<ProtectedRoute exact path="/asignacion_estudiante/crear" component={AsignEstudianteCrearContainer} />
                <ProtectedRoute exact path="/asignacion_estudiante/:id" component={AsignEstudianteCrearContainer} /> 
                <ProtectedRoute exact path="/asignacion_estudiante/:id/editar" component={AsignEstudianteCrearContainer} />*/}
                <CatedraticoRoute exact path="/curso/:id/grado/:idg/asignacion_estudiante" component={AsignEstudianteListContainer} />
                
                <CatedraticoRoute exact path="/miscursos" component={CursosList} />
                <EstudianteRoute exact path="/miscursosest" component={CursosListEstContainer} />

                <CatedraticoRoute exact path="/detalle_curso/:id/editar" component={Detalle} />
                <CatedraticoRoute exact path="/detalle_curso/:id" component={DetalleInicio} />
                <EstudianteRoute exact path="/curso_asignado/:id" component={DetalleCursoEst} />

                <CatedraticoRoute exact path="/curso/:idp/tarea/crear" component={TareaCrearContainer} />
                <CatedraticoRoute exact path="/curso/:idp/tarea/:id" component={TareaCrearContainer} />
                <CatedraticoRoute exact path="/curso/:idp/tarea/:id/editar" component={TareaCrearContainer} />
                <CatedraticoRoute exact path="/curso/:idp/tarea" component={TareaListContainer} />
                
                <EstudianteRoute exact path="/curso_asignado/:idp/tarea/:id" component={TareaCrearEstContainer} />
                <EstudianteRoute exact path="/curso_asignado/:idp/tarea" component={TareaListEstContainer} />

                <CatedraticoRoute exact path="/curso/:idp/evento/crear" component={EventoCrearContainer} />
                <CatedraticoRoute exact path="/curso/:idp/evento/:id" component={EventoCrearContainer} />
                <CatedraticoRoute exact path="/curso/:idp/evento/:id/editar" component={EventoCrearContainer} />
                <CatedraticoRoute exact path="/curso/:idp/evento" component={EventoListContainer} />

                <EstudianteRoute exact path="/curso_asignado/:idp/evento/:id" component={EventoCrearEstContainer} />
                <EstudianteRoute exact path="/curso_asignado/:idp/evento" component={EventoListEstContainer} />

                <CatedraticoRoute exact path="/curso/:idp/tarea/:idt/calificacion/crear" component={CalificacionCrearContainer} />
                <CatedraticoRoute exact path="/curso/:idp/tarea/:idt/calificacion/:id" component={CalificacionCrearContainer} />
                <CatedraticoRoute exact path="/curso/:idp/tarea/:idt/calificacion/:id/editar" component={CalificacionCrearContainer} />
                <CatedraticoRoute exact path="/curso/:idp/tarea/:idt/calificacion" component={CalificacionListContainer} />

                <EstudianteRoute exact path="/curso_asignado/:idp/tarea/:idt/calificacion/crear" component={CalificacionCrearEstContainer} />
                <CatedraticoRoute exact path="/curso_asignado/:idp/tarea/:idt/calificacion/:id" component={CalificacionCrearEstContainer} />
                <EstudianteRoute exact path="/curso_asignado/:idp/tarea/:idt/calificacion/:id/editar" component={CalificacionCrearEstContainer} />
                <EstudianteRoute exact path="/curso_asignado/:idp/calificacion" component={CalificacionListEstContainer} />

                <CatedraticoRoute exact path="/tareaspendientescalificar" component={CalificacionPendienteListContainer} />
                <CatedraticoRoute exact path="/tareascalificadas" component={CalificacionCalificadaCursoListContainer} />

                <EstudianteRoute exact path="/controlnotasest" component={ControlNotasListEstContainer} />
                <CatedraticoRoute exact path="/controlnotas" component={ControlNotasListContainer} />

                <ProtectedRoute exact path="/estadisticas" component={EstadisticaListContainer} />


                {/*<ProtectedRoute exact path="/ejemplo" component={Ejemplos} /> */}

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
