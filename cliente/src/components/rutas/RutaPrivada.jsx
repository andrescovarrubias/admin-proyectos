import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

// Creando un Higher Order Component: toma un componente dentro de el
const RutaPrivada = ({ component: Component, ...props }) => {


    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return (
        <Route
            // si el usuario esta autenticado lo mandamos al componente en caso que no lo mandamos al login
            {...props} render={props => !autenticado && !cargando ?
                (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )}
        />
    )
}

export default RutaPrivada;