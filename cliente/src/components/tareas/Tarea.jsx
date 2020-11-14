import React, { Fragment, useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';


const Tarea = ({ tarea }) => {

    //  Extrae proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    // Extraer el proyecto
    const [proyectoActual] = proyecto;

    // Funcion que se ejecuta cuando le den al btn eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    // Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if (tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }


    return (
        <Fragment>
            <li className="tarea sombra">
                <p>{tarea.nombre}</p>
                <p>{tarea.encargado}</p>


                <div className="estado">
                    {tarea.estado
                        ?
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >Completada</button>
                        )

                        :
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                            >Incompleta</button>
                        )

                    }
                </div>

                <div className="acciones">
                    <button
                        type="button"
                        className="btn btn-primario"
                        onClick={() => seleccionarTarea(tarea)}
                    >Editar</button>

                    <button
                        type="button"
                        className="btn btn-secundario"
                        onClick={() => tareaEliminar(tarea._id)}
                    >Eliminar</button>
                </div>

            </li>
        </Fragment>
    );
}

export default Tarea;