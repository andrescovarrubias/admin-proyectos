
import {
     TAREAS_PROYECTO,
     AGREGAR_TAREA,
     VALIDAR_TAREA,
     ELIMINAR_TAREA,
     TAREA_ACTUAL,
     ACTUALIZAR_TAREA
} from '../../types';

// eslint-disable-next-line
export default (state, action) => {
     switch (action.type) {
          case TAREAS_PROYECTO:
               return {
                    ...state,
                    /* De todo el listado de tareas hacemos un filtado iterando en cada tarea y cuando la tarea
                         cuyo proyectoId es igual al del payload se agregara 
                    */
                    tareasproyecto: action.payload
               }
          case AGREGAR_TAREA:
               return {
                    ...state,
                    tareasproyecto: [action.payload, ...state.tareasproyecto],
                    errortarea: false
               }
          case VALIDAR_TAREA:
               return {
                    ...state,
                    errortarea: true
               }
          case ELIMINAR_TAREA:
               return {
                    ...state,
                    tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
               }
          case ACTUALIZAR_TAREA:
               return {
                    ...state,
                    tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
                    tareaseleccionada: null
               }
          case TAREA_ACTUAL:
               return {
                    ...state,
                    tareaseleccionada: action.payload
               }

          default: return state;
     }
}