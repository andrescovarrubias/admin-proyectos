import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //  Extrae proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    
    // Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada != null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre: '',
                encargado: ''
            })
        }
    }, [tareaseleccionada]);

    // State del formulario
    const [tarea, guardarTarea] = useState({
        nombre:'',
        encargado:''
    });

    // Extraer el nombre del proyecto
    const { nombre, encargado } = tarea;

    // Si no hay proyecto seleccionado
    if (!proyecto) return null;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmits = e => {
        e.preventDefault();

        // Validar
        if(nombre.trim() === '' || encargado.trim() === ''){
            validarTarea();
            return;
        }

        // Revisar si es edicion o nueva tarea
        if(tareaseleccionada === null){
            // Agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        }else{
            // Actualizar tarea existente
            actualizarTarea(tarea);
        }
        
        // Obtener y filtar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        // Reiniciar el form
        guardarTarea({
            nombre:'',
            encargado: ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmits}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                        autoComplete="off"
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Encargado"
                        name="encargado"
                        value={encargado}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Modificar Tarea' : 'Agregar Tarea'}
                    />
                </div>

            </form>

            {errortarea ? <p className="mensaje error2">Los campos son obligatorios</p> : null}

        </div>
    );
}

export default FormTarea;