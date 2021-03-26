import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';

// ------------------------------------
// Constants
// ------------------------------------

/* export const { reducers, initialState, actions } = createReducer(
    "asignacion_estudiante",        //Identificador dentro del estado
    "asignacion_estudiante",        //Endpoint a donde se realizarán las peticiones
    "AsignacionEstudianteForm",    //Formulario que utilizará
    "/asignacion_estudiante",       //Ruta a la que irá una vez ejecute las instrucciones
); */
const LOADER = 'REGISTER2';
const DATA = 'DATA2';
const PAGE = 'PAGINAASIGEST'
const ORDERING_EMPRESA = 'ORDERING_ASIGEST';
const SEARCH_EMPRESA = 'SEARCH_ASIGEST';

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const setData = data => ({
    type: DATA,
    data,
});

const setPage = page => ({
    type: PAGE,
    page,
});

const setOrdering = ordering => ({
    type: ORDERING,
    ordering,
});

const setSearch = search => ({
    type: SEARCH,
    search,
});

const crearAsignEstudiante = (data) => (dispatch) => {
    const formData={
        curso_asignado: data.curso_asignado,
        estudiante: data.estudiante.value,
        }
        api.post('/asignacion_estudiante', formData).then(() => {
            dispatch(listarEst(data.curso_asignado));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
        });
    };

const leerAsignEstudiante = id => (dispatch) => {
    api.get(`asignacion_estudiante/${id}`).then((response) => {
        response.curso_asignado = {value: response.curso_asignado.id , label: response.curso_asignado.curso.nombre_curso}
        response.estudiante = {value: response.estudiante.id , label: response.estudiante.profile.user.first_name + ' '+ response.estudiante.profile.user.last_name}
        dispatch(initializeForm('AsignacionEstudianteForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 


const listarEst = (id, page = 1) => (dispatch, getStore) => {
    const estado = getStore().asignacion_estudiante;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    params.id = id

    api.get('/asignacion_estudiante/', params).then(response => {
        //const data={results:response, count:response.length}
        console.log("Mis Cursos", response);
        dispatch(setData(response));
        dispatch(setPage(page));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 


const editarAsignEstudiante = (id, data) => (dispatch) => {
    const formData={
        curso_asignado: data.curso_asignado.value,
        estudiante: data.estudiante.value,
        }
        api.put(`asignacion_estudiante/${id}`, formData).then(() => {
            dispatch(push("/asignacion_estudiante"));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
    });
};

const eliminar = id => (dispatch) => {
    //dispatch(setLoader(true));
    api.eliminar(`/asignacion_estudiante/${id}`).then(() => {
        dispatch(listarEst(2));
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Error', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

/*const getCursoAsignado = (search) => () => {
    let cursos = [];
    return api
        .get("asignacion_curso", { search })
        .then((response) => {
        cursos = response.results.map((asignacion_curso) => ({
                value: parseInt(asignacion_curso.id),
                label: asignacion_curso.curso.nombre_curso,
            }));
            return cursos;
        })
        .catch((err) => {
            return cursos;
        });
}; */

const getEstudiante = (search, id) => () => {
    let estudiantes = [];
    return api
        .get("estudiante", { search, id })
        .then((response) => {
        estudiantes = response.results.map((estudiante) => ({
                value: parseInt(estudiante.id),
                label: estudiante.profile.user.first_name + ' ' + estudiante.profile.user.last_name,
            }));
            return estudiantes;
        })
        .catch((err) => {
            return estudiantes;
        });
};




//const LOADER = 'REGISTER_LOADER';

export const actions = {
    crearAsignEstudiante,
    leerAsignEstudiante,
    editarAsignEstudiante,
    getEstudiante,
    listarEst,
    eliminar,
};

export const reducers = {
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data, 
        };
    },
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader, 
        };
    },
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [ORDERING_EMPRESA]: (state, { ordering }) => {
        return {
            ...state,
            ordering,
        };
    },
    [SEARCH_EMPRESA]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },    
}; 

export const initialState = {
    loader: false,
    data: null,
    page: 1,
    ordering: '',
    search: '',
};

/*actions['crearAsignEstudiante'] = crearAsignEstudiante;
actions['leerAsignEstudiante'] = leerAsignEstudiante;
actions['editarAsignEstudiante'] = editarAsignEstudiante;
actions['getCursoAsignado'] = getCursoAsignado;
actions['getEstudiante'] = getEstudiante;
actions['listarEst'] = listarEst; */

export default handleActions(reducers, initialState);