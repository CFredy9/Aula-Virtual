import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import moment from 'moment';

// ------------------------------------
// Constants
// ------------------------------------

/* export const { reducers, initialState, actions } = createReducer(
    "asignacion_estudiante",        //Identificador dentro del estado
    "asignacion_estudiante",        //Endpoint a donde se realizarán las peticiones
    "AsignacionEstudianteForm",    //Formulario que utilizará
    "/asignacion_estudiante",       //Ruta a la que irá una vez ejecute las instrucciones
); */
const LOADER = 'REGISTERCALI';
const DATA = 'DATACALI';
const DATA2 = 'DATACALI2';
const PAGE = 'PAGINAACALI'
const PAGE2 = 'PAGINAACALI2'
const ORDERING = 'ORDERING_CALI';
const SEARCH = 'SEARCH_CALI';
const GUARDAR_DOCUMENTO = 'GUARDAR_DOCUMENTO';
const GUARDAR_REGISTRO = 'GUARDAR_REGISTRO_CALIFICACION';
const PUNTEO = 'PUNTEO';

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const setData = data => ({
    type: DATA,
    data,
});

export const setData2 = data2 => ({
    type: DATA2,
    data2,
});

const setPage = page => ({
    type: PAGE,
    page,
});
const setPage2 = page2 => ({
    type: PAGE2,
    page2,
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

const crearCalificacion = (data) => (dispatch, getStore) => {
    const formData={
        estudiante: data.estudiante.value,
        tarea: data.tarea,
        descripcion: data.descripcion,
        nota: data.nota
        } 
        console.log("DATA", data)
        console.log('FormData', formData)
        api.post('/calificacion_tarea', formData).then(() => {
            dispatch(push(`/curso/${data.curso_tarea}/tarea/${data.tarea}/calificacion`));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
        });
    };

    const crearCalificacionEst = (data={}, attachments=[]) => (dispatch, getStore) => {
        /*const formData={
            estudiante: data.estudiante.value,
            tarea: data.tarea,
            descripcion: data.descripcion,
            nota: data.nota
            } */
            console.log('data', data)
            console.log('Attchamente', attachments)
            api.postAttachments('/calificacion_tarea', data, attachments).then(() => {
                dispatch(push(`/curso_asignado/${data.curso_tarea}/tarea/`));
                NotificationManager.success('Registro creado', 'Éxito', 3000);
            }).catch(() => {
                if (moment().format('YYYY-MM-DD HH:mm') > data.fecha) {
                    NotificationManager.error('La tarea no puede ser enviada, limite de fecha', 'ERROR', 0);
                }
                else {
                    NotificationManager.error('Error en la creación', 'ERROR', 0);
                }
            }).finally(() => {
            }); 
        };

const leerCalificacion = id => (dispatch) => {
    api.get(`calificacion_tarea/${id}`).then((response) => {
        console.log("calificacion", response)
        response.estudiante = {value: response.estudiante.id , label: response.estudiante.profile.user.first_name + ' '+ response.estudiante.profile.user.last_name}
        dispatch(initializeForm('calificacionForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 

const leerCalificacionEst = id => (dispatch) => {
    api.get(`calificacion_tarea/${id}`).then((response) => {
        console.log("calificacion", response)
        dispatch({type: GUARDAR_DOCUMENTO, documento: response.documento});
        dispatch({type: GUARDAR_REGISTRO, registro: response});
        dispatch(initializeForm('calificacionEstForm', response));
    }).catch(() => {
    }).finally(() => {
 });
};

const leerTarea = id => (dispatch) => {
    api.get(`/tarea/${id}`).then((response) => {
        //response.fecha = new Date(response.fecha)
        response.fecha = moment(response.fecha, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm'),
        response.curso_tarea = response.detalle_curso;
        response.tarea = response.id;
        response.descripcion = "";
        response.nota = 0;
        dispatch({type: GUARDAR_REGISTRO, registro: response});
        dispatch(initializeForm('calificacionEstForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 


const listarCalificacion = (id, page = 1) => (dispatch, getStore) => {
    const estado = getStore().calificacion;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    params.id = id

    api.get('/calificacion_tarea/', params).then(response => {
        console.log("Calificacion", response);
        dispatch(setData(response));
        dispatch(setPage(page));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 

const listarCalificacionEst = (idp, page = 1) => (dispatch, getStore) => {
    const estado = getStore().calificacion;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    params.idp = idp

    api.get('/calificacion_tarea/', params).then(response => {
        console.log("Calificacion", response);
        dispatch(setData(response));
        dispatch(setPage(page));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};  

const listarCalificacionEstCalificada = (idp, page2 = 1) => (dispatch, getStore) => {
    const estado = getStore().calificacion;    
    let params = { page2 };
    params.ordering = estado.ordering;
    params.search = estado.search;
    params.idp = idp

    api.get('/calificadas/', params).then(data2 => {
        console.log("Calificacion2", data2);
        dispatch(setData2(data2));
        dispatch(setPage2(page2));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 

const listarCalificacionPendiente = (id = 0, page = 1) => (dispatch, getStore) => {
    const estado = getStore().calificacion;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    params.id = id

    api.get('/pendientes/', params).then(data => {
        console.log("Calificacion Pendiente", data);
        dispatch(setData(data));
        dispatch(setPage(page));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 

const listarCalificacionPendienteCurso = (page2 = 1) => (dispatch, getStore) => {
    const estado = getStore().calificacion;    
    let params = { page2 };
    params.ordering = estado.ordering;
    params.search = estado.search;
    api.get('/pendientes_curso', params).then(data2 => {
        console.log("Calificacion Pendiente", data2);
        dispatch(setData2(data2));
        dispatch(setPage2(page2));
        //dispatch(push(`/tareaspendientescalificar`));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 


const listarPendientes = () => (dispatch, getStore) => {
    const estado = getStore().calificacion; 
    //console.log('IDP', idp) 
    api.get('/pendientes/total_tareas').then(response => {
        console.log("Pendiente", response);
        dispatch(setPunteo(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const listarCalificacionCalificada = (page = 1) => (dispatch, getStore) => {
    const estado = getStore().calificacion;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;

    api.get('/calificadastareas/', params).then(data => {
        dispatch(setData(data));
        dispatch(setPage(page));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 

const listarCalificacionCalificadaCurso = (page2 = 1) => (dispatch, getStore) => {
    const estado = getStore().calificacion;    
    let params = { page2 };
    params.ordering = estado.ordering;
    params.search = estado.search;
    api.get('/calificadastareas_curso', params).then(data2 => {
        dispatch(setData2(data2));
        dispatch(setPage2(page2));
        //dispatch(push(`/tareaspendientescalificar`));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 


const listarCalificadas = () => (dispatch, getStore) => {
    const estado = getStore().calificacion; 
    //console.log('IDP', idp) 
    api.get('/calificadastareas/total_tareas').then(response => {
        dispatch(setPunteo(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const listarPunteo = (idp) => (dispatch, getStore) => {
    const estado = getStore().calificacion; 
    console.log('IDP', idp) 
    api.get('/calificacion_tarea/nota_total', idp).then(response => {
        console.log("Punteo", response);
        dispatch(setPunteo(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};


const editarCalificacion = (id, data) => (dispatch, getStore) => {
    const formData={
        estudiante: data.estudiante.value,
        tarea: data.tarea.id,
        nota: data.nota,
        valor_tarea: data.tarea.valor_tarea
        } 
        console.log("DATA", formData)
        api.put(`calificacion_tarea/${id}`, formData).then(() => {
            dispatch(push(`/curso/${data.tarea.detalle_curso.curso_asignado.id}/tarea/${data.tarea.id}/calificacion/`));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
    });
};

const editarCalificacionEst = (data={}, attachments) => (dispatch, getStore) => {
    const formData={
        estudiante: data.estudiante.id,
        tarea: data.tarea.id,
        nota: data.nota,
        descripcion: data.descripcion,
        } 
        console.log("DATA", data);
        console.log('ATTCHMENTS', attachments);
        api.putAttachments(`calificacion_tarea/${data.id}`, formData, attachments).then(() => {
            dispatch(push(`/curso_asignado/${data.tarea.detalle_curso.curso_asignado.id}/calificacion/`));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
    });
};



const eliminar = (id) => (dispatch) => {
    //dispatch(setLoader(true));
    api.eliminar(`/calificacion_tarea/${id}`).then(() => {
        //dispatch(listarCalificacion(1));
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Error', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const clearFile = () => (dispatch) => {
    dispatch({type: GUARDAR_DOCUMENTO, documento: null});
}

const getEstudiante = ( search, id ) => () => {
    let estudiantes = [];
    //id = 1;
    return api
        .get(`asignacion_estudiante`, { search, id })
        .then((response) => {
        estudiantes = response.results.map((asignacion_estudiante) => ({
                value: parseInt(asignacion_estudiante.estudiante.id),
                //label: asignacion_estudiante.id,
                label: asignacion_estudiante.estudiante.profile.user.first_name + ' ' + asignacion_estudiante.estudiante.profile.user.last_name,
            }));
            return estudiantes;
        })
        .catch((err) => {
            return estudiantes;
        });
};

const getTarea = (search) => () => {
    let tareas = [];
    return api
        .get("tarea", { search })
        .then((response) => {
        tareas = response.results.map((tarea) => ({
                value: parseInt(tarea.id),
                label: tarea.titulo,
            }));
            return tareas;
        })
        .catch((err) => {
            return tareas;
        });
};

const getCursos = (search) => () => {
    let cursos = [];
    return api
        .get("/curso_personalizado", { search })
        .then((response) => {
        console.log('Cursos', response);
        cursos = response.results.map((curso) => ({
                value: parseInt(curso.curso_asignado.curso.id),
                label: curso.curso_asignado.curso.nombre_curso,
            }));
            return cursos;
        }) 
        .catch((err) => {
            return cursos;
        });
};


//const LOADER = 'REGISTER_LOADER';

export const actions = {
    crearCalificacion,
    crearCalificacionEst,
    leerCalificacion,
    leerCalificacionEst,
    leerTarea,
    editarCalificacion,
    editarCalificacionEst,
    getEstudiante,
    getTarea,
    listarCalificacion,
    listarCalificacionEst,
    listarCalificacionEstCalificada,
    listarCalificacionPendiente,
    listarCalificacionPendienteCurso,
    listarPunteo,
    listarPendientes,
    listarCalificacionCalificada,
    listarCalificacionCalificadaCurso,
    listarCalificadas,
    eliminar,
    clearFile,
    getCursos,
};

export const reducers = {
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data, 
        };
    },
    [DATA2]: (state, { data2 }) => {
        return {
            ...state,
            data2, 
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
    [PAGE2]: (state, { page2 }) => {
        return {
            ...state,
            page2,
        };
    },
    [PUNTEO]: (state, { punteo }) => {
        return {
            ...state,
            punteo,
        };
    },
    [ORDERING]: (state, { ordering }) => {
        return {
            ...state,
            ordering,
        };
    },
    [SEARCH]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },   
    [GUARDAR_REGISTRO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
    [GUARDAR_DOCUMENTO]: (state, { documento }) => {
        return {
            ...state,
            documento,
        };
    },    
}; 

export const initialState = {
    loader: false,
    data: null,
    data2: null,
    registro: null,
    punteo: null,
    documento: null,
    page: 1,
    page2:1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);