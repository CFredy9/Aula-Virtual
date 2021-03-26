import { connect } from 'react-redux';
import { actions } from '../../../../../redux/modules/contraseña/contraseña';
import RecuperacionCrear from './RecuperacionContraCrear';

const ms2p = (state) => {
    return {
        ...state.contraseña,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(RecuperacionCrear);