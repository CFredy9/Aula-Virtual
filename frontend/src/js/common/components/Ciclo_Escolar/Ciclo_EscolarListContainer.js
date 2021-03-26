import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/ciclo_escolar/ciclo_escolar';
import Ciclo_EscolarList from './Ciclo_EscolarList';

const ms2p = (state) => {
    return {
        ...state.ciclo_escolar,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Ciclo_EscolarList);