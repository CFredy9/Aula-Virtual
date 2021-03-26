import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';

// ------------------------------------
// Constants
// ------------------------------------
const LOADER = 'REGISTER_LOADER';
const DATA = 'DATAS';
const PAGE = 'PAGINAESTUDIANTE'
const ORDERING = 'ORDERING_ESTUDIANTE';
const SEARCH = 'SEARCH_ESTUDIANTE';
/*export const { reducers, initialState, actions } = createReducer(
    "catedratico",
    "catedratico",
    "CatedraticoForm",
    "/catedratico",
);*/

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

const crear = (data) => (dispatch) => {
const formData={
        profile: {
            avatar: data.profile.avatar,
            gender: data.profile.gender,
            phone: data.profile.phone,
            address: data.profile.address,
            rol: data.rol,
            user:{
                username: data.profile.user.username,
                email: data.profile.user.email,
                first_name: data.profile.user.first_name,
                last_name: data.profile.user.last_name,
                password: data.password
            }
        },
        grado: data.grado.value,
        estudiante: {
            nombre_contacto: data.nombre_contacto,
            telefono_contacto: data.telefono_contacto
        }
    }
    dispatch(setLoader(true));
    api.post('/estudiante', formData).then(() => {
        dispatch(push("/estudiante"));
        NotificationManager.success('Registro creado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const editar = (id, data) => (dispatch) => {
    data.password=' '
    data.confirmPassword=' '
    const formData={
        profile: {
            avatar: data.profile.avatar,
            gender: data.profile.gender,
            phone: data.profile.phone,
            address: data.profile.address,
            user:{
                username: data.profile.user.username,
                email: data.profile.user.email,
                first_name: data.profile.user.first_name,
                last_name: data.profile.user.last_name,
            }
        },
        grado: data.grado.value,
        estudiante: {
            nombre_contacto: data.nombre_contacto,
            telefono_contacto: data.telefono_contacto
        }
    }
    api.put(`/estudiante/${id}`, formData).then(() => {
        dispatch(push("/estudiante"));
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Error en la actualización', 'ERROR', 0);
    }).finally(() => {
    });
};


const listar = (page = 1) => (dispatch, getStore) => {
    const estado = getStore().estudiante;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    api.get('/estudiante/', params).then(response => {
        console.log("Estudiante", response);
        dispatch(setData(response));
        dispatch(setPage(page));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 

const leer = id => (dispatch) => {
    api.get(`estudiante/${id}`).then((response) => {
        console.log('Response', response);
        response.profile.rol = {value: response.profile.rol.id , label: response.profile.rol.nombre_rol};
        response.grado = response.grado ? {value: response.grado.id , label: response.grado.nombre_grado} : '';
        dispatch(initializeForm('EstudianteForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 

const getRoles = (search) => {
    let roles = [];
    return api
        .get("rol", { search })
        .then((response) => {
	    roles = response.results.map((rol) => ({
                value: parseInt(rol.id),
                label: (rol.nombre_rol),
            }));
            return roles;
        })
        .catch((err) => {
            return roles;
        });
};

const getGrados = (search) => {
    let grados = [];
    return api
        .get("grado", { search })
        .then((response) => {
	    grados = response.results.map((grado) => ({
                value: parseInt(grado.id),
                label: (grado.nombre_grado),
            }));
            console.log('GRADOS', grados)
            return grados;
        })
        .catch((err) => {
            return grados;
        });
};

export const reducers = {
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data, 
        };
    },
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
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
};

export const actions = {
    crear,
    editar,
    listar,
    leer,
    getRoles,
    getGrados,
};

export const initialState = {
    loader: false,
    data: null,
    page: 1,
    ordering: '',
    search: '',
};


export default handleActions(reducers, initialState);