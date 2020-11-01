import React, { useState } from 'react';
import {Link} from 'react-router-dom';


const NuevaCuenta = () => {

     // state para iniciar sesion
     const [usuario, guardarUsuario] = useState ({
          email:'',
          password:''
     });

     // extraer el usuario
     const {email, password} = usuario;

     const onChange = e => {
          guardarUsuario({
               ...usuario,
               [e.target.name] : e.target.value
          })
     }


     // cuando el usuario quiere iniciar sesion
     const onSubmit = e => {
          e.preventDefault();

          // validar que no haya campos vacios

          // pasarlo al action

     }

     return ( 
          <div className="form-usuario">
               <div className="contenedor-form sombra-dark">
                    <h1>Registro de Cuenta</h1>
                    <form
                         onSubmit = {onSubmit}
                    >
                         <div className="campo-form">
                              <label htmlFor="email">Usuario</label>
                              <input 
                                   type="email"
                                   id="email"
                                   name="email"
                                   placeholder="Correo Electrónico"
                                   autocomplete="off"
                                   required
                                   value={email}
                                   onChange={onChange}     
                              />
                         </div>
                         <div className="campo-form">
                              <label htmlFor="password">Contraseña</label>
                              <input 
                                   type="password"
                                   id="password"
                                   name="password"
                                   placeholder="contraseña"
                                   autocomplete="off"
                                   value={password}
                                   required
                                   onChange={onChange}     
                              />
                         </div>

                         <div className="campo-form">
                              <input type="submit" className=" btn btn-primario btn-block" value="Registrarse"/>
                         </div>
                    </form>
                    <Link to={'/login'} className="enlace-cuenta">
                         Iniciar Sesión
                    </Link>
               </div>
          </div>
      );
}
 
export default NuevaCuenta;