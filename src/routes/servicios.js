const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');

// Obtener todos los servicios
router.get('/', serviciosController.obtenerTodos.bind(serviciosController));

// Obtener un servicio por ID
router.get('/:id', serviciosController.obtenerPorId.bind(serviciosController));

// Crear un servicio
router.post('/', serviciosController.crear.bind(serviciosController));

// Actualizar un servicio
router.put('/:id', serviciosController.actualizar.bind(serviciosController));

// Eliminar un servicio
router.delete('/:id', serviciosController.eliminar.bind(serviciosController));

module.exports = router;