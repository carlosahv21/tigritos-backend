// src/migrations/20231010123458_create_servicios.js
exports.up = function (knex) {
    return knex.schema.createTable('servicios', (table) => {
        table.increments('servicio_id').primary();
        table.string('nombre').notNullable();
        table.text('descripcion');
        table.decimal('precio').notNullable();
        table.integer('categoria_id').unsigned().references('categoria_id').inTable('categorias');
        table.integer('experiencia_años');
        table.boolean('destacado').defaultTo(false);
        table.boolean('borrado').defaultTo(false);
        table.timestamp('fecha_creacion').defaultTo(knex.fn.now());
        table.timestamp('fecha_modificacion').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('servicios');
};