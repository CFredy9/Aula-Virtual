import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';

// ------------------------------------
// Constants
// ------------------------------------
const LOADER = 'REGISTRO';
const DATA = 'DATOS';
const PAGE = 'PAGINACATEDRATICO';
const ORDERING = 'ORDERING_CATEDRATICO';
const SEARCH = 'SEARCH_CATEDRATICO';
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
        profesion: data.profesion.value
        
    }
    dispatch(setLoader(true));
    api.post('/catedratico', formData).then(() => {
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push("/catedratico"));
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const listar = (page = 1) => (dispatch, getStore) => {
    const estado = getStore().catedratico;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    api.get('/catedratico/', params).then(response => {
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
    api.get(`catedratico/${id}`).then((response) => {
        console.log('Response', response);
        response.profesion = {value: response.profesion.id , label: response.profesion.nombre_profesion}
        response.profile.rol = {value: response.profile.rol.id , label: response.profile.rol.nombre_rol}
        dispatch(initializeForm('CatedraticoForm', response));
    }).catch(() => {
    }).finally(() => {
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
        profesion: data.profesion.value
    }
    api.put(`catedratico/${id}`, formData).then(() => {
        dispatch(push("/catedratico"));
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Error en la actualización', 'ERROR', 0);
    }).finally(() => {
    });
};

const getProfesiones = (search) => {
    let profesiones = [];
    return api
        .get("profesion", { search })
        .then((response) => {
	    profesiones = response.results.map((profesion) => ({
                value: parseInt(profesion.id),
                label: (profesion.nombre_profesion),
            }));
            return profesiones;
        })
        .catch((err) => {
            return profesiones;
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
    listar,
    leer,
    editar,
    getProfesiones,
    getRoles,
};

export const initialState = {
    loader: false,
    data: null,
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);