import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {

    // extraer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    useEffect(() => {

        if (mensaje) {
            // si hay un error
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();

        // eslint-disable-next-line
    }, [mensaje])

    // revisa si proyectos tiene contenido
    if (proyectos.length === 0) return <h3>No hay proyectos, puedes empezar creando uno</h3>;

    return (
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;