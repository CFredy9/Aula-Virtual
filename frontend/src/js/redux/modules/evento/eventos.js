import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import detalle from '../asignacion_estudiante/detalle';
import  moment  from 'moment';


const LOADER = 'REGISTERTEVENTO';
const DATA = 'DATAEVENTO';
const PAGE = 'PAGINAEVENTO'
const ORDERING_EVENTO = 'ORDERING_EVENTO';
const SEARCH_EVENTO = 'SEARCH_EVENTO';

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

const crearEvento = (data) => (dispatch) => {
    const formData={
        detalle_curso: data.detalle_curso,
        nombre: data.nombre,
        descripcion: data.descripcion,
        fecha: moment(moment(data.fecha, 'l').format('l') + ' ' + (data.hora), 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
        //hora: data.hora,
        }
        api.post('/evento', formData).then(() => {
            dispatch(push(`/curso/${data.detalle_curso}/evento/`));
            NotificationManager.success('Registro creado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
        });
    };

const leerEvento = id => (dispatch) => {
    api.get(`/evento/${id}`).then((response) => {
        //response.fecha = (moment().format('llll'))
        response.fecha = new Date(response.fecha);
        response.hora = moment(response.fecha, 'HH:mm').format('HH:mm');
        console.log("DATOS ", response);
        dispatch(initializeForm('EventoForm', response));
    }).catch(() => {
    }).finally(() => {
 });
}; 


const listarEvento = (id, page = 1) => (dispatch, getStore) => {
    const estado = getStore().evento;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;
    params.id = id
    api.get('/evento/', params).then(response => {
        dispatch(setData(response));
        dispatch(setPage(page));
    })
    .catch(() => {
        console.log("error", error)
    }).finally(() => {
        dispatch(setLoader(false));
    });
}; 


const editarEvento = (id, data) => (dispatch) => {
    let fechap;
    const formData={
        detalle_curso: data.detalle_curso,
        nombre: data.nombre,
        descripcion: data.descripcion,
        hora: data.hora,
        //fecha: moment().format('YYYY-MM-DDThh:mm')
        //fecha: moment('25/03/2021' + ' ' + data.hora, 'DD/MM/YYYY HH:mm').format('LLL'),
        fecha: moment(moment(data.fecha, 'l').format('l') + ' ' + (data.hora), 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
        }
        //console.log(formData.fecha.format('YYYY-MM-DD HH:mm'))
        console.log("Datos Enviados ", formData)
        api.put(`/evento/${id}`, formData).then(() => {
            dispatch(push(`/curso/${data.detalle_curso}/evento/`));
            NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        }).catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR', 0);
        }).finally(() => {
    }); 
};

const eliminar = id => (dispatch) => {
    //dispatch(setLoader(true));
    api.eliminar(`/evento/${id}`).then(() => {
        dispatch(listarTarea());
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Error', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

//const LOADER = 'REGISTER_LOADER';

export const actions = {
    crearEvento,
    leerEvento,
    editarEvento,
    listarEvento,
    eliminar,
};

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
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [ORDERING_EVENTO]: (state, { ordering }) => {
        return {
            ...state,
            ordering,
        };
    },
    [SEARCH_EVENTO]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },     
}; 

export const initialState = {
    loader: false,
    data: null,
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);