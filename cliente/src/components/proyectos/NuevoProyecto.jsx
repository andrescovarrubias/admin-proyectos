import React, { Fragment, useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    // state para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    // extraer nombre proyecto
    const { nombre } = proyecto;

    // Lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    // cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        // validar el proyecto
        if (nombre === '') {
            mostrarError();
            return;
        }

        // agregar al state
        agregarProyecto(proyecto);

        // reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >Nuevo Proyecto</button>

            {
                formulario ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre del Proyecto"
                                name="nombre"
                                autoComplete="off"
                                value={nombre}
                                onChange={onChangeProyecto}
                            />

                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />
                        </form>
                    ) : null
            }
            {errorformulario ? <p className="mensaje error">Nombre Obligatorio</p> : null}

        </Fragment>
    );
}

export default NuevoProyecto;