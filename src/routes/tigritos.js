const express = require('express');
const router = express.Router();
const tigritosController = require('../controllers/tigritosController');

// Obtener todos los "tigritos"
router.get('/', tigritosController.obtenerTodos);

// Obtener un "tigrito" por ID
router.get('/:id', tigritosController.obtenerPorId);

// Crear un nuevo "tigrito"
router.post('/', tigritosController.crear);

// Actualizar un "tigrito"
router.put('/:id', tigritosController.actualizar);

// Eliminar un "tigrito"
router.delete('/:id', tigritosController.eliminar);

module.exports = router;