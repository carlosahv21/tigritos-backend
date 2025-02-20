const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');

// Obtener todos los categorias
router.get('/', categoriasController.obtenerTodos.bind(categoriasController));

// Obtener un categoria por ID
router.get('/:id', categoriasController.obtenerPorId.bind(categoriasController));

// Crear un categoria
router.post('/', categoriasController.crear.bind(categoriasController));

// Actualizar un categoria
router.put('/:id', categoriasController.actualizar.bind(categoriasController));

// Eliminar un categoria
router.delete('/:id', categoriasController.eliminar.bind(categoriasController));

module.exports = router;