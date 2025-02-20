// src/migrations/20231010123500_create_tigritos.js
exports.up = function (knex) {
    return knex.schema.createTable('tigritos', (table) => {
        table.increments('tigrito_id').primary();
        table.integer('solicitante_id').unsigned().references('user_id').inTable('usuarios').notNullable();
        table.integer('proveedor_id').unsigned().references('user_id').inTable('usuarios').notNullable();
        table.integer('servicio_id').unsigned().references('servicio_id').inTable('servicios').notNullable();
        table.text('descripcion').notNullable();
        table.string('ubicacion');
        table.datetime('fecha_hora').notNullable();
        table.string('estado').defaultTo('pendiente').notNullable();
        table.decimal('precio_acordado', 10, 2);
        table.boolean('deleted').defaultTo(false);
        table.timestamp('fecha_creacion').defaultTo(knex.fn.now());
        table.timestamp('fecha_modificacion').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tigritos');
};