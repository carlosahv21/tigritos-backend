// src/migrations/20231010123458_create_servicios.js
exports.up = function (knex) {
    return knex.schema.createTable('servicios', (table) => {
        table.increments('servicio_id').primary();
        table.string('nombre').notNullable();
        table.text('descripcion');
        table.integer('categoria_id').unsigned().references('categoria_id').inTable('categorias');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('servicios');
};