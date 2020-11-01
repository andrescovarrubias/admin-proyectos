import React, {Fragment, useState} from 'react'


const NuevoProyecto = () => {

    // state para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    });



    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
            >Nuevo Proyecto</button>

            <form
                className="formulario-nuevo-proyecto"
            >
                <input 
                    type="text"
                    className="input-text"
                    placeholder="Nombre del Proyecto"
                    name="nombre"
                    autoComplete="off"
                />

                <input 
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Agregar Proyecto"
                />
            </form>
        </Fragment>
     );
}
 
export default NuevoProyecto;