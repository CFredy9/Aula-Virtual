import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/estudiante/estudiantes';
import ListEstudiante from './EstudianteList';


const ms2p = (state) => {
  return {
    ...state.estudiante,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListEstudiante);