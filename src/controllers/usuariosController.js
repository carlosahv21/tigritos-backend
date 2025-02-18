
const BaseController = require('./BaseController');
const Usuario = require('../models/Usuario.js');

class UsuariosController extends BaseController {
    constructor() {
        super(Usuario); 
    }

    async iniciarSesion(req, res) {
        try {
            const usuario = await Usuario.obtenerPorEmail(req.body.email);
            if (!usuario) {
                return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
            }
            if (usuario.contraseña_hash !== req.body.contraseña) {
                return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
            }
            res.json({ mensaje: 'Sesión iniciada' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al iniciar sesión' });
        }
    }
}

module.exports = new UsuariosController(); // Exporta una instancia del controlador