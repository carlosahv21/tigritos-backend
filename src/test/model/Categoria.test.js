const Categoria = require('../../models/Categoria');
const db = require('../../db/db');

describe('Categoria Model', () => {
    const categoria = { nombre: 'Test Categoria', icono: '✌🏽' };
    beforeEach(async () => {
        await db.raw('SET FOREIGN_KEY_CHECKS = 0;');
        await db('categorias').truncate();
        await db.raw('SET FOREIGN_KEY_CHECKS = 1;');
    });

    it('debería crear una categoría', async () => {
        const nuevaCategoria = await Categoria.crear(categoria);
        expect(nuevaCategoria).toBeDefined();
        expect(nuevaCategoria.nombre).toBe(categoria.nombre);
        expect(nuevaCategoria.icono).toBe(categoria.icono);
    });

    it('debería obtener una categoría por ID', async () => {
        const nuevaCategoria = await Categoria.crear(categoria);
        const obtenidaCategoria = await Categoria.obtenerPorId(1); 
        expect(obtenidaCategoria).toBeDefined();
        expect(nuevaCategoria.nombre).toBe(categoria.nombre);
        expect(nuevaCategoria.icono).toBe(categoria.icono);
    });

    it('debería obtener todas las categorías', async () => {
        const nuevaCategoria = await Categoria.crear(categoria);
        const obtenidasCategorias = await Categoria.obtenerTodos();
        expect(obtenidasCategorias).toBeDefined();
        expect(obtenidasCategorias.length).toBe(1);
        expect(obtenidasCategorias[0]).toEqual(nuevaCategoria);
    });

    it('debería actualizar una categoría', async () => {
        await Categoria.crear(categoria);

        const actualizadaCategoria = await Categoria.actualizar(1, { nombre: 'Test Categoria Actualizada', icono: '' }); 
        expect(actualizadaCategoria).toBeDefined();
        expect(actualizadaCategoria.nombre).toBe('Test Categoria Actualizada');
        expect(actualizadaCategoria.icono).toBe('');
    });

    it('debería eliminar una categoría', async () => {
        await Categoria.crear(categoria);
        
        const resultadoEliminacion = await Categoria.eliminar(1);
        expect(resultadoEliminacion).toBe(1);
        const obtenidasCategorias = await Categoria.obtenerTodos();
        expect(obtenidasCategorias.length).toBe(0);
    });

    it('debería validar datos de categoría correctamente', async () => {
        const validadaCategoria = await Categoria.validar(categoria);
        expect(validadaCategoria).toBeDefined();
        expect(validadaCategoria).toEqual(categoria);
    });

    it('debería lanzar un error de validación si los datos de categoría son inválidos', async () => {
        await expect(Categoria.validar({ nombre: '', icono: '✌' })).rejects.toThrow('nombre" is not allowed to be empty');
    });

    afterAll(async () => {
        await db.destroy();
    });
});