import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/cuenta/profile';
import Demo from './Demo';

const ms2p = (state) => {
  return {
    ...state.login,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Demo);