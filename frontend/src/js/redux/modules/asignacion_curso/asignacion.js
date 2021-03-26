import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "asignacion_curso",        //Identificador dentro del estado
    "asignacion_curso",        //Endpoint a donde se realizarán las peticiones
    "AsignacionCursoForm",    //Formulario que utilizará
    "/asignacion_curso",       //Ruta a la que irá una vez ejecute las instrucciones
);

const crearAsignCurso = (data) => (dispatch) => {
    const formData={
        curso: data.curso.value,
        grado: data.grado.value,
        seccion: data.seccion.value,
        catedratico: data.catedratico.value,
        ciclo_escolar: data.ciclo_escolar.value,
        }
        api.post('/asignacion_curso', formData).then(() => {
            dispatch(push("/asignacion_curso"));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
        });
    };

const leerAsignCurso = id => (dispatch) => {
    api.get(`asignacion_curso/${id}`).then((response) => {
        response.curso = {value: response.curso.id , label: response.curso.nombre_curso}
        response.grado = {value: response.grado.id , label: response.grado.nombre_grado}
        response.seccion = {value: response.seccion.id , label: response.seccion.nombre_seccion}
        response.catedratico = {value: response.catedratico.id , label: response.catedratico.profile.user.first_name + ' '+ response.catedratico.profile.user.last_name}
        response.ciclo_escolar = {value: response.ciclo_escolar.id , label: response.ciclo_escolar.nombre_ciclo_escolar}
        dispatch(initializeForm('AsignacionCursoForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 

const editarAsignCurso = (id, data) => (dispatch) => {
    const formData={
        curso: data.curso.value,
        grado: data.grado.value,
        seccion: data.seccion.value,
        catedratico: data.catedratico.value,
        ciclo_escolar: data.ciclo_escolar.value,
        }
        api.put(`asignacion_curso/${id}`, formData).then(() => {
            dispatch(push("/asignacion_curso"));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
        });
    };

const getCurso = (search) => () => {
    let cursos = [];
    return api
        .get("curso", { search })
        .then((response) => {
        cursos = response.results.map((curso) => ({
                value: parseInt(curso.id),
                label: curso.nombre_curso,
            }));
            return cursos;
        })
        .catch((err) => {
            return cursos;
        });
};

const getGrado = (search) => () => {
    let grados = [];
    return api
        .get("grado", { search })
        .then((response) => {
        grados = response.results.map((grado) => ({
                value: parseInt(grado.id),
                label: grado.nombre_grado,
            }));
            return grados;
        })
        .catch((err) => {
            return grados;
        });
};

const getSeccion = (search) => () => {
    let secciones = [];
    return api
        .get("seccion", { search })
        .then((response) => {
        secciones = response.results.map((seccion) => ({
                value: parseInt(seccion.id),
                label: seccion.nombre_seccion,
            }));
            return secciones;
        })
        .catch((err) => {
            return secciones;
        });
};

const getCatedratico = (search) => () => {
    let catedraticos = [];
    return api
        .get("catedratico", { search })
        .then((response) => {
        catedraticos = response.results.map((catedratico) => ({
                value: parseInt(catedratico.id),
                label: catedratico.profile.user.first_name + ' ' + catedratico.profile.user.last_name,
            }));
            return catedraticos;
        })
        .catch((err) => {
            return catedraticos;
        });
};

const getCicloEscolar = (search) => () => {
    let cicloescolar = [];
    return api
        .get("ciclo_escolar", { search })
        .then((response) => {
        cicloescolar = response.results.map((ciclo_escolar) => ({
                value: parseInt(ciclo_escolar.id),
                label: ciclo_escolar.nombre_ciclo_escolar,
            }));
            return cicloescolar;
        })
        .catch((err) => {
            return cicloescolar;
        });
};

//const LOADER = 'REGISTER_LOADER';

/*export const actions = {
    ...baseReducer.actions,
    crearGrado,
    leerGrado,
    editarGrado,
    getNivel,
};

export const initialState = {
    ...baseReducer.initialState,
};

export const reducers = {
    ...baseReducer.reducers,
}*/

actions['crearAsignCurso'] = crearAsignCurso;
actions['leerAsignCurso'] = leerAsignCurso;
actions['editarAsignCurso'] = editarAsignCurso;
actions['getCurso'] = getCurso;
actions['getGrado'] = getGrado;
actions['getSeccion'] = getSeccion;
actions['getCatedratico'] = getCatedratico;
actions['getCicloEscolar'] = getCicloEscolar;

export default handleActions(reducers, initialState);