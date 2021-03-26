import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';

const LOADER = 'REGISTERRR';
const DATA = 'DATARR';
const GUARDAR_PORTADA = 'GUARDAR_PORTADA';
const GUARDAR_REGISTRO = 'GUARDAR_REGISTRO_DETALLE';

export const setLoader = loader => ({
    type: LOADER,
    loader,
});
export const setData = data => ({
    type: DATA,
    data,
});

const editarDetalle = (data={}, attachments) => (dispatch, getStore) => {
    console.log('data',data)
    console.log('attchments ',attachments)
    api.putAttachments(`/detalle_curso/${data.id}`, data, attachments).then(() => {
        dispatch(push(`/detalle_curso/${data.id}/`));
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR', 0);
    }).finally(() => {
});
};

/*const editarDetalle= (id) => (dispatch) => {
    const formData={
        curso_asignado: id.curso_asignado,
        descripcion: id.descripcion,
        }
    console.log('ID', id)
    api.put(`detalle_curso/${id.id}`, formData).then(() => {
        dispatch(push(`/detalle_curso/${id.curso_asignado.id}/`));
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Error en la creación', 'ERROR', 0);
    }).finally(() => {
    });
}; */

const leerDetalle = id => (dispatch) => {
    api.get(`detalle_curso/${id}`).then((response) => {
        dispatch({type: GUARDAR_PORTADA, portada: response.portada});
        dispatch({type: GUARDAR_REGISTRO, registro: response});
        dispatch(initializeForm('detalleForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 


const listarDetalle = (id) => (dispatch) => {
    api.get(`/detalle_curso/detalle/`, {id}).then(data => {
        //const data={results:response}
        console.log("Mi Curso", data);
        dispatch(initializeForm('detalleForm', data));
        dispatch(setData(data));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 

export const clearFile = () => (dispatch) => {
    dispatch({type: GUARDAR_PORTADA, portada: null});
} 


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
    [GUARDAR_PORTADA]: (state, { portada }) => {
        return {
            ...state,
            portada,
        };
    },  
    [GUARDAR_REGISTRO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
}; 

export const actions = {
    listarDetalle,
    editarDetalle,
    leerDetalle,
    clearFile,
};

export const initialState = {
    loader: false,
    data: null,
    portada: null,
    registro: null,
};

export default handleActions(reducers, initialState);