import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/calificacion_tarea/calificacion';
import CalificacionList from './CalificacionList';

const ms2p = (state) => {
    return {
        ...state.calificacion,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CalificacionList);