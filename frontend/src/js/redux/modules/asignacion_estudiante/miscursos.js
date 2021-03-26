import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';

const LOADER = 'REGISTER';
const DATA = 'DATA';
const GUARDAR_LISTADO = 'GUARDAR_LISTADO_CURSOSEST';
const ORDERING = 'ORDERING_CURSOSEST';
const SEARCH = 'SEARCH_CURSOSEST';
const PAGE = 'PAGINACURSOS'

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
    type: constants.ORDERING,
    ordering,
});

const setSearch = search => ({
    type: constants.SEARCH,
    search,
});

const listar = (page = 1) => (dispatch, getStore) => {
    const estado = getStore().miscursos;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;

    api.get('/curso_personalizado', params).then((response)=>{
        //const data={results:response, count:response.length, next:10, previous:null}
        console.log('Cursos: ', response)
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch((error)=>{
        console.log("error: ", error);
        
    });
}

    const onSortChange = (ordering) => (dispatch, getStore) => {
        const estado = getStore().empresa;
        const sort = estado.ordering;
    
        if(ordering == sort){
            dispatch({type: ORDERING_EMPRESA, ordering: `-${ordering}`});
        }else{
            dispatch({type: ORDERING_EMPRESA, ordering});
        }
        
        dispatch(listar());
    }
    
    const onSearchChange = (search) => (dispatch) => {
        dispatch({type: SEARCH_EMPRESA, search});
        dispatch(listar());
    }


export const reducers = {
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data, 
        };
    },
    [GUARDAR_LISTADO]: (state, { data }) => {
        return {
            ...state,
            data,
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
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
};

export const actions = {
    listar,
    onSortChange,
    onSearchChange,
};

export const initialState = {
    loader: false,
    data: {
        results: [],
        count: 0,
    },
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);