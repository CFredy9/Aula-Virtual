import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacion_estudiante/detalle';
import Detalle from './DetalleCrear';

const ms2p = (state) => {
  return {
    ...state.detallecurso,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Detalle);