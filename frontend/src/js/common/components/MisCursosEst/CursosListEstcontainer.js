import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacion_estudiante/miscursosest';
import CursoList from './CursosListEst';

const ms2p = (state) => {
  return {
    ...state.miscursosest,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CursoList);