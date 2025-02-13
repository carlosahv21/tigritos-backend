// src/migrations/20231010123502_create_mensajes.js
exports.up = function (knex) {
    return knex.schema.createTable('mensajes', (table) => {
        table.increments('mensaje_id').primary();
        table.integer('tigrito_id').unsigned().references('tigrito_id').inTable('tigritos');
        table.integer('remitente_id').unsigned().references('user_id').inTable('usuarios');
        table.text('contenido');
        table.timestamp('fecha').defaultTo(knex.fn.now());
        table.boolean('leido').defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('mensajes');
};