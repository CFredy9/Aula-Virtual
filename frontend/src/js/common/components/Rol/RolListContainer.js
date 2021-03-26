import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/rol/roles';
import RolList from './RolList';

const ms2p = (state) => {
    return {
        ...state.rol,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(RolList);