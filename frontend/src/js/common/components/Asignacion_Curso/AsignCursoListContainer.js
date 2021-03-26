import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacion_curso/asignacion';
import ListAsignCurso from './AsignCursoList';

const ms2p = (state) => {
  return {
    ...state.asignacion_curso,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListAsignCurso);