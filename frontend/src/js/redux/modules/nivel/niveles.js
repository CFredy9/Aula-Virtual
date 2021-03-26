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
    "nivel",        //Identificador dentro del estado
    "nivel",        //Endpoint a donde se realizarán las peticiones
    "NivelForm",    //Formulario que utilizará
    "/nivel",       //Ruta a la que irá una vez ejecute las instrucciones
);

export default handleActions(reducers, initialState);