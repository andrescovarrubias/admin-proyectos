// import React, { useState, useEffect, useContext } from "react";
import React from "react";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";

import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/tokenAuth";
import RutaPrivada from "./components/rutas/RutaPrivada";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Revisar si hay un token y enviarlo por headers
const token = localStorage.getItem("token");
if (token) {
    tokenAuth(token);
}

function App() {
    // console.log(process.env.REACT_APP_BACKEND_URL);

    return (
        <ProyectoState>
            <TareaState>
                <AlertaState>
                    <AuthState>
                        <Router>
                            <Switch>
                                <Route exact path="/" component={Login} />
                                <Route
                                    exact
                                    path="/nueva-cuenta"
                                    component={NuevaCuenta}
                                />
                                <RutaPrivada
                                    exact
                                    path="/proyectos"
                                    component={Proyectos}
                                />
                            </Switch>
                        </Router>
                    </AuthState>
                </AlertaState>
            </TareaState>
        </ProyectoState>
    );
}

export default App;
