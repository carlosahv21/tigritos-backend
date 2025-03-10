// src/migrations/20231010123457_create_categorias.js
exports.up = function (knex) {
    return knex.schema.createTable('categorias', (table) => {
        table.increments('categoria_id').primary();
        table.string('nombre').notNullable();
        table.string('icono');
        table.boolean('borrado').defaultTo(false);
        table.timestamp('fecha_creacion').defaultTo(knex.fn.now());
        table.timestamp('fecha_modificacion').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('categorias');
};