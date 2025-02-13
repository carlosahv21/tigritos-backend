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