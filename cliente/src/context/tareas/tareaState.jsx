import React, { useReducer } from 'react'
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import { v4 as uuid } from 'uuid';

import {
     TAREAS_PROYECTO,
     AGREGAR_TAREA,
     VALIDAR_TAREA,
     ELIMINAR_TAREA,
     ESTADO_TAREA,
     TAREA_ACTUAL,
     ACTUALIZAR_TAREA
} from '../../types';

const TareaState = props => {
     const initialState = {
          tareas: [
               { id: 1, nombre: 'Elegir Plataforma', encargado: 'Pepe Mike', estado: true, proyectoId: 1 },
               { id: 2, nombre: 'Elegir Colores', encargado: 'K Acosta', estado: false, proyectoId: 2 },
               { id: 3, nombre: 'Elegir Plataforma de Pago', encargado: 'Je Felix', estado: false, proyectoId: 3 },
               { id: 4, nombre: 'Elegir Hosting', encargado: 'Aa Sañudo', estado: true, proyectoId: 3 },
               { id: 5, nombre: 'Elegir Plataforma', encargado: 'Pepe Mike', estado: true, proyectoId: 2 },
               { id: 6, nombre: 'Elegir Colores', encargado: 'K Acosta', estado: false, proyectoId: 1 },
               { id: 7, nombre: 'Elegir Plataforma de Pago', encargado: 'Je Felix', estado: false, proyectoId: 2 },
               { id: 8, nombre: 'Elegir Hosting', encargado: 'Aa Sañudo', estado: true, proyectoId: 1 },
          ],
          tareasproyecto: null,
          errortarea:false,
          tareaseleccionada: null
     }

     // Crear dispatch y state
     const [state, dispatch] = useReducer(TareaReducer, initialState);

     //* Crear las funciones

     // Obtener tareas de un proyecto
     const obtenerTareas = proyectoId => {
          dispatch({
               type: TAREAS_PROYECTO,
               payload: proyectoId
          })
     }

     // Agregar una tarea al proyecto seleccionado
     const agregarTarea = tarea => {
          tarea.id = uuid();
          
          dispatch({
               type: AGREGAR_TAREA,
               payload: tarea
          })
     }

     // Valida y muestra un error en caso de que sea necesario
     const validarTarea = () => {
          dispatch({
               type:VALIDAR_TAREA
          })
     }

     // Eliminar tarea por ID
     const eliminarTarea = id => {
          dispatch({
               type: ELIMINAR_TAREA,
               payload: id
          })
     }

     // Cambia el estado de cada tarea
     const cambiarEstadoTarea = tarea => {
          dispatch({
               type: ESTADO_TAREA,
               payload: tarea
          })
     }

     // Extrae una tarea para editar
     const guardarTareaActual= tarea => {
          dispatch({
               type: TAREA_ACTUAL,
               payload: tarea
          })
     }

     // Edita o Modirfica una tarea
     const actualizarTarea = tarea => {
          dispatch({
               type: ACTUALIZAR_TAREA,
               payload: tarea
          })
     }

     return (
          <TareaContext.Provider
               value={{
                    tareas: state.tareas,
                    tareasproyecto: state.tareasproyecto,
                    errortarea: state.errortarea,
                    tareaseleccionada: state.tareaseleccionada,
                    obtenerTareas,
                    agregarTarea,
                    validarTarea,
                    eliminarTarea,
                    cambiarEstadoTarea,
                    guardarTareaActual,
                    actualizarTarea
               }}
          >
               {props.children}
          </TareaContext.Provider>
     )
}


export default TareaState;