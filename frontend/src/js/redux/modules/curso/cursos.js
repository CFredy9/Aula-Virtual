import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "curso",
    "curso",
    "CursoForm",
    "/curso",
);

export default handleActions(reducers, initialState);