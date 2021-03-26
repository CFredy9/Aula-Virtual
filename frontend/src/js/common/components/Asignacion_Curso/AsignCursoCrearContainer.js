import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacion_curso/asignacion';
import RegisterAsignCurso from './AsignCursoCrear';

const ms2p = (state) => {
  return {
    ...state.asignacion_curso,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(RegisterAsignCurso);