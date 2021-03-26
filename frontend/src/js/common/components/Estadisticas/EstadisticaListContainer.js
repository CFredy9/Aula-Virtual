import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/estadisticas/estadisticas';
import EstadisticaList from './EstadisticaList';

const ms2p = (state) => {
  return {
    ...state.estadisticas,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(EstadisticaList);