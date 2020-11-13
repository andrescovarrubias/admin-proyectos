const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Extraer el correo y password
    const { email, password } = req.body;

    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: "El usuario no existe" });
        }

        // Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: "Contraseña Incorrecta" });
        }

        // Crear y Firmar el JWT
        const payload = {
            // Guardamos en el payload el id del usuario
            usuario: {
                id: usuario.id,
            },
        };
        // Firmar el JWT Si todo es correcto
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 3600, // 1 Hora
            },
            (error, token) => {
                if (error) throw error;
                // Mensaje de confirmacion
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
    }
};

// Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select(
            "-password"
        );
        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Hubo un error" });
    }
};
