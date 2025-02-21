const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/auth');

// Iniciar sesión
router.post('/login', authController.iniciarSesion.bind(authController));

// Cerrar sesión
router.post('/logout', authMiddleware,  authController.cerrarSesion.bind(authController));

// Renovar token
router.post('/refresh', authMiddleware, authController.renovarToken.bind(authController));

module.exports = router;