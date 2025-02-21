const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');
const authMiddleware = require('../middlewares/auth');

// Obtener todos los categorias
router.get('/', authMiddleware, categoriasController.obtenerTodos.bind(categoriasController));

// Obtener un categoria por ID
router.get('/:id', authMiddleware, categoriasController.obtenerPorId.bind(categoriasController));

// Crear un categoria
router.post('/', authMiddleware, categoriasController.crear.bind(categoriasController));

// Actualizar un categoria
router.put('/:id', authMiddleware, categoriasController.actualizar.bind(categoriasController));

// Eliminar un categoria
router.delete('/:id', authMiddleware, categoriasController.eliminar.bind(categoriasController));

module.exports = router;