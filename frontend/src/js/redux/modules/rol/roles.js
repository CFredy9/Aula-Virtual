import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "rol",
    "rol",
    "RolForm",
    "/rol",
);

export default handleActions(reducers, initialState);