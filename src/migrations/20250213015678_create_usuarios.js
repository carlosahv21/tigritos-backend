// src/migrations/20231010123456_create_usuarios.js
exports.up = function (knex) {
    return knex.schema.createTable('usuarios', (table) => {
        table.increments('user_id').primary();
        table.string('tipo_usuario').notNullable();
        table.string('nombre').notNullable();
        table.string('email').notNullable();
        table.string('telefono').notNullable();
        table.string('contraseña_hash').notNullable();
        table.string('foto_perfil');
        table.float('promedio_valoracion').defaultTo(0);
        table.integer('trabajos_completados').defaultTo(0);
        table.timestamp('fecha_registro').defaultTo(knex.fn.now());
        table.boolean('verificado').defaultTo(false);
        table.integer('ubicacion_id').unsigned().references('ubicacion_id').inTable('ubicaciones').nullable();
        table.boolean('deleted').defaultTo(false);
        table.timestamp('fecha_creacion').defaultTo(knex.fn.now());
        table.timestamp('fecha_modificacion').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('usuarios');
};