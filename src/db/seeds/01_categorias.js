exports.seed = function (knex) {
    return knex('categorias').del()
        .then(function () {
            return knex('categorias').insert([
                { nombre: 'Fontanería', icono: '🪠' },
                { nombre: 'Electricidad', icono: '🔌' },
                { nombre: 'Carpintería', icono: '🪚' },
                { nombre: 'Jardinería', icono: '🧑🏼‍🌾' }
            ]);
        });
};