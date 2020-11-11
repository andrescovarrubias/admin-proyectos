
import {
     TAREAS_PROYECTO
} from '../../types';


export default (state, action) => {
     switch (action.type) {
          case TAREAS_PROYECTO:
               return {
                    ...state,
                    /* De todo el listado de tareas hacemos un filtado iterando en cada tarea y cuando la tarea
                         cuyo proyectoId es igual al del payload se agregara 
                    */
                    tareasproyecto: state.tareas.filter(tarea => tarea.proyectoId === action.payload)
               }


          default: return state;
     }
}