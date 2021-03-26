import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
import profesion from './modules/profesion/profesiones';
import curso from './modules/curso/cursos';
import ciclo_escolar from './modules/ciclo_escolar/ciclo_escolar';
import catedratico from './modules/catedratico/catedraticos';
import estudiante from './modules/estudiante/estudiantes';
import nivel from './modules/nivel/niveles';
import seccion from './modules/seccion/secciones';
import rol from './modules/rol/roles';
import grado from './modules/grado/grados';
import asignacion_curso from './modules/asignacion_curso/asignacion';
import asignacion_estudiante from './modules/asignacion_estudiante/asignacion';
import miscursos from './modules/asignacion_estudiante/miscursos';
import miscursosest from './modules/asignacion_estudiante/miscursosest';
import detallecurso from './modules/asignacion_estudiante/detalle';
import tarea from './modules/tarea/tareas';
import evento from './modules/evento/eventos';
import calificacion from './modules/calificacion_tarea/calificacion';
import estadisticas from './modules/estadisticas/estadisticas';
import contraseña from './modules/contraseña/contraseña';

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    profesion,
    curso,
    ciclo_escolar,
    catedratico,
    estudiante,
    nivel,
    seccion,
    rol,
    grado,
    asignacion_curso,
    asignacion_estudiante,
    miscursos,
    miscursosest,
    detallecurso,
    tarea,
    evento,
    calificacion,
    estadisticas,
    contraseña,
});
