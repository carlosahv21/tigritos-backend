const db = require('../db/db'); // Importa la instancia de la conexión
const Joi = require('joi');

class Categoria {
    static async obtenerTodos(limit, offset, search, filterField, filterValue) {
        let query = db('categorias')
            .select('categorias.*')
            .orderBy('categoria_id', 'asc');

        if (search) {
            query.where('categorias.nombre', 'like', `%${search}%`);
        }
        if (filterField && filterValue) {
            query.where(filterField, filterValue);
        }

        return query.limit(limit).offset(offset);
    }

    static async contarTodos() {
        return db('categorias').count('* as count').first();
    }

    static async obtenerPorId(id) {
        const categoria = await db('categorias').where({ categoria_id: id }).first();
        if (categoria) {
            delete categoria.deleted;
            return categoria;
        }
        return null;
    }

    static async actualizar(id, datos) {
        try{
            const validatedData = await Categoria.validar(datos);
            await db('categorias').where({ categoria_id: id }).update(validatedData);
            return Categoria.obtenerPorId(id);
        }catch(error){
            if (error.code === 'ER_DUP_ENTRY') {
                const errorDuplicado = new Error('El nombre del registroya existe.');
                errorDuplicado.codigo = 'DUPLICADO';
                throw errorDuplicado;
            }
            throw error;
        }
    }

    static async eliminar(id) {
        return db('categorias').where({ categoria_id: id }).del();
    }

    static async crear(datos) {
        try {
            const validatedData = await Categoria.validar(datos);
            const insert = await db('categorias').insert(validatedData);
            return Categoria.obtenerPorId(insert[0]);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                const errorDuplicado = new Error('El nombre del registroya existe.');
                errorDuplicado.codigo = 'DUPLICADO';
                throw errorDuplicado;
            }
            throw error;
        }
    }

    static async validar(categoria) {
        const schema = Joi.object({
            nombre: Joi.string().required(),
            icono: Joi.string().allow(null, ''),
        });

        const { error, value } = schema.validate(categoria);

        if (error) {
            const errorValidacion = new Error(error.details[0].message);
            errorValidacion.codigo = 'VALIDACION';
            throw errorValidacion;
        }

        return value;
    }
}

module.exports = Categoria;