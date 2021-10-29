
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('pokemon_table').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon_table').insert([
        { id: 1, name: 'testname', poke_id: 900, height: 69, weight: 250 }
      ]);
    });
};