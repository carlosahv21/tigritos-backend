const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middlewares/auth');

// Obtener todos los usuarios
router.get('/', authMiddleware,usuariosController.obtenerTodos.bind(usuariosController));

// Obtener un usuario por ID
router.get('/:id', authMiddleware, usuariosController.obtenerPorId.bind(usuariosController));

// Crear un usuario
router.post('/', authMiddleware, usuariosController.crear.bind(usuariosController));

// Actualizar un usuario
router.put('/:id', authMiddleware, usuariosController.actualizar.bind(usuariosController));

// Eliminar un usuario
router.delete('/:id', authMiddleware,usuariosController.eliminar.bind(usuariosController));

module.exports = router;