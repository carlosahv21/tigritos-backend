const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');
const authMiddleware = require('../middlewares/auth');

// Obtener todos los servicios
router.get('/', authMiddleware, serviciosController.obtenerTodos.bind(serviciosController));

// Obtener un servicio por ID
router.get('/:id', authMiddleware, serviciosController.obtenerPorId.bind(serviciosController));

// Crear un servicio
router.post('/', authMiddleware, serviciosController.crear.bind(serviciosController));

// Actualizar un servicio
router.put('/:id', authMiddleware,serviciosController.actualizar.bind(serviciosController));

// Eliminar un servicio
router.delete('/:id', authMiddleware, serviciosController.eliminar.bind(serviciosController));

module.exports = router;