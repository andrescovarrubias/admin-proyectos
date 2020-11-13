import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';
import authReducer from './authReducer';


const AuthState = props =>{

    const initialState = {
        // Agregar el JWT al state y al LocalStorage
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    const [state,dispatch] = useReducer(authReducer,initialState);

    // Funciones
    const registrarUsuario = async datos => {
        try {
            // Mandamos los datos al endpoint por post (clienteAxios = variable URL API)
            const respuesta = await clienteAxios.post('/api/usuario', datos);
            console.log(respuesta);

            dispatch({
                type: REGISTRO_EXITOSO
            })
        } catch (error) {
            console.log(error);

            dispatch({
                type: REGISTRO_ERROR
            })
        }
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;