// src/migrations/20231010123505_create_notificaciones.js
exports.up = function (knex) {
    return knex.schema.createTable('notificaciones', (table) => {
        table.increments('notificacion_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('usuarios');
        table.string('tipo').notNullable();
        table.text('contenido');
        table.timestamp('fecha').defaultTo(knex.fn.now());
        table.boolean('leida').defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('notificaciones');
};