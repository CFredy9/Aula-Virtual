import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "profesion",        //Identificador dentro del estado
    "profesion",        //Endpoint a donde se realizarán las peticiones
    "ProfesionForm",    //Formulario que utilizará
    "/profesion",       //Ruta a la que irá una vez ejecute las instrucciones
);

export default handleActions(reducers, initialState);
