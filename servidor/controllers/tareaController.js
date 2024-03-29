const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

// Crea una nueva tarea
exports.crearTarea = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            res.status(404).json({ msg: "Proyecto no encontrado" });
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        // Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No autorizado" });
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error creando tarea");
    }
};

// Obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;
        console.log(req.query);

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            res.status(404).json({ msg: "Proyecto no encontrado" });
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        // Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No autorizado" });
        }

        // Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
        res.json({ tareas });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error obteniendo tareas");
    }
};

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, encargado, estado } = req.body;

        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        // Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No autorizado" });
        }

        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: "No existe esa tarea" });
        }

        // Crear un objeto con la nueva informacion
        const nuevaTarea = {};

        nuevaTarea.nombre = nombre;
        nuevaTarea.encargado = encargado;
        nuevaTarea.estado = estado;

        // Guardar la tarea
        tarea = await Tarea.findOneAndUpdate(
            { _id: req.params.id },
            nuevaTarea,
            { new: true }
        );
        res.json({ tarea });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error actualizando el proyecto");
    }
};

// Eliminar tarea por ID
exports.eliminarTarea = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;

        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: "No existe esa tarea" });
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        // Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: "No autorizado" });
        }

        // Eliminar tarea
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: "Tarea Eliminada" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error eliminando proyecto");
    }
};
