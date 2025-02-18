// src/migrations/20231010123501_create_reseñas.js
exports.up = function (knex) {
	return knex.schema.createTable('reseñas', (table) => {
		table.increments('reseña_id').primary();
		table.integer('tigrito_id').unsigned().references('tigrito_id').inTable('tigritos').notNullable();
		table.integer('proveedor_id').unsigned().references('user_id').inTable('usuarios').notNullable();
		table.integer('solicitante_id').unsigned().references('user_id').inTable('usuarios').notNullable();
		table.integer('puntuacion').notNullable();
		table.text('comentario');
		table.timestamp('fecha').defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('reseñas');
};