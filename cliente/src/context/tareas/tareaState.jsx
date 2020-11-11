import React, { useReducer } from 'react'
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import TareaReducer from './tareaReducer';

import {
     TAREAS_PROYECTO
} from '../../types';

const TareaState = props => {
     const initialState = {
          tareas: [
               { nombre: 'Elegir Plataforma', encargado: 'Pepe Mike', estado: true, proyectoId: 1 },
               { nombre: 'Elegir Colores', encargado: 'K Acosta', estado: false, proyectoId: 2 },
               { nombre: 'Elegir Plataforma de Pago', encargado: 'Je Felix', estado: false, proyectoId: 3 },
               { nombre: 'Elegir Hosting', encargado: 'Aa Sañudo', estado: true, proyectoId: 3 },
               { nombre: 'Elegir Plataforma', encargado: 'Pepe Mike', estado: true, proyectoId: 2 },
               { nombre: 'Elegir Colores', encargado: 'K Acosta', estado: false, proyectoId: 1 },
               { nombre: 'Elegir Plataforma de Pago', encargado: 'Je Felix', estado: false, proyectoId: 2 },
               { nombre: 'Elegir Hosting', encargado: 'Aa Sañudo', estado: true, proyectoId: 1 },
          ],
          tareasproyecto: null
     }

     // Crear dispatch y state
     const [state, dispatch] = useReducer(tareaReducer, initialState);

     // Crear las funciones

     // Obtener tareas de un proyecto
     const obtenerTareas = proyectoId => {
          dispatch({
               type: TAREAS_PROYECTO,
               payload: proyectoId
          })
     }

     return (
          <TareaContext.Provider
               value={{
                    tareas: state.tareas,
                    tareasproyecto: state.tareasproyecto,
                    obtenerTareas
               }}
          >
               {props.children}
          </TareaContext.Provider>
     )
}


export default TareaState;