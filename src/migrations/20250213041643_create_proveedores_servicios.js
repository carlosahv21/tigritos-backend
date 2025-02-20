// src/migrations/20231010123459_create_proveedores_servicios.js
exports.up = function (knex) {
    return knex.schema.createTable('proveedores_servicios', (table) => {
        table.increments('proveedor_servicio_id').primary(); // Clave primaria autoincremental
        table.integer('proveedor_id').unsigned().references('user_id').inTable('usuarios');
        table.integer('servicio_id').unsigned().references('servicio_id').inTable('servicios');
        table.decimal('precio', 10, 2).notNullable();
        table.integer('experiencia_años');
        table.text('descripcion_servicio');
        table.boolean('destacado').defaultTo(false);
        table.boolean('deleted').defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('proveedores_servicios');
};