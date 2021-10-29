
exports.up = function (knex) {
  return knex.schema.createTable('pokemon_types', table => {
    table.integer('poke_id');
    table.integer('poke_type');
    table.timestamps(true, true); // adds created_at and updated_at
  });
};


exports.down = function (knex) {
  return knex.schema.dropTableIfExists('pokemon_types');
};
