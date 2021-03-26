import { handleActions } from 'redux-actions';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { isNull } from 'lodash';

const LOADER = 'CONTRASEÑA_LOADER';
const DATA = 'DATOS_CAMBIO_CONTRASEÑA'

export const constants = {
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const setData = data => ({
    type: DATA,
    data,
});

// ------------------------------------
// Actions
// ------------------------------------

const updateContraseña = (id, data) => (dispatch) => {
    const formData={
        password: data.password,
        confirmpassword: data.confirmpassword,
        id: id
        }
        console.log('ID', id)
        api.put(`user/update_contraseña`, formData).then(() => {
            if(id == undefined){
                console.log("Exito")
                localStorage.removeItem('token');
                dispatch(push("/login"));
            }
            else {
                dispatch(push("/"));
            }
            
            NotificationManager.success('Contraseña actualizada', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
        });
    };

const recuperacionContraseña = (data) => (dispatch) => {
    const formData={
        username: data.username,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmpassword,
        }
        api.put(`user/recuperacion_contraseña`, formData).then(() => {
            dispatch(push("/login"));
            NotificationManager.success('Contraseña actualizada', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
        });
    };

const verificarCorreo = (data) => (dispatch, getStore) => {
    console.log('DATA', data) 
    api.get('/user').then(response => {
        console.log("Usuarios", response);
        let x = 0;
        let bandera = false;
        for(x = 0; x < response.results.length; x++) {
            if(response.results[x].email == data.email){
                bandera = true;
            }
        }
        if(bandera==true){
            api.post(`user/enviarCorreo`, data).then(() => {
            dispatch(push("/correoenviado"))
            NotificationManager.success('El enlace ha sido enviado exitosamente a su Correo Electrónico', 'Éxito', 3000);
            })
        }
        else {
            NotificationManager.error('El Correo Electrónico no está registrado', 'ERROR', 0);
        }
        //dispatch(setPunteo(response));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const leerToken = token => (dispatch) => {
    const toke = {
        codigo: token
    }
    console.log("TOKEN", token)
    api.get(`user/leer_token`, token).then((response) => {
        console.log("Response", response)
        dispatch(setData(response));
        dispatch(initializeForm('contraseñacambioForm', response));
    }).catch(() => {
    }).finally(() => {
 });
};


export const actions = {
    updateContraseña,
    recuperacionContraseña,
    verificarCorreo,
    leerToken
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
};

export const initialState = {
    loader: false,
    data: null,
};

export default handleActions(reducers, initialState);