const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Extraer email y password
    const { email, password } = req.body;

    try {
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ msg: "Usuario ya existe" });
        }

        // Crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // Guarda el nuevo usuario
        await usuario.save();

        // Crear y Firmar el JWT
        const payload = {
            // Guardamos en el payload el id del usuario
            usuario: {
                id: usuario.id,
            },
        };
        // Firmar el JWT
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
        res.status(400).send("Hubo un error");
    }
};
