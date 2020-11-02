import React from 'react';

const Barra = () => {
    return ( 
        <header className="app-header">
            <p className="nombre-usuario">Bienvenido: <span>Andrés</span></p>

            <nav className="nav-principal">
                <a href="#!">&#128711; Cerrar Sesión</a>
            </nav>
        </header>
    );
}
 
export default Barra;