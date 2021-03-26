import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/ciclo_escolar/ciclo_escolar';
import Ciclo_EscolarCrear from './Ciclo_EscolarCrear';

const ms2p = (state) => {
    return {
        ...state.ciclo_escolar,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Ciclo_EscolarCrear);