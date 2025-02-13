// src/migrations/20231010123456_create_usuarios.js
exports.up = function (knex) {
    return knex.schema.createTable('usuarios', (table) => {
        table.increments('user_id').primary(); // PK autoincremental
        table.string('tipo_usuario').notNullable(); // solicitante/proveedor
        table.string('nombre').notNullable();
        table.string('email').unique().notNullable();
        table.string('telefono').notNullable();
        table.string('contraseña_hash').notNullable();
        table.string('foto_perfil');
        table.float('promedio_valoracion').defaultTo(0);
        table.integer('trabajos_completados').defaultTo(0);
        table.timestamp('fecha_registro').defaultTo(knex.fn.now());
        table.boolean('verificado').defaultTo(false);
        table.integer('ubicacion_id').unsigned().references('ubicacion_id').inTable('ubicaciones'); // FK
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('usuarios');
};