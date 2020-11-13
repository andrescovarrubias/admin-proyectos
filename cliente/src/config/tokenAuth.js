import clienteAxios from "./axios";

// Pasando el JWT por el header y en caso que no lo eliminamos (en caso de cerrar sesion)
const tokenAuth = (token) => {
    if (token) {
        clienteAxios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete clienteAxios.defaults.headers.common["x-auth-token"];
    }
};

export default tokenAuth;
