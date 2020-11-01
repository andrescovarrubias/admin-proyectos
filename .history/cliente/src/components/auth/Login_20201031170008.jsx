import React, { useState } from 'react';
import {Link} from 'react-router-dom';


const Login = () => {

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

          // contraseña minimo de 6 caracteres

          // contraseña iguales

          // pasarlo al action

     }

     return ( 
          <div className="form-usuario">
               <div className="contenedor-form sombra-dark">
                    <h1>Iniciar Sesión</h1>
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
                              <input type="submit" className=" btn btn-primario btn-block" value="Iniciar Sesión"/>
                         </div>
                    </form>
                    <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                         Obtener Cuenta
                    </Link>
               </div>
          </div>
      );
}
 
export default Login;