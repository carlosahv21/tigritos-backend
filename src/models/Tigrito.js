const knex = require('../../knexfile');

class Tigrito {
    static async obtenerTodos() {
        return knex('tigritos').select('*');
    }

    static async obtenerPorId(id) {
        return knex('tigritos').where({ tigrito_id: id }).first();
    }

    static async crear(tigrito) {
        return knex('tigritos').insert(tigrito).returning('*');
    }

    static async actualizar(id, tigrito) {
        return knex('tigritos').where({ tigrito_id: id }).update(tigrito).returning('*'); 
    }

    static async eliminar(id) {
        return knex('tigritos').where({ tigrito_id: id }).del();
    }
}

module.exports = Tigrito;