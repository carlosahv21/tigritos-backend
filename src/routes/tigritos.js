const express = require('express');
const router = express.Router();
const tigritosController = require('../controllers/tigritosController');
const authMiddleware = require('../middlewares/auth');

// Obtener todos los "tigritos"
router.get('/', authMiddleware,tigritosController.obtenerTodos);

// Obtener un "tigrito" por ID
router.get('/:id', authMiddleware,tigritosController.obtenerPorId);

// Crear un nuevo "tigrito"
router.post('/', authMiddleware, tigritosController.crear);

// Actualizar un "tigrito"
router.put('/:id', authMiddleware,tigritosController.actualizar);

// Eliminar un "tigrito"
router.delete('/:id', authMiddleware, tigritosController.eliminar);

module.exports = router;