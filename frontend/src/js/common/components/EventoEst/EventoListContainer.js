import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/evento/eventos';
import EventoList from './EventoList';

const ms2p = (state) => {
    return {
        ...state.evento,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(EventoList);