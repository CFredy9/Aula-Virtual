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
    "grado",        //Identificador dentro del estado
    "grado",        //Endpoint a donde se realizarán las peticiones
    "GradoForm",    //Formulario que utilizará
    "/grado",       //Ruta a la que irá una vez ejecute las instrucciones
);

const crearGrado = (data) => (dispatch) => {
    const formData={
        nivel: data.nivel.value,
        nombre_grado: data.nombre_grado,
    
        }
        api.post('/grado', formData).then(() => {
            dispatch(push("/grado"));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
        });
    };

const leerGrado = id => (dispatch) => {
    api.get(`grado/${id}`).then((response) => {
        response.nivel = {value: response.nivel.id , label: response.nivel.nombre_nivel}
        dispatch(initializeForm('GradoForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 

const editarGrado = (id, data) => (dispatch) => {
    const formData={
        nivel: data.nivel.value,
        nombre_grado: data.nombre_grado,
        }
        api.put(`grado/${id}`, formData).then(() => {
            dispatch(push("/grado"));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
        });
    };

    const getNivel = (search) => () => {
        let ciclo = [];
        return api
            .get("nivel", { search })
            .then((response) => {
            ciclo = response.results.map((nivel) => ({
                    value: parseInt(nivel.id),
                    label: nivel.nombre_nivel,
                }));
                return ciclo;
            })
            .catch((err) => {
                return ciclo;
            });
    };

//const LOADER = 'REGISTER_LOADER';

/*export const actions = {
    ...baseReducer.actions,
    crearGrado,
    leerGrado,
    editarGrado,
    getNivel,
};

export const initialState = {
    ...baseReducer.initialState,
};

export const reducers = {
    ...baseReducer.reducers,
}*/

actions['crearGrado'] = crearGrado;
actions['leerGrado'] = leerGrado;
actions['editarGrado'] = editarGrado;
actions['getNivel'] = getNivel;

export default handleActions(reducers, initialState);