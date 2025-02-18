const knex = require('../../knexfile');

class Usuario {
    static async obtenerTodos() {
        return knex('usuarios').select('*');
    }

    static async obtenerPorId(id) {
        return knex('usuarios').where({ user_id: id }).first();
    }

    static async crear(usuario) {
        return knex('usuarios').insert(usuario).returning('*');
    }

    static async actualizar(id, usuario) {
        return knex('usuarios').where({ user_id: id }).update(usuario).returning('*'); 
    }

    static async eliminar(id) {
        return knex('usuarios').where({ user_id: id }).del();
    }

    static async obtenerPorEmail(email) {
        return knex('usuarios').where({ email }).first();
    }
}

module.exports = Usuario;