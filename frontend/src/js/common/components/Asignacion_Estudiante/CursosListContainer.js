import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacion_estudiante/miscursos';
import CursoList from './CursosList';

const ms2p = (state) => {
  return {
    ...state.miscursos,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CursoList);