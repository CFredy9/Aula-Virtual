import {handleActions} from 'redux-actions';
import { api } from "api";


const USUARIO = 'USUARIO';
const CATEDRATICO = 'CATEDRATICO';
const ESTUDIANTE = 'ESTUDIANTE';
const CICLO_ESCOLAR = 'CICLO_ESCOLAR';
const GRADO = 'GRADO';
const SECCION = 'SECCION';
const NIVEL = 'NIVEL';
const CURSO = 'CURSO';

export const setUsuario = usuario => ({
    type: USUARIO,
    usuario,
});
export const setCatedratico = catedratico => ({
    type: CATEDRATICO,
    catedratico,
});
export const setEstudiante = estudiante => ({
    type: ESTUDIANTE,
    estudiante,
});
export const setCicloEscolar = ciclo_escolar => ({
    type: CICLO_ESCOLAR,
    ciclo_escolar,
});
export const setGrado = grado => ({
    type: GRADO,
    grado,
});
export const setSeccion = seccion => ({
    type: SECCION,
    seccion,
});
export const setNivel = nivel => ({
    type: NIVEL,
    nivel,
});
export const setCurso = curso => ({
    type: CURSO,
    curso,
});


const totalUsuarios = () => (dispatch, getStore) => {
    api.get('/catedratico/total_usuarios').then(response => {
        //console.log("Pendiente", response);
        dispatch(setUsuario(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};

const totalCatedraticos = () => (dispatch, getStore) => {
    api.get('/catedratico/total_catedraticos').then(response => {
        dispatch(setCatedratico(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};

const totalEstudiantes = () => (dispatch, getStore) => {
    api.get('/estudiante/total_estudiantes').then(response => {
        dispatch(setEstudiante(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};

const totalCiclos = () => (dispatch, getStore) => {
    api.get('/ciclo_escolar/total_ciclos').then(response => {
        dispatch(setCicloEscolar(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};

const totalGrados = () => (dispatch, getStore) => {
    api.get('/grado/total_grados').then(response => {
        dispatch(setGrado(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};

const totalSecciones = () => (dispatch, getStore) => {
    api.get('/seccion/total_secciones').then(response => {
        dispatch(setSeccion(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};

const totalNiveles = () => (dispatch, getStore) => {
    api.get('/nivel/total_niveles').then(response => {
        dispatch(setNivel(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};

const totalCursos = () => (dispatch, getStore) => {
    api.get('/curso/total_cursos').then(response => {
        dispatch(setCurso(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
    });
};


export const actions = {
    totalUsuarios,
    totalCatedraticos,
    totalEstudiantes,
    totalCiclos,
    totalGrados,
    totalSecciones,
    totalNiveles,
    totalCursos,
};

export const reducers = {
    [USUARIO]: (state, { usuario }) => {
        return {
            ...state,
            usuario, 
        };
    },
    [CATEDRATICO]: (state, { catedratico }) => {
        return {
            ...state,
            catedratico, 
        };
    },
    [ESTUDIANTE]: (state, { estudiante }) => {
        return {
            ...state,
            estudiante, 
        };
    },
    [CICLO_ESCOLAR]: (state, { ciclo_escolar }) => {
        return {
            ...state,
            ciclo_escolar, 
        };
    },
    [GRADO]: (state, { grado }) => {
        return {
            ...state,
            grado, 
        };
    },
    [SECCION]: (state, { seccion }) => {
        return {
            ...state,
            seccion, 
        };
    },
    [NIVEL]: (state, { nivel }) => {
        return {
            ...state,
            nivel, 
        };
    },
    [CURSO]: (state, { curso }) => {
        return {
            ...state,
            curso, 
        };
    },
}; 

export const initialState = {
    usuario: null,
    catedratico: null,
    estudiante: null,
    ciclo_escolar: null,
    grado: null,
    seccion: null,
    nivel: null, 
    curso: null
};

export default handleActions(reducers, initialState);