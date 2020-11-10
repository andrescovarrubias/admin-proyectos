import React, {useReducer} from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { v4 as uuid } from 'uuid';

import {
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO
} from '../../types';

const ProyectoState = props => {

    const proyectos = [
        {id: 1,nombre: 'Tienda Virtual'},
        {id: 2,nombre: 'Intranet'},
        {id: 3,nombre: 'Diseño de Sitio web'},
    ]

    const initialState = {
        proyectos: [],
        formulario: false
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // obtiene los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    // agregar nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id = uuid();

        // insertar el proyecto en el state
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}


export default ProyectoState;