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
    "ciclo_escolar",
    "ciclo_escolar",
    "CicloEscolarForm",
    "/ciclo_escolar",
);

const crearCiclo = (data) => (dispatch) => {
    const formData={
        nombre_ciclo_escolar: data.nombre_ciclo_escolar
        }
        api.get('/ciclo_escolar').then((response) => {
            console.log('response', response)
        })
        /*api.post('/ciclo_escolar', formData).then(() => {
            dispatch(push("/ciclo_escolar"));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
        });*/
    };

actions['crearCiclo'] = crearCiclo;

export default handleActions(reducers, initialState);