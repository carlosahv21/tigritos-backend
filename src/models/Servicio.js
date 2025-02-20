const db = require('../db/db'); 
const Joi = require('joi');

class Servicio {
    static async obtenerTodos(limit, offset, search, filterField, filterValue) {
        let query = db('servicios')
            .select('servicios.*', 'categorias.nombre as nombre_categoria')
            .join('categorias', 'servicios.categoria_id', 'categorias.categoria_id')
            .orderBy('servicio_id', 'asc');

        if (search) {
            query.where('servicios.nombre', 'like', `%${search}%`)
                .orWhere('servicios.descripcion', 'like', `%${search}%`);
        }
        if (filterField && filterValue) {
            query.where(filterField, filterValue);
        }

        return query.limit(limit).offset(offset);
    }

    static async contarTodos() {
        return db('servicios').count('* as count').first();
    }

    static async obtenerPorId(id) {
        const servicio = await db('servicios').where({ servicio_id: id }).first();
        if (servicio) {
            delete servicio.deleted;
            return servicio;
        }
        return null;
    }

    static async actualizar(id, datos) {
        try {
            const servicio = await Servicio.validar(datos);
            await db('servicios').where({ servicio_id: id }).update(servicio);
            return Servicio.obtenerPorId(id);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                const errorDuplicado = new Error('El nombre del registroya existe.');
                errorDuplicado.codigo = 'DUPLICADO';
                throw errorDuplicado;
            }
            throw error;
        }
    }

    static async eliminar(id) {
        return db('servicios').where({ servicio_id: id }).del();
    }

    static async crear(datos) {
        try {
            const servicio = await Servicio.validar(datos);
            const insert = await db('servicios').insert(servicio);
            return Servicio.obtenerPorId(insert[0]);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                const errorDuplicado = new Error('El nombre del registroya existe.');
                errorDuplicado.codigo = 'DUPLICADO';
                throw errorDuplicado;
            }
            throw error;
        }
    }

    static async validar(servicio) {
        const schema = Joi.object({
            nombre: Joi.string().required(),
            descripcion: Joi.string().allow(null, ''),
            precio: Joi.number().required(),
            categoria_id: Joi.number().required(),
        });

        const { error, value } = schema.validate(servicio);

        if (error) {
            const errorValidacion = new Error(error.details[0].message);
            errorValidacion.codigo = 'VALIDACION';
            throw errorValidacion;
        }

        return value;
    }
}

module.exports = Servicio;