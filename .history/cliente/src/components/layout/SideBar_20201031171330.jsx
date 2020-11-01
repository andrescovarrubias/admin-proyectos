import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';


const SideBar = () => {
    return ( 
        <aside>
            <h1>Administrador de <span>Proyectos</span><br/><img src="https://img.icons8.com/cotton/64/000000/task-planning.png"/></h1>

            <NuevoProyecto />
            
            <div className="proyectos">
                <h2>Tus Proyectos</h2>
            </div>
        </aside>
    );
}
 
export default SideBar;