const Usuario = require('../models/Usuario');

class AuthController {
    async iniciarSesion(req, res) {
        try {
            const { email, contrasena } = req.body;
            const { token, usuario } = await Usuario.iniciarSesion(email, contrasena);
            res.json({ token, usuario });
        } catch (error) {
            res.status(401).json({ message: error.message }); // 401 Unauthorized
        }
    }

    async cerrarSesion(req, res) {
        try {
            res.json({ mensaje: 'Sesión cerrada correctamente' });
        } catch (error) {
            res.status(401).json({ message: error.message }); // 401 Unauthorized
        }
    }

    async renovarToken(req, res) {
        try {
            const { refreshToken } = req.body;
            const { token } = await Usuario.renovarToken(refreshToken);
            res.json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();