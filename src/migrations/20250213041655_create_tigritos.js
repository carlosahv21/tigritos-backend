// src/migrations/20231010123500_create_tigritos.js
exports.up = function (knex) {
    return knex.schema.createTable('tigritos', (table) => {
        table.increments('tigrito_id').primary();
        table.integer('solicitante_id').unsigned().references('user_id').inTable('usuarios');
        table.integer('proveedor_id').unsigned().references('user_id').inTable('usuarios');
        table.integer('servicio_id').unsigned().references('servicio_id').inTable('servicios');
        table.text('descripcion');
        table.string('ubicacion');
        table.datetime('fecha_hora');
        table.string('estado').defaultTo('pendiente');
        table.decimal('precio_acordado', 10, 2);
        table.timestamp('fecha_creacion').defaultTo(knex.fn.now());
        table.integer('calificacion');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tigritos');
};