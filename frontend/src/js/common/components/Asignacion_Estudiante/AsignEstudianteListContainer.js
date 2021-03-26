import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacion_estudiante/asignacion';
import ListAsignEstudiante from './AsignEstudianteList';

const ms2p = (state) => {
  return {
    ...state.asignacion_estudiante,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListAsignEstudiante);