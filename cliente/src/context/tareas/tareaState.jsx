import React, { useReducer } from 'react'
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

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
          tareasproyecto: [],
          errortarea: false,
          tareaseleccionada: null
     }

     // Crear dispatch y state
     const [state, dispatch] = useReducer(TareaReducer, initialState);

     //* Crear las funciones

     // Obtener tareas de un proyecto
     const obtenerTareas = async proyectoId => {
          try {
               const resultado = await clienteAxios.get('/')
               dispatch({
                    type: TAREAS_PROYECTO,
                    payload: proyectoId
               })
          } catch (error) {
               console.log(error);
          }
     }

     // Agregar una tarea al proyecto seleccionado
     const agregarTarea = async tarea => {
          try {
               const resultado = await clienteAxios.post('/api/tareas', tarea);
               dispatch({
                    type: AGREGAR_TAREA,
                    payload: tarea
               })
          } catch (error) {
               console.log(error);
          }
     }

     // Valida y muestra un error en caso de que sea necesario
     const validarTarea = () => {
          dispatch({
               type: VALIDAR_TAREA
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
     const guardarTareaActual = tarea => {
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