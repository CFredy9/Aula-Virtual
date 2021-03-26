import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/curso/cursos';
import CursoCrear from './CursoCrear';

const ms2p = (state) => {
    return {
        ...state.curso,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CursoCrear);