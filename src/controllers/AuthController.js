const Usuario = require('../models/Usuario');
const logger = require('../utils/logger');

class AuthController {
    async iniciarSesion(req, res) {
        try {
            const { email, contrasena } = req.body;
            const { token, usuario } = await Usuario.iniciarSesion(email, contrasena);
            logger.info(`Usuario ${usuario.nombre} ha iniciado sesión correctamente`);
            res.json({ token, usuario });
        } catch (error) {
            logger.error(`Error al iniciar sesión: ${error.message}`);
            res.status(401).json({ message: error.message });
        }
    }

    async cerrarSesion(req, res) {
        try {
            logger.info(`Usuario ${req.usuario.nombre} ha cerrado sesión correctamente`);
            res.json({ mensaje: 'Sesión cerrada correctamente' });
        } catch (error) {
            logger.error(`Error al cerrar sesión: ${error.message}`);
            res.status(401).json({ message: error.message });
        }
    }

    async renovarToken(req, res) {
        try {
            const { refreshToken } = req.body;
            const { token } = await Usuario.renovarToken(refreshToken);

            logger.info(`Usuario ${req.usuario.nombre} ha renovado su token correctamente`);
            res.json({ token });
        } catch (error) {
            logger.error(`Error al renovar token: ${error.message}`);
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();