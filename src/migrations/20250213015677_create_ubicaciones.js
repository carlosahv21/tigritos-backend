// src/migrations/20231010123504_create_ubicaciones.js
exports.up = function (knex) {
    return knex.schema.createTable('ubicaciones', table => {
        table.increments('ubicacion_id').primary();
        table.decimal('latitud', 9, 6).notNullable();
        table.decimal('longitud', 9, 6).notNullable();
        table.string('direccion');
        table.integer('radio_servicio_km');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('ubicaciones');
};