const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController'); 

// Inicio de sesión
router.post('/login', usuariosController.iniciarSesion);

// obtener todos los usuarios
router.get('/', usuariosController.obtenerTodos);

// Recuperación de datos de un usuario
router.get('/:id', usuariosController.obtenerPorId);

// Registro de usuario
router.post('/registro', usuariosController.crear);

// Eliminación de un usuario
router.delete('/:id', usuariosController.eliminar);

// Actualización de datos de un usuario
router.put('/:id', usuariosController.actualizar);

module.exports = router;