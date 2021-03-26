import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import detalle from '../asignacion_estudiante/detalle';
import  moment  from 'moment';

// ------------------------------------
// Constants
// ------------------------------------

/* export const { reducers, initialState, actions } = createReducer(
    "asignacion_estudiante",        //Identificador dentro del estado
    "asignacion_estudiante",        //Endpoint a donde se realizarán las peticiones
    "AsignacionEstudianteForm",    //Formulario que utilizará
    "/asignacion_estudiante",       //Ruta a la que irá una vez ejecute las instrucciones
); */
const LOADER = 'REGISTERTAREA';
const DATA = 'DATATAREA';
const GUARDAR_ARCHIVO = 'GUARDAR_ARCHIVO_TAREA';
const GUARDAR_REGISTRO_TAREA = 'GUARDAR_REGISTRO_TAREA';
const GUARDAR_REGISTRO = 'GUARDAR_REGISTRO_PUNTEO';
const PAGE = 'PAGINATAREA'
const ORDERING_TAREA = 'ORDERING_TAREA';
const SEARCH_TAREA = 'SEARCH_TAREA';
const PUNTEO = 'PUNTEO';


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
export const setPunteo = punteo => ({
    type: PUNTEO,
    punteo,
});
const setOrdering = ordering => ({
    type: ORDERING,
    ordering,
});

const setSearch = search => ({
    type: SEARCH,
    search,
});

const crearTarea = (data={}, attachments=[]) => (dispatch, getStore) => {
    const formData={
        detalle_curso: data.detalle_curso,
        titulo: data.titulo,
        descripcion: data.descripcion,
        valor_tarea: data.valor_tarea,
        fecha: moment(moment(data.fecha, 'l').format('l') + ' ' + (data.hora), 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
        punteo_tareas: data.punteo_tareas,
        } 
        console.log('TAREA', formData);
        api.postAttachments('/tarea', formData, attachments).then(() => {
            dispatch(push(`/curso/${data.detalle_curso}/tarea/`));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            if (formData.valor_tarea + formData.punteo_tareas > 100) {
                NotificationManager.error('La nota sobrepasa los 100 puntos totales del curso', 'ERROR', 0);
            }
            else {
                NotificationManager.error('Error en la creación', 'ERROR', 0);
            }
        }).finally(() => {
        }); 
    };

const leerTarea = id => (dispatch) => {
    api.get(`/tarea/${id}`).then((response) => {
        response.fecha = new Date(response.fecha)
        response.hora = moment(response.fecha, 'HH:mm').format('HH:mm')
        dispatch({type: GUARDAR_ARCHIVO, archivo: response.archivo});
        dispatch({type: GUARDAR_REGISTRO_TAREA, registro: response});
        dispatch(initializeForm('TareaForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 

const leerPunteoTareas = id => (dispatch) => {
    api.get(`/tarea/tarea_nota`, id).then((response) => {
        console.log("Punteo", response)
        response.punteo_tareas = response.valor_tarea__sum;
        response.detalle_curso = response.detalle_curso;
        dispatch({type: GUARDAR_REGISTRO, registro2: response});
        dispatch(initializeForm('TareaForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 


const listarTarea = (id, page = 1) => (dispatch, getStore) => {
    const estado = getStore().tarea;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    params.id = id
    api.get('/tarea/', params).then(response => {
        dispatch(setData(response));
        dispatch(setPage(page));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 

const listarPunteoTareas = (id) => (dispatch, getStore) => {
    api.get('/tarea/tarea_nota', id).then(response => {
        dispatch(setPunteo(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};


const editarTarea = (data={}, attachments) => (dispatch, getStore) => {
    const formData={
        detalle_curso: data.detalle_curso,
        titulo: data.titulo,
        descripcion: data.descripcion,
        valor_tarea: data.valor_tarea,
        fecha: moment(moment(data.fecha, 'l').format('l') + ' ' + (data.hora), 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
        } 
        api.putAttachments(`/tarea/${data.id}`, formData, attachments).then(() => {
            dispatch(push(`/curso/${data.detalle_curso}/tarea/`));
            NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
    });
};

const eliminar = id => (dispatch) => {
    //dispatch(setLoader(true));
    api.eliminar(`/tarea/${id}`).then(() => {
        dispatch(listarTarea());
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Error', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const clearFile = () => (dispatch) => {
    dispatch({type: GUARDAR_ARCHIVO, archivo: null});
}

//const LOADER = 'REGISTER_LOADER';

export const actions = {
    crearTarea,
    leerTarea,
    leerPunteoTareas,
    editarTarea,
    listarTarea,
    eliminar,
    clearFile,
    listarPunteoTareas,
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
    [GUARDAR_REGISTRO_TAREA]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
    [GUARDAR_REGISTRO]: (state, { registro2 }) => {
        return {
            ...state,
            registro2,
        };
    },
    [GUARDAR_ARCHIVO]: (state, { archivo }) => {
        return {
            ...state,
            archivo,
        };
    },   
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [ORDERING_TAREA]: (state, { ordering }) => {
        return {
            ...state,
            ordering,
        };
    },
    [SEARCH_TAREA]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },    
    [PUNTEO]: (state, { punteo }) => {
        return {
            ...state,
            punteo,
        };
    }, 
}; 

export const initialState = {
    loader: false,
    data: null,
    registro: null,
    registro2: null,
    punteo: null,
    archivo: null,
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