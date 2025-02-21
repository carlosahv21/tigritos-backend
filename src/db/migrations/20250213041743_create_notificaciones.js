// src/migrations/20231010123505_create_notificaciones.js
exports.up = function (knex) {
    return knex.schema.createTable('notificaciones', (table) => {
        table.increments('notificacion_id').primary();
        table.integer('usuario_id').unsigned().references('usuario_id').inTable('usuarios').notNullable();
        table.string('tipo').notNullable();
        table.text('contenido');
        table.timestamp('fecha').defaultTo(knex.fn.now());
        table.boolean('leida').defaultTo(false).notNullable();
        table.timestamp('fecha_creacion').defaultTo(knex.fn.now());
        table.timestamp('fecha_modificacion').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('notificaciones');
};