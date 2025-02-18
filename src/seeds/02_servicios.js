exports.seed = function (knex) {
    return knex('servicios').del()
        .then(function () {
            return knex('servicios').insert([
                { nombre: 'Cambiar llave de paso', descripcion: 'Reparación de tubería', precio: 5, categoria_id: 1 },
                { nombre: 'Reparar lavadora', descripcion: 'Mantenimiento de electrodomésticos', precio: 8, categoria_id: 1 },
                { nombre: 'Instalar lámpara', descripcion: 'Instalaciones eléctricas', precio: 3, categoria_id: 2 },
                { nombre: 'Cambiar enchufe', descripcion: 'Reparaciones eléctricas', precio: 2, categoria_id: 2 },
                { nombre: 'Construir estantería', descripcion: 'Trabajos de carpintería', precio: 15, categoria_id: 3 },
                { nombre: 'Reparar silla', descripcion: 'Arreglos de muebles', precio: 4, categoria_id: 3 },
                { nombre: 'Cortar césped', descripcion: 'Mantenimiento de jardines', precio: 6, categoria_id: 4 },
                { nombre: 'Podar árboles', descripcion: 'Cuidado de plantas', precio: 9, categoria_id: 4 }
            ]);
        });
};