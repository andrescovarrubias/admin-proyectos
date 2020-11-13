import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const NuevaCuenta = () => {

     // Extraer valores del context
     const alertaContext = useContext(AlertaContext);
     const {alerta, mostrarAlerta} = alertaContext;

     const authContext = useContext(AuthContext);
     const {registrarUsuario} = authContext;

     // state para iniciar sesion
     const [usuario, guardarUsuario] = useState ({
          nombre:'',
          email:'',
          password:'',
          confirmar:''
     });

     // extraer el usuario
     const {nombre,email, password, confirmar} = usuario;

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
          if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
               mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
               return;
          }

          // Password minimo 6 caracteres
          if(password.length<6){
               mostrarAlerta('La contraseña debe ser de minimo 6 Caracteres', 'alerta-error');
               return;
          }

          // Los 2 pássword son iguales
          if(password !== confirmar){
               mostrarAlerta('Las contraseñas no son iguales', 'alerta-error');
               return;
          }

          // pasarlo al action
          registrarUsuario({ nombre, email, password });

     }

     return ( 
          <div className="form-usuario">
               {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
               <div className="contenedor-form sombra-dark">
                    <h1>Registro de Cuenta</h1>
                    <form
                         onSubmit = {onSubmit}
                    >
                         <div className="campo-form">
                              <label htmlFor="nombre">Nombre</label>
                              <input 
                                   type="text"
                                   id="nombre"
                                   name="nombre"
                                   placeholder="Nombre Commpleto"
                                   autoComplete="off"
                                   value={nombre}
                                   onChange={onChange}     
                              />
                         </div>
                         <div className="campo-form">
                              <label htmlFor="email">Usuario</label>
                              <input 
                                   type="email"
                                   id="email"
                                   name="email"
                                   placeholder="Correo Electrónico"
                                   autoComplete="off"
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
                                   autoComplete="off"
                                   value={password}
                                   onChange={onChange}     
                              />
                         </div>
                         <div className="campo-form">
                              <label htmlFor="confirmar">Confirmar Contraseña</label>
                              <input 
                                   type="password"
                                   id="confirmar"
                                   name="confirmar"
                                   placeholder="Repite Contraseña"
                                   autoComplete="off"
                                   value={confirmar}
                                   onChange={onChange}     
                              />
                         </div>

                         <div className="campo-form">
                              <input type="submit" className=" btn btn-primario btn-block" value="Registrarse"/>
                         </div>
                    </form>
                    <Link to={'/'} className="enlace-cuenta">
                         Iniciar Sesión
                    </Link>
               </div>
          </div>
      );
}
 
export default NuevaCuenta;