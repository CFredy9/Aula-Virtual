import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/contraseña/contraseña';
import ContraseñaCrear from './ContraseñaCrear';

const ms2p = (state) => {
    return {
        ...state.contraseña,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ContraseñaCrear);