// src/migrations/20231010123503_create_pagos.js
exports.up = function (knex) {
    return knex.schema.createTable('pagos', (table) => {
        table.increments('pago_id').primary();
        table.integer('tigrito_id').unsigned().references('tigrito_id').inTable('tigritos').notNullable();
        table.decimal('monto', 10, 2).notNullable();
        table.string('metodo').notNullable();
        table.string('estado').defaultTo('pendiente').notNullable();
        table.timestamp('fecha').defaultTo(knex.fn.now());
        table.boolean('borrado').defaultTo(false);
        table.timestamp('fecha_creacion').defaultTo(knex.fn.now());
        table.timestamp('fecha_modificacion').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('pagos');
};