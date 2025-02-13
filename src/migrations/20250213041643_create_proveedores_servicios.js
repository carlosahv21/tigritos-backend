// src/migrations/20231010123459_create_proveedores_servicios.js
exports.up = function (knex) {
    return knex.schema.createTable('proveedores_servicios', (table) => {
        table.integer('proveedor_id').unsigned().references('user_id').inTable('usuarios');
        table.integer('servicio_id').unsigned().references('servicio_id').inTable('servicios');
        table.decimal('precio_base', 10, 2);
        table.integer('experiencia_años');
        table.text('descripcion_servicio');
        table.primary(['proveedor_id', 'servicio_id']); // Clave primaria compuesta
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('proveedores_servicios');
};