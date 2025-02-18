const db = require('../db/db'); // Importa la instancia de la conexión

class Servicio {
    static async obtenerTodos(limit, offset, search, filterField, filterValue) {
        let query = db('servicios')
            .select('servicios.*', 'categorias.nombre as nombre_categoria')
            .join('categorias', 'servicios.categoria_id', 'categorias.categoria_id')
            .orderBy('servicio_id', 'asc');

        // Aplica los filtros si existen
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
        return db('servicios').where('servicios.servicio_id', '=' , id ).first();
    }

    static async actualizar(id, datos) {
        return db('servicios')
            .where({ id })
            .update(datos)
            .returning('*');
    }

    static async eliminar(id) {
        return db('servicios').where({ id }).del();
    }

    static async crear(datos) {
        return db('servicios').insert(datos).returning('*');
    }
    
}

module.exports = Servicio;