import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/catedratico/catedraticos';
import RegisterCatedratico from './CatedraticoCrear';


const ms2p = (state) => {
  return {
    ...state.catedratico,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(RegisterCatedratico);