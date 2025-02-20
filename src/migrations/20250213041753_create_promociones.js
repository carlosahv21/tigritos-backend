// src/migrations/20231010123506_create_promociones.js
exports.up = function (knex) {
    return knex.schema.createTable('promociones', (table) => {
        table.increments('promocion_id').primary();
        table.integer('proveedor_id').unsigned().references('user_id').inTable('usuarios').notNullable();
        table.string('tipo').notNullable();
        table.datetime('fecha_inicio').notNullable();
        table.datetime('fecha_fin').notNullable();
        table.decimal('costo', 10, 2).notNullable();
        table.boolean('deleted').defaultTo(false);
        table.timestamp('fecha_creacion').defaultTo(knex.fn.now());
        table.timestamp('fecha_modificacion').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('promociones');
};